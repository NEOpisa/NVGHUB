/**
 * NOVA — estado do novo site. Mutável, lido por rAF/useFrame (zero re-render).
 */
export const nova = {
  /** progresso bruto do scroll da home (0..1) */
  p: 0,
  /** progresso suavizado — publicado pelo rig da cena */
  smooth: 0,
};

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const range = (t: number, a: number, b: number) =>
  clamp01((t - a) / (b - a));
