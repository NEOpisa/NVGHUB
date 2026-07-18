import * as THREE from "three";

// Pontos do BRASÃO da Neovanguard (escudo + lâmina-lança, vista frontal —
// mesma geometria do vetor oficial logo-2d.svg):
//   · peça "branca"  = o metal (placa do escudo + ARO em relevo);
//   · peça "roxa"    = o violeta (campo de esmalte rebaixado + LÂMINA
//     de duas águas, com cume — salta do campo como num badge de carro).
export const WHITE_POINTS: [number, number][] = [
  [233.6, 42.4], [86.4, 42.4],   // topo
  [70.4, 84], [102.4, 197.6],    // ombro e flanco esquerdo
  [160, 234.4],                  // ponta inferior
  [217.6, 197.6], [249.6, 84],   // flanco e ombro direito
];
export const PURPLE_POINTS: [number, number][] = [
  [160, 66.4],   // ponta superior da lâmina
  [184, 132],    // gume direito
  [160, 207.2],  // ponta inferior
  [136, 132],    // gume esquerdo
];

const CX = 160;
const CY = 124;
const SCALE = 42;

export type Chunk = {
  geometry: THREE.BufferGeometry;
  pivot: THREE.Vector3;
  dir: THREE.Vector3;
};

/* px (y pra baixo) → mundo (y pra cima) */
const toWorld = ([x, y]: [number, number]) =>
  new THREE.Vector2((x - CX) / SCALE, -(y - CY) / SCALE);

function centroid2(pts: THREE.Vector2[]) {
  const c = new THREE.Vector2();
  for (const p of pts) c.add(p);
  return c.multiplyScalar(1 / pts.length);
}
function insetPoly(pts: THREE.Vector2[], k: number) {
  const c = centroid2(pts);
  return pts.map((p) => p.clone().sub(c).multiplyScalar(k).add(c));
}

/* recentra a geometria no próprio pivô; dir = eixo da MONTAGEM (a peça
   voa dessa direção na intro e estilhaça por ela no hover) */
function toChunk(geo: THREE.BufferGeometry, dir: [number, number, number]): Chunk {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const pivot = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++)
    pivot.add(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
  pivot.multiplyScalar(1 / pos.count);
  geo.translate(-pivot.x, -pivot.y, -pivot.z);
  return { geometry: geo, pivot, dir: new THREE.Vector3(...dir).normalize() };
}

/* garante winding CCW no contorno e CW no furo — senão a ExtrudeGeometry
   sai de dentro pra fora (normais invertidas = metal preto na cena) */
function ccw(pts: THREE.Vector2[]) {
  return THREE.ShapeUtils.area(pts) < 0 ? pts.slice().reverse() : pts;
}
function extrude(
  outer: THREE.Vector2[],
  hole: THREE.Vector2[] | null,
  depth: number,
  bevel: number,
  zShift: number,
) {
  const shape = new THREE.Shape(ccw(outer));
  if (hole) shape.holes.push(new THREE.Path(ccw(hole).slice().reverse()));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel * 0.9,
    bevelSegments: 3,
  });
  geo.translate(0, 0, zShift);
  return geo;
}

/* a LÂMINA de duas águas: cume central alto, gumes baixos, paredes e costas */
function buildBlade(): THREE.BufferGeometry {
  const [T, R, B, L] = PURPLE_POINTS.map((p) => {
    const w = toWorld(p);
    return [w.x, w.y] as [number, number];
  });
  const Z_BASE = 0.055, Z_EDGE = 0.28, Z_RIDGE = 0.44;
  type V3 = [number, number, number];
  const v = (p: [number, number], z: number): V3 => [p[0], p[1], z];
  const out: number[] = [];
  const tri = (a: V3, b: V3, c: V3, want: V3) => {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * want[0] + ny * want[1] + nz * want[2] < 0) { const t = b; b = c; c = t; }
    out.push(...a, ...b, ...c);
  };
  const Tt = v(T, Z_RIDGE), Bt = v(B, Z_RIDGE);
  const Rt = v(R, Z_EDGE), Lt = v(L, Z_EDGE);
  const Tb = v(T, Z_BASE), Bb = v(B, Z_BASE);
  const Rb = v(R, Z_BASE), Lb = v(L, Z_BASE);
  // águas frontais (o cume pega a key light de um lado só — vida no metal)
  tri(Tt, Lt, Bt, [-1, 0, 1]);
  tri(Tt, Bt, Rt, [1, 0, 1]);
  // paredes
  const wall = (pb1: V3, pb2: V3, pt2: V3, pt1: V3) => {
    const want: V3 = [(pb1[0] + pb2[0]) / 2, (pb1[1] + pb2[1]) / 2 + 0.3, 0.1];
    tri(pb1, pb2, pt2, want);
    tri(pb1, pt2, pt1, want);
  };
  wall(Tb, Rb, Rt, Tt);
  wall(Rb, Bb, Bt, Rt);
  wall(Bb, Lb, Lt, Bt);
  wall(Lb, Tb, Tt, Lt);
  // costas (fecha o sólido pro estilhaço)
  tri(Tb, Bb, Lb, [0, 0, -1]);
  tri(Tb, Rb, Bb, [0, 0, -1]);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(out, 3));
  g.computeVertexNormals();
  return g;
}

/**
 * Constrói o brasão em 4 peças (mesma anatomia do emblema HTML):
 *   white  → [placa do escudo, aro em relevo]  (metal bismuto claro)
 *   purple → [lâmina de duas águas]            (violeta vivo, emissivo)
 *   dark   → [campo de esmalte rebaixado]      (violeta-negro profundo)
 * Consumidores que ignorarem `dark` ainda funcionam: a frente da placa
 * fica visível no vão do aro (escudo todo em metal).
 * Os parâmetros de contagem são legados (a partição agora é anatômica).
 */
export function buildLogoChunks(_nWhite = 1, _nPurple = 1) {
  const shield = WHITE_POINTS.map(toWorld);
  const inner = insetPoly(shield, 0.84);  // borda interna do aro
  // o esmalte é MAIOR que o furo do aro (0.86 > 0.84): a borda dele se
  // esconde POR BAIXO do aro — zero fresta, zero z-fight, uma peça só
  const field = insetPoly(shield, 0.86);

  // placa: corpo do escudo com bisel — frente sela em z=0
  const plate = extrude(shield, null, 0.3, 0.04, -0.34);
  // esmalte: assenta na placa (0.005 de folga anti-coplanar)
  const enamel = extrude(field, null, 0.05, 0, 0.005);
  // aro: anel em RELEVO por cima do esmalte
  const rim = extrude(shield, inner, 0.16, 0.025, 0.03);
  // lâmina: crava por último, acima de tudo
  const blade = buildBlade();

  // eixos de montagem (a coreografia da intro do emblema HTML):
  // placa chega por TRÁS · aro e esmalte cravam pela FRENTE · lâmina desce
  // por último, de mais longe (multiplicador de spread por índice no Hero)
  return {
    white: [toChunk(plate, [0, 0, -1]), toChunk(rim, [0, 0.15, 1])],
    purple: [toChunk(blade, [0, -0.2, 1])],
    dark: [toChunk(enamel, [0, 0, 1])],
  };
}
