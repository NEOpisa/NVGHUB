"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildServiceIcon, disposeIcon, type ServiceKind } from "@/components/services/serviceIcons3d";

const KINDS: ServiceKind[] = ["site", "system", "seo", "support", "saas"];

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/** Galeria de ÍCONES 3D (sem TV): cada serviço é um ícone flutuante. Ao rolar,
 *  o ícone atual encolhe/gira saindo e o novo entra com "pop". Máquina de
 *  estado no useFrame (determinística por tempo, robusta a qualquer fps). */
function Stage({ active }: { active: number }) {
  const holder = useRef<THREE.Group>(null);
  const pop = useRef(1);
  const shown = useRef(0);
  const target = useRef(0);
  const changeT = useRef(-10);

  const { content, icons, scales, mats } = useMemo(() => {
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
    // auto-fit: cada ícone preenche um alvo de mundo (~3 un) — maior, já que não
    // há mais a moldura da TV ao redor.
    const _v = new THREE.Vector3();
    const scales = icons.map((g) => {
      const s = new THREE.Box3().setFromObject(g).getSize(_v);
      const sc = Math.min(3.0 / Math.max(s.x, 0.01), 2.7 / Math.max(s.y, 0.01), 2.4);
      return Number.isFinite(sc) && sc > 0 ? sc : 1.2;
    });
    const content = new THREE.Group();
    icons.forEach((g, i) => {
      g.scale.setScalar(scales[i]);
      g.visible = i === 0;
      // sem frustum culling (bounding sphere fica stale após a centralização)
      g.traverse((o) => {
        o.frustumCulled = false;
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.computeBoundingSphere();
      });
      content.add(g);
    });
    return { content, icons, scales, mats: { metal, accent } };
  }, []);

  useEffect(() => {
    return () => {
      icons.forEach(disposeIcon);
      mats.metal.dispose();
      mats.accent.dispose();
    };
  }, [icons, mats]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // troca de ícone por TEMPO desde a mudança: encolhe o antigo (0–0.16s),
    // troca no fundo, e faz o novo entrar com pop. (materiais são compartilhados
    // entre ícones, então a transição é por escala/rotação, não opacidade.)
    if (active !== target.current) { target.current = active; changeT.current = t; }
    const since = t - changeT.current;
    const swapping = shown.current !== target.current;
    if (since >= 0.16 && swapping) { shown.current = target.current; pop.current = 0; }

    for (let i = 0; i < icons.length; i++) icons[i].visible = i === shown.current;
    const g = icons[shown.current];
    if (g) {
      let s: number;
      if (swapping) {
        // ainda mostrando o antigo → encolhe pra fora
        const k = Math.min(since / 0.16, 1);
        s = scales[shown.current] * (1 - easeOutCubic(k));
      } else {
        pop.current = Math.min(1, pop.current + dt * 3.4);
        const e = easeOutCubic(pop.current);
        s = scales[shown.current] * (0.18 + 0.82 * e + 0.06 * Math.sin(pop.current * Math.PI));
      }
      g.scale.setScalar(Math.max(s, 0.0001));
      g.rotation.y = Math.sin(t * 0.5) * 0.16 + (1 - pop.current) * 1.1;
      g.rotation.x = Math.sin(t * 0.4) * 0.05;
      g.position.set(0, Math.sin(t * 0.8) * 0.07, 0);
    }

    const h = holder.current;
    if (h) {
      h.rotation.y = Math.sin(t * 0.22) * 0.07;
      h.rotation.x = Math.sin(t * 0.4) * 0.03;
      h.position.y = Math.sin(t * 0.6) * 0.07;
      h.scale.setScalar(state.size.width < 768 ? 0.78 : 1.0);
    }
  });

  return (
    <group ref={holder}>
      <primitive object={content} />
    </group>
  );
}

/**
 * Canvas da galeria de ícones 3D. Texto/infos ficam no DOM por cima (SEO).
 * O frameloop só roda quando a seção está visível (economiza GPU/bateria).
 */
export default function ServicesGalleryCanvas({ active, running = true }: { active: number; running?: boolean }) {
  return (
    <Canvas
      className="services-gl-canvas"
      dpr={[1, 1.75]}
      frameloop={running ? "always" : "never"}
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
