import * as THREE from "three";

// Pontos da marca NV (coordenadas do SVG original).
export const WHITE_POINTS: [number, number][] = [
  [48, 25], [86, 44], [168, 93], [194, 143], [94, 78],
  [94, 144], [155, 216], [138, 206], [71, 151], [70, 48],
];
export const PURPLE_POINTS: [number, number][] = [
  [287, 27], [202, 219], [153, 175], [110, 116], [190, 169],
];

const CX = 160;
const CY = 124;
const SCALE = 42;

export function buildGeometry(points: [number, number][], depth: number) {
  const shape = new THREE.Shape(
    points.map(([x, y]) => new THREE.Vector2((x - CX) / SCALE, -(y - CY) / SCALE))
  );
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.045,
    bevelSegments: 4,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

export type Chunk = {
  geometry: THREE.BufferGeometry;
  pivot: THREE.Vector3;
  dir: THREE.Vector3;
};

// Particiona uma geometria em N cacos rígidos: ordena os triângulos pelo ângulo
// em torno do centro e fatia em N grupos contíguos (garante N peças não-vazias).
// Cada caco é recentrado no próprio pivô (pra girar/escalar em torno de si).
export function splitChunks(geo: THREE.BufferGeometry, n: number): Chunk[] {
  const g = geo.toNonIndexed();
  const pos = g.attributes.position as THREE.BufferAttribute;
  const nrm = g.attributes.normal as THREE.BufferAttribute | undefined;
  const triN = pos.count / 3;

  const tris = Array.from({ length: triN }, (_, t) => {
    const i = t * 3;
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    return { t, ang: Math.atan2(cy, cx) };
  }).sort((a, b) => a.ang - b.ang);

  const per = Math.ceil(triN / n);
  const chunks: Chunk[] = [];
  for (let b = 0; b < n; b++) {
    const slice = tris.slice(b * per, (b + 1) * per);
    if (!slice.length) continue;
    const vCount = slice.length * 3;
    const raw = new Float32Array(vCount * 3);
    const rawN = nrm ? new Float32Array(vCount * 3) : null;
    const pivot = new THREE.Vector3();
    let k = 0;
    for (const { t } of slice) {
      const i = t * 3;
      for (let v = 0; v < 3; v++) {
        const x = pos.getX(i + v), y = pos.getY(i + v), z = pos.getZ(i + v);
        raw[k * 3] = x; raw[k * 3 + 1] = y; raw[k * 3 + 2] = z;
        if (rawN && nrm) {
          rawN[k * 3] = nrm.getX(i + v); rawN[k * 3 + 1] = nrm.getY(i + v); rawN[k * 3 + 2] = nrm.getZ(i + v);
        }
        pivot.x += x; pivot.y += y; pivot.z += z;
        k++;
      }
    }
    pivot.multiplyScalar(1 / vCount);
    for (let j = 0; j < raw.length; j += 3) {
      raw[j] -= pivot.x; raw[j + 1] -= pivot.y; raw[j + 2] -= pivot.z;
    }
    const cg = new THREE.BufferGeometry();
    cg.setAttribute("position", new THREE.BufferAttribute(raw, 3));
    if (rawN) cg.setAttribute("normal", new THREE.BufferAttribute(rawN, 3));
    else cg.computeVertexNormals();
    const dir = pivot.clone();
    dir.z += 0.4;
    if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
    dir.normalize();
    chunks.push({ geometry: cg, pivot, dir });
  }
  g.dispose();
  return chunks;
}

/** Constrói os cacos brancos e roxos da marca de uma vez. */
export function buildLogoChunks(nWhite: number, nPurple: number) {
  const whiteGeo = buildGeometry(WHITE_POINTS, 0.55);
  const purpleGeo = buildGeometry(PURPLE_POINTS, 0.75);
  const white = splitChunks(whiteGeo, nWhite);
  const purple = splitChunks(purpleGeo, nPurple);
  whiteGeo.dispose();
  purpleGeo.dispose();
  return { white, purple };
}
