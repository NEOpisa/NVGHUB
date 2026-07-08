"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { detectTier, journey } from "@/components/journey/journeyState";
import AdaptiveQuality from "@/components/journey/AdaptiveQuality";
import Background from "@/components/journey/effects/Background";
import Particles from "@/components/journey/effects/Particles";
import HeroLogo from "@/components/journey/chapters/HeroLogo";
import IntroPlexus from "@/components/journey/blueprint/IntroPlexus";
import ForkGate from "./ForkGate";

/**
 * Canvas ÚNICO da voyage — atmosfera (nebulosa indigo sobre preto puro +
 * estrelas/poeira), a marca NV 3D (com a intro blueprint) e o FORK GATE
 * (a bifurcação 3D final). Sem planetas, sem cenários pesados: a viagem
 * vem da CÂMERA NOVA (voo em keyframes), da nebulosa que anda com o
 * progresso e da coreografia DOM. Tudo MONO indigo até os metais do portal.
 */

/* ── CÂMERA NOVA: voo cinematográfico em keyframes ──
   hero (marca à direita) → arco à esquerda → contra-arco no DNA →
   aproximação frontal → parada diante das duas estelas. */
const KFS = [
  { p: 0.0, pos: [0, 0.25, 8.6], look: [0, 0.1, 0] },
  { p: 0.22, pos: [-0.9, 0.55, 7.7], look: [0.3, 0, 0] },
  { p: 0.48, pos: [0.7, -0.12, 7.0], look: [-0.1, 0.1, 0.7] },
  { p: 0.74, pos: [0, 0.22, 6.8], look: [0, 0.05, 2.0] },
  { p: 1.0, pos: [0, 0.1, 6.3], look: [0, 0.05, 3.4] },
] as const;

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

function sampleKfs(p: number, out: THREE.Vector3, key: "pos" | "look") {
  let i = 0;
  while (i < KFS.length - 2 && p > KFS[i + 1].p) i++;
  const k0 = KFS[i];
  const k1 = KFS[i + 1];
  const l = THREE.MathUtils.clamp((p - k0.p) / (k1.p - k0.p), 0, 1);
  const e = l * l * (3 - 2 * l); // smoothstep por trecho
  _a.set(k0[key][0], k0[key][1], k0[key][2]);
  _b.set(k1[key][0], k1[key][1], k1[key][2]);
  out.lerpVectors(_a, _b, e);
}

function VoyageRig() {
  const { camera } = useThree();
  useFrame((state, dt) => {
    // publica o progresso suavizado ANTES dos demais useFrame lerem
    journey.smooth = THREE.MathUtils.damp(
      journey.smooth,
      journey.progress,
      4.2,
      dt,
    );
    const sm = journey.smooth;
    const t = state.clock.elapsedTime;

    sampleKfs(sm, _pos, "pos");
    sampleKfs(sm, _look, "look");

    // respiração orgânica + paralaxe do ponteiro
    const bobX = Math.sin(t * 0.16) * 0.07 + state.pointer.x * 0.3;
    const bobY = Math.cos(t * 0.13) * 0.05 + state.pointer.y * 0.16;

    camera.position.set(_pos.x + bobX, _pos.y + bobY, _pos.z);
    camera.lookAt(_look.x + bobX * 0.4, _look.y + bobY * 0.4, _look.z);
    journey.camZ = camera.position.z;
  });
  return null;
}

export default function VoyageCanvas() {
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
    <div className="vy-canvas" aria-hidden="true">
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
        <VoyageRig />
        {/* névoa preta pura: o mundo emerge da atmosfera */}
        <fog attach="fog" args={["#000000", 14, 72]} />
        <Background />
        <Particles />

        <HeroLogo />
        <IntroPlexus />
        <ForkGate />

        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#ffffff" />
        {/* reflexos para os metais (bake único, sem rede) */}
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={1.6} position={[4, 3, 5]} scale={7} color="#ffffff" />
          <Lightformer form="rect" intensity={0.9} position={[-5, -1, 3]} scale={6} color="#6c5cff" />
          <Lightformer form="circle" intensity={1.4} position={[0, 5, -4]} scale={5} color="#ffffff" />
        </Environment>

        <AdaptiveQuality start={maxDpr} min={0.75} />
      </Canvas>
    </div>
  );
}
