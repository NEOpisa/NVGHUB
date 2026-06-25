"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { buildServiceIcon, disposeIcon, type ServiceKind } from "@/components/services/serviceIcons3d";
import { buildCrt } from "@/components/scene/crtMesh";

const KINDS: ServiceKind[] = ["site", "system", "seo", "support", "saas"];

/** Uma TV CRT grande: cada serviço é um "canal" exibido DENTRO da tela; ao
 *  rolar, o canal troca com efeito de ESTÁTICA. Conteúdo 3D real por trás do
 *  vidro CRT (scanlines/curvatura/glow). */
function Stage({ active }: { active: number }) {
  const holder = useRef<THREE.Group>(null);
  const stat = useRef(0);
  const flick = useRef(1);
  const shown = useRef(0);

  const { crt, icons, mats } = useMemo(() => {
    const crt = buildCrt("#6e54b0");
    const metal = new THREE.MeshPhysicalMaterial({
      color: "#cabbf0", metalness: 1.0, roughness: 0.16, envMapIntensity: 1.5,
      clearcoat: 1, clearcoatRoughness: 0.1,
      emissive: new THREE.Color("#332a52"), emissiveIntensity: 0.25, side: THREE.DoubleSide,
    });
    const accent = new THREE.MeshPhysicalMaterial({
      color: "#8a6fd0", metalness: 0.6, roughness: 0.22, envMapIntensity: 1.3,
      clearcoat: 1, clearcoatRoughness: 0.14,
      emissive: new THREE.Color("#7a5fc4"), emissiveIntensity: 1.25, side: THREE.DoubleSide,
    });
    const icons = KINDS.map((k) => buildServiceIcon(k, metal, accent));
    icons.forEach((g, i) => {
      g.scale.setScalar(0.8);
      g.visible = i === 0;
      crt.content.add(g);
    });
    return { crt, icons, mats: { metal, accent } };
  }, []);

  useEffect(() => {
    return () => {
      icons.forEach(disposeIcon);
      mats.metal.dispose();
      mats.accent.dispose();
      crt.dispose();
    };
  }, [icons, mats, crt]);

  // troca de canal com estática quando o índice muda
  useEffect(() => {
    if (active === shown.current) return;
    const next = active;
    const tl = gsap.timeline();
    tl.to(stat, {
      current: 1, duration: 0.16, ease: "power2.in",
      onComplete: () => {
        icons.forEach((g, i) => { g.visible = i === next; });
        shown.current = next;
        const g = icons[next];
        if (g) gsap.fromTo(g.scale, { x: 0.55, y: 0.55, z: 0.55 }, { x: 0.8, y: 0.8, z: 0.8, duration: 0.4, ease: "back.out(2)" });
      },
    });
    tl.to(stat, { current: 0, duration: 0.34, ease: "power2.out" });
    return () => void tl.kill();
  }, [active, icons]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    crt.uniforms.uTime.value += Math.min(delta, 0.05);
    flick.current += ((Math.random() < 0.03 ? 0.5 + Math.random() * 0.5 : 1) - flick.current) * 0.3;
    crt.uniforms.uStatic.value = stat.current;
    crt.uniforms.uFlick.value = flick.current;

    // o canal "transmite" o conteúdo virado pra frente, com leve balanço
    const g = icons[shown.current];
    if (g) {
      g.rotation.y = Math.sin(t * 0.6) * 0.5;
      g.rotation.x = Math.sin(t * 0.4) * 0.1;
      g.position.y = Math.sin(t * 0.8) * 0.1;
    }

    const h = holder.current;
    if (h) {
      h.rotation.y = Math.sin(t * 0.25) * 0.16;
      h.rotation.x = Math.sin(t * 0.4) * 0.05;
      h.position.y = Math.sin(t * 0.6) * 0.08;
      h.scale.setScalar(state.size.width < 768 ? 0.6 : 0.92);
    }
  });

  return (
    <group ref={holder}>
      <primitive object={crt.group} />
    </group>
  );
}

/**
 * Canvas da galeria: uma TV CRT grande onde os serviços passam como CANAIS
 * (troca com estática ao rolar). Texto/infos ficam no DOM por cima (SEO). Ativa
 * o frameloop só quando a seção está visível.
 */
export default function ServicesGalleryCanvas({ active, running }: { active: number; running: boolean }) {
  return (
    <Canvas
      className="services-gl-canvas"
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#e7dcff" />
      <pointLight position={[-5, -2, 4]} intensity={30} color="#6e54b0" />
      <pointLight position={[0, 0, 4]} intensity={14} color="#cbbef0" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={1.6} position={[4, 3, 5]} scale={7} color="#a98bff" />
        <Lightformer form="rect" intensity={1.0} position={[-5, -1, 3]} scale={6} color="#4b3a78" />
        <Lightformer form="circle" intensity={1.3} position={[0, 5, -4]} scale={5} color="#ffffff" />
      </Environment>
      <Stage active={active} />
    </Canvas>
  );
}
