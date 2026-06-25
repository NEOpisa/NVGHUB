import * as THREE from "three";

/* ───────────────────────── Shader da tela CRT ─────────────────────────
   Plano de "vidro" ligeiramente abaulado por cima do conteúdo 3D real (que
   vive DENTRO da tela). Desenha scanlines + glow + banda de varredura e, na
   troca de canal, ESTÁTICA (ruído) que cobre a tela. Blending normal: com
   uStatic≈1 fica opaco (esconde o conteúdo durante a troca); com uStatic≈0
   fica quase transparente (deixa o 3D aparecer, só com leve scanline). */
export const crtScreenVert = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    vec3 p = position;
    vec2 c = uv * 2.0 - 1.0;
    p.z += (1.0 - dot(c, c)) * 0.16;   // leve curvatura (bojo) do vidro
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const crtScreenFrag = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOn;
  uniform float uStatic;
  uniform float uFlick;
  uniform vec3  uGlow;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main(){
    vec2 uv = vUv;
    vec2 c = uv * 2.0 - 1.0;
    float r2 = dot(c, c);
    float vig = smoothstep(1.9, 0.15, r2);
    float lines = 0.5 + 0.5 * sin(uv.y * 560.0);
    float scan = mix(0.02, 0.14, lines) * vig;                         // brilho fino das scanlines
    float band = smoothstep(0.05, 0.0, abs(fract(uv.y - uTime * 0.09) - 0.5) - 0.012) * 0.12 * vig;
    float tq = floor(uTime * 24.0);
    float ns = hash(floor(uv * vec2(180.0, 135.0)) + tq);
    ns *= 0.55 + 0.45 * hash(uv + tq);
    vec3 col = mix(uGlow * 1.25, vec3(ns), uStatic);                   // glow das linhas → estática
    float alpha = max(scan + band, uStatic) * uOn * (0.85 + 0.15 * uFlick);
    gl_FragColor = vec4(col, alpha);
  }
