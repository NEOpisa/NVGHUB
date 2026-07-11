/**
 * Decide (uma vez por carga) se a INTRO vai tocar: só na home, só na PRIMEIRA
 * visita da sessão e sem reduced-motion. A intro roda DENTRO do canvas da
 * jornada (a logo se constrói de bloquinhos e migra para o hero) enquanto o
 * HUD DOM disfarça o loading — por isso o estado é um bus mutável compartilhado
 * entre o gate DOM (Preloader) e o 3D (HeroLogo), lido por rAF sem re-render.
 *
 * A decisão é memoizada no escopo do módulo: consistente durante toda a carga,
 * independente da ordem em que os componentes perguntam. Zera num reload real.
 */
let decided = false;
let willPlay = false;

export type IntroPhase = "load" | "handoff" | "done";

export const intro = {
  /** a intro desta carga vai tocar (o gate liga ao decidir tocar) */
  active: false,
  /** o canvas da jornada montou e o HeroLogo está pronto para construir */
  canvasReady: false,
  /** progresso da construção 0..1 — escrito pelo gate, lido pelo 3D */
  build: 0,
  /** load → construindo · handoff → migrando pro hero · done → liberado */
  phase: "load" as IntroPhase,
};

export function introWillPlay(): boolean {
  if (!decided) {
    decided = true;
    try {
      willPlay =
        typeof window !== "undefined" &&
        window.location.pathname === "/" &&
        !sessionStorage.getItem("nvg:intro") &&
        new URLSearchParams(window.location.search).get("motion") !== "off" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      willPlay = false;
    }
  }
  return willPlay;
}

export function markIntroDone() {
  try {
    sessionStorage.setItem("nvg:intro", "1");
  } catch {
    /* ignore */
  }
}
