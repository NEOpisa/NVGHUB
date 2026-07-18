"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  journey,
  clamp01,
  saveJourneyProgress,
  loadJourneyProgress,
} from "./journeyState";
import { intro } from "@/components/scene/introState";
import { getLenisInstance } from "@/lib/lenis";
import JourneyOverlay from "./JourneyOverlay";
import ChapterSnap from "./ChapterSnap";

/* salto programático LENIS-AWARE: window.scrollTo puro perde a briga com o
   Lenis (ele escreve a posição antiga de volta no rAF seguinte) — era o bug
   do "Candidatar-se à Platina" que largava o visitante no hero */
function jumpTo(top: number) {
  const lenis = getLenisInstance() as
    | { scrollTo?: (t: number, o?: { immediate?: boolean; force?: boolean }) => void }
    | undefined;
  if (lenis?.scrollTo) lenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: "instant" });
}

// placeholder leve enquanto o chunk (three/fiber/drei) é buscado — evita flash
// transparente e reserva o fundo do canvas
const JourneyCanvas = dynamic(() => import("./JourneyCanvas"), {
  ssr: false,
  loading: () => <div className="jy-canvas jy-canvas-loading" aria-hidden="true" />,
});

/**
 * Raiz da jornada da home: um espaçador de scroll alto (~800vh) dirige o
 * progresso (0..1) lido pelo canvas fixo e pelo overlay. Sem WebGL ou com
 * reduced-motion/?motion=off, cai no modo estático (conteúdo empilhado).
 */
export default function Journey() {
  const wrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "gl" | "static">("pending");
  // o canvas 3D só é instanciado quando o hero entra no viewport (lazy-mount);
  // uma vez montado, permanece (não paga o custo de desmontar/remontar)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const off =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).get("motion") === "off";
    let gl = false;
    try {
      const c = document.createElement("canvas");
      gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      gl = false;
    }
    setMode(off || !gl ? "static" : "gl");
  }, []);

  // lazy-mount: observa o wrap e só libera o canvas quando ele entra (ou está
  // perto de entrar) no viewport. No fallback sem IO, monta direto.
  useEffect(() => {
    if (mode !== "gl") return;
    const el = wrap.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  // driver de progresso: scroll nativo (Lenis também emite scroll nativo)
  useEffect(() => {
    if (mode !== "gl") return;
    const el = wrap.current;
    if (!el) return;
    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      journey.progress = clamp01(
        -el.getBoundingClientRect().top / total,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // #043 · grava o progresso ao sair (navegação interna ou fechar aba)
    window.addEventListener("pagehide", saveJourneyProgress);
    return () => {
      saveJourneyProgress();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pagehide", saveJourneyProgress);
    };
  }, [mode]);

  // #049 · deep-link ?tier=ouro|platina: viaja até a bifurcação com a porta
  // certa destacada (ponte forkHover já lida pelo 3D). Espera a intro/lock
  // liberar antes de posicionar (scroll programático não move com o lock).
  useEffect(() => {
    if (mode !== "gl") return;
    const tier = new URLSearchParams(window.location.search).get("tier");
    if (tier !== "ouro" && tier !== "platina") return;
    const el = wrap.current;
    if (!el) return;
    journey.forkHover = tier;
    let raf = 0;
    const t0 = performance.now();
    const go = () => {
      if (performance.now() - t0 > 10000) return; // teto de segurança
      // espera SÓ enquanto a intro realmente toca (phase done = liberado)
      if (
        (intro.active && intro.phase !== "done") ||
        !document.body.classList.contains("site-loaded")
      ) {
        raf = requestAnimationFrame(go);
        return;
      }
      const total = el.offsetHeight - window.innerHeight;
      if (total > 0) jumpTo(el.offsetTop + 0.88 * total);
    };
    raf = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // #043 · retomar de onde parou (mesma sessão): só sem intro ativa e se o
  // visitante tinha avançado de verdade (3%..95%) — nunca briga com a intro
  // nem com o deep-link ?tier (que tem precedência).
  useEffect(() => {
    if (mode !== "gl" || intro.active) return;
    const el = wrap.current;
    if (!el) return;
    const tier = new URLSearchParams(window.location.search).get("tier");
    if (tier === "ouro" || tier === "platina") return;
    const p = loadJourneyProgress();
    if (p < 0.03 || p > 0.95 || window.scrollY > 4) return;
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    jumpTo(el.offsetTop + p * total);
  }, [mode]);

  const isStatic = mode === "static";
  return (
    <div ref={wrap} className={`jy-wrap${isStatic ? " jy-wrap-static" : ""}`}>
      {mode === "gl" && mounted && <JourneyCanvas />}
      {mode === "gl" && mounted && <ChapterSnap wrap={wrap} />}
      <JourneyOverlay staticMode={isStatic} />
    </div>
  );
}
