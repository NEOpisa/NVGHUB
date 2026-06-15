// Singleton p/ compartilhar a instância do Lenis entre o SmoothScroll
// (que cria) e o ScrollToSection (que usa para rolar suave por rota limpa).
// Evita augmentar window.lenis, que já é declarado pelo próprio pacote lenis.
export type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    opts?: { offset?: number }
  ) => void;
};

let instance: LenisLike | undefined;

export const setLenisInstance = (l: LenisLike | undefined) => {
  instance = l;
};

export const getLenisInstance = (): LenisLike | undefined => instance;
