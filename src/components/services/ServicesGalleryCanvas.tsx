"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildServiceIcon, disposeIcon, type ServiceKind } from "@/components/services/serviceIcons3d";
import { buildCrt } from "@/components/scene/crtMesh";

const KINDS: ServiceKind[] = ["site", "system", "seo", "support", "saas"];

/** Uma TV CRT grande: cada serviço é um "canal" exibido DENTRO da tela; ao
 *  rolar, o canal troca com efeito de ESTÁTICA. Conteúdo 3D real por trás do
 *  vidro CRT (scanlines/curvatura/glow). A troca é uma máquina de estado no
 *  useFrame (determinística): sobe a estática, troca o canal no pico, desce. */
function Stage({ active }: { active: number }) {
  const holder = useRef<THREE.Group>(null);
  const flick = useRef(1);
  const pop = useRef(1);
  const shown = useRef(0);
  const target = useRef(0);
  const changeT = useRef(-10);

  const { crt, icons, scales, mats } = useMemo(() => {
    const crt = buildCrt("#6e54b0");
    const metal = new THREE.MeshPhysicalMaterial({
      color: "#d7ccf4", metalness: 0.9, roughness: 0.22, envMapIntensity: 1.8,
      clearcoat: 1, clearcoatRoughness: 0.12,
      emissive: new THREE.Color("#494069"), emissiveIntensity: 0.5, side: THREE.DoubleSide,
    });
    const accent = new THREE.MeshPhysicalMaterial({
      color: "#9a80e0", metalness: 0.5, roughness: 0.25, envMapIntensity: 1.4,
      clearcoat: 1, clearcoatRoughness: 0.16,
      emissive: new THREE.Color("#8a6fd0"), emissiveIntensity: 1.9, side: THREE.DoubleSide,
    });
    const icons = KINDS.map((k) => buildServiceIcon(k, metal, accent));
    // auto-fit: cada ícone é escalado pra caber bem dentro da tela
    const _v = new THREE.Vector3();
    const scales = icons.map((g) => {
      const s = new THREE.Box3().setFromObject(g).getSize(_v);
      const sc = Math.min(2.1 / Math.max(s.x, 0.01), 1.7 / Math.max(s.y, 0.01), 1.8);
      return Number.isFinite(sc) && sc > 0 ? sc : 0.9;
    });
    icons.forEach((g, i) => {
      g.scale.setScalar(scales[i]);
      g.visible = i === 0;
      // sem frustum culling (a bounding sphere pode ficar stale após o
      // translate de centralização e sumir com o ícone)
      g.traverse((o) => {
        o.frustumCulled = false;
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.computeBoundingSphere();
      });
      crt.content.add(g);
    });
    return { crt, icons, scales, mats: { metal, accent } };
  }, []);

  useEffect(() => {
    return () => {
      icons.forEach(disposeIcon);
      mats.metal.dispose();
      mats.accent.dispose();
      crt.dispose();
    };
  }, [icons, mats, crt]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    crt.uniforms.uTime.value += dt;
    flick.current += ((Math.random() < 0.03 ? 0.5 + Math.random() * 0.5 : 1) - flick.current) * 0.3;

    // troca de canal: estática calculada pelo TEMPO desde a mudança (robusto a
    // qualquer fps) — sobe rápido, troca o canal no pico, desce. É um flash.
    if (active !== target.current) { target.current = active; changeT.current = t; }
    const since = t - changeT.current;
    const stat = since >= 0.45 ? 0 : since < 0.13 ? since / 0.13 : Math.max(0, 1 - (since - 0.13) / 0.32);
    if (since >= 0.13 && shown.current !== target.current) { shown.current = target.current; pop.current = 0; }
    crt.uniforms.uStatic.value = stat;
    crt.uniforms.uFlick.value = flick.current;

    // só o canal atual visível (determinístico); some no pico da estática pra a
    // troca acontecer "escondida" atrás do ruído
    for (let i = 0; i < icons.length; i++) icons[i].visible = i === shown.current && stat < 0.6;
    const g = icons[shown.current];
    if (g) {
      pop.current = Math.min(1, pop.current + dt * 3);
      g.scale.setScalar(scales[shown.current] * (0.82 + 0.18 * pop.current));
      g.rotation.y = Math.sin(t * 0.5) * 0.12;
      g.rotation.x = Math.sin(t * 0.4) * 0.04;
      // conteúdo um pouco à frente do vidro (senão a tela CRT o oclui)
      g.position.set(0, Math.sin(t * 0.8) * 0.05, 0.55);
    }

    const h = holder.current;
    if (h) {
      h.rotation.y = Math.sin(t * 0.22) * 0.06;
      h.rotation.x = Math.sin(t * 0.4) * 0.025;
      h.position.y = Math.sin(t * 0.6) * 0.06;
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
export default function ServicesGalleryCanvas({ active }: { active: number; running?: boolean }) {
  return (
    <Canvas
      className="services-gl-canvas"
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={3.0} color="#e7dcff" />
      <pointLight position={[-5, -2, 4]} intensity={34} color="#6e54b0" />
      <pointLight position={[0, 0.4, 4.5]} intensity={45} color="#d7ccf4" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={1.6} position={[4, 3, 5]} scale={7} color="#a98bff" />
        <Lightformer form="rect" intensity={1.0} position={[-5, -1, 3]} scale={6} color="#4b3a78" />
        <Lightformer form="circle" intensity={1.3} position={[0, 5, -4]} scale={5} color="#ffffff" />
      </Environment>
      <Stage active={active} />
    </Canvas>
  );
}
