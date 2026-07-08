"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN, type Tier } from "../journeyState";
import { WORLD } from "../path";

/**
 * Estação EXPLORE — o GRAND FINALE da jornada: um pequeno SISTEMA de
 * PLANETAS procedurais (shader: bandas + noise + rim atmosférico, tudo na
 * família violeta) flutuando ao longo do corredor final, que desemboca no
 * destino: um PORTAL de anéis delgados contra-rotativos com núcleo de luz,
 * envolto por uma CONSTELAÇÃO que se assenta em casca esférica no fim.
 * Cada planeta gira, flutua e ACENDE quando a câmera passa por ele.
 */

const STARS: Record<Tier, number> = { 0: 600, 1: 1000, 2: 1500 };

type PlanetSpec = {
  pos: [number, number, number];
  r: number;
  colA: string; // banda escura
  colB: string; // banda clara
  freq: number; // nº de bandas
  warp: number; // turbulência das bandas
  spin: number; // rad/s
  ring?: boolean;
  moon?: boolean;
};

// família violeta, cada um com personalidade própria
const PLANETS: PlanetSpec[] = [
  { pos: [-3.4, 0.7, -50.5], r: 0.85, colA: "#380f30", colB: "#dd3bc8", freq: 9, warp: 2.2, spin: 0.1 },
  { pos: [3.6, -0.8, -55.5], r: 1.3, colA: "#200a1c", colB: "#f076e0", freq: 6, warp: 3.4, spin: 0.06, ring: true },
  { pos: [-3.9, -0.5, -60.2], r: 0.55, colA: "#4a1a40", colB: "#e6e9f6", freq: 14, warp: 4.5, spin: 0.16, moon: true },
  { pos: [3.2, 1.1, -64.3], r: 0.9, colA: "#2e0c28", colB: "#f8b1ec", freq: 7, warp: 1.6, spin: 0.08 },
  // gigante de fundo atrás do portal (backdrop de profundidade)
  { pos: [-1.5, 2.4, -76], r: 3.1, colA: "#180716", colB: "#8f1878", freq: 5, warp: 2.8, spin: 0.03 },
];

