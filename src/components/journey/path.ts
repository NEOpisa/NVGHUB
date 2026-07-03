import * as THREE from "three";

/**
 * O MUNDO da jornada: um corredor ao longo do eixo -Z. Cada estação tem
 * posição fixa; é a CÂMERA que viaja (invertendo o modelo antigo de
 * "objetos que seguem a tela").
 */
export const WORLD = {
  logo: new THREE.Vector3(0, 0, 0),
  eco: new THREE.Vector3(0, 0.3, -16),
  serviceZ: [-27, -32, -37, -42, -47],
  serviceX: [2.1, -2.1, 2.1, -2.1, 2.1],
  serviceY: [0.15, -0.1, 0.2, -0.15, 0.05],
  /* retrato: fator que puxa as estações (e a mira da câmera) pro centro,
     e elevação que sobe os ícones — o card de texto vive embaixo */
  svcMobileX: 0.3,
  svcMobileLift: 0.8,
  tunnelStart: -51.5,
  tunnelEnd: -64,
  tunnelCount: 14,
  gate: new THREE.Vector3(1.7, 0.1, -67.5),
} as const;

type WP = {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
};

/**
 * Waypoints da câmera: t = progresso do scroll (0..1). A curva passa por eles
 * via Catmull-Rom (centripetal — sem laços/overshoot), com o parâmetro
 * remapeado por segmento para casar exatamente com as faixas de cada capítulo.
 */
const WAYPOINTS: WP[] = [
  { t: 0.0, pos: [0, 0.25, 8.6], look: [0, 0.1, 0], fov: 55 },
  { t: 0.09, pos: [0.5, 0.15, 5.8], look: [0, 0.05, 0], fov: 52 },
  { t: 0.2, pos: [2.6, 1.1, -2.0], look: [0, 0.3, -16], fov: 58 },
  { t: 0.32, pos: [3.0, 1.7, -11], look: [0, 0.3, -16], fov: 57 },
  { t: 0.44, pos: [-2.6, 1.3, -14], look: [0, 0.3, -16.5], fov: 56 },
  /* SOLUÇÕES: um waypoint por estação, no meio da janela em que ela está
     ativa (troca a cada Δt=0.044 a partir de 0.5) — a câmera serpenteia
     PERTO (~4.6 un.) e olha direto pro ícone ativo, nunca pro lado oposto */
  { t: 0.522, pos: [-0.5, 0.35, -23.2], look: [2.1, 0.15, -27], fov: 56 },
  { t: 0.566, pos: [0.5, 0.1, -28.2], look: [-2.1, -0.1, -32], fov: 56 },
  { t: 0.61, pos: [-0.5, 0.35, -33.2], look: [2.1, 0.2, -37], fov: 56 },
  { t: 0.654, pos: [0.5, 0.1, -38.2], look: [-2.1, -0.15, -42], fov: 56 },
  { t: 0.698, pos: [-0.5, 0.3, -43.2], look: [2.1, 0.05, -47], fov: 56 },
  { t: 0.74, pos: [0, 0.1, -49.5], look: [0, 0, -58], fov: 63 },
  { t: 0.84, pos: [0, 0, -58.5], look: [1.2, 0.1, -67.5], fov: 60 },
  { t: 0.93, pos: [-0.5, 0.25, -62.5], look: [1.7, 0.1, -67.5], fov: 55 },
  { t: 1.0, pos: [-0.2, 0.35, -64.8], look: [1.7, 0.1, -67.5], fov: 52 },
];

const N = WAYPOINTS.length;
const posCurve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => new THREE.Vector3(...w.pos)),
  false,
  "centripetal",
  0.5,
);
const lookCurve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => new THREE.Vector3(...w.look)),
  false,
  "centripetal",
  0.5,
);

/**
 * Amostra posição/alvo/fov da câmera para um progresso t (0..1).
 * O t é remapeado por segmento (waypoints têm espaçamento não uniforme).
 */
export function sampleCamera(
  t: number,
  outPos: THREE.Vector3,
  outLook: THREE.Vector3,
): number {
  const c = THREE.MathUtils.clamp(t, 0, 1);
  let i = 0;
  while (i < N - 2 && WAYPOINTS[i + 1].t <= c) i++;
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  const l = THREE.MathUtils.clamp((c - a.t) / Math.max(b.t - a.t, 1e-5), 0, 1);
  const u = (i + l) / (N - 1);
  posCurve.getPoint(u, outPos);
  lookCurve.getPoint(u, outLook);
  const s = l * l * (3 - 2 * l);
  return a.fov + (b.fov - a.fov) * s;
}
