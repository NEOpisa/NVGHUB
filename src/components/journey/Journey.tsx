"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { journey, clamp01 } from "./journeyState";
import JourneyOverlay from "./JourneyOverlay";
import ChapterSnap from "./ChapterSnap";

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
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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
