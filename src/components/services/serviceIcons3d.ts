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
    // sistema: armário com GAVETAS ABERTAS (painel/gestão). As gavetas saem pra
    // frente e são espelhadas atrás (sempre mostra o lado certo ao girar).
    add(new THREE.BoxGeometry(1.7, 1.9, 0.9), metal); // chassi
    const rows: [number, number][] = [[0.6, 0.34], [0.0, 0.6], [-0.6, 0.22]]; // [y, quanto pra fora]
    rows.forEach(([y, out]) => {
      const z = 0.45 + out;
      addBoth(new THREE.BoxGeometry(1.5, 0.44, 0.52), metal, z, [0, y]); // corpo da gaveta
      addBoth(new THREE.BoxGeometry(0.5, 0.09, 0.12), accent, z + 0.3, [0, y]); // puxador
    });
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
    // saas: FOGUETE (plataforma pronta / "em lançamento") — radialmente simétrico.
    add(new THREE.CylinderGeometry(0.55, 0.55, 1.5, 30), metal, [0, 0.05, 0]); // corpo
    add(new THREE.ConeGeometry(0.55, 0.7, 30), accent, [0, 1.15, 0]); // bico
    // vigia (anel + lente), espelhada frente/trás
    addBoth(new THREE.TorusGeometry(0.2, 0.05, 12, 28), metal, 0.55, [0, 0.35]);
    addBoth(new THREE.CircleGeometry(0.18, 28), accent, 0.55, [0, 0.35]);
    // 4 aletas radiais
    const fin = new THREE.BoxGeometry(0.08, 0.6, 0.5);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      add(fin, metal, [Math.sin(a) * 0.5, -0.72, Math.cos(a) * 0.5], [0, a, 0]);
    }
    // chama
    add(new THREE.ConeGeometry(0.4, 0.7, 22), accent, [0, -1.25, 0], [Math.PI, 0, 0]);
  }

  g.userData.geos = geos;
  return g;
}

export function disposeIcon(g: THREE.Group) {
  (g.userData.geos as THREE.BufferGeometry[] | undefined)?.forEach((geo) => geo.dispose());
}
