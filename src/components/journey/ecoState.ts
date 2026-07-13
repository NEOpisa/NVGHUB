/**
 * Ponte 3D ↔ DOM do carrossel do ECOSSISTEMA (duas rodas verticais).
 * O canvas escreve a posição projetada (px) de cada placa a cada frame;
 * o overlay lê num rAF próprio e cola os retículos clicáveis nas placas.
 * Mutável e fora do React de propósito (zero re-render por frame).
 */
import { journey } from "./journeyState";

export const ECO_COUNT = 20;
export const ECO_PER_WHEEL = 10;

export const eco = {
  /** módulo selecionado (placa ativa) — escrito pelo DOM, lido pelo 3D */
  active: 0,
  /** índice de frente de CADA roda (a roda guarda posição ao trocar) */
  wheelIdx: [0, 0],
  /** o visitante já girou/clicou? (desliga a demonstração automática) */
  touched: false,
  /** posição/raio de tela de cada placa + visibilidade (0..1) */
  screen: Array.from({ length: ECO_COUNT }, () => ({
    x: 0,
    y: 0,
    r: 10,
    vis: 0,
  })),
};

/**
 * Zona de giro por scroll: com o capítulo ativo e o ponteiro sobre uma das
 * rodas, a rolagem gira A RODA em vez de navegar a página. Retorna a roda
 * (0 = esquerda · 1 = direita) ou -1 fora da zona. Compartilhado entre o
 * handler do overlay (que gira) e o ChapterSnap (que cede a vez).
 */
export function ecoWheelZone(x: number, y: number): -1 | 0 | 1 {
  const p = journey.progress;
  if (p < 0.2 || p > 0.5) return -1;
  const fx = x / window.innerWidth;
  const fy = y / window.innerHeight;
  // só o MIOLO da roda captura o gesto — perto das bordas o scroll navega
  if (fy < 0.24 || fy > 0.78) return -1;
  if (fx > 0.09 && fx < 0.34) return 0;
  if (fx > 0.66 && fx < 0.91) return 1;
  return -1;
}