`;

export type Crt = {
  group: THREE.Group;
  /** Onde colocar o conteúdo 3D que aparece DENTRO da tela. */
  content: THREE.Group;
  uniforms: {
    uTime: { value: number };
    uOn: { value: number };
    uStatic: { value: number };
    uFlick: { value: number };
    uGlow: { value: THREE.Color };
  };
  /** Materiais do gabinete (transparentes) p/ fade. */
  cabinetMats: THREE.Material[];
  dispose: () => void;
};

/** Retângulo arredondado centrado. */
function roundedRect(w: number, h: number, r: number) {
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

/**
 * Constrói uma TV CRT totalmente 3D (gabinete industrial sóbrio com profundidade,
 * tubo traseiro, base, knobs e vents). A tela tem um plano de vidro com o shader
 * CRT por cima de um grupo `content` onde entra o conteúdo 3D real.
 * Tela: ~3.0 x 2.3 (mundo). `accent` = cor do glow/scanlines.
 */
export function buildCrt(accent = "#6e54b0", simple = false): Crt {
  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];
  const track = <T extends THREE.BufferGeometry>(g: T) => { geos.push(g); return g; };

  const cabinet = new THREE.MeshPhysicalMaterial({
    color: "#2a2a30", metalness: 0.25, roughness: 0.74, clearcoat: 0.3, clearcoatRoughness: 0.55, transparent: true,
  });
  const bezel = new THREE.MeshPhysicalMaterial({
    color: "#141418", metalness: 0.2, roughness: 0.55, clearcoat: 0.5, clearcoatRoughness: 0.3, transparent: true,
  });
  const trim = new THREE.MeshStandardMaterial({ color: "#c6c4cd", metalness: 0.45, roughness: 0.5, transparent: true });
  mats.push(cabinet, bezel, trim);

  const uniforms = {
    uTime: { value: 0 },
    uOn: { value: 1 },
    uStatic: { value: 0 },
    uFlick: { value: 1 },
    uGlow: { value: new THREE.Color(accent) },
  };
  const screenMat = new THREE.ShaderMaterial({
    vertexShader: crtScreenVert, fragmentShader: crtScreenFrag, uniforms,
    transparent: true, depthWrite: false, blending: THREE.NormalBlending,
  });
  mats.push(screenMat);

  const group = new THREE.Group();
  const add = (g: THREE.BufferGeometry, m: THREE.Material, pos?: [number, number, number], rot?: [number, number, number]) => {
    const o = new THREE.Mesh(track(g), m);
    if (pos) o.position.set(...pos);
    if (rot) o.rotation.set(...rot);
    group.add(o);
    return o;
  };

  // gabinete (frente com furo) + corpo + tubo traseiro
  const faceShape = roundedRect(3.7, 3.0, 0.26);
  faceShape.holes = [roundedRect(3.0, 2.3, 0.18) as unknown as THREE.Path];
  const faceGeo = new THREE.ExtrudeGeometry(faceShape, {
    depth: 0.45, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3, curveSegments: 16,
  });
  faceGeo.center();
  add(faceGeo, bezel, [0, 0, 0.35]);
  add(new THREE.BoxGeometry(3.6, 2.9, 2.2), cabinet, [0, 0, -0.85]);
  const ledMat = new THREE.MeshStandardMaterial({
    color: "#241f3a", metalness: 0.3, roughness: 0.4,
    emissive: new THREE.Color("#b14bff"), emissiveIntensity: 1.6,
  });
  mats.push(ledMat);

  if (!simple) {
    // tubo traseiro afunilado (corpo + neck)
    add(new THREE.BoxGeometry(2.0, 1.7, 0.7), cabinet, [0, 0, -1.95]);
    add(new THREE.BoxGeometry(1.4, 1.15, 0.7), cabinet, [0, 0, -2.45]);
    // base
    add(new THREE.BoxGeometry(2.6, 0.24, 1.5), cabinet, [0, -1.72, -0.5]);
    add(new THREE.BoxGeometry(2.9, 0.12, 1.7), trim, [0, -1.84, -0.5]);
    // knobs com tampa de acento (canto inferior direito da frente)
    const knob = track(new THREE.CylinderGeometry(0.135, 0.16, 0.16, 32));
    const cap = track(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 24));
    for (let i = 0; i < 3; i++) {
      const k = new THREE.Mesh(knob, trim);
      k.position.set(1.62, -0.92 + i * 0.42, 0.5);
      k.rotation.x = Math.PI / 2;
      group.add(k);
      const c = new THREE.Mesh(cap, ledMat);
      c.position.set(1.62, -0.92 + i * 0.42, 0.62);
      c.rotation.x = Math.PI / 2;
      group.add(c);
    }
    // LED de power (emissivo)
    add(track(new THREE.SphereGeometry(0.05, 20, 16)), ledMat, [1.62, 0.62, 0.56]);
    // placa da marca + grade do alto-falante na faixa inferior
    add(new THREE.BoxGeometry(0.7, 0.12, 0.04), trim, [-1.05, -1.32, 0.55]);
    for (let i = 0; i < 6; i++) {
      add(new THREE.BoxGeometry(0.045, 0.26, 0.04), trim, [-0.2 + i * 0.13, -1.32, 0.55]);
    }
    // vents laterais (mais finos e numerosos)
    for (let i = 0; i < 8; i++) {
      add(new THREE.BoxGeometry(0.05, 0.045, 1.4), trim, [1.86, 0.85 - i * 0.16, -0.85]);
    }
    // antena em V no topo
    const rod = track(new THREE.CylinderGeometry(0.018, 0.012, 1.6, 12));
    const tip = track(new THREE.SphereGeometry(0.04, 16, 12));
    [-1, 1].forEach((s) => {
      const r = new THREE.Mesh(rod, trim);
      r.position.set(s * 0.45, 1.95, -1.7);
      r.rotation.z = s * 0.5;
      group.add(r);
      const t = new THREE.Mesh(tip, trim);
      t.position.set(s * 1.05, 2.65, -1.7);
      group.add(t);
    });
    add(new THREE.SphereGeometry(0.12, 20, 16), cabinet, [0, 1.45, -1.7]); // base da antena
  }

  // vidro/tela (shader) por cima do conteúdo
  const screen = add(track(new THREE.PlaneGeometry(3.0, 2.3, 28, 22)), screenMat, [0, 0, 0.34]);
  screen.renderOrder = 2;

  // conteúdo 3D dentro da tela (levemente recuado)
  const content = new THREE.Group();
  content.position.set(0, 0, 0.02);
  group.add(content);

  const dispose = () => {
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  };

  return { group, content, uniforms, cabinetMats: [cabinet, bezel, trim], dispose };
}
