import * as THREE from "three";

/** Retângulo arredondado centrado (para extrudar placas/telas). */
export function roundedRectShape(w: number, h: number, r: number) {
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
    depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2,
  });
  g.center();
  return g;
}

export type ServiceKind = "site" | "system" | "seo" | "support" | "saas";

/**
 * Constrói o ÍCONE 3D extrudado de um serviço (metal NVGHUB + acento emissivo).
 * Os detalhes "de frente" (telas/checks/acentos) são ESPELHADOS na traseira pra
 * que, girando, o ícone sempre mostre o lado certo. Geometrias em
 * `userData.geos` para descarte; materiais devem ser DoubleSide.
 */
export function buildServiceIcon(kind: ServiceKind, metal: THREE.Material, accent: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const geos: THREE.BufferGeometry[] = [];
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, pos?: [number, number, number], rot?: [number, number, number]) => {
    const m = new THREE.Mesh(geo, mat);
    if (pos) m.position.set(...pos);
    if (rot) m.rotation.set(...rot);
    g.add(m);
    geos.push(geo);
  };
  // detalhe plano nas DUAS faces (frente +z e traseira -z, espelhado)
  const addBoth = (geo: THREE.BufferGeometry, mat: THREE.Material, z: number, xy: [number, number] = [0, 0], rot: [number, number, number] = [0, 0, 0]) => {
    add(geo, mat, [xy[0], xy[1], z], rot);
    const back = new THREE.Mesh(geo, mat);
    back.position.set(xy[0], xy[1], -z);
    back.rotation.set(rot[0], rot[1], rot[2]);
    back.scale.z = -1; // espelha o detalhe pra face traseira
    g.add(back);
  };

  if (kind === "site") {
    // monitor: moldura + tela (acento, visível pelos dois lados) + base
    const frame = roundedRectShape(2.4, 1.6, 0.16);
    const hole = roundedRectShape(2.0, 1.2, 0.1) as unknown as THREE.Path;
    add(extrude(frame, 0.22, [hole]), metal);
    addBoth(new THREE.BoxGeometry(2.0, 1.2, 0.05), accent, 0.04);
    add(new THREE.BoxGeometry(0.5, 0.22, 0.3), metal, [0, -1.0, 0]);
    add(new THREE.BoxGeometry(1.0, 0.1, 0.3), metal, [0, -1.12, 0]);
  } else if (kind === "system") {
    // sistema: pilha de discos (banco de dados/painel) — radialmente simétrico,
    // gira bem de qualquer lado, sem face "errada".
    const disc = (h: number) => new THREE.CylinderGeometry(1.0, 1.0, h, 48);
    add(disc(0.34), accent, [0, 0.66, 0]);
    add(disc(0.34), metal, [0, 0, 0]);
    add(disc(0.34), metal, [0, -0.66, 0]);
    // anéis finos entre os discos (acento)
    add(new THREE.TorusGeometry(1.0, 0.03, 10, 48), accent, [0, 0.33, 0], [Math.PI / 2, 0, 0]);
    add(new THREE.TorusGeometry(1.0, 0.03, 10, 48), accent, [0, -0.33, 0], [Math.PI / 2, 0, 0]);
  } else if (kind === "seo") {
    // lupa: anel + cabo (simétricos) + lente (acento espelhado)
    add(new THREE.TorusGeometry(0.85, 0.16, 20, 48), metal, [0, 0.2, 0]);
    add(new THREE.CylinderGeometry(0.1, 0.1, 1.0, 16), metal, [0.75, -0.65, 0], [0, 0, Math.PI / 4]);
    addBoth(new THREE.CircleGeometry(0.7, 32), accent, 0.06, [0, 0.2]);
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
    add(extrude(s, 0.26), metal);
    const c = new THREE.Shape();
    c.moveTo(-0.45, 0.05); c.lineTo(-0.1, -0.35); c.lineTo(0.5, 0.4);
    c.lineTo(0.4, 0.55); c.lineTo(-0.1, -0.05); c.lineTo(-0.35, 0.2);
    addBoth(extrude(c, 0.08), accent, 0.15);
  } else {
    // saas: tela + cubos 3D (já corretos de qualquer ângulo)
    add(extrude(roundedRectShape(2.4, 1.5, 0.16), 0.18), metal);
    add(new THREE.BoxGeometry(0.6, 0.6, 0.6), accent, [0.55, 0.45, 0], [0.4, 0.6, 0]);
    add(new THREE.BoxGeometry(0.34, 0.34, 0.34), metal, [-0.6, -0.35, 0], [0.5, 0.3, 0.2]);
  }

  g.userData.geos = geos;
  return g;
}

export function disposeIcon(g: THREE.Group) {
  (g.userData.geos as THREE.BufferGeometry[] | undefined)?.forEach((geo) => geo.dispose());
}
