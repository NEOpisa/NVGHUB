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
    gsap.set(el, { opacity: 0, y: 28 });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.75, ease: "power3.out",
          delay: delay / 1000,
        }),
    });
    return () => st.kill();
  }, [ref, delay]);
}
