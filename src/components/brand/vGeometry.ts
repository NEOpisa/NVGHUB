import * as THREE from "three";
import { HALF_OUTLINE, HALF_FACETS } from "@/lib/vShape";

/* A anatomia (contorno + facetas, em coordenadas do vetor oficial) vem de
   lib/vShape — a mesma malha que a OG e os ícones usam. Aqui ela só ganha
   espessura: metade direita em coordenadas de tela (y pra baixo), a
   esquerda é o espelho em torno de x = 640. */

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
 * Constrói UMA metade do V em 3D. O contorno tem pontas agudas: sem bisel para evitar auto-interseções. As facetas
 * salientam alguns décimos à frente, então a luz rasante separa as duas
 * cores como no vetor (cromado claro × acento cheio).
 */
export function buildVHalf(): VParts {
  return {
    body: extrude(HALF_OUTLINE, 0.34, 0, -0.17),
    facets: HALF_FACETS.map((f) => extrude(f, 0.035, 0, 0.175)),
  };
}
