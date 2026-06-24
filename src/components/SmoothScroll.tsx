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
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
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
