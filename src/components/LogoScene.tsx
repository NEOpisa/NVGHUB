"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/*
 * A marca NV em 3D — contornos extraídos pixel a pixel do logo.png
 * (viewBox 320×240). As duas formas vivem no mesmo espaço de
 * coordenadas para preservar a composição exata da marca.
 */
const WHITE_POINTS: [number, number][] = [
  [48, 25],
  [86, 44],
  [168, 93],
  [194, 143],
  [94, 78],
  [94, 144],
  [155, 216],
  [138, 206],
  [71, 151],
  [70, 48],
];

const PURPLE_POINTS: [number, number][] = [
  [287, 27],
  [202, 219],
  [153, 175],
  [110, 116],
  [190, 169],
];

const CX = 160;
const CY = 124;
const SCALE = 42;

function buildGeometry(points: [number, number][], depth: number) {
  const shape = new THREE.Shape(
    points.map(
      ([x, y]) => new THREE.Vector2((x - CX) / SCALE, -(y - CY) / SCALE)
    )
  );
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 3,
  });
  // centraliza apenas no eixo Z; X/Y preservam a composição da marca
  geo.translate(0, 0, -depth / 2);
  return geo;
}

function LogoMark() {
  const groupRef = useRef<THREE.Group>(null);

  const whiteGeo = useMemo(() => buildGeometry(WHITE_POINTS, 0.55), []);
  const purpleGeo = useMemo(() => buildGeometry(PURPLE_POINTS, 0.75), []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // oscilação lenta + paralaxe do mouse
    g.rotation.y = Math.sin(t * 0.35) * 0.38 + state.pointer.x * 0.45;
    g.rotation.x = Math.sin(t * 0.22) * 0.1 + state.pointer.y * -0.25;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.9}>
        {/* traço branco metálico */}
        <mesh geometry={whiteGeo} position={[0, 0, -0.28]}>
          <meshPhysicalMaterial
            color="#e8e8ee"
            metalness={0.85}
            roughness={0.22}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>
        {/* check roxo emissivo (à frente, como na marca) */}
        <mesh geometry={purpleGeo} position={[0, 0, 0.34]}>
          <meshPhysicalMaterial
            color="#7c3aed"
            emissive="#5b21b6"
            emissiveIntensity={0.9}
            metalness={0.55}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = t * 0.12;
    ref.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.2) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, -0.2, -1.4]}>
      <torusGeometry args={[4.4, 0.012, 8, 120]} />
      <meshBasicMaterial color="#9f6ef9" transparent opacity={0.35} />
    </mesh>
  );
}

export default function LogoScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // pausa o loop 3D quando o hero sai da tela ou a aba fica oculta
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 }
    );
    io.observe(el);
    const onVisibility = () => {
      if (document.hidden) setActive(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="logo-scene" aria-hidden="true" ref={wrapRef}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 8, 6]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-6, -3, 4]} intensity={40} color="#7c3aed" />
        <pointLight position={[5, -5, -3]} intensity={26} color="#9f6ef9" />
        <LogoMark />
        <OrbitRing />
        <Sparkles
          count={64}
          scale={[11, 8, 6]}
          size={2.2}
          speed={0.3}
          opacity={0.55}
          color="#9f6ef9"
        />
      </Canvas>
    </div>
  );
}
