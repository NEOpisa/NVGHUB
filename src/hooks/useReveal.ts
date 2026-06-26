"use client";

import { useEffect, useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useReveal(ref: RefObject<HTMLElement | null>, delay = 0) {
  // Oculta antes do primeiro paint (sem flash)
  useIso(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(el, { opacity: 0, y: 40 });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    // Reveal play-once: dispara ao entrar na viewport e COMPLETA sempre — mesmo
    // em seções no fim da página (onde não há scroll restante pra um scrub
    // chegar ao fim) ou já visíveis no load. `once` + start a 85% garante isso.
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, delay]);
}
