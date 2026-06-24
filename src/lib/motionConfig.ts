/**
 * Configuração central de motion — "dial" único de intensidade.
 * Ajuste aqui para deixar tudo mais forte/fraco sem caçar código pelas seções.
 */

// Media queries usadas pelo gsap.matchMedia (tiers de efeito).
export const MQ = {
  // Tier FULL: desktop, ponteiro fino, sem reduced-motion → show completo.
  full: "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Master switch + A/B: `?motion=off` desliga tudo (conteúdo fica estático),
 * e reduced-motion também desliga. Útil pra comparar com/sem no preview.
 */
export function motionEnabled(): boolean {
  if (typeof window === "undefined") return true;
  if (new URLSearchParams(window.location.search).get("motion") === "off") return false;
  return !window.matchMedia(MQ.reduced).matches;
}
