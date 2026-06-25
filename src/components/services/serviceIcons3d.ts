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
 * Retorna um THREE.Group; o chamador controla visibilidade/rotação. As geometrias
 * ficam em `userData.geos` para descarte.
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

  if (kind === "site") {
    // monitor: moldura + tela (acento) + base
    const frame = roundedRectShape(2.4, 1.6, 0.16);
    const hole = roundedRectShape(2.0, 1.2, 0.1) as unknown as THREE.Path;
    add(extrude(frame, 0.22, [hole]), metal);
    add(new THREE.BoxGeometry(2.0, 1.2, 0.06), accent, [0, 0, 0.02]);
    add(new THREE.BoxGeometry(0.5, 0.22, 0.3), metal, [0, -1.0, 0]);
    add(new THREE.BoxGeometry(1.0, 0.1, 0.3), metal, [0, -1.12, 0]);
  } else if (kind === "system") {
    // camadas: 3 placas empilhadas com leve giro
    for (let i = 0; i < 3; i++) {
      add(extrude(roundedRectShape(2.0, 2.0, 0.3), 0.12), i === 1 ? accent : metal,
        [0, (i - 1) * 0.42, 0], [0, 0, (i - 1) * 0.14]);
    }
  } else if (kind === "seo") {
    // lupa: anel + cabo
    add(new THREE.TorusGeometry(0.85, 0.16, 20, 48), metal, [0, 0.2, 0]);
    add(new THREE.CylinderGeometry(0.1, 0.1, 1.0, 16), metal, [0.75, -0.65, 0], [0, 0, Math.PI / 4]);
    add(new THREE.CircleGeometry(0.7, 32), accent, [0, 0.2, -0.02]);
  } else if (kind === "support") {
    // escudo
    const s = new THREE.Shape();
    s.moveTo(0, 1.2);
    s.quadraticCurveTo(1.1, 0.9, 1.1, 0.3);
    s.lineTo(1.1, -0.3);
    s.quadraticCurveTo(1.1, -1.0, 0, -1.3);
    s.quadraticCurveTo(-1.1, -1.0, -1.1, -0.3);
    s.lineTo(-1.1, 0.3);
    s.quadraticCurveTo(-1.1, 0.9, 0, 1.2);
    add(extrude(s, 0.26), metal);
    // "check" interno
    const c = new THREE.Shape();
    c.moveTo(-0.45, 0.05); c.lineTo(-0.1, -0.35); c.lineTo(0.5, 0.4);
    c.lineTo(0.4, 0.55); c.lineTo(-0.1, -0.05); c.lineTo(-0.35, 0.2);
    add(extrude(c, 0.18), accent, [0, 0, 0.16]);
  } else {
    // saas: tela + cubo flutuante (acento)
    add(extrude(roundedRectShape(2.4, 1.5, 0.16), 0.18), metal);
    add(new THREE.BoxGeometry(0.6, 0.6, 0.6), accent, [0.55, 0.45, 0.5], [0.4, 0.6, 0]);
    add(new THREE.BoxGeometry(0.32, 0.32, 0.32), metal, [-0.6, -0.35, 0.5], [0.5, 0.3, 0.2]);
  }

  g.userData.geos = geos;
  return g;
}

export function disposeIcon(g: THREE.Group) {
  (g.userData.geos as THREE.BufferGeometry[] | undefined)?.forEach((geo) => geo.dispose());
}
