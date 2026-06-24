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
    // Reveal SCRUBADO: o elemento sobe/aparece ligado à posição do scroll —
    // fluxo contínuo ("um só movimento"), sem snap nem pin.
    const off = Math.min(delay / 40, 8);
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: `top ${90 - off}%`,
          end: `top ${52 - off}%`,
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, delay]);
}
