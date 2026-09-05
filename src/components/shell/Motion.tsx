"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Progressive enhancement: content is visible even without JS or animation. */
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const stop = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          const animation = entry.target.animate(
            [{ opacity: .25, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      }, { threshold: .08 });
      document.querySelectorAll(".hero-copy, .hero-art, main > section:not(.hero), main > article").forEach(element => observer?.observe(element));
    };
    start();
    preference.addEventListener("change", start);
    return () => { stop(); preference.removeEventListener("change", start); };
  }, [path]);
  return null;
}
