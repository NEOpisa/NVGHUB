"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // em telas de toque o scroll nativo já é suave; evita o loop rAF do Lenis
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Suavização por lerp (independente de FPS): inércia macia estilo Awwwards,
    // mas responsiva — sem a sensação de "arrasto" de durações longas.
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.05,
      smoothWheel: true,
      anchors: true,
    });
    // exposto p/ a navegação por rota limpa (ScrollToSection) rolar suave
    setLenisInstance(lenis);

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenisInstance(undefined);
    };
  }, []);

  return null;
}
