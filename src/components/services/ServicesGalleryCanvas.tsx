"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { buildServiceIcon, disposeIcon, type ServiceKind } from "@/components/services/serviceIcons3d";

const KINDS: ServiceKind[] = ["site", "system", "seo", "support", "saas"];

function Stage({ active }: { active: number }) {
  const holderRef = useRef<THREE.Group>(null);
  const spin = useRef(0);

  const mats = useMemo(() => {
    const metal = new THREE.MeshStandardMaterial({
      color: "#cdbdf6", metalness: 0.95, roughness: 0.16, envMapIntensity: 1.5,
      emissive: new THREE.Color("#3a2b66"), emissiveIntensity: 0.25, side: THREE.DoubleSide,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: "#a855f7", metalness: 0.6, roughness: 0.25, envMapIntensity: 1.3,
      emissive: new THREE.Color("#b14bff"), emissiveIntensity: 1.1, side: THREE.DoubleSide,
    });
    return { metal, accent };
  }, []);

  const icons = useMemo(
    () => KINDS.map((k) => buildServiceIcon(k, mats.metal, mats.accent)),
    [mats]
  );

  useEffect(() => {
    return () => {
      icons.forEach(disposeIcon);
      mats.metal.dispose();
      mats.accent.dispose();
    };
  }, [icons, mats]);

  // troca de ícone: esconde todos, mostra o ativo com pop + giro
  useEffect(() => {
    icons.forEach((g, i) => { g.visible = i === active; });
    const g = icons[active];
    if (!g) return;
    gsap.fromTo(g.scale, { x: 0.4, y: 0.4, z: 0.4 }, { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" });
    gsap.fromTo(spin, { current: spin.current - Math.PI * 1.2 }, { current: spin.current, duration: 0.9, ease: "power3.out" });
  }, [active, icons]);

  useFrame((state, delta) => {
    spin.current += delta * 0.35;
    const h = holderRef.current;
    if (!h) return;
    h.rotation.y = spin.current;
    h.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    h.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  return (
    <group ref={holderRef}>
      {icons.map((g, i) => (
        <primitive key={i} object={g} />
      ))}
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 90;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 12;
      a[i * 3 + 1] = (Math.random() - 0.5) * 8;
      a[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return a;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.03; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#b89bff" transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

/**
 * Canvas da galeria de serviços: o ícone 3D extrudado do serviço ATIVO flutua e
 * gira no centro; troca com pop+giro conforme o scroll muda o índice. Texto/infos
 * ficam no DOM por cima (SEO). Ativa o frameloop só quando a seção está visível.
 */
export default function ServicesGalleryCanvas({ active, running }: { active: number; running: boolean }) {
  return (
    <Canvas
      className="services-gl-canvas"
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={2.4} color="#e7dcff" />
      <pointLight position={[-5, -2, 4]} intensity={30} color="#7c3aed" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={1.8} position={[4, 3, 5]} scale={7} color="#b89bff" />
        <Lightformer form="rect" intensity={1.0} position={[-5, -1, 3]} scale={6} color="#5b21b6" />
        <Lightformer form="circle" intensity={1.4} position={[0, 5, -4]} scale={5} color="#ffffff" />
      </Environment>
      <Stage active={active} />
      <Dust />
    </Canvas>
  );
}
