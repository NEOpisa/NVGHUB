"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parallax, velocitySkew } from "@/lib/motion";
import { MQ, MOTION, motionEnabled } from "@/lib/motionConfig";

gsap.registerPlugin(ScrollTrigger);

/**
 * Efeitos globais de scroll: barra de progresso (cross-browser, no lugar do
 * CSS animation-timeline que só roda no Chrome) + velocity-skew nos elementos
 * marcados com [data-skew] (só no tier FULL, via gsap.matchMedia).
 */
export default function ScrollJuice() {
  useEffect(() => {
    if (!motionEnabled()) return;

    // Barra de progresso de scroll.
    let progress: gsap.core.Tween | undefined;
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    if (bar) {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      progress = gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    }

    // "Juice" por velocidade — só desktop/ponteiro fino.
    const mm = gsap.matchMedia();
    mm.add(MQ.full, () => {
      // Parallax declarativo: qualquer [data-parallax="0.2"] flutua no scroll.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "") || 0.18;
        parallax(el, { speed });
      });
      // "Juice" por velocidade nos [data-skew].
      const skewTargets = gsap.utils.toArray<HTMLElement>("[data-skew]");
      return velocitySkew(skewTargets, { maxSkew: MOTION.skew.max, factor: MOTION.skew.factor });
    });

    return () => {
      mm.revert();
      progress?.scrollTrigger?.kill();
      progress?.kill();
    };
  }, []);

  return null;
}
