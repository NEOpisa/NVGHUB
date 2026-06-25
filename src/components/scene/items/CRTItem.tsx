"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useDomAnchor } from "@/components/scene/useDomAnchor";
import { buildLogoChunks } from "@/components/scene/logoGeometry";
import { buildCrt } from "@/components/scene/crtMesh";
import { txBus } from "@/components/scene/transitionBus";

// A entrada "power-on" só toca no 1º load/reload (escopo de módulo).
let powerOnPlayed = false;

/**
 * Mascote NeoVision: uma TV CRT 3D (gabinete industrial sóbrio) com o símbolo NV
 * em 3D girando DENTRO da tela, sob scanlines/curvatura/glow roxo sóbrio. Item da
 * cena global, ancorado ao `.hero-visual`. Entrada "power-on" só no 1º load; em
 * loop faz float + flicker/estática ocasional. Some na transição (txBus "cover").
 */
export default function CRTItem({
  anchorRef,
  enabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lookRef = useRef<THREE.Group>(null);
  const on = useRef(0);
  const flick = useRef(1);
  const stat = useRef(0);
  const glow = useRef(0);
  const fade = useRef(1);
  const suppressed = useRef(false);

  const { crt, logoGroup, logoMats, disposables } = useMemo(() => {
    const crt = buildCrt("#6e54b0");

    // símbolo NV 3D dentro da tela (marca montada, gira/flutua)
    const white = new THREE.MeshPhysicalMaterial({
      color: "#d2c8ee", metalness: 0.92, roughness: 0.16,
      emissive: new THREE.Color("#6e54b0"), emissiveIntensity: 0.3,
      envMapIntensity: 1.4, clearcoat: 1, clearcoatRoughness: 0.1,
    });
    const purple = new THREE.MeshPhysicalMaterial({
      color: "#6e54b0", metalness: 0.85, roughness: 0.2,
      emissive: new THREE.Color("#7a5fc4"), emissiveIntensity: 0.9,
      envMapIntensity: 1.5, clearcoat: 1, clearcoatRoughness: 0.12,
    });
    const lp = buildLogoChunks(3, 2);
    const logoGroup = new THREE.Group();
    const disp: THREE.BufferGeometry[] = [];
    [...lp.white.map((c) => ({ c, m: white })), ...lp.purple.map((c) => ({ c, m: purple }))].forEach(({ c, m }) => {
      const mesh = new THREE.Mesh(c.geometry, m);
      mesh.position.copy(c.pivot);
      logoGroup.add(mesh);
      disp.push(c.geometry);
    });
    logoGroup.scale.setScalar(0.34);
    crt.content.add(logoGroup);

    return { crt, logoGroup, logoMats: { white, purple }, disposables: disp };
  }, []);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.12, enabled });

  useEffect(() => {
    const off = txBus.on((e) => {
      if (e === "cover") suppressed.current = true;
      else if (e === "reveal") suppressed.current = false;
    });
    return () => { off(); };
  }, []);

  // power-on (só 1º load): flicker → estabiliza + squish vertical
  useLayoutEffect(() => {
    if (powerOnPlayed) { on.current = 1; return; }
    powerOnPlayed = true;
    const o = { v: 0 };
    const tl = gsap.timeline({ onUpdate: () => (on.current = o.v) });
    tl.to(o, { v: 0.6, duration: 0.06 }).to(o, { v: 0.04, duration: 0.05 })
      .to(o, { v: 0.95, duration: 0.05 }).to(o, { v: 0.2, duration: 0.06 })
      .to(o, { v: 1.0, duration: 0.5, ease: "power2.out" });
    if (lookRef.current) gsap.fromTo(lookRef.current.scale, { y: 0.03 }, { y: 1, duration: 0.55, ease: "back.out(1.5)" });
    return () => void tl.kill();
  }, []);

  useEffect(() => {
    return () => {
      crt.dispose();
      disposables.forEach((g) => g.dispose());
      logoMats.white.dispose();
      logoMats.purple.dispose();
    };
  }, [crt, disposables, logoMats]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    crt.uniforms.uTime.value += Math.min(delta, 0.05);

    // flicker + estática ocasional (glitch retrô)
    flick.current += ((Math.random() < 0.04 ? 0.35 + Math.random() * 0.65 : 1) - flick.current) * 0.3;
    if (stat.current < 0.01 && Math.random() < 0.004) stat.current = 0.6;
    stat.current *= 0.82;
    crt.uniforms.uOn.value = on.current;
    crt.uniforms.uFlick.value = flick.current;
    crt.uniforms.uStatic.value = stat.current;

    // logo 3D viva dentro da tela: gira devagar + reage ao mouse + glow pulsa
    glow.current = 0.5 + 0.5 * Math.sin(t * 0.8);
    logoMats.white.emissiveIntensity = (0.25 + glow.current * 0.5) * on.current;
    logoMats.purple.emissiveIntensity = (0.7 + glow.current * 0.7) * on.current;
    logoGroup.rotation.y = Math.sin(t * 0.4) * 0.5 + state.pointer.x * 0.3;
    logoGroup.rotation.x = Math.sin(t * 0.3) * 0.12 - state.pointer.y * 0.15;
    logoGroup.position.y = Math.sin(t * 0.9) * 0.06;

    // mouse-look sutil da TV inteira
    const g = lookRef.current;
    if (g) {
      const tgtY = state.pointer.x * 0.3 + Math.sin(t * 0.22) * 0.06;
      const tgtX = -state.pointer.y * 0.18 + Math.sin(t * 0.18) * 0.04;
      g.rotation.y += (tgtY - g.rotation.y) * 0.06;
      g.rotation.x += (tgtX - g.rotation.x) * 0.06;
    }

    // fade ao sair do hero / durante transição
    const el = anchorRef.current;
    let target = 1;
    if (suppressed.current) target = 0;
    else if (el) {
      const vh = Math.max(window.innerHeight, 1);
      target = THREE.MathUtils.clamp(el.getBoundingClientRect().bottom / (vh * 0.5), 0, 1);
    }
    fade.current += (target - fade.current) * (suppressed.current ? 0.3 : 0.15);
    const f = fade.current;
    crt.cabinetMats.forEach((m) => (m.opacity = f));
    (logoMats.white as THREE.Material).opacity = f;
    (logoMats.purple as THREE.Material).opacity = f;
    logoMats.white.transparent = logoMats.purple.transparent = true;
    const root = groupRef.current;
    if (root) {
      root.visible = f > 0.01;
      root.scale.setScalar(state.size.width < 768 ? 0.3 : 0.5);
    }
  });

  return (
    <group ref={groupRef} scale={0.5}>
      <group ref={lookRef}>
        <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.6}>
          <primitive object={crt.group} />
        </Float>
      </group>
      <Sparkles count={14} scale={[8, 7, 5]} size={1.6} speed={0.2} opacity={0.22} color="#8a78c0" />
    </group>
  );
}
