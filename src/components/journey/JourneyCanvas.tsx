"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { detectTier, journey } from "./journeyState";
import CameraRig from "./CameraRig";
import AdaptiveQuality from "./AdaptiveQuality";
import Background from "./effects/Background";
import Particles from "./effects/Particles";
import HeroLogo from "./chapters/HeroLogo";
import IntroPlexus from "./blueprint/IntroPlexus";
import Ecosystem from "./chapters/Ecosystem";
import ServicesRing from "./chapters/ServicesRing";
import ExploreTunnel from "./chapters/ExploreTunnel";

/**
 * O canvas ÚNICO da jornada — todo o 3D da home vive aqui, numa só cena com
 * uma só câmera. Carregado via dynamic import (chunk three/fiber/drei fora do
 * bundle inicial). DPR inicial por tier; refinado em runtime pelo
 * AdaptiveQuality até segurar 90fps.
 */
export default function JourneyCanvas() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const update = () => setRunning(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const maxDpr = useMemo(() => {
    const tier = detectTier();
    journey.tier = tier;
    if (typeof window === "undefined") return 1.5;
    if (tier === 2) return Math.min(window.devicePixelRatio || 1, 2);
    if (tier === 1) return Math.min(window.devicePixelRatio || 1, 1.5);
    return 1.2;
  }, []);

  return (
    <div className="jy-canvas" aria-hidden="true">
      <Canvas
        dpr={maxDpr}
        frameloop={running ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: false,
          stencil: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true; // materialização da marca (clipping)
        }}
        camera={{ position: [0, 0.25, 8.6], fov: 55, near: 0.1, far: 160 }}
      >
        {/* CameraRig primeiro: publica journey.smooth antes dos capítulos */}
        <CameraRig />
        {/* névoa: o mundo emerge da atmosfera conforme a câmera viaja */}
        <fog attach="fog" args={["#050408", 14, 72]} />
        <Background />
        <Particles />

        <HeroLogo />
        <IntroPlexus />
        <Ecosystem />
        <ServicesRing />
        <ExploreTunnel />

        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#ffffff" />
        {/* reflexos para os metais (bake único, sem rede) */}
        <Environment resolution={64} frames={1}>
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[4, 3, 5]}
            scale={7}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={0.9}
            position={[-5, -1, 3]}
            scale={6}
            color="#dd3bc8"
          />
          <Lightformer
            form="circle"
            intensity={1.4}
            position={[0, 5, -4]}
            scale={5}
            color="#ffffff"
          />
        </Environment>

        <AdaptiveQuality start={maxDpr} min={0.75} />
      </Canvas>
    </div>
  );
}
