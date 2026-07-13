import * as THREE from "three";

/**
 * O MUNDO da jornada: um corredor ao longo do eixo -Z. Cada estação tem
 * posição fixa; é a CÂMERA que viaja (invertendo o modelo antigo de
 * "objetos que seguem a tela").
 */
export const WORLD = {
  logo: new THREE.Vector3(0, 0, 0),
  eco: new THREE.Vector3(0, 0.3, -16),
  /* corredor do WARP: portões entre o carrossel e o portal final */
  warpStart: -20,
  warpEnd: -54,
  warpCount: 12,
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
  /* ECOSSISTEMA: aproximação quase frontal — as duas rodas verticais
     flanqueiam a tela de forma simétrica, com o painel no vão central */
  { t: 0.2, pos: [1.8, 0.9, -3.5], look: [0, 0.25, -16], fov: 58 },
  { t: 0.32, pos: [0.7, 0.5, -10.6], look: [0, 0.2, -16], fov: 57 },
  { t: 0.44, pos: [-0.7, 0.35, -11.8], look: [0, 0.2, -16], fov: 56 },
  /* O WARP: a câmera volta pela frente do carrossel, alinha com o vão entre
     as duas bandas e MERGULHA pelo centro — depois acelera pelo corredor de
     portões (fov abre = sensação de velocidade) até frear no portal final */
  { t: 0.52, pos: [-1.3, 0.6, -12.4], look: [0, 0.3, -16], fov: 57 },
  { t: 0.58, pos: [0, 0.32, -14.2], look: [0, 0.25, -24], fov: 62 },
  { t: 0.66, pos: [0.4, 0.15, -30], look: [-0.5, 0.05, -44], fov: 70 },
  { t: 0.74, pos: [-0.4, 0.05, -44], look: [0.8, 0.1, -58], fov: 74 },
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