const PLANET_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  varying vec2 vUv;
  void main(){
    vUv = uv;
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const PLANET_FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vN;
  varying vec3 vV;
  varying vec2 vUv;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform float uFreq;
  uniform float uWarp;
  uniform float uTime;
  uniform float uNear;
  uniform float uSeed;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  float fbm(vec2 p){
    float v = 0.0;
    v += 0.5 * vnoise(p);
    v += 0.25 * vnoise(p * 2.13);
    v += 0.125 * vnoise(p * 4.31);
    return v;
  }

  void main(){
    // bandas latitudinais turbulentas (deriva lenta = "clima")
    float n = fbm(vUv * vec2(3.0, 6.0) + uSeed + vec2(uTime * 0.008, 0.0));
    float band = sin(vUv.y * uFreq * 6.2831 + n * uWarp);
    float m = smoothstep(-1.0, 1.0, band);
    // manchas de tempestade
    float storm = smoothstep(0.72, 0.95, fbm(vUv * vec2(9.0, 11.0) + uSeed * 2.7));
    vec3 base = mix(uColA, uColB, m * 0.85 + storm * 0.3);

    // luz key fixa (mesma direção da cena) + rim atmosférico
    vec3 L = normalize(vec3(0.55, 0.65, 0.52));
    float diff = max(dot(vN, L), 0.0);
    float rim = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
    vec3 col = base * (0.10 + diff * 0.95);
    col += vec3(0.867, 0.231, 0.784) * rim * (0.35 + uNear * 0.8);
    col += base * uNear * 0.35; // acende com a câmera perto

    gl_FragColor = vec4(col, 1.0);
  }
`;

/** um planeta procedural: corpo shader + atmosfera fresnel + anel/lua opcionais */
function Planet({ spec }: { spec: PlanetSpec }) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const moonPivot = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uColA: { value: new THREE.Color(spec.colA) },
      uColB: { value: new THREE.Color(spec.colB) },
      uFreq: { value: spec.freq },
      uWarp: { value: spec.warp },
      uTime: { value: 0 },
      uNear: { value: 0 },
      uSeed: { value: spec.pos[2] * 0.37 },
    }),
    [spec],
  );
  const bodyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: PLANET_VERT,
        fragmentShader: PLANET_FRAG,
      }),
    [uniforms],
  );
  // atmosfera: casca por trás com fresnel aditivo
  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uNear: uniforms.uNear },
        vertexShader: PLANET_VERT,
        fragmentShader: /* glsl */ `
          precision mediump float;
          varying vec3 vN;
          varying vec3 vV;
          uniform float uNear;
          void main(){
            float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 3.2);
            gl_FragColor = vec4(vec3(0.867, 0.231, 0.784), f * (0.34 + uNear * 0.5));
          }
        `,
      }),
    [uniforms],
  );
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f076e0",
        transparent: true,
        opacity: 0.34,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const moonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#bd8fb0",
        roughness: 0.9,
        metalness: 0.1,
        emissive: new THREE.Color("#dd3bc8"),
        emissiveIntensity: 0.12,
      }),
    [],
  );

  useEffect(
    () => () => {
      bodyMat.dispose();
      atmoMat.dispose();
      ringMat.dispose();
      moonMat.dispose();
    },
    [bodyMat, atmoMat, ringMat, moonMat],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    // acende quando a câmera cruza o z do planeta
    const dz = spec.pos[2] - journey.camZ;
    uniforms.uNear.value = Math.exp(-(dz * dz) / 26);

    if (body.current) body.current.rotation.y += dt * spec.spin;
    const g = group.current;
    if (g) {
      // flutuação orbital lenta — cada planeta no próprio compasso
      const ph = spec.pos[2] * 1.7;
      g.position.y = spec.pos[1] + Math.sin(t * 0.22 + ph) * 0.28;
      g.position.x = spec.pos[0] + Math.cos(t * 0.17 + ph) * 0.18;
    }
    if (moonPivot.current) moonPivot.current.rotation.y += dt * 0.5;
  });

  return (
    <group ref={group} position={spec.pos}>
      <mesh ref={body} material={bodyMat} rotation={[0.12, 0, spec.ring ? -0.28 : 0.08]}>
        <sphereGeometry args={[spec.r, 48, 32]} />
      </mesh>
      <mesh material={atmoMat} scale={1.07}>
        <sphereGeometry args={[spec.r, 32, 24]} />
      </mesh>
      {spec.ring && (
        <mesh material={ringMat} rotation={[Math.PI / 2 - 0.34, 0, -0.28]}>
          <ringGeometry args={[spec.r * 1.45, spec.r * 2.1, 96]} />
        </mesh>
      )}
      {spec.moon && (
        <group ref={moonPivot}>
          <mesh material={moonMat} position={[spec.r * 2.2, spec.r * 0.35, 0]}>
            <sphereGeometry args={[spec.r * 0.22, 20, 14]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function ExploreTunnel() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);
  const core = useRef<THREE.Mesh>(null);

  // portal: anéis finos + núcleo de luz + poeira orbital
  const ringGeoA = useMemo(() => new THREE.TorusGeometry(2.5, 0.012, 8, 128), []);
  const ringGeoB = useMemo(() => new THREE.TorusGeometry(2.15, 0.007, 8, 128), []);
  const ringGeoC = useMemo(() => new THREE.TorusGeometry(2.9, 0.005, 8, 128), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f076e0",
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const coreGeo = useMemo(() => new THREE.CircleGeometry(1.9, 48), []);
  const coreMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vP;
          void main(){
            vP = position.xy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vP;
          uniform float uTime;
          void main(){
            float d = length(vP) / 1.9;
            // núcleo suave com ondulação concêntrica lenta
            float rip = 0.5 + 0.5 * sin(d * 14.0 - uTime * 1.6);
            float a = smoothstep(1.0, 0.0, d);
            a = a * a * (0.34 + rip * 0.1);
            vec3 col = mix(vec3(0.867, 0.231, 0.784), vec3(0.98, 0.80, 0.94), rip);
            gl_FragColor = vec4(col, a);
          }
        `,
      }),
    [],
  );

  // constelação do finale: pontos voam da espiral p/ casca fibonacci (GPU)
  const starN = STARS[journey.tier];
  const { starGeo, starUniforms } = useMemo(() => {
    const R = 3.3;
    const target = new Float32Array(starN * 3);
    const seed = new Float32Array(starN);
    const spiral = new Float32Array(starN * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < starN; i++) {
      const yy = 1 - (i / (starN - 1)) * 2;
      const rr = Math.sqrt(1 - yy * yy);
      const th = golden * i;
      target[i * 3] = Math.cos(th) * rr * R;
      target[i * 3 + 1] = yy * R;
      target[i * 3 + 2] = Math.sin(th) * rr * R;
      seed[i] = Math.random();
      spiral[i * 3] = Math.random() * Math.PI * 2;
      spiral[i * 3 + 1] = 4.5 + Math.random() * 4;
      spiral[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(target, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSpiral", new THREE.BufferAttribute(spiral, 3));
    return {
      starGeo: g,
      starUniforms: { uTime: { value: 0 }, uConverge: { value: 0 } },
    };
  }, [starN]);

  const starMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: starUniforms,
        vertexShader: /* glsl */ `
          attribute float aSeed;
          attribute vec3 aSpiral;
          uniform float uTime;
          uniform float uConverge;
          varying float vGlow;
          void main(){
            float eff = clamp(uConverge * 1.5 - aSeed * 0.5, 0.0, 1.0);
            float e = eff * eff * (3.0 - 2.0 * eff);
            float ang = aSpiral.x + uTime * (0.2 + aSeed * 0.35);
            vec3 from = vec3(cos(ang) * aSpiral.y, aSpiral.z, sin(ang) * aSpiral.y);
            vec3 p = mix(from, position, e);
            p *= 1.0 + sin(uTime * 1.6 + aSeed * 6.28) * 0.02 * e;
            vGlow = (0.2 + 0.8 * e) * (0.55 + 0.45 * sin(uTime * 2.4 + aSeed * 40.0));
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = mix(2.0, 4.2, aSeed) * (9.0 / max(-mv.z, 0.1));
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          varying float vGlow;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d);
            a *= a;
            vec3 col = mix(vec3(0.867, 0.231, 0.784), vec3(0.90, 0.88, 1.0), vGlow);
            gl_FragColor = vec4(col * (0.5 + vGlow), a * 0.85);
          }
        `,
      }),
    [starUniforms],
  );

  const DUST_N = 90;
  const dustGeo = useMemo(() => {
    const pos = new Float32Array(DUST_N * 3);
    for (let i = 0; i < DUST_N; i++) {
      const a = (i / DUST_N) * Math.PI * 2;
      const r = 2.5 + (Math.random() - 0.5) * 0.5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const dustMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.045,
        sizeAttenuation: true,
        color: "#fbc6f0",
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(
    () => () => {
      ringGeoA.dispose();
      ringGeoB.dispose();
      ringGeoC.dispose();
      ringMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    },
    [ringGeoA, ringGeoB, ringGeoC, ringMat, coreGeo, coreMat, dustGeo, dustMat, starGeo, starMat],
  );

  const stars = useRef<THREE.Points>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm > 0.66; // capítulo final: entra e FICA
    if (!g.visible) return;

    const t = state.clock.elapsedTime;

    // constelação converge na reta final da jornada
    starUniforms.uTime.value = t;
    starUniforms.uConverge.value = rangeN(sm, 0.82, 0.96);
    if (stars.current) stars.current.rotation.y += dt * 0.1;

    // portal: anéis delgados contra-rotativos + respiração do núcleo
    if (ringA.current) ringA.current.rotation.z += dt * 0.16;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.22;
    if (ringC.current) {
      ringC.current.rotation.z += dt * 0.08;
      ringC.current.rotation.x = Math.sin(t * 0.4) * 0.12;
    }
    if (dust.current) dust.current.rotation.z += dt * 0.1;
    coreMat.uniforms.uTime.value = t;
    ringMat.opacity = 0.5 + Math.sin(t * 1.4) * 0.15;
  });

  return (
    <group ref={group}>
      {/* sistema de planetas do corredor final */}
      {PLANETS.map((p) => (
        <Planet key={p.pos.join(",")} spec={p} />
      ))}
      {/* portal-destino (estação de navegação) */}
      <group position={[WORLD.gate.x, WORLD.gate.y, WORLD.gate.z]}>
        <mesh ref={ringA} geometry={ringGeoA} material={ringMat} />
        <mesh ref={ringB} geometry={ringGeoB} material={ringMat} />
        <mesh ref={ringC} geometry={ringGeoC} material={ringMat} />
        <mesh ref={core} geometry={coreGeo} material={coreMat} />
        <points ref={dust} geometry={dustGeo} material={dustMat} />
        <points
          ref={stars}
          geometry={starGeo}
          material={starMat}
          frustumCulled={false}
        />
        <pointLight intensity={40} color="#dd3bc8" distance={12} />
      </group>
    </group>
  );
}
