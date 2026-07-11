"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, type Tier } from "../journeyState";

const STAR_COUNT: Record<Tier, number> = { 0: 380, 1: 650, 2: 950 };
const DUST_COUNT: Record<Tier, number> = { 0: 260, 1: 450, 2: 700 };

// #003 · corte extra de partículas em telas pequenas/touch (além do tier):
// menos fill-rate e menos vértices onde a GPU é mais fraca.
function mobileFactor(): number {
  if (typeof window === "undefined") return 1;
  const small = window.innerWidth < 768;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  return small || coarse ? 0.55 : 1;
}

const starVertex = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vTwinkle;
  void main(){
    // cada estrela CINTILA no seu próprio ritmo
    vTwinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + aSeed * 2.4) + aSeed * 40.0));
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = mix(1.2, 3.4, aSeed) * (10.0 / max(-mv.z, 0.1));
  }
`;
const starFragment = /* glsl */ `
  precision mediump float;
  varying float vTwinkle;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(vec3(0.42, 0.36, 1.0), vec3(0.81, 0.77, 1.0), vTwinkle);
    gl_FragColor = vec4(col, a * 0.75 * vTwinkle);
  }
`;

/** Estrelas cintilantes distribuídas por todo o corredor — 1 draw call. */
function Stars({ count }: { count: number }) {
  const { geometry, uniforms } = useMemo(() => {
    const n = count;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = 14 - Math.random() * 106; // z ∈ [14, -92]
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, uniforms: { uTime: { value: 0 } } };
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={starVertex}
        fragmentShader={starFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const dustVertex = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vGlow;
  void main(){
    vec3 p = position;
    float ph = aSeed * 6.28318;
    p.x += sin(uTime * 0.25 + position.z * 0.35 + ph) * 0.9;
    p.y += cos(uTime * 0.20 + position.x * 0.40 + ph) * 0.7;
    p.z += sin(uTime * 0.12 + ph) * 0.5;
    vGlow = 0.35 + 0.65 * fract(aSeed * 7.13);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = mix(1.3, 3.7, aSeed);
    gl_PointSize = s * (9.0 / max(-mv.z, 0.1));
  }
`;

const dustFragment = /* glsl */ `
  precision mediump float;
  varying float vGlow;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 violet = vec3(0.42, 0.36, 1.0);
    vec3 bright = vec3(0.79, 0.75, 1.0);
    vec3 col = mix(violet, bright, vGlow);
    gl_FragColor = vec4(col * mix(0.4, 1.0, vGlow), a * 0.65);
  }
`;

/** Poeira sedosa que serpenteia pelo corredor inteiro (deslocamento na GPU). */
function Dust({ count }: { count: number }) {
  const { geometry, uniforms } = useMemo(() => {
    const n = count;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = 10 - Math.random() * 98;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, uniforms: { uTime: { value: 0 } } };
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Estrela CADENTE: risco de luz que cruza o fundo de tempos em tempos.
 *  Um plano fino esticado com gradiente aditivo; 1 draw call, matemática de
 *  2 floats por frame. Puro tempero — nunca rouba a cena. */
function ShootingStar({ seed }: { seed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const st = useRef({
    t: -2 - seed * 5, // espera inicial dessincronizada
    dur: 1.1,
    from: new THREE.Vector3(),
    dir: new THREE.Vector3(),
  });
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#cfc4ff",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  useEffect(() => () => mat.dispose(), [mat]);

  useFrame((_, dt) => {
    const s = st.current;
    const m = ref.current;
    if (!m) return;
    s.t += dt;
    if (s.t < 0) {
      m.visible = false;
      return;
    }
    if (s.t > s.dur) {
      // reprograma o próximo voo: pausa longa aleatória + nova diagonal
      s.t = -(4 + Math.random() * 8);
      s.dur = 0.9 + Math.random() * 0.7;
      const y = 4 + Math.random() * 5;
      const z = -12 - Math.random() * 46;
      s.from.set((Math.random() - 0.5) * 26 + 8, y, z);
      s.dir.set(-1, -0.35 - Math.random() * 0.3, 0).normalize();
      m.visible = false;
      return;
    }
    const k = s.t / s.dur;
    m.visible = true;
    m.position
      .copy(s.from)
      .addScaledVector(s.dir, k * 22);
    m.rotation.z = Math.atan2(s.dir.y, s.dir.x);
    // acende rápido, apaga suave (parábola)
    mat.opacity = Math.sin(Math.PI * k) * 0.5;
  });

  return (
    <mesh ref={ref} visible={false} material={mat}>
      <planeGeometry args={[2.6, 0.02]} />
    </mesh>
  );
}

export default function Particles() {
  const tier = journey.tier;
  // fator mobile fixado na montagem (não recalcula por frame)
  const f = useMemo(() => mobileFactor(), []);
  const starN = Math.round(STAR_COUNT[tier] * f);
  const dustN = Math.round(DUST_COUNT[tier] * f);
  return (
    <>
      <Stars count={starN} />
      <Dust count={dustN} />
      {/* cadentes só fora do tier mínimo (lá cada draw call importa) */}
      {tier > 0 && (
        <>
          <ShootingStar seed={0.2} />
          <ShootingStar seed={0.7} />
        </>
      )}
    </>
  );
}
