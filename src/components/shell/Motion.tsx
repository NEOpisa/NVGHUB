"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Progressive enhancement: content is visible even without JS or animation. */
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const cleanups: (() => void)[] = [];
    const tokens = getComputedStyle(document.documentElement);
    const duration = parseFloat(tokens.getPropertyValue("--dur-3")) || 700;
    const easing = tokens.getPropertyValue("--ease-out").trim();
    const stagger = parseFloat(tokens.getPropertyValue("--stagger")) || 70;
    const cue = document.querySelector<HTMLElement>(".scroll-cue");
    const hideCue = () => { if (window.scrollY > 0) cue?.setAttribute("data-scrolled", ""); };
    hideCue();
    window.addEventListener("scroll", hideCue, { passive: true });
    let observer: IntersectionObserver | undefined;
    const stop = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      cleanups.splice(0).forEach(cleanup => cleanup());
    };
    const start = () => {
      stop();
      if (preference.matches) return;
      document.querySelectorAll<HTMLElement>(".hero-line > span").forEach((line, index) => {
        const animation = line.animate([{ transform: "translateY(105%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: duration - stagger, delay: index * stagger, easing });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
      const arrow = cue?.querySelector("span");
      if (arrow) animations.add(arrow.animate([{ transform: "translateY(-4px)", opacity: .4 }, { transform: "translateY(0)", opacity: 1 }], { duration, easing }));
      if (window.matchMedia("(pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>(".bento .card").forEach(card => {
          const move = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
          };
          card.addEventListener("pointermove", move);
          cleanups.push(() => card.removeEventListener("pointermove", move));
        });
      }
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          const animation = entry.target.animate(
            [{ opacity: .25, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration, easing },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach(number => {
            const final = number.textContent ?? "";
            const value = Number(final);
            let frame = 0;
            const started = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - started) / duration);
              number.textContent = String(Math.round(value * (1 - Math.pow(1 - progress, 3))));
              if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
            cleanups.push(() => { cancelAnimationFrame(frame); number.textContent = final; });
          });
          entry.target.querySelectorAll(".stack-diagram circle, .log-trace").forEach(node => {
            const pulse = node.animate([{ opacity: .2 }, { opacity: 1 }], { duration, easing });
            animations.add(pulse);
            pulse.onfinish = () => animations.delete(pulse);
          });
        }
      }, { threshold: .08 });
      document.querySelectorAll("main > section:not(.hero), main > article").forEach(element => observer?.observe(element));
    };
    start();
    preference.addEventListener("change", start);
    return () => { stop(); preference.removeEventListener("change", start); window.removeEventListener("scroll", hideCue); };
  }, [path]);
  return null;
}
