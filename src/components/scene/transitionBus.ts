/**
 * Ponte entre o controlador DOM da transição (PageTransition — intercepta os
 * cliques de link e segura a máquina de estados) e o item de canvas que desenha
 * a animação (TransitionItem). O controlador emite "cover"/"reveal"; o canvas
 * responde com "covered" quando terminou de cobrir a tela.
 */
type TxEvent = "cover" | "covered" | "reveal";

/** Tinta da travessia: a marca NV cobre a tela na COR do destino —
 *  dourado a caminho do Ouro, bismuto azulado a caminho da Platina. */
export type TxTint = "default" | "ouro" | "platina";
export const txState = { tint: "default" as TxTint };

const listeners = new Set<(e: TxEvent) => void>();

export const txBus = {
  emit(e: TxEvent) {
    listeners.forEach((l) => l(e));
  },
  on(l: (e: TxEvent) => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};
