"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { buildVHalf } from "./vGeometry";

function Mark() {
  const group = useRef<THREE.Group>(null);
  const parts = useMemo(() => buildVHalf(), []);
  const { size } = useThree();
  // Fit both dimensions: a narrow mobile stage must not crop the wing tips.
  const zoom = Math.min(size.width / 8.4, size.height / 7.2);

  useFrame((state, delta) => {
    const mark = group.current;
    if (!mark) return;
    const dt = Math.min(delta, .05);
    mark.rotation.y = THREE.MathUtils.damp(mark.rotation.y, -.16 + state.pointer.x * .10 + Math.sin(state.clock.elapsedTime * .25) * .035, 3, dt);
    mark.rotation.x = THREE.MathUtils.damp(mark.rotation.x, -.08 - state.pointer.y * .08, 3, dt);
    // Both halves stay joined; restrained movement preserves the silhouette.
    mark.position.y = Math.sin(state.clock.elapsedTime * .45) * .035;
  });

  return <>
    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={zoom} near={.1} far={30} />
    <group ref={group} rotation={[-.08, -.16, 0]}>
      {[1, -1].map(side => <group key={side} scale={[side, 1, 1]}>
        <mesh geometry={parts.body}>
          <meshStandardMaterial color="#6495ed" metalness={.65} roughness={.3} />
        </mesh>
        {parts.facets.map((geometry, i) => <mesh key={i} geometry={geometry}>
          <meshStandardMaterial color="#304c91" metalness={.5} roughness={.36} />
        </mesh>)}
      </group>)}
      <Cleanup parts={parts} />
    </group>
  </>;
}

function Cleanup({ parts }: { parts: ReturnType<typeof buildVHalf> }) {
  useEffect(() => () => { parts.body.dispose(); parts.facets.forEach(part => part.dispose()); }, [parts]);
  return null;
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}

export default function VScene({ active, onFailure }: { active: boolean; onFailure: () => void }) {
  return <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "demand"}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
    <hemisphereLight args={["#c4d8ff", "#101a35", 1.4]} />
    <directionalLight position={[-3, 5, 6]} intensity={2.4} color="#dce8ff" />
    <directionalLight position={[4, -1, 4]} intensity={1.6} color="#6495ED" />
    <Mark />
    <ContextGuard onFailure={onFailure} />
  </Canvas>;
}
