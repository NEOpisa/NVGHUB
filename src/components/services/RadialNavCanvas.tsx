"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const COUNT = 6;

function RingScene() {
  const ring = useRef<THREE.Mesh>(null);
  const hub = useRef<THREE.Mesh>(null);
  const nodes = useRef<THREE.Group>(null);

  const nodePos = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const a = (i / COUNT) * Math.PI * 2 - Math.PI / 2;
        return new THREE.Vector3(Math.cos(a) * 3, Math.sin(a) * 3, 0);
      }),
    []
  );

  useFrame((state, d) => {
    if (ring.current) ring.current.rotation.z += d * 0.08;
    if (hub.current) { hub.current.rotation.y += d * 0.5; hub.current.rotation.x += d * 0.2; }
    if (nodes.current) {
      nodes.current.rotation.z += d * 0.08;
      nodes.current.children.forEach((c, i) => {
        c.scale.setScalar(0.9 + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.12);
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#e7dcff" />
      <pointLight position={[-5, -2, 4]} intensity={26} color="#7c3aed" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={1.8} position={[4, 3, 5]} scale={7} color="#b89bff" />
        <Lightformer form="circle" intensity={1.4} position={[0, 5, -4]} scale={5} color="#ffffff" />
      </Environment>

      <mesh ref={ring}>
        <torusGeometry args={[3, 0.04, 12, 90]} />
        <meshStandardMaterial color="#9f6ef9" emissive="#7c3aed" emissiveIntensity={1.4} metalness={0.4} roughness={0.4} />
      </mesh>

      <mesh ref={hub}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#b08bff" metalness={0.92} roughness={0.18} envMapIntensity={1.6} emissive="#5b21b6" emissiveIntensity={0.5} />
      </mesh>

      <group ref={nodes}>
        {nodePos.map((p, i) => (
          <mesh key={i} position={p}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color="#cdbdf6" metalness={0.95} roughness={0.16} envMapIntensity={1.5} emissive="#a855f7" emissiveIntensity={0.6} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function RadialNavCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 8], fov: 45 }}>
      <RingScene />
    </Canvas>
  );
}
