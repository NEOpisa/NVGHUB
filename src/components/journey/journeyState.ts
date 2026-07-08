/**
 * Estado compartilhado da jornada 3D da home — mutável e lido por rAF/useFrame
 * (nunca por setState) para zero re-render durante o scroll.
 */

export type Tier = 0 | 1 | 2; // 0 = low · 1 = mid · 2 = high

export const journey = {
  /** progresso bruto do scroll da jornada (0..1) — escrito pelo driver DOM */
  progress: 0,
  /** progresso suavizado (damp) — escrito pelo CameraRig a cada frame */
  smooth: 0,
  /** z atual da câmera no mundo — usado p/ pulso de proximidade (túnel) */
  camZ: 8.6,
  tier: 2 as Tier,
  /** ponte DOM↔3D da bifurcação: qual porta está em hover */
  forkHover: "" as "" | "ouro" | "platina",
};

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** progresso local 0..1 dentro da faixa [a, b] */
export const rangeN = (t: number, a: number, b: number) =>
  clamp01((t - a) / (b - a));

/** Faixas de scroll de cada capítulo — compartilhadas entre 3D e overlay DOM.
 *  EXPLORE é o capítulo FINAL: entra e fica (portal + constelação). */
export const CH = {
  hero: { start: 0.0, end: 0.16 },
  eco: { start: 0.2, end: 0.44 },
  services: { start: 0.5, end: 0.74 },
  explore: { start: 0.8, end: 0.97 },
} as const;

/**
 * Tier de qualidade decidido UMA vez no boot (nunca desliga o 3D — só ajusta
 * densidade de partículas e DPR inicial). O DPR ainda é refinado em runtime
 * pelo AdaptiveQuality conforme o frame-time real.
 */
export function detectTier(): Tier {
  if (typeof window === "undefined") return 2;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (coarse && (cores <= 4 || mem <= 4)) return 0;
  if (coarse || cores <= 4) return 1;
  return 2;
}
