"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

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
    bevelThickness: 0.07,
    bevelSize: 0.05,
    bevelSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

function LogoMark() {
  const groupRef = useRef<THREE.Group>(null);
  const whiteRef = useRef<THREE.Mesh>(null);
  const purpleRef = useRef<THREE.Mesh>(null);
  const built = useRef(0); // 0→1: quanto a logo já se montou (libera o mouse-look)

  const whiteGeo = useMemo(() => buildGeometry(WHITE_POINTS, 0.55), []);
  const purpleGeo = useMemo(() => buildGeometry(PURPLE_POINTS, 0.75), []);

  // Montagem estilo igloo: as peças entram voando dos cantos (3D), girando, e se
  // encaixam na forma final. O "olhar pro mouse" só entra depois de montar.
  useEffect(() => {
    const w = whiteRef.current;
    const p = purpleRef.current;
    if (!w || !p) return;
    const prog = { v: 0 };
    const tl = gsap.timeline({ onUpdate: () => (built.current = prog.v) });
    tl.to(w.position, { x: 0, y: 0, z: -0.28, duration: 1.7, ease: "expo.out" }, 0.0)
      .to(w.rotation, { x: 0, y: 0, z: 0, duration: 1.8, ease: "expo.out" }, 0.0)
      .to(w.scale, { x: 1, y: 1, z: 1, duration: 1.3, ease: "back.out(1.5)" }, 0.1)
      .to(p.position, { x: 0, y: 0, z: 0.34, duration: 1.7, ease: "expo.out" }, 0.3)
      .to(p.rotation, { x: 0, y: 0, z: 0, duration: 1.8, ease: "expo.out" }, 0.3)
      .to(p.scale, { x: 1, y: 1, z: 1, duration: 1.3, ease: "back.out(1.5)" }, 0.4)
      .to(prog, { v: 1, duration: 1.9, ease: "power2.out" }, 0.0);
    return () => {
      tl.kill();
    };
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const b = built.current; // o "olhar pro mouse" entra conforme a logo monta
    const tgtY = (state.pointer.x * 0.9 + Math.sin(t * 0.3) * 0.22) * b;
    const tgtX = (-state.pointer.y * 0.6 + Math.sin(t * 0.22) * 0.1) * b;
    g.rotation.y += (tgtY - g.rotation.y) * 0.07;
    g.rotation.x += (tgtX - g.rotation.x) * 0.07;
    g.rotation.z = Math.sin(t * 0.15) * 0.06 * b;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.9}>

        <mesh
          ref={whiteRef}
          geometry={whiteGeo}
          position={[-3.4, 2.1, -2.8]}
          rotation={[0.9, -1.4, 0.6]}
          scale={0.08}
        >
          <meshStandardMaterial
            color="#e8e8ee"
            metalness={0.85}
            roughness={0.28}
          />
        </mesh>

        <mesh
          ref={purpleRef}
          geometry={purpleGeo}
          position={[3.6, -2.3, 2.8]}
          rotation={[-0.7, 1.5, -0.5]}
          scale={0.08}
        >
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#5b21b6"
            emissiveIntensity={0.9}
            metalness={0.55}
            roughness={0.3}
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
      <torusGeometry args={[4.4, 0.012, 6, 64]} />
      <meshBasicMaterial color="#9f6ef9" transparent opacity={0.35} />
    </mesh>
  );
}

export default function LogoScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

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
        dpr={1}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 38 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 6]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-6, -3, 4]} intensity={42} color="#7c3aed" />
        <LogoMark />
        <OrbitRing />
        <Sparkles
          count={16}
          scale={[11, 8, 6]}
          size={2.2}
          speed={0.25}
          opacity={0.45}
          color="#9f6ef9"
        />
      </Canvas>
    </div>
  );
}
