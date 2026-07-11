"use client";

import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { detectTier, journey } from "./journeyState";
import CameraRig from "./CameraRig";
import AdaptiveQuality from "./AdaptiveQuality";
import Background from "./effects/Background";
import AmbientWorld from "./effects/AmbientWorld";
import PostFX from "./effects/PostFX";
import Particles from "./effects/Particles";
import HeroLogo from "./chapters/HeroLogo";
import IntroPlexus from "./blueprint/IntroPlexus";
import Ecosystem from "./chapters/Ecosystem";
import ServicesRing from "./chapters/ServicesRing";
import ExploreTunnel from "./chapters/ExploreTunnel";

/**
 * #093 · Error boundary do 3D: se o WebGL/three falhar em runtime (driver,
 * contexto perdido, shader), o erro NÃO derruba a árvore React — o canvas
 * degrada para um fundo estático escuro e o resto do site (overlay, copy,
 * navegação) continua funcionando.
 */
class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    // um registro único e silencioso — sem spam de console em produção
    console.warn("[journey] WebGL falhou; caindo para fundo estático.", err);
  }
  render() {
    if (this.state.failed)
      return <div className="jy-canvas jy-canvas-loading" aria-hidden="true" />;
    return this.props.children;
  }
}

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
    // #067 · telas pequenas/touch têm DPR físico alto (2–3) e GPU fraca:
    // teto extra por tier — em 390px de largura, 1.3x já é visualmente denso
    // e corta ~45% dos fragments vs 1.75x.
    const small =
      window.innerWidth < 768 ||
      !!window.matchMedia?.("(pointer: coarse)").matches;
    const cap = tier === 2 ? (small ? 1.35 : 1.75) : tier === 1 ? (small ? 1.25 : 1.5) : small ? 1.0 : 1.2;
    return Math.min(window.devicePixelRatio || 1, cap);
  }, []);

  return (
    <div className="jy-canvas" aria-hidden="true">
      <CanvasBoundary>
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
        <AmbientWorld />

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
            color="#6c5cff"
          />
          <Lightformer
            form="circle"
            intensity={1.4}
            position={[0, 5, -4]}
            scale={5}
            color="#ffffff"
          />
        </Environment>

        <PostFX />
        <AdaptiveQuality start={maxDpr} min={0.75} />
      </Canvas>
      </CanvasBoundary>
    </div>
  );
}
