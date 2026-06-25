/**
 * Decide (uma vez por carga) se a INTRO full-screen vai tocar: só na home e só
 * na 1ª vez da sessão. É consultada tanto pelo host da intro quanto pelo
 * LogoItem do hero — se a intro vai tocar, a logo do hero NÃO repete sua própria
 * entrada (a intro faz a entrada grandiosa; o hero só revela a marca já montada).
 *
 * A decisão é memoizada no escopo do módulo: consistente durante toda a carga,
 * independente da ordem em que os componentes perguntam. Zera num reload real.
 */
let decided = false;
let willPlay = false;

export function introWillPlay(): boolean {
  if (!decided) {
    decided = true;
    try {
      willPlay =
        typeof window !== "undefined" &&
        window.location.pathname === "/" &&
        !sessionStorage.getItem("nvg:intro") &&
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
