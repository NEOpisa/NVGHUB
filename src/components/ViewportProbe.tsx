"use client";

import { useEffect } from "react";

/**
 * Expõe métricas reais da viewport (inclusive zoom visual em mobile)
 * como CSS vars globais para layout responsivo estável.
 */
export default function ViewportProbe() {
  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const vv = window.visualViewport;
      const w = vv?.width ?? window.innerWidth;
      const h = vv?.height ?? window.innerHeight;
      const scale = vv?.scale ?? 1;

      root.style.setProperty("--vvw", `${Math.round(w)}px`);
      root.style.setProperty("--vvh", `${Math.round(h)}px`);
      root.style.setProperty("--vv-scale", `${scale}`);
      root.style.setProperty("--screen-w", `${window.screen.width}px`);
      root.style.setProperty("--screen-h", `${window.screen.height}px`);
    };

    apply();

    window.addEventListener("resize", apply, { passive: true });
    window.addEventListener("orientationchange", apply);
    window.visualViewport?.addEventListener("resize", apply);
    window.visualViewport?.addEventListener("scroll", apply);

    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
      window.visualViewport?.removeEventListener("resize", apply);
      window.visualViewport?.removeEventListener("scroll", apply);
    };
  }, []);

  return null;
}
