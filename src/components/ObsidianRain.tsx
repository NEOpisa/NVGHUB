"use client";

import { useEffect } from "react";

/**
 * EASTER EGG — 5 cliques na wordmark (em até 3s) disparam a CHUVA OBSIDIAN:
 * cacos violeta despencam pela tela com rotação e se apagam. Puro DOM,
 * autolimpante, no máximo uma chuva por vez.
 */
export default function ObsidianRain() {
  useEffect(() => {
    let clicks: number[] = [];
    let raining = false;

    const rain = () => {
      if (raining) return;
      // #011 · reduced-motion: não dispara a chuva animada
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
        return;
      raining = true;
      const wrap = document.createElement("div");
      wrap.className = "obr";
      wrap.setAttribute("aria-hidden", "true");
      const n = 42;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("i");
        const size = 8 + Math.random() * 26;
        const left = Math.random() * 100;
        const dur = 2.2 + Math.random() * 2.4;
        const delay = Math.random() * 1.4;
        const spin = (Math.random() - 0.5) * 720;
        const a = 20 + Math.random() * 60;
        const b = 20 + Math.random() * 60;
        s.style.cssText = `left:${left}vw;width:${size}px;height:${size}px;` +
          `clip-path:polygon(50% 0, 100% ${a}%, ${b}% 100%, 0 ${100 - a / 2}%);` +
          `animation-duration:${dur}s;animation-delay:${delay}s;--spin:${spin}deg;`;
        wrap.appendChild(s);
      }
      document.body.appendChild(wrap);
      window.setTimeout(() => {
        wrap.remove();
        raining = false;
      }, 6200);
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(".wordmark");
      if (!el) return;
      const now = performance.now();
      clicks = clicks.filter((t) => now - t < 3000);
      clicks.push(now);
      if (clicks.length >= 5) {
        clicks = [];
        rain();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
