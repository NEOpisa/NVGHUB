/**
 * Configuração central de motion — "dial" único de intensidade.
 * Ajuste aqui para deixar tudo mais forte/fraco sem caçar código pelas seções.
 */

// Media queries usadas pelo gsap.matchMedia (tiers de efeito).
export const MQ = {
  // Tier FULL: desktop, ponteiro fino, sem reduced-motion → show completo.
  full: "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  // Tier LIGHT: telas pequenas / touch → versão enxuta.
  light: "(max-width: 767px), (pointer: coarse)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export const MOTION = {
  // Parallax: fração do tamanho do elemento deslocada ao longo do range (0..1).
  parallax: { hero: 0.18, cards: 0.1, ambient: 0.3, deep: 0.42 },
  // Velocity skew ("juice"): grau máx de skewY e fator por velocidade do scroll.
  skew: { max: 6, factor: 0.0009 },
  // Marquee reativo ao scroll: boost = px/s do scroll × fator (cap em maxScale).
  marquee: { boost: 0.0015, maxScale: 3 },
  reveal: { duration: 0.8, stagger: 0.06 },
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
