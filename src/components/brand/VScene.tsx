"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildVHalf } from "./vGeometry";

/**
 * A CENA 3D DA MARCA — tudo que depende de three.js mora aqui, e este
 * arquivo é carregado sob demanda por NVMark3D (import dinâmico, sem SSR).
 *
 * A separação não é organização: `three` + fiber + drei são ~900KB crus, e
 * enquanto estavam no mesmo módulo da home eles entravam no carregamento
 * inicial de quem talvez nem chegue a ver a marca. Agora só descem depois da
 * hidratação, e só se o aparelho tiver WebGL.
 *
 * As duas metades do V nascem afastadas e se encaixam no eixo (montagem),
 * depois entram em deriva: flutuação lenta, respiração das metades e
 * inclinação que segue o ponteiro. Metal cornflower com clearcoat e facetas
 * em MediumBlue emissivo — a luz vem de lightformers (estúdio inline, sem
 * HDR remoto).
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
      emissiveIntensity: 0.28,
      envMapIntensity: 1.3,
      clearcoat: 1,
      clearcoatRoughness: 0.14,
    });
    return { body, facet };
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

    // Sem animação a peça precisa PARAR na pose de repouso da deriva, não em
    // zero. De frente, um metal com clearcoat reflete a parte escura do
    // estúdio e a marca sai azul-marinho chapada — quem liga "reduzir
    // movimento" via uma peça pior, não a mesma peça parada. Estes são os
    // alvos da deriva com o ponteiro no centro.
    if (!motion) {
      g.rotation.set(-0.119, -0.22, 0);
      return;
    }

    // deriva: flutuação + inclinação amortecida pelo ponteiro
    const ty = 0.34 - aim.current.y * 0.22;
    const tx = aim.current.x * 0.5;
    g.rotation.y += (-0.22 + tx * 0.7 + Math.sin(t * 0.4) * 0.14 - g.rotation.y) * Math.min(1, dt * 2.4);
    g.rotation.x += (-ty * 0.35 + Math.sin(t * 0.53) * 0.05 - g.rotation.x) * Math.min(1, dt * 2.4);
    g.position.y = Math.sin(t * 0.7) * 0.09;

  });

  return (
    <group ref={group}>
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

export default function VScene({
  className,
  motion,
}: {
  className?: string;
  motion: boolean;
}) {
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
        camera={{ position: [0, 0, 10.4], fov: 38 }}
        frameloop={motion ? "always" : "demand"}
      >
        <ambientLight intensity={0.32} />
        <directionalLight position={[-3, 4, 6]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[4, -2, 3]} intensity={0.7} color={CORN} />
        <Mark motion={motion} />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={1.7} position={[-4, 4, 5]} scale={8} color="#ffffff" />
          <Lightformer form="rect" intensity={0.9} position={[5, -2, 3]} scale={6} color={CORN} />
          <Lightformer form="circle" intensity={0.6} position={[0, -4, 2]} scale={5} color={BLUE} />
        </Environment>
      </Canvas>
    </div>
  );
}
