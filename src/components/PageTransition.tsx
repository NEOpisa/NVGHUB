"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motionEnabled } from "@/lib/motionConfig";
import { txBus } from "@/components/scene/transitionBus";

/**
 * Controlador da transição entre páginas. NÃO desenha nada — quem desenha é o
 * TransitionCanvas (animação das "portas" + logo no canvas). Aqui fica só a
 * máquina de estados robusta: no clique pedimos "cover"; quando a tela está
 * coberta (evento "covered") E a ROTA realmente mudou (pathname), pedimos
 * "reveal". Failsafe revela mesmo se a navegação não acontecer. Não intercepta
 * o <Link> (navega por baixo). Desliga com reduced-motion / ?motion=off.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const phase = useRef<"idle" | "covering" | "covered">("idle");
  const navigated = useRef(false);
  const safety = useRef<number | undefined>(undefined);

  useEffect(() => {
    const offBus = txBus.on((e) => {
      if (e === "covered") {
        phase.current = "covered";
        maybeReveal();
      }
    });

    const onClick = (e: MouseEvent) => {
      if (!motionEnabled() || phase.current !== "idle") return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || href.startsWith("#") || target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      cover(); // sem preventDefault: o <Link> navega por baixo da cortina
    };

    document.addEventListener("click", onClick, true);
    return () => {
      offBus();
      document.removeEventListener("click", onClick, true);
      if (safety.current) clearTimeout(safety.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A rota mudou de verdade → libera o reveal (se a cobertura já terminou).
  useEffect(() => {
    navigated.current = true;
    maybeReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function cover() {
    phase.current = "covering";
    navigated.current = false;
    if (safety.current) clearTimeout(safety.current);
    txBus.emit("cover");
    // failsafe: se a navegação não acontecer, revela mesmo assim.
    safety.current = window.setTimeout(() => {
      if (phase.current !== "idle") reveal();
    }, 2400);
  }

  function maybeReveal() {
    if (phase.current === "covered" && navigated.current) reveal();
  }

  function reveal() {
    if (phase.current === "idle") return;
    phase.current = "idle";
    navigated.current = false;
    if (safety.current) clearTimeout(safety.current);
    txBus.emit("reveal");
  }

  return null;
}
