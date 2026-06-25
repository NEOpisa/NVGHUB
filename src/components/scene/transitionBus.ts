/**
 * Ponte entre o controlador DOM da transição (PageTransition — intercepta os
 * cliques de link e segura a máquina de estados) e o item de canvas que desenha
 * a animação (TransitionItem). O controlador emite "cover"/"reveal"; o canvas
 * responde com "covered" quando terminou de cobrir a tela.
 */
export type TxEvent = "cover" | "covered" | "reveal";

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
