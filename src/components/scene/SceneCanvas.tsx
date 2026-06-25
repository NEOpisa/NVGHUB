"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import AmbientField from "@/components/AmbientField";
import { scene } from "@/components/scene/tunnel";

// Quad em clip-space (cobre a tela inteira, independente da câmera).
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ambiente: base escura + nebulosa (fbm) + 2 glows roxos que driftam e reagem
// ao scroll/mouse + grade faux-3D + vinheta + grão. Tudo num passe de fragment.
const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uVariant; // 0 = padrão, 1 = variante (rota /menu)

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
               mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2((uv.x - 0.5) * aspect + 0.5, uv.y);
    float t = uTime * 0.04;
    float scr = uScroll;

    // base escurece um tom na variante (/menu)
    vec3 col = mix(vec3(0.034, 0.034, 0.043), vec3(0.046, 0.028, 0.066), uVariant);

    // variante: nebulosa mais densa e mais próxima (zoom), mais "presença"
    vec2 np = p * mix(1.5, 1.85, uVariant) + vec2(t, t * 0.4 + scr * 0.25);
    float n  = fbm(np);
    float n2 = fbm(np * 1.9 - vec2(t * 0.6, scr * 0.18));
    float neb = smoothstep(mix(0.42, 0.34, uVariant), 1.0, n * 0.6 + n2 * 0.5);
    vec3 purple = vec3(0.34, 0.27, 0.50);
    vec3 violet = vec3(0.46, 0.40, 0.62);
    vec3 magenta = vec3(0.40, 0.28, 0.52);
    col += neb * mix(0.075, 0.12, uVariant) * mix(mix(purple, magenta, uVariant), violet, n2);

    vec2 m = uMouse - 0.5;
    for (int i = 0; i < 2; i++){
      float fi = float(i);
      vec2 gc = vec2(0.5 + 0.28 * sin(t * 1.2 + fi * 2.1),
                     0.46 + 0.20 * cos(t * 0.9 + fi * 3.0) - scr * 0.12);
      gc += m * (0.06 + fi * 0.04);
      float d = distance(uv, gc);
      float g = smoothstep(0.60, 0.0, d);
      col += g * g * 0.13 * mix(purple, violet, fi);
    }

    float horizon = 0.56;
    float below = horizon - uv.y;
    if (below > 0.0){
      float dz = 0.10 / below;
      float gx = (uv.x - 0.5) * dz * 3.2;
      float gy = dz + t * 0.20 + scr * 1.2;
      vec2 gg = abs(fract(vec2(gx, gy)) - 0.5);
      float ln = smoothstep(0.06, 0.0, min(gg.x, gg.y));
      float fade = smoothstep(0.0, 0.10, below) * smoothstep(3.2, 0.3, dz);
      col += ln * fade * mix(0.16, 0.28, uVariant) * mix(violet, magenta, uVariant);
    }

    float edge = distance(uv, vec2(0.5));
    col *= 0.5 + 0.5 * smoothstep(1.25, 0.35, edge);
    col += (hash(uv * uRes + fract(t)) - 0.5) * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Ambient({ variant }: { variant: number }) {
  const { size } = useThree();
  const scroll = useRef(0);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uVariant: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
    const target = window.scrollY / Math.max(window.innerHeight, 1);
    scroll.current += (target - scroll.current) * 0.06;
    uniforms.uScroll.value = scroll.current;
    uniforms.uMouse.value.x += (state.pointer.x * 0.5 + 0.5 - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (state.pointer.y * 0.5 + 0.5 - uniforms.uMouse.value.y) * 0.05;
    uniforms.uRes.value.set(size.width, size.height);
    uniforms.uVariant.value += (variant - uniforms.uVariant.value) * 0.05;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Campo de fluxo (curl noise) ─── correntes sedosas de partículas finas que
   serpenteiam por um campo vetorial divergente-zero. Tudo na GPU: o vertex
   shader desloca cada partícula pela curl de um ruído simplex animado. */
const flowVertex = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  attribute float aSeed;
  varying float vGlow;

  // simplex 3D noise (Ashima / Stefan Gustavson)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  vec3 pot(vec3 p){
    return vec3(snoise(p), snoise(p + vec3(31.4, 17.7, 4.3)), snoise(p + vec3(-12.1, 8.9, 22.2)));
  }
  vec3 curl(vec3 p){
    const float e = 0.18;
    vec3 dx = (pot(p + vec3(e,0.0,0.0)) - pot(p - vec3(e,0.0,0.0))) / (2.0*e);
    vec3 dy = (pot(p + vec3(0.0,e,0.0)) - pot(p - vec3(0.0,e,0.0))) / (2.0*e);
    vec3 dz = (pot(p + vec3(0.0,0.0,e)) - pot(p - vec3(0.0,0.0,e))) / (2.0*e);
    return vec3(dy.z - dz.y, dz.x - dx.z, dx.y - dy.x);
  }

  void main(){
    vec3 home = position;
    float t = uTime * 0.05;
    vec3 fp = home * 0.16 + vec3(0.0, 0.0, t) + uMouse.x * 0.1;
    vec3 flow = curl(fp);
    vec3 p = home + flow * 1.7 + vec3(uMouse * 0.4, 0.0);
    p.y += uScroll * 0.5;
    vGlow = clamp(length(flow.xy) * 0.7, 0.15, 1.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = mix(1.6, 4.8, aSeed);
    gl_PointSize = s * (9.0 / -mv.z);
  }
`;

const flowFragment = `
  precision mediump float;
  varying float vGlow;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 violet = vec3(0.42, 0.36, 0.60);
    vec3 magenta = vec3(0.50, 0.34, 0.58);
    vec3 col = mix(violet, magenta, vGlow);
    gl_FragColor = vec4(col * mix(0.4, 1.0, vGlow), a * 0.8);
  }
`;

function FlowField() {
  const scroll = useRef(0);
  const { geometry, uniforms } = useMemo(() => {
    const n = 1300;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const u = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };
    return { geometry: g, uniforms: u };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
    const target = window.scrollY / Math.max(window.innerHeight, 1);
    scroll.current += (target - scroll.current) * 0.06;
    uniforms.uScroll.value = scroll.current;
    uniforms.uMouse.value.x += (state.pointer.x - uniforms.uMouse.value.x) * 0.04;
    uniforms.uMouse.value.y += (state.pointer.y - uniforms.uMouse.value.y) * 0.04;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={flowVertex}
        fragmentShader={flowFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * CANVAS ÚNICO E PERSISTENTE do site. Renderiza o ambiente (shader + partículas)
 * como camada base e, via <scene.Out/>, todos os itens 3D que as seções injetam
 * com <SceneItem> — de modo que a cena "cresce" conforme se rola. O texto/forms
 * continuam no DOM por cima (SEO). Em reduced-motion ou sem WebGL, cai no
 * AmbientField (CSS).
 */
export default function SceneCanvas() {
  const [useGL, setUseGL] = useState<boolean | null>(null);
  const pathname = usePathname();
  const variant = pathname === "/menu" ? 1 : 0;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUseGL(false);
      return;
    }
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    setUseGL(ok);
  }, []);

  if (useGL === null) return null;
  if (!useGL) return <AmbientField />;

  return (
    <div className="webgl-bg" aria-hidden="true">
      <Canvas
        dpr={1}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <Ambient variant={variant} />
        <FlowField />
        {/* luzes compartilhadas para os itens injetados pelas seções */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 6]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-6, -3, 4]} intensity={42} color="#7c3aed" />
        {/* reflexos pro metal dos itens 3D (gerado uma vez, sem rede) */}
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={1.8} position={[4, 3, 5]} scale={7} color="#b89bff" />
          <Lightformer form="rect" intensity={1.0} position={[-5, -1, 3]} scale={6} color="#5b21b6" />
          <Lightformer form="circle" intensity={1.4} position={[0, 5, -4]} scale={5} color="#ffffff" />
        </Environment>
        <scene.Out />
      </Canvas>
    </div>
  );
}
