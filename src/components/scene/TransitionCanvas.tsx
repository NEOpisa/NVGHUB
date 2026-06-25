"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { txBus } from "@/components/scene/transitionBus";

/**
 * Animação das "portas": dois painéis escuros que se fecham para cobrir a tela
 * (cover) e se abrem para revelar a nova área (reveal). A logo da Neovanguard se
 * forma no meio (duas metades) e se RASGA ao abrir — "vai pro meio e se abre pra
 * dar espaço pra nova área". O `p` (0 aberto → 1 fechado) é dirigido por GSAP.
 */
function Doors({ onActive }: { onActive: (a: boolean) => void }) {
  const { viewport } = useThree();
  const leftDoor = useRef<THREE.Group>(null);
  const rightDoor = useRef<THREE.Group>(null);
  const leftLogo = useRef<THREE.Mesh>(null);
  const rightLogo = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Group>(null);
  const p = useRef({ v: 0 }); // 0 = aberto/escondido, 1 = fechado/coberto

  const tex = useTexture("/logo.png");
  // duas metades da mesma textura (esquerda / direita)
  const [texL, texR] = useMemo(() => {
    const l = tex.clone();
    l.repeat.set(0.5, 1);
    l.offset.set(0, 0);
    l.needsUpdate = true;
    const r = tex.clone();
    r.repeat.set(0.5, 1);
    r.offset.set(0.5, 0);
    r.needsUpdate = true;
    return [l, r];
  }, [tex]);

  useEffect(() => {
    let coverTl: gsap.core.Timeline | null = null;
    const off = txBus.on((e) => {
      if (e === "cover") {
        gsap.killTweensOf(p.current);
        onActive(true);
        coverTl = gsap.timeline().to(p.current, {
          v: 1,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => txBus.emit("covered"),
        });
      } else if (e === "reveal") {
        coverTl?.kill();
        gsap.killTweensOf(p.current);
        gsap.to(p.current, {
          v: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => onActive(false),
        });
      }
    });
    return () => {
      off();
      coverTl?.kill();
    };
  }, [onActive]);

  useFrame(() => {
    const vw = viewport.width;
    const vh = viewport.height;
    const v = p.current.v;
    const panelW = vw * 0.7;
    const lw = vh * 0.3; // largura total da logo
    const lh = lw / 1.34; // proporção ~ do /logo.png

    const ld = leftDoor.current;
    const rd = rightDoor.current;
    if (ld) {
      ld.position.x = -vw * 0.35 - (1 - v) * vw;
      const panel = ld.children[0] as THREE.Mesh;
      panel.scale.set(panelW, vh * 1.3, 1);
    }
    if (rd) {
      rd.position.x = vw * 0.35 + (1 - v) * vw;
      const panel = rd.children[0] as THREE.Mesh;
      panel.scale.set(panelW, vh * 1.3, 1);
    }
    // metades da logo: posicionadas no vão central de cada porta
    const op = THREE.MathUtils.clamp(v * 1.4 - 0.1, 0, 1);
    if (leftLogo.current) {
      leftLogo.current.scale.set(lw / 2, lh, 1);
      leftLogo.current.position.x = vw * 0.35 - lw / 4;
      (leftLogo.current.material as THREE.MeshBasicMaterial).opacity = op;
    }
    if (rightLogo.current) {
      rightLogo.current.scale.set(lw / 2, lh, 1);
      rightLogo.current.position.x = -vw * 0.35 + lw / 4;
      (rightLogo.current.material as THREE.MeshBasicMaterial).opacity = op;
    }
  });

  return (
    <group ref={root}>
      <group ref={leftDoor}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#08080b" />
        </mesh>
        <mesh ref={leftLogo} position={[0, 0, 0.1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texL} transparent opacity={0} toneMapped={false} />
        </mesh>
      </group>
      <group ref={rightDoor}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#08080b" />
        </mesh>
        <mesh ref={rightLogo} position={[0, 0, 0.1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texR} transparent opacity={0} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function TransitionCanvas() {
  const [active, setActive] = useState(false);

  return (
    <div className={`page-transition-gl ${active ? "is-active" : ""}`} aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 1 }}
        dpr={1}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true }}
      >
        <Doors onActive={setActive} />
      </Canvas>
    </div>
  );
}
