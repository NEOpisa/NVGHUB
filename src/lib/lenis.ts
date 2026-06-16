export type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    opts?: { offset?: number; immediate?: boolean }
  ) => void;
};

let instance: LenisLike | undefined;

export const setLenisInstance = (l: LenisLike | undefined) => {
  instance = l;
};

export const getLenisInstance = (): LenisLike | undefined => instance;
