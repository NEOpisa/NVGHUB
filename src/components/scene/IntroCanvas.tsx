"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import {
  WHITE_POINTS,
  PURPLE_POINTS,
  buildGeometry,
  buildLogoChunks,
  type Chunk,
} from "@/components/scene/logoGeometry";

/* ───────────────── Plexus (rede técnica de pontos + linhas) ───────────────── */
const PX_N = 84;
const PX_DIST = 1.8;
const PX_MAX_SEG = 1000;
const PX_BOX = new THREE.Vector3(10, 6.5, 5.5);

function Plexus({ opacity }: { opacity: React.RefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const data = useMemo(() => {
    const pos = new Float32Array(PX_N * 3);
    const vel = new Float32Array(PX_N * 3);
    for (let i = 0; i < PX_N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * PX_BOX.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * PX_BOX.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * PX_BOX.z;
      vel[i * 3] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
    }
    const segPos = new Float32Array(PX_MAX_SEG * 2 * 3);
    const segCol = new Float32Array(PX_MAX_SEG * 2 * 3);
    return { pos, vel, segPos, segCol };
  }, []);

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.pos, 3));
    return g;
  }, [data]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.segPos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(data.segCol, 3));
    return g;
  }, [data]);

  useEffect(() => () => { pointGeo.dispose(); lineGeo.dispose(); }, [pointGeo, lineGeo]);

  const violet = new THREE.Color("#8a6ef0");

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const { pos, vel, segPos, segCol } = data;
    // drift + ricochete na caixa
    for (let i = 0; i < PX_N; i++) {
      for (let a = 0; a < 3; a++) {
        const k = i * 3 + a;
        pos[k] += vel[k] * dt;
        const lim = a === 0 ? PX_BOX.x / 2 : a === 1 ? PX_BOX.y / 2 : PX_BOX.z / 2;
        if (pos[k] > lim || pos[k] < -lim) vel[k] *= -1;
      }
    }
    pointGeo.attributes.position.needsUpdate = true;

    // conexões dentro do raio
    let seg = 0;
    for (let i = 0; i < PX_N && seg < PX_MAX_SEG; i++) {
      const ix = pos[i * 3], iy = pos[i * 3 + 1], iz = pos[i * 3 + 2];
      for (let j = i + 1; j < PX_N && seg < PX_MAX_SEG; j++) {
        const dx = ix - pos[j * 3], dy = iy - pos[j * 3 + 1], dz = iz - pos[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < PX_DIST) {
          const a = (1 - d / PX_DIST) * (opacity.current ?? 0);
          const o = seg * 6;
          segPos[o] = ix; segPos[o + 1] = iy; segPos[o + 2] = iz;
          segPos[o + 3] = pos[j * 3]; segPos[o + 4] = pos[j * 3 + 1]; segPos[o + 5] = pos[j * 3 + 2];
          for (let c = 0; c < 2; c++) {
            segCol[o + c * 3] = violet.r * a;
            segCol[o + c * 3 + 1] = violet.g * a;
            segCol[o + c * 3 + 2] = violet.b * a;
          }
          seg++;
        }
      }
    }
    lineGeo.setDrawRange(0, seg * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    const op = opacity.current ?? 0;
    if (pointsRef.current) (pointsRef.current.material as THREE.PointsMaterial).opacity = op * 0.8;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial size={0.05} color="#c6b9ff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ───────────────── Construção da marca: wireframe → sólida ───────────────── */
function BuildMark({
  wireOpacity,
  onBuilt,
}: {
  wireOpacity: React.RefObject<number>;
  onBuilt: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glow = useRef(0);

  const mats = useMemo(() => {
    const white = new THREE.MeshStandardMaterial({
      color: "#eef0ff", metalness: 0.95, roughness: 0.18,
      emissive: new THREE.Color("#7c5cff"), emissiveIntensity: 0.25,
      envMapIntensity: 1.4, transparent: true, opacity: 0,
    });
    const purple = new THREE.MeshStandardMaterial({
      color: "#8b3df2", metalness: 0.8, roughness: 0.22,
      emissive: new THREE.Color("#a855f7"), emissiveIntensity: 0.9,
      envMapIntensity: 1.6, transparent: true, opacity: 0,
    });
    const wire = new THREE.LineBasicMaterial({
      color: "#b9a8ff", transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    return { white, purple, wire };
  }, []);

  const wireframe = useMemo(() => {
    const make = (pts: [number, number][], depth: number) => {
      const geo = buildGeometry(pts, depth);
      const edges = new THREE.EdgesGeometry(geo, 18);
      geo.dispose();
      return edges;
    };
    return { white: make(WHITE_POINTS, 0.55), purple: make(PURPLE_POINTS, 0.75) };
  }, []);

  const { solidGroup, solidMeshes, geos } = useMemo(() => {
    const make = (chunks: Chunk[], mat: THREE.Material) =>
      chunks.map((c) => {
        const m = new THREE.Mesh(c.geometry, mat);
        m.position.copy(c.pivot);
        m.userData.pivot = c.pivot;
        m.userData.dir = c.dir;
        return m;
      });
    const lp = buildLogoChunks(4, 3);
    const solidMeshes = [...make(lp.white, mats.white), ...make(lp.purple, mats.purple)];
    const solidGroup = new THREE.Group();
    solidMeshes.forEach((m) => solidGroup.add(m));
    return { solidGroup, solidMeshes, geos: solidMeshes.map((m) => m.geometry) };
  }, [mats]);

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      wireframe.white.dispose();
      wireframe.purple.dispose();
      mats.white.dispose(); mats.purple.dispose(); mats.wire.dispose();
    };
  }, [geos, wireframe, mats]);

  useEffect(() => {
    // estado inicial: sólidos espalhados/escondidos
    solidMeshes.forEach((m) => {
      const pivot = m.userData.pivot as THREE.Vector3;
      const dir = m.userData.dir as THREE.Vector3;
      gsap.set(m.position, {
        x: pivot.x + dir.x * (6 + Math.random() * 4) + (Math.random() - 0.5) * 4,
        y: pivot.y + dir.y * (6 + Math.random() * 4) + (Math.random() - 0.5) * 4,
        z: pivot.z + dir.z * 4 + (Math.random() - 0.5) * 5,
      });
      gsap.set(m.rotation, { x: Math.random() * 6, y: Math.random() * 6, z: Math.random() * 6 });
      gsap.set(m.scale, { x: 0.15, y: 0.15, z: 0.15 });
    });

    const tl = gsap.timeline({ onComplete: onBuilt });
    // 1) wireframe desenha (giro lento que assenta DE FRENTE, y=0)
    if (groupRef.current) groupRef.current.rotation.y = -Math.PI * 1.5;
    tl.to(wireOpacity, { current: 1, duration: 0.9, ease: "power2.out" }, 0.2);
    tl.to(groupRef.current!.rotation, { y: 0, duration: 3.2, ease: "power3.out" }, 0);
    // 2) sólidos montam; wireframe some
    solidMeshes.forEach((m, i) => {
      const pivot = m.userData.pivot as THREE.Vector3;
      const at = 1.4 + i * 0.08;
      tl.to(m.position, { x: pivot.x, y: pivot.y, z: pivot.z, duration: 1.4, ease: "expo.out" }, at);
      tl.to(m.rotation, { x: 0, y: 0, z: 0, duration: 1.5, ease: "expo.out" }, at);
      tl.to(m.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "back.out(1.7)" }, at + 0.1);
    });
    tl.to([mats.white, mats.purple], { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.5);
    tl.to(wireOpacity, { current: 0, duration: 0.8, ease: "power2.in" }, 2.4);
    // 3) flash de brilho ao encaixar
    tl.to(glow, { current: 1.6, duration: 0.25, ease: "power2.out" }, 3.0)
      .to(glow, { current: 0.4, duration: 0.9, ease: "power2.out" });

    return () => void tl.kill();
  }, [solidMeshes, wireOpacity, onBuilt, mats, wireframe]);

  useFrame(() => {
    mats.wire.opacity = wireOpacity.current ?? 0;
    const g = glow.current;
    mats.white.emissiveIntensity = 0.25 + g * 0.8;
    mats.purple.emissiveIntensity = 0.9 + g * 1.6;
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <lineSegments geometry={wireframe.white} material={mats.wire} />
      <lineSegments geometry={wireframe.purple} material={mats.wire} />
      <primitive object={solidGroup} />
    </group>
  );
}

function Scene({ onBuilt }: { onBuilt: () => void }) {
  const plexusOp = useRef(0);
  const wireOp = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(plexusOp, { current: 1, duration: 1.0, ease: "power2.out", delay: 0.1 });
    // câmera empurra de leve (dramatiza a construção)
    gsap.fromTo(camera.position, { z: 8.2 }, { z: 6, duration: 3.6, ease: "power2.inOut" });
  }, [camera]);

  return (
    <>
      <color attach="background" args={["#06050c"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 7, 6]} intensity={2.2} color="#cdbfff" />
      <pointLight position={[-6, -2, 4]} intensity={40} color="#7c3aed" />
      {/* reflexos pro metal da marca (gerado, sem rede) */}
      <Environment resolution={96} frames={1}>
        <Lightformer form="rect" intensity={2} position={[3, 3, 4]} scale={6} color="#a98bff" />
        <Lightformer form="rect" intensity={1.2} position={[-4, -1, 2]} scale={5} color="#5b21b6" />
        <Lightformer form="circle" intensity={1.5} position={[0, 4, -3]} scale={4} color="#ffffff" />
      </Environment>
      <Plexus opacity={plexusOp} />
      <BuildMark wireOpacity={wireOp} onBuilt={onBuilt} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.05} luminanceThreshold={0.2} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/**
 * INTRO full-screen (tudo em canvas): rede plexus + a marca NV construída em
 * wireframe e depois sólida, com bloom. Quando a construção termina E a página
 * carregou (`ready`), o overlay faz fade revelando o hero.
 */
export default function IntroCanvas({
  ready,
  onComplete,
}: {
  ready: boolean;
  onComplete: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(ready);
  const builtRef = useRef(false);
  const doneRef = useRef(false);

  const tryFinish = () => {
    if (!builtRef.current || !readyRef.current || doneRef.current) return;
    doneRef.current = true;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.85,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { readyRef.current = ready; tryFinish(); }, [ready]);

  return (
    <div className="intro-overlay" ref={overlayRef} aria-hidden="true">
      <Canvas
        dpr={1}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8.2], fov: 55 }}
      >
        <Scene onBuilt={() => { builtRef.current = true; tryFinish(); }} />
      </Canvas>
    </div>
  );
}
