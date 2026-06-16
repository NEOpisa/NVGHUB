"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: string, duration = 1400) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = target.match(/^(\d+)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    const final = parseInt(match[1], 10);
    const suffix = match[2] ?? "";
    setDisplay(`0${suffix}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        const start = performance.now();
        const tick = (now: number) => {
          const linear = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - linear, 3);
          setDisplay(`${Math.round(eased * final)}${suffix}`);
          if (linear < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display };
}
