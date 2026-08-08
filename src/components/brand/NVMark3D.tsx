"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildVHalf } from "./vGeometry";

/**
 * A MARCA NV EM TRÊS DIMENSÕES — peça de vitrine da home.
 *
 * As duas metades do V nascem afastadas e se encaixam no eixo (montagem),
 * depois entram em deriva: flutuação lenta, respiração das metades e
 * inclinação que segue o ponteiro. Metal cornflower com clearcoat e facetas
 * de esmalte MediumBlue que sobem do corpo por rampa — sem emissivo, para o
 * acento ganhar sombra em vez de virar mancha chapada. A luz vem de
 * lightformers (estúdio inline, sem HDR remoto), com um contraluz pálido só
 * para acender a quina do acento. A marca tem coluna própria no hero.
 */

const CORN = "#6495ed";
const BLUE = "#0000cd";
const PALE = "#d6e2fb";
const CHROME = "#c8d8fa";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Mark({ motion }: { motion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const t0 = useRef(0);
  const aim = useRef({ x: 0, y: 0 });

  const parts = useMemo(() => buildVHalf(), []);
  const mats = useMemo(() => {
    // A base da lâmina é PÁLIDA, não cornflower. No vetor o corpo é um
    // degradê que vai do branco ao #6495ED — quase todo claro; pintar a
    // malha de cornflower cheio afundava a peça num azul médio uniforme.
    // Aqui o claro é a cor de base e o cornflower nasce do estúdio, que é o
    // que dá a variação de face em face.
    const body = new THREE.MeshPhysicalMaterial({
      color: CHROME,
      metalness: 0.62,
      roughness: 0.24,
      envMapIntensity: 2.2,
      clearcoat: 1,
      clearcoatRoughness: 0.09,
    });
    // sem emissivo: luz própria apaga o degradê da rampa e é exatamente
    // isso que deixava o acento com cara de adesivo chapado. O relevo aqui
    // vem de reflexo, não de brilho.
    const facet = new THREE.MeshPhysicalMaterial({
      color: BLUE,
      metalness: 0.42,
      roughness: 0.32,
      envMapIntensity: 1.8,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      flatShading: true,
    });
    return { body, facet };
  }, []);

  useEffect(() => {
    return () => {
      parts.body.dispose();
      parts.facets.forEach((f) => f.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [parts, mats]);

  // inclinação segue o ponteiro (normalizado -1..1), amortecida no frame
  useEffect(() => {
    if (!motion) return;
    const onMove = (e: PointerEvent) => {
      aim.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      aim.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [motion]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (!t0.current) t0.current = state.clock.elapsedTime;
    const age = state.clock.elapsedTime - t0.current;
    const t = state.clock.elapsedTime;

    // montagem: as metades vêm de fora e travam no eixo (1.1s)
    const assemble = motion ? easeOut(Math.min(1, age / 1.1)) : 1;
    const gap = (1 - assemble) * 2.6 + (motion ? Math.sin(t * 0.6) * 0.045 : 0);
    if (right.current) right.current.position.x = gap;
    if (left.current) left.current.position.x = -gap;
    g.scale.setScalar(0.82 + assemble * 0.18);
    g.position.z = -1.2;

    if (!motion) {
      // sem animação, a peça ainda precisa da pose de três quartos
      g.rotation.set(0.08, -0.3, 0);
      return;
    }

    // deriva: flutuação + inclinação amortecida pelo ponteiro. O repouso é
    // deliberadamente torto — de frente, uma chapa extrudada não mostra
    // parede lateral nenhuma e volta a parecer recorte de papel.
    const ty = 0.34 - aim.current.y * 0.22;
    const tx = aim.current.x * 0.5;
    g.rotation.y += (-0.3 + tx * 0.55 + Math.sin(t * 0.4) * 0.14 - g.rotation.y) * Math.min(1, dt * 2.4);
    g.rotation.x += (0.08 - ty * 0.28 + Math.sin(t * 0.53) * 0.06 - g.rotation.x) * Math.min(1, dt * 2.4);
    g.position.y = Math.sin(t * 0.7) * 0.09;

  });

  return (
    <group ref={group}>
      {/* metade direita = a do vetor; esquerda = espelho em X */}
      <group ref={right}>
        <mesh geometry={parts.body} material={mats.body} />
        {parts.facets.map((f, i) => (
          <mesh key={i} geometry={f} material={mats.facet} />
        ))}
      </group>
      <group ref={left} scale={[-1, 1, 1]}>
        <mesh geometry={parts.body} material={mats.body} />
        {parts.facets.map((f, i) => (
          <mesh key={i} geometry={f} material={mats.facet} />
        ))}
      </group>
    </group>
  );
}

export default function NVMark3D({ className }: { className?: string }) {
  const [mode, setMode] = useState<"pending" | "gl" | "flat">("pending");
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = false;
    try {
      const c = document.createElement("canvas");
      gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      gl = false;
    }
    setMotion(!reduced);
    setMode(gl ? "gl" : "flat");
  }, []);

  // sem WebGL (ou antes de decidir): o vetor oficial segura a composição
  if (mode !== "gl") {
    return (
      <div className={`nv3d nv3d-flat ${className ?? ""}`}>
        <img src="/logo.svg" alt="" aria-hidden="true" width={280} height={206} />
      </div>
    );
  }

  return (
    <div className={`nv3d ${className ?? ""}`} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          // ACES puxava o MediumBlue pro violeta — a marca não tem esse matiz
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [0, 0, 10.4], fov: 38 }}
        frameloop={motion ? "always" : "demand"}
      >
        {/* ambiente baixo de propósito: é a sombra que desenha o relevo */}
        <ambientLight intensity={0.24} />
        <directionalLight position={[-3, 4, 6]} intensity={2.1} color="#ffffff" />
        <directionalLight position={[4, -2, 3]} intensity={0.6} color={CORN} />
        {/* contraluz rasante: acende a quina da rampa do acento, que é o
            único jeito de ler profundidade num azul quase preto */}
        <directionalLight position={[-5, -1, -4]} intensity={1.5} color={PALE} />
        <Mark motion={motion} />
        {/* metal a 0.9 quase só enxerga o ambiente: se o estúdio for pequeno,
            a peça inteira apaga. O softbox de cima é o que mantém a lâmina
            cromada em vez de azul-marinho. */}
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={3.2} position={[0, 7, 3]} rotation={[-Math.PI / 2, 0, 0]} scale={[12, 9, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={2.4} position={[-5, 3, 6]} scale={9} color="#ffffff" />
          <Lightformer form="rect" intensity={1.4} position={[6, -2, 3]} scale={7} color={CORN} />
          <Lightformer form="rect" intensity={1.6} position={[-6, 0, -3]} scale={[1, 8, 1]} color={PALE} />
          <Lightformer form="circle" intensity={0.7} position={[0, -4, 2]} scale={5} color={BLUE} />
        </Environment>
      </Canvas>
    </div>
  );
}
