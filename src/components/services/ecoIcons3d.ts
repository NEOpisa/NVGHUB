import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type EcoKind = "base" | "conexao" | "inteligencia";

/**
 * Ícone 3D de uma camada do ecossistema. Mesma estratégia dos ícones de serviço
 * (`serviceIcons3d.ts`): peças coletadas por material e MESCLADAS em 2 meshes
 * (metal + acento) pra reduzir draw calls. Geometrias mescladas ficam em
 * `userData.geos` pra descarte.
 */
export function buildEcoIcon(kind: EcoKind, metal: THREE.Material, accent: THREE.Material): THREE.Group {
  const metalParts: THREE.BufferGeometry[] = [];
  const accentParts: THREE.BufferGeometry[] = [];

  const _m = new THREE.Matrix4();
  const _q = new THREE.Quaternion();
  const _e = new THREE.Euler();
  const _p = new THREE.Vector3();
  const _s = new THREE.Vector3();

  const add = (
    geo: THREE.BufferGeometry, parts: THREE.BufferGeometry[],
    pos: [number, number, number] = [0, 0, 0], rot: [number, number, number] = [0, 0, 0]
  ) => {
    const ng = geo.index ? geo.toNonIndexed() : geo.clone();
    _e.set(rot[0], rot[1], rot[2]);
    _q.setFromEuler(_e);
    _m.compose(_p.set(...pos), _q, _s.set(1, 1, 1));
    ng.applyMatrix4(_m);
    parts.push(ng);
    geo.dispose();
  };

  if (kind === "base") {
    // ALICERCE: plinto de lajes empilhadas (arquitetura/fundação).
    add(new THREE.BoxGeometry(1.7, 0.42, 1.7), metalParts, [0, -0.42, 0]);
    add(new THREE.BoxGeometry(1.28, 0.4, 1.28), metalParts, [0, 0.0, 0]);
    add(new THREE.BoxGeometry(0.82, 0.4, 0.82), accentParts, [0, 0.42, 0]); // topo emissivo
  } else if (kind === "conexao") {
    // REDE: nó central emissivo ligado a 3 nós metálicos por hastes finas.
    const outer: [number, number, number][] = [
      [0, 0.92, 0], [-0.82, -0.5, 0.1], [0.82, -0.5, -0.1],
    ];
    add(new THREE.IcosahedronGeometry(0.34, 1), accentParts); // núcleo
    outer.forEach((o) => {
      add(new THREE.IcosahedronGeometry(0.22, 1), metalParts, o);
      // haste: cilindro do centro até o nó
      const v = new THREE.Vector3(...o);
      const len = v.length();
      const mid = v.clone().multiplyScalar(0.5);
      // rotação que alinha o eixo Y do cilindro com a direção do nó
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), v.clone().normalize()
      );
      const e = new THREE.Euler().setFromQuaternion(q);
      add(new THREE.CylinderGeometry(0.045, 0.045, len, 10), metalParts,
        [mid.x, mid.y, mid.z], [e.x, e.y, e.z]);
    });
  } else {
    // CHIP: placa metálica + miolo emissivo + pinos nas 4 bordas.
    add(new THREE.BoxGeometry(1.35, 0.26, 1.35), metalParts);
    add(new THREE.BoxGeometry(0.66, 0.16, 0.66), accentParts, [0, 0.2, 0]); // core
    const pins = 4;
    for (let s = 0; s < 4; s++) {
      const along = s % 2 === 0; // pares: pinos no eixo X; ímpares: no eixo Z
      for (let i = 0; i < pins; i++) {
        const off = (i - (pins - 1) / 2) * 0.3;
        const out = s < 2 ? 0.82 : -0.82;
        const pos: [number, number, number] = along ? [off, -0.02, out] : [out, -0.02, off];
        add(new THREE.BoxGeometry(0.12, 0.1, 0.26), metalParts, pos,
          along ? [0, 0, 0] : [0, Math.PI / 2, 0]);
      }
    }
  }

  const g = new THREE.Group();
  const geos: THREE.BufferGeometry[] = [];
  const finalize = (parts: THREE.BufferGeometry[], mat: THREE.Material) => {
    if (!parts.length) return;
    const merged = mergeGeometries(parts, false);
    parts.forEach((p) => p.dispose());
    if (!merged) return;
    g.add(new THREE.Mesh(merged, mat));
    geos.push(merged);
  };
  finalize(metalParts, metal);
  finalize(accentParts, accent);

  // centraliza na origem
  if (geos.length) {
    const box = new THREE.Box3();
    geos.forEach((geo) => {
      geo.computeBoundingBox();
      if (geo.boundingBox) box.union(geo.boundingBox);
    });
    if (!box.isEmpty()) {
      const ctr = box.getCenter(new THREE.Vector3());
      geos.forEach((geo) => geo.translate(-ctr.x, -ctr.y, -ctr.z));
    }
  }

  g.userData.geos = geos;
  return g;
}

export function disposeEcoIcon(g: THREE.Group) {
  (g.userData.geos as THREE.BufferGeometry[] | undefined)?.forEach((geo) => geo.dispose());
}
