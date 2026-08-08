/**
 * A MALHA DO V — fonte única da anatomia da marca, em coordenadas do vetor
 * oficial (public/logo.svg, viewBox 260 290 760 560).
 *
 * Mora aqui, e não junto do 3D, porque quem desenha o V não é só o WebGL: a
 * OG e os ícones precisam da mesma malha sem arrastar o `three` para dentro
 * do runtime Node. O 3D importa daqui.
 */

/** contorno da metade direita — a lâmina em cromado */
export const HALF_OUTLINE: [number, number][] = [
  [492, 306], [278, 369], [424, 578], [350, 409],
  [477, 377], [640, 830], [520, 308],
];

/** as duas peças de acento que dão o corte de esmalte */
export const HALF_FACETS: [number, number][][] = [
  [[520, 308], [577, 348], [629, 782]],
  [[477, 377], [350, 409], [424, 578], [396, 421], [485, 404]],
];

/** eixo de espelhamento: x = 640, então o espelho é x → 1280 − x */
const MIRROR = 1280;

/** polígono → atributo `d`, opcionalmente espelhado e deslocado */
function vPath(
  pts: [number, number][],
  { mirror = false, dx = 0, dy = 0 } = {},
): string {
  const d = pts
    .map(([x, y], i) => {
      const px = (mirror ? MIRROR - x : x) + dx;
      return `${i === 0 ? "M" : "L"}${px} ${y + dy}`;
    })
    .join(" ");
  return `${d} Z`;
}

/** as duas metades de uma peça (contorno ou faceta) já prontas para o SVG */
export function bothHalves(
  pts: [number, number][],
  offset?: { dx: number; dy: number },
): string[] {
  return [
    vPath(pts, { ...offset }),
    vPath(pts, { mirror: true, ...offset }),
  ];
}
