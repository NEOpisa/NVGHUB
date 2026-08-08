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

type Cut = {
  depth: number;
  /** altura do chanfro nas duas pontas da extrusão */
  bevelThickness: number;
  /** o quanto o chanfro recolhe a face frontal para dentro do contorno */
  bevelSize: number;
  bevelSegments: number;
  /** z da face de trás */
  z: number;
};

function extrude(pts: [number, number][], cut: Cut) {
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(ccw(pts.map(toWorld))), {
    depth: cut.depth,
    steps: 1,
    curveSegments: 4,
    bevelEnabled: cut.bevelThickness > 0,
    bevelThickness: cut.bevelThickness,
    bevelSize: cut.bevelSize,
    bevelSegments: cut.bevelSegments,
  });
  geo.translate(0, 0, cut.z);
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
 * Constrói UMA metade do V em 3D.
 *
 * O corpo é uma chapa grossa: a espessura é o que dá volume, então a parede
 * lateral precisa ser larga o bastante para aparecer no giro. As facetas não
 * são adesivos colados na frente — cada uma é um bloco com chanfro alto e
 * face frontal recolhida (bevelSize grande em relação à profundidade), então
 * ela sobe do corpo por duas rampas e só depois vira platô. É essa rampa que
 * pega a luz rasante e separa o acento do metal por sombra, não por cor.
 */
export function buildVHalf(): VParts {
  return {
    body: extrude(HALF_OUTLINE, {
      depth: 0.46,
      bevelThickness: 0.05,
      bevelSize: 0.038,
      bevelSegments: 3,
      z: -0.23,
    }),
    facets: HALF_FACETS.map((f) =>
      extrude(f, {
        // platô fino sobre rampa alta: a rampa é o que dá o relevo. O recuo
        // fica curto de propósito — a faceta de cima é uma lasca estreita e
        // um chanfro largo demais faria a malha se dobrar perto da ponta.
        depth: 0.05,
        bevelThickness: 0.1,
        bevelSize: 0.04,
        bevelSegments: 1,
        z: 0.13,
      }),
    ),
  };
}
