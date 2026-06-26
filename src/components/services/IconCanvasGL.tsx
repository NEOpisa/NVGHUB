"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildServiceIcon, disposeIcon, type ServiceKind } from "@/components/services/serviceIcons3d";
import { buildEcoIcon, disposeEcoIcon, type EcoKind } from "@/components/services/ecoIcons3d";

export type IconVariant = "service" | "eco";

function Spinner({ variant, kind }: { variant: IconVariant; kind: string }) {
  const ref = useRef<THREE.Group>(null);

  const { group, scale, dispose } = useMemo(() => {
    const metal = new THREE.MeshPhysicalMaterial({
      color: "#d7ccf4", metalness: 0.9, roughness: 0.22, envMapIntensity: 1.8,
      clearcoat: 1, clearcoatRoughness: 0.12,
      emissive: new THREE.Color("#494069"), emissiveIntensity: 0.5, side: THREE.DoubleSide,
    });
    const accent = new THREE.MeshPhysicalMaterial({
      color: "#9a80e0", metalness: 0.5, roughness: 0.25, envMapIntensity: 1.4,
      clearcoat: 1, clearcoatRoughness: 0.16,
      emissive: new THREE.Color("#8a6fd0"), emissiveIntensity: 1.9, side: THREE.DoubleSide,
    });
    const g = variant === "eco"
      ? buildEcoIcon(kind as EcoKind, metal, accent)
      : buildServiceIcon(kind as ServiceKind, metal, accent);
    g.traverse((o) => {
      o.frustumCulled = false;
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.computeBoundingSphere();
    });
    const size = new THREE.Box3().setFromObject(g).getSize(new THREE.Vector3());
    const sc = Math.min(2.6 / Math.max(size.x, 0.01), 2.6 / Math.max(size.y, 0.01), 2.2);
    const dispose = () => {
      if (variant === "eco") disposeEcoIcon(g);
      else disposeIcon(g);
      metal.dispose();
      accent.dispose();
    };
    return { group: g, scale: Number.isFinite(sc) && sc > 0 ? sc : 1, dispose };
  }, [variant, kind]);

  useEffect(() => () => dispose(), [dispose]);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = t * 0.5;
    g.rotation.x = Math.sin(t * 0.5) * 0.12;
    g.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={ref} scale={scale}>
      <primitive object={group} />
    </group>
  );
}

/** Canvas pequeno e leve para UM ícone 3D (serviço ou ecossistema). Sem o
 *  shader/partículas do fundo global — só o ícone girando. */
export default function IconCanvasGL({ variant, kind }: { variant: IconVariant; kind: string }) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 42 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={2.6} color="#e7dcff" />
      <pointLight position={[-4, -2, 4]} intensity={22} color="#6e54b0" />
      <Environment resolution={32} frames={1}>
        <Lightformer form="rect" intensity={1.6} position={[3, 3, 4]} scale={6} color="#a98bff" />
        <Lightformer form="circle" intensity={1.2} position={[0, 4, -3]} scale={4} color="#ffffff" />
      </Environment>
      <Spinner variant={variant} kind={kind} />
    </Canvas>
  );
}
