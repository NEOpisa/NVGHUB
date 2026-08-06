"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildVHalf } from "./vGeometry";

/**
 * A MARCA NV EM TRÊS DIMENSÕES — peça de vitrine da home.
 *
 * As duas metades do V nascem afastadas e se encaixam no eixo (montagem),
 * depois entram em deriva: flutuação lenta, respiração das metades e
 * inclinação que segue o ponteiro. Metal cornflower com clearcoat, facetas
 * em MediumBlue emissivo e um halo que pulsa por trás — a luz vem de dois
 * lightformers (estúdio inline, sem HDR remoto).
 */

const CORN = "#6495ed";
const BLUE = "#0000cd";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Mark({ motion }: { motion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const t0 = useRef(0);
  const aim = useRef({ x: 0, y: 0 });

  const parts = useMemo(() => buildVHalf(), []);
  const mats = useMemo(() => {
    const body = new THREE.MeshPhysicalMaterial({
      color: CORN,
      metalness: 0.92,
      roughness: 0.17,
      envMapIntensity: 1.7,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const facet = new THREE.MeshPhysicalMaterial({
      color: BLUE,
      metalness: 0.7,
      roughness: 0.24,
      emissive: new THREE.Color(BLUE),
      emissiveIntensity: 0.55,
      envMapIntensity: 1.3,
      clearcoat: 1,
      clearcoatRoughness: 0.14,
    });
    const glow = new THREE.MeshBasicMaterial({
      color: CORN,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { body, facet, glow };
  }, []);

  useEffect(() => {
    return () => {
      parts.body.dispose();
      parts.facets.forEach((f) => f.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [parts, mats]);

  // inclinação segue o ponteiro (normalizado -1..1), amortecida no frame
  useEffect(() => {
    if (!motion) return;
    const onMove = (e: PointerEvent) => {
      aim.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      aim.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [motion]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (!t0.current) t0.current = state.clock.elapsedTime;
    const age = state.clock.elapsedTime - t0.current;
    const t = state.clock.elapsedTime;

    // montagem: as metades vêm de fora e travam no eixo (1.1s)
    const assemble = motion ? easeOut(Math.min(1, age / 1.1)) : 1;
    const gap = (1 - assemble) * 2.6 + (motion ? Math.sin(t * 0.6) * 0.045 : 0);
    if (right.current) right.current.position.x = gap;
    if (left.current) left.current.position.x = -gap;
    g.scale.setScalar(0.82 + assemble * 0.18);
    g.position.z = -1.2;
    g.position.x = 0;

    if (!motion) return;

    // deriva: flutuação + inclinação amortecida pelo ponteiro
    const ty = 0.34 - aim.current.y * 0.22;
    const tx = aim.current.x * 0.5;
    g.rotation.y += (-0.22 + tx * 0.7 + Math.sin(t * 0.4) * 0.14 - g.rotation.y) * Math.min(1, dt * 2.4);
    g.rotation.x += (-ty * 0.35 + Math.sin(t * 0.53) * 0.05 - g.rotation.x) * Math.min(1, dt * 2.4);
    g.position.y = 0.15 + Math.sin(t * 0.7) * 0.09;

    if (halo.current) {
      const s = 1 + Math.sin(t * 0.9) * 0.06;
      halo.current.scale.set(s, s, 1);
      (halo.current.material as THREE.MeshBasicMaterial).opacity =
        (0.055 + Math.sin(t * 0.9) * 0.02) * assemble;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={halo} position={[0, 0, -1.6]} material={mats.glow}>
        <circleGeometry args={[2.6, 48]} />
      </mesh>
      {/* metade direita = a do vetor; esquerda = espelho em X */}
      <group ref={right}>
        <mesh geometry={parts.body} material={mats.body} />
        {parts.facets.map((f, i) => (
          <mesh key={i} geometry={f} material={mats.facet} />
        ))}
      </group>
      <group ref={left} scale={[-1, 1, 1]}>
        <mesh geometry={parts.body} material={mats.body} />
        {parts.facets.map((f, i) => (
          <mesh key={i} geometry={f} material={mats.facet} />
        ))}
      </group>
    </group>
  );
}

export default function NVMark3D({ className }: { className?: string }) {
  const [mode, setMode] = useState<"pending" | "gl" | "flat">("pending");
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = false;
    try {
      const c = document.createElement("canvas");
      gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      gl = false;
    }
    setMotion(!reduced);
    setMode(gl ? "gl" : "flat");
  }, []);

  // sem WebGL (ou antes de decidir): o vetor oficial segura a composição
  if (mode !== "gl") {
    return (
      <div className={`nv3d nv3d-flat ${className ?? ""}`}>
        <img src="/logo.svg" alt="" aria-hidden="true" width={280} height={206} />
      </div>
    );
  }

  return (
    <div className={`nv3d ${className ?? ""}`} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          // ACES puxava o MediumBlue pro violeta — a marca não tem esse matiz
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [0, 0, 11.2], fov: 38 }}
        frameloop={motion ? "always" : "demand"}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-3, 4, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[4, -2, 3]} intensity={1.4} color={CORN} />
        <Mark motion={motion} />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={2.2} position={[-4, 4, 5]} scale={8} color="#ffffff" />
          <Lightformer form="rect" intensity={0.9} position={[5, -2, 3]} scale={6} color={CORN} />
          <Lightformer form="circle" intensity={0.6} position={[0, -4, 2]} scale={5} color={BLUE} />
        </Environment>
      </Canvas>
    </div>
  );
}
