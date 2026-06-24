"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parallax, velocitySkew } from "@/lib/motion";
import { MQ, MOTION, motionEnabled } from "@/lib/motionConfig";

gsap.registerPlugin(ScrollTrigger);

/**
 * Efeitos globais de scroll, RE-AVALIADOS a cada rota (App Router não remonta o
 * layout, então precisamos do pathname pra reescanear [data-parallax]/[data-skew]
 * das páginas navegadas client-side). Barra de progresso cross-browser + juice.
 */
export default function ScrollJuice() {
  const pathname = usePathname();

  useEffect(() => {
    if (!motionEnabled()) return;

    const mm = gsap.matchMedia();
    let progress: gsap.core.Tween | undefined;

    // Espera o conteúdo da nova rota pintar antes de medir os triggers.
    const raf = requestAnimationFrame(() => {
      const bar = document.querySelector<HTMLElement>(".scroll-progress");
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        progress = gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      }

      mm.add(MQ.full, () => {
        // Parallax declarativo: [data-parallax="0.2"] flutua no scroll.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "") || 0.18;
          parallax(el, { speed });
        });
        // "Juice" por velocidade nos [data-skew].
        const skewTargets = gsap.utils.toArray<HTMLElement>("[data-skew]");
        return velocitySkew(skewTargets, {
          maxSkew: MOTION.skew.max,
          factor: MOTION.skew.factor,
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
      progress?.scrollTrigger?.kill();
      progress?.kill();
    };
  }, [pathname]);

  return null;
}
