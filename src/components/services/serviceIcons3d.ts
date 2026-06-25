import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/** Retângulo arredondado centrado (para extrudar placas/telas). */
function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function extrude(shape: THREE.Shape, depth: number, holes?: THREE.Path[]) {
  if (holes) shape.holes = holes;
  const g = new THREE.ExtrudeGeometry(shape, {
    depth, curveSegments: 12,
    bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.045, bevelSegments: 3,
  });
  g.center();
  return g;
}

export type ServiceKind = "site" | "system" | "seo" | "support" | "saas";

/**
 * Constrói o ÍCONE 3D extrudado de um serviço (metal NVGHUB + acento emissivo).
 *
 * OTIMIZAÇÃO: em vez de uma malha por peça (muitos draw calls), as peças são
 * coletadas por material, têm suas transforms "assadas" na geometria e são
 * MESCLADAS — resultando em só 2 meshes por ícone (metal + acento). Os detalhes
 * "de frente" são espelhados na traseira (scale.z negativo assado) pra que,
 * girando, o ícone sempre mostre o lado certo. Materiais devem ser DoubleSide.
 * Geometrias mescladas ficam em `userData.geos` pra descarte.
 */
export function buildServiceIcon(kind: ServiceKind, metal: THREE.Material, accent: THREE.Material): THREE.Group {
  const metalParts: THREE.BufferGeometry[] = [];
  const accentParts: THREE.BufferGeometry[] = [];

  const _m = new THREE.Matrix4();
  const _q = new THREE.Quaternion();
  const _e = new THREE.Euler();
  const _p = new THREE.Vector3();
  const _s = new THREE.Vector3();

  // clona/desindexada + assa a transform na geometria (pronta pra mesclar)
  const baked = (
    geo: THREE.BufferGeometry,
    pos: [number, number, number],
    rot: [number, number, number],
    scl: [number, number, number]
  ) => {
    const ng = geo.index ? geo.toNonIndexed() : geo.clone();
    _e.set(rot[0], rot[1], rot[2]);
    _q.setFromEuler(_e);
    _m.compose(_p.set(...pos), _q, _s.set(...scl));
    ng.applyMatrix4(_m);
    return ng;
  };

  const add = (
    geo: THREE.BufferGeometry, parts: THREE.BufferGeometry[],
    pos: [number, number, number] = [0, 0, 0], rot: [number, number, number] = [0, 0, 0]
  ) => {
    parts.push(baked(geo, pos, rot, [1, 1, 1]));
    geo.dispose();
  };
  // detalhe plano nas DUAS faces (frente +z e traseira -z, espelhado)
  const addBoth = (
    geo: THREE.BufferGeometry, parts: THREE.BufferGeometry[],
    z: number, xy: [number, number] = [0, 0], rot: [number, number, number] = [0, 0, 0]
  ) => {
    parts.push(baked(geo, [xy[0], xy[1], z], rot, [1, 1, 1]));
    parts.push(baked(geo, [xy[0], xy[1], -z], rot, [1, 1, -1]));
    geo.dispose();
  };

  if (kind === "site") {
    // monitor: moldura + tela (acento, visível pelos dois lados) + base
    const frame = roundedRectShape(2.4, 1.6, 0.16);
    const hole = roundedRectShape(2.0, 1.2, 0.1) as unknown as THREE.Path;
    add(extrude(frame, 0.22, [hole]), metalParts);
    addBoth(new THREE.BoxGeometry(2.0, 1.2, 0.05), accentParts, 0.04);
    add(new THREE.BoxGeometry(0.5, 0.22, 0.3), metalParts, [0, -1.0, 0]);
    add(new THREE.BoxGeometry(1.0, 0.1, 0.3), metalParts, [0, -1.12, 0]);
  } else if (kind === "system") {
    // sistema: armário com GAVETAS ABERTAS (painel/gestão).
    add(new THREE.BoxGeometry(1.7, 1.9, 0.9), metalParts); // chassi
    const rows: [number, number][] = [[0.6, 0.34], [0.0, 0.6], [-0.6, 0.22]]; // [y, quanto pra fora]
    rows.forEach(([y, out]) => {
      const z = 0.45 + out;
      add(new THREE.BoxGeometry(1.5, 0.44, 0.52), metalParts, [0, y, z]); // corpo da gaveta
      add(new THREE.BoxGeometry(0.5, 0.09, 0.12), accentParts, [0, y, z + 0.3]); // puxador
    });
  } else if (kind === "seo") {
    // lupa: anel + cabo (simétricos) + lente (acento espelhado)
    add(new THREE.TorusGeometry(0.85, 0.16, 20, 72), metalParts, [0, 0.2, 0]);
    add(new THREE.CylinderGeometry(0.1, 0.1, 1.0, 20), metalParts, [0.75, -0.65, 0], [0, 0, Math.PI / 4]);
    add(new THREE.SphereGeometry(0.12, 16, 12), metalParts, [1.18, -1.08, 0]); // ponta do cabo
    addBoth(new THREE.CircleGeometry(0.7, 48), accentParts, 0.06, [0, 0.2]);
  } else if (kind === "support") {
    // escudo + check (espelhado)
    const s = new THREE.Shape();
    s.moveTo(0, 1.2);
    s.quadraticCurveTo(1.1, 0.9, 1.1, 0.3);
    s.lineTo(1.1, -0.3);
    s.quadraticCurveTo(1.1, -1.0, 0, -1.3);
    s.quadraticCurveTo(-1.1, -1.0, -1.1, -0.3);
    s.lineTo(-1.1, 0.3);
    s.quadraticCurveTo(-1.1, 0.9, 0, 1.2);
    add(extrude(s, 0.26), metalParts);
    const c = new THREE.Shape();
    c.moveTo(-0.45, 0.05); c.lineTo(-0.1, -0.35); c.lineTo(0.5, 0.4);
    c.lineTo(0.4, 0.55); c.lineTo(-0.1, -0.05); c.lineTo(-0.35, 0.2);
    addBoth(extrude(c, 0.08), accentParts, 0.15);
  } else {
    // saas: FOGUETE (plataforma pronta / "em lançamento") — radialmente simétrico.
    add(new THREE.CylinderGeometry(0.55, 0.55, 1.5, 36), metalParts, [0, 0.05, 0]); // corpo
    add(new THREE.ConeGeometry(0.55, 0.7, 36), accentParts, [0, 1.15, 0]); // bico
    add(new THREE.SphereGeometry(0.07, 14, 10), metalParts, [0, 1.52, 0]); // ponta do bico
    // anéis estruturais do corpo (detalhe)
    add(new THREE.TorusGeometry(0.55, 0.03, 10, 40), metalParts, [0, 0.55, 0], [Math.PI / 2, 0, 0]);
    add(new THREE.TorusGeometry(0.55, 0.03, 10, 40), metalParts, [0, -0.45, 0], [Math.PI / 2, 0, 0]);
    // vigia (anel + lente), espelhada frente/trás
    addBoth(new THREE.TorusGeometry(0.2, 0.05, 16, 48), metalParts, 0.55, [0, 0.35]);
    addBoth(new THREE.CircleGeometry(0.18, 40), accentParts, 0.55, [0, 0.35]);
    // 4 aletas radiais
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      add(new THREE.BoxGeometry(0.08, 0.6, 0.5), metalParts, [Math.sin(a) * 0.5, -0.72, Math.cos(a) * 0.5], [0, a, 0]);
    }
    // chama (dupla camada pra dar volume)
    add(new THREE.ConeGeometry(0.4, 0.7, 28), accentParts, [0, -1.25, 0], [Math.PI, 0, 0]);
    add(new THREE.ConeGeometry(0.2, 0.4, 20), metalParts, [0, -1.05, 0], [Math.PI, 0, 0]);
  }

  // mescla por material → 2 meshes no máximo
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

  // centraliza o ícone na origem (enquadra bem dentro da tela)
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

export function disposeIcon(g: THREE.Group) {
  (g.userData.geos as THREE.BufferGeometry[] | undefined)?.forEach((geo) => geo.dispose());
}
