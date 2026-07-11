"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parallax, splitReveal } from "@/lib/motion";
import { MQ, motionEnabled } from "@/lib/motionConfig";

gsap.registerPlugin(ScrollTrigger);

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Efeitos globais de scroll, RE-AVALIADOS a cada rota (App Router não remonta o
 * layout, então precisamos do pathname pra reescanear [data-parallax]/[data-split]
 * das páginas navegadas client-side). Barra de progresso cross-browser + juice.
 */
export default function ScrollJuice() {
  const pathname = usePathname();

  // Pré-esconde [data-split] ANTES do paint (só no tier FULL) pra o texto não
  // piscar antes da entrada cinética. Em mobile/reduced fica visível normalmente.
  useIso(() => {
    if (!motionEnabled() || !window.matchMedia(MQ.full).matches) return;
    gsap.set(gsap.utils.toArray<HTMLElement>("[data-split]"), { opacity: 0 });
  }, [pathname]);

  useEffect(() => {
    if (!motionEnabled()) return;

    const mm = gsap.matchMedia();
    let progress: gsap.core.Tween | undefined;

    // Espera o conteúdo da nova rota pintar antes de medir os triggers.
    const raf = requestAnimationFrame(() => {
      const bar = document.querySelector<HTMLElement>(".scroll-progress");
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        // #063 · touch: scrub direto (true) — sem tween de alcance por evento,
        // mais barato e a barra responde 1:1 ao dedo. Ponteiro fino mantém a
        // suavização de 0.3s.
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        progress = gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: coarse ? true : 0.3 },
        });
      }

      mm.add(MQ.full, () => {
        // Parallax declarativo: [data-parallax="0.2"] flutua no scroll.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "") || 0.18;
          parallax(el, { speed });
        });
        // Tipografia cinética: [data-split] revela linha por linha (SplitText).
        const splits = gsap.utils
          .toArray<HTMLElement>("[data-split]")
          .map((el) => splitReveal(el, { type: "lines" }));

        /* ── AUTO-JUICE: primitivos comuns ganham entrada viva em TODA
           rota, sem marcação por página. A home-jornada, o menu, modais e
           o quiz (coreografias próprias) ficam de fora. ── */
        const SKIP = ".jy-overlay, .nv-menu, [role='dialog'], .quiz-grid";
        const fresh = (el: HTMLElement) =>
          !el.closest(SKIP) && !el.hasAttribute("data-split");

        // títulos grandes: máscara por linha (SplitText), power4
        const heads = gsap.utils
          .toArray<HTMLElement>(".section-heading, .tp-h1, .tp-h2, .inst-claim")
          .filter(fresh);
        const autoSplits = heads.map((el) =>
          splitReveal(el, { type: "lines", start: "top 88%" }),
        );

        // eyebrows mono: wipe lateral curto
        gsap.utils
          .toArray<HTMLElement>(".section-eyebrow")
          .filter(fresh)
          .forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              x: -16,
              duration: 0.55,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });

        // cards / linhas: sobem em cascata quando entram na viewport
        const items = gsap.utils
          .toArray<HTMLElement>(
            ".card-1, .card-2, .tp-escada-row, .faq-question, .tq-step",
          )
          .filter(fresh);
        gsap.set(items, { opacity: 0, y: 34 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.09,
              // sticky/tilt precisam do transform livre depois da entrada
              clearProps: "transform",
            }),
        });

        return () => {
          splits.forEach((s) => s.split.revert());
          autoSplits.forEach((s) => s.split.revert());
        };
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
