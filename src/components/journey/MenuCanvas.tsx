"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { detectTier, journey } from "./journeyState";
import Background from "./effects/Background";

/**
 * Canvas 3D do /menu — atmosfera da jornada da home (nebulosa violeta +
 * fagulhas), SEM a marca 3D: o palco é dos links.
 */
export default function MenuCanvas() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    journey.tier = detectTier();
    const update = () => setRunning(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div className="menu-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={running ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: false,
          stencil: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 7], fov: 55, near: 0.1, far: 60 }}
      >
        <Background progressOverride={0.5} />
        <Sparkles
          count={26}
          scale={[12, 8, 6]}
          size={2.2}
          speed={0.26}
          opacity={0.4}
          color="#a78bfa"
        />
        <ambientLight intensity={0.6} />
      </Canvas>
    </div>
  );
}
