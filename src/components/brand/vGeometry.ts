import * as THREE from "three";

/* Anatomia do símbolo NV (a mesma do vetor oficial public/logo.svg): metade
   direita em coordenadas de tela (y pra baixo, viewBox 260 290 760 560). A
   metade esquerda é o espelho em torno de x = 640 — juntas fecham o V. */
export const HALF_OUTLINE: [number, number][] = [
  [492, 306], [278, 369], [424, 578], [350, 409],
  [477, 377], [640, 830], [520, 308],
];
/* facetas: as duas peças de acento que dão o corte de esmalte no vetor */
export const HALF_FACETS: [number, number][][] = [
  [[520, 308], [577, 348], [629, 782]],
  [[477, 377], [350, 409], [424, 578], [396, 421], [485, 404]],
];

const CX = 640;   // eixo de espelhamento do V
const CY = 568;   // centro óptico vertical
const SCALE = 130;

const toWorld = ([x, y]: [number, number]) =>
  new THREE.Vector2((x - CX) / SCALE, -(y - CY) / SCALE);

/* ExtrudeGeometry sai com as normais invertidas se o contorno vier CW */
const ccw = (pts: THREE.Vector2[]) =>
  THREE.ShapeUtils.area(pts) < 0 ? pts.slice().reverse() : pts;

function extrude(pts: [number, number][], depth: number, bevel: number, z: number) {
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(ccw(pts.map(toWorld))), {
    depth,
    steps: 1,
    curveSegments: 4,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel * 0.85,
    bevelSegments: 3,
  });
  geo.translate(0, 0, z);
  geo.computeVertexNormals();
  return geo;
}

export type VParts = {
  /** corpo da lâmina — metal cornflower */
  body: THREE.BufferGeometry;
  /** facetas de acento — MediumBlue, cravadas por cima do corpo */
  facets: THREE.BufferGeometry[];
};

/**
 * Constrói UMA metade do V em 3D. O corpo é uma chapa biselada; as facetas
 * salientam alguns décimos à frente, então a luz rasante separa as duas
 * cores como no vetor (cromado claro × acento cheio).
 */
export function buildVHalf(): VParts {
  return {
    body: extrude(HALF_OUTLINE, 0.34, 0.035, -0.17),
    facets: HALF_FACETS.map((f) => extrude(f, 0.1, 0.012, 0.17)),
  };
}
