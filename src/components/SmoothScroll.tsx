"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // #063 · touch fica com o scroll NATIVO por decisão: o momentum do sistema
    // é mais suave e mais barato que qualquer smoothing em JS (Lenis syncTouch
    // custa caro em GPU fraca e briga com o gesto no iOS). O snap da jornada
    // no touch é do ChapterSnap (tween próprio, sem Lenis).
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      // scroll "pesado"/glide tipo webtoon: cada input desliza e assenta suave
      // (momentum), em vez da suavização contínua do lerp.
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      anchors: true,
    });
    setLenisInstance(lenis);

    // Integração lenis ↔ ScrollTrigger: UMA só fonte de scroll (sem listeners
    // extras), e o lenis passa a ser dirigido pelo ticker do GSAP — assim todo
    // efeito scrubado fica perfeitamente sincronizado com o scroll suave.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000); // ticker dá segundos
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      setLenisInstance(undefined);
    };
  }, []);

  return null;
}
