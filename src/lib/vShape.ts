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

/**
 * As PAREDES da extrusão em 2D: um quadrilátero por aresta do contorno,
 * ligando a face da frente à cópia deslocada em (dx, dy).
 *
 * Desenhadas todas e por baixo das faces, elas preenchem exatamente o vão
 * entre as duas cópias — as que ficariam escondidas num sólido de verdade
 * acabam cobertas pela face frontal, então não é preciso decidir quais
 * arestas formam a silhueta.
 *
 * Cada parede vem com um `tom` de 0 a 1: 1 para a que encara a luz (aresta
 * subindo para a direita) e 0 para a que foge dela. É esse número que o
 * chamador usa para escolher a cor e a peça deixar de parecer uma sombra.
 */
export function wallPaths(
  pts: [number, number][],
  { dx, dy, mirror = false }: { dx: number; dy: number; mirror?: boolean },
): { d: string; tom: number }[] {
  const p = pts.map(([x, y]) => [mirror ? MIRROR - x : x, y] as const);

  return p.map((a, i) => {
    const b = p[(i + 1) % p.length];
    const d = [
      `M${a[0]} ${a[1]}`,
      `L${b[0]} ${b[1]}`,
      `L${b[0] + dx} ${b[1] + dy}`,
      `L${a[0] + dx} ${a[1] + dy}`,
      "Z",
    ].join(" ");

    // normal da aresta contra a direção da luz (do alto à esquerda)
    const [ex, ey] = [b[0] - a[0], b[1] - a[1]];
    const len = Math.hypot(ex, ey) || 1;
    const luz = (-ey / len) * -0.6 + (ex / len) * -0.8;
    return { d, tom: (luz + 1) / 2 };
  });
}
