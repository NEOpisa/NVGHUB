"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { buildLogoChunks, type Chunk } from "@/components/scene/logoGeometry";
import { detectTier, journey } from "@/components/journey/journeyState";
import PostFX from "@/components/journey/effects/PostFX";
import { nova, range } from "./novaState";

/* ════════════════════════════════════════════════════════════════════
   NOVA — a cena única do novo site. UMA estrela: a marca NV em cacos de
   bismuto iridescente, viva do primeiro ao último pixel de scroll.

   Coreografia por progresso (400vh):
   0.00–0.22  HERO      marca à direita, respirando (retrato: no topo)
   0.22–0.50  MANIFESTO marca recua ao centro-fundo, vira lentamente
   0.50–0.78  DIVISÕES  luz bifurca: âmbar (Ouro) × gelo (Platina)
   0.78–1.00  CHAMADA   marca volta pequena ao centro, pulso de assinatura
   ════════════════════════════════════════════════════════════════════ */

const _v = new THREE.Vector3();

function LogoMonolith() {
  const root = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const pos = useRef({ x: 3.0, y: 0.1, z: 0, s: 0.9 });
  const snapped = useRef(false); // 1º frame: nasce no alvo (sem deslizar)

  const { chunks, meshes, mats } = useMemo(() => {
    const white = new THREE.MeshPhysicalMaterial({
      color: "#eef0ff",
      metalness: 1,
      roughness: 0.1,
      emissive: new THREE.Color("#6c5cff"),
      emissiveIntensity: 0.08,
      envMapIntensity: 1.6,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      iridescence: 0.9,
      iridescenceIOR: 1.32,
      iridescenceThicknessRange: [120, 680],
    });
    const purple = new THREE.MeshPhysicalMaterial({
      color: "#6c5cff",
      metalness: 0.92,
      roughness: 0.14,
      emissive: new THREE.Color("#9d8cff"),
      emissiveIntensity: 0.9,
      envMapIntensity: 1.8,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      iridescence: 0.7,
      iridescenceIOR: 1.32,
      iridescenceThicknessRange: [140, 620],
    });
    const seam = new THREE.LineBasicMaterial({
      color: "#cfc4ff",
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const built = buildLogoChunks(1, 1);
    const chunks: Chunk[] = [...built.white, ...built.purple];
    const meshes = chunks.map((c, i) => {
      const m = new THREE.Mesh(
        c.geometry,
        i < built.white.length ? white : purple,
      );
      m.position.copy(c.pivot);
      const edges = new THREE.EdgesGeometry(c.geometry, 24);
      m.add(new THREE.LineSegments(edges, seam));
      return m;
    });
    return { chunks, meshes, mats: { white, purple, seam } };
  }, []);

  useEffect(
    () => () => {
      chunks.forEach((c) => c.geometry.dispose());
      mats.white.dispose();
      mats.purple.dispose();
      mats.seam.dispose();
    },
    [chunks, mats],
  );

  useFrame((state, dt) => {
    const g = root.current;
    const sp = spin.current;
    if (!g || !sp) return;
    const t = state.clock.elapsedTime;
    const p = nova.smooth;
    const portrait = state.viewport.aspect < 0.8;

    /* alvo de posição/escala por capítulo */
    const hero = 1 - range(p, 0.16, 0.3);
    const manif = Math.min(range(p, 0.16, 0.3), 1 - range(p, 0.44, 0.56));
    const divis = Math.min(range(p, 0.44, 0.56), 1 - range(p, 0.72, 0.84));
    const call = range(p, 0.72, 0.86);

    let tx: number, ty: number, tz: number, ts: number;
    if (portrait) {
      tx = 0;
      ty = hero * 2.1 + manif * 1.6 + divis * 1.9 + call * 1.7;
      tz = -manif * 3 - divis * 1.5;
      ts = hero * 0.46 + manif * 0.4 + divis * 0.42 + call * 0.34;
    } else {
      tx = hero * 3.0 + manif * 0 + divis * 0 + call * 0;
      ty = hero * 0.1 + manif * 0.4 + divis * 0.5 + call * 0.55;
      tz = -manif * 4.5 - divis * 2.5;
      ts = hero * 0.9 + manif * 0.62 + divis * 0.7 + call * 0.5;
    }
    const k = snapped.current ? Math.min(dt * 3.2, 1) : 1;
    snapped.current = true;
    pos.current.x += (tx - pos.current.x) * k;
    pos.current.y += (ty - pos.current.y) * k;
    pos.current.z += (tz - pos.current.z) * k;
    pos.current.s += (Math.max(ts, 0.2) - pos.current.s) * k;
    g.position.set(pos.current.x, pos.current.y, pos.current.z);
    g.scale.setScalar(pos.current.s);

    /* rotação: idle lento + acompanha o ponteiro + giro extra no manifesto */
    const lookY =
      state.pointer.x * 0.6 + Math.sin(t * 0.25) * 0.16 + manif * t * 0.12;
    const lookX = -state.pointer.y * 0.35 + Math.sin(t * 0.2) * 0.07;
    sp.rotation.y += (lookY - sp.rotation.y) * 0.06;
    sp.rotation.x += (lookX - sp.rotation.x) * 0.06;
    sp.rotation.z = Math.sin(t * 0.14) * 0.045;

    /* respiração dos cacos (deriva pivô±dir) + pulso de assinatura no final */
    const breathe = 0.5 + 0.5 * Math.sin(t * 1.1);
    const pulse = call * (0.5 + 0.5 * Math.sin(t * 2.2)) * 0.5;
    mats.white.emissiveIntensity = 0.08 + breathe * 0.25 + pulse * 0.5;
    mats.purple.emissiveIntensity = 0.8 + breathe * 1.1 + pulse * 1.6;
    mats.seam.opacity = 0.12 + breathe * 0.12 + pulse * 0.3;
    const amp = 0.26 * (1 + call * 0.4);
    for (let i = 0; i < meshes.length; i++) {
      const c = chunks[i];
      const drift =
        Math.sin(t * 1.1 + i * 1.9) * amp * (0.8 + (i % 3) * 0.15);
      meshes[i].position.set(
        c.pivot.x + c.dir.x * drift,
        c.pivot.y + c.dir.y * drift,
        c.pivot.z + c.dir.z * drift,
      );
    }

    /* flutuação do conjunto */
    g.position.y += Math.sin(t * 0.9) * 0.14;
  });

  return (
    <group ref={root}>
      <group ref={spin}>
        {meshes.map((m, i) => (
          <primitive key={i} object={m} />
        ))}
      </group>
      <Sparkles count={14} scale={[7, 6, 5]} size={2} speed={0.25} opacity={0.3} color="#9d8cff" />
    </group>
  );
}

/* Estrelas: um Points cintilante (1 draw call) — o vazio nunca é chapado. */
function Stars({ count }: { count: number }) {
  const { geo, uni } = useMemo(() => {
    const posA = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      posA[i * 3] = (Math.random() - 0.5) * 40;
      posA[i * 3 + 1] = (Math.random() - 0.5) * 26;
      posA[i * 3 + 2] = -4 - Math.random() * 30;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(posA, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geo: g, uni: { uTime: { value: 0 } } };
  }, [count]);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((_, dt) => void (uni.uTime.value += Math.min(dt, 0.05)));
  return (
    <points geometry={geo}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uni}
        vertexShader={`uniform float uTime; attribute float aSeed; varying float vT;
void main(){ vT = .35 + .65*(.5+.5*sin(uTime*(.6+aSeed*2.4)+aSeed*40.));
vec4 mv = modelViewMatrix * vec4(position,1.); gl_Position = projectionMatrix*mv;
gl_PointSize = mix(1.2,3.2,aSeed) * (10./max(-mv.z,.1)); }`}
        fragmentShader={`precision mediump float; varying float vT;
void main(){ vec2 c = gl_PointCoord-.5; float d=length(c); if(d>.5) discard;
float a=smoothstep(.5,0.,d); a*=a;
vec3 col=mix(vec3(.42,.36,1.),vec3(.81,.77,1.),vT);
gl_FragColor=vec4(col, a*.7*vT); }`}
      />
    </points>
  );
}

/* Luzes que BIFURCAM no capítulo das divisões: âmbar × gelo. */
function TierLights() {
  const warm = useRef<THREE.PointLight>(null);
  const cold = useRef<THREE.PointLight>(null);
  useFrame(() => {
    const d = Math.min(range(nova.smooth, 0.46, 0.56), 1 - range(nova.smooth, 0.74, 0.84));
    if (warm.current) warm.current.intensity = d * 26;
    if (cold.current) cold.current.intensity = d * 26;
  });
  return (
    <>
      <pointLight ref={warm} position={[-5, 1, 3]} color="#f4b74a" intensity={0} />
      <pointLight ref={cold} position={[5, 1, 3]} color="#3fe0d8" intensity={0} />
    </>
  );
}

/* Rig: suaviza o progresso e conduz câmera com respiração orgânica. */
function Rig() {
  useFrame((state, dt) => {
    nova.smooth = THREE.MathUtils.damp(nova.smooth, nova.p, 5, dt);
    const t = state.clock.elapsedTime;
    const p = nova.smooth;
    const cam = state.camera as THREE.PerspectiveCamera;
    _v.set(
      state.pointer.x * 0.3 + Math.sin(t * 0.23) * 0.03,
      0.25 + state.pointer.y * 0.18 + Math.cos(t * 0.31) * 0.025,
      8.6 - range(p, 0, 0.3) * 0.8 + range(p, 0.75, 1) * 0.6,
    );
    cam.position.lerp(_v, Math.min(dt * 3, 1));
    cam.lookAt(0, 0.35, 0);
    cam.rotation.z += state.pointer.x * -0.012;
  });
  return null;
}

export default function NovaScene() {
  const { dpr, stars } = useMemo(() => {
    const tier = detectTier();
    journey.tier = tier; // o PostFX (guardião de fps + grain) lê daqui
    if (typeof window === "undefined") return { dpr: 1.5, stars: 700 };
    const small =
      window.innerWidth < 768 ||
      !!window.matchMedia?.("(pointer: coarse)").matches;
    const cap = tier === 2 ? (small ? 1.35 : 1.75) : tier === 1 ? (small ? 1.25 : 1.5) : small ? 1 : 1.2;
    const stars = Math.round((tier === 0 ? 380 : tier === 1 ? 620 : 900) * (small ? 0.55 : 1));
    return { dpr: Math.min(window.devicePixelRatio || 1, cap), stars };
  }, []);

  return (
    <div className="nv2-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: false, alpha: false, stencil: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.25, 8.6], fov: 52, near: 0.1, far: 90 }}
      >
        <Rig />
        <color attach="background" args={["#050408"]} />
        <fog attach="fog" args={["#050408", 12, 46]} />
        <Stars count={stars} />
        <LogoMonolith />
        <TierLights />
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={1.6} position={[4, 3, 5]} scale={7} color="#ffffff" />
          <Lightformer form="rect" intensity={0.9} position={[-5, -1, 3]} scale={6} color="#6c5cff" />
          <Lightformer form="circle" intensity={1.4} position={[0, 5, -4]} scale={5} color="#ffffff" />
        </Environment>
        <PostFX />
      </Canvas>
    </div>
  );
}
