"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useDomAnchor } from "@/components/scene/useDomAnchor";
import { buildLogoChunks, type Chunk } from "@/components/scene/logoGeometry";
import { txBus } from "@/components/scene/transitionBus";
import { introWillPlay } from "@/components/scene/introState";

// A entrada (peças voando + montando) só toca no 1º load/reload da página.
// Esta flag vive no escopo do módulo: persiste entre navegações internas
// (não repete a entrada), mas zera num reload de verdade.
let entrancePlayed = false;

// Loop: +35% sobre o baseline e dois ajustes de +50% no "delay" (1.9s → ~5.77s).
const LOOP_DUR = 1.9 * 1.35 * 1.5 * 1.5;

/**
 * A marca NV 3D — item da cena global, ancorado ao `.hero-visual`.
 * - ENTRADA (7 cacos): só no 1º load/reload — peças voam de fora GIRANDO e se
 *   montam, com um flash de brilho ao encaixar.
 * - LOOP (5 cacos): peças se afastam de leve com aura/glow magenta (estilo
 *   Black Desert) e se juntam, em loop (35% mais lento).
 * Some quando o hero sai de vista e também quando uma transição começa (a logo
 * da transição assume o "voo pro meio").
 */
export default function LogoItem({
  anchorRef,
  enabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lookRef = useRef<THREE.Group>(null);
  const built = useRef(0);
  const glow = useRef(0);
  const fade = useRef(1);
  const suppressed = useRef(false); // forçado a sumir durante uma transição
  // Visibilidade dirigida pelo IntersectionObserver do hero (prop `enabled`),
  // não por getBoundingClientRect a cada frame — evita layout-thrash e o
  // "flash" da logo reaparecendo no embalo do scroll.
  const enabledRef = useRef(enabled);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  const mats = useMemo(() => {
    const white = new THREE.MeshPhysicalMaterial({
      color: "#eef0ff", metalness: 1.0, roughness: 0.1,
      emissive: new THREE.Color("#7c5cff"), emissiveIntensity: 0,
      envMapIntensity: 1.6, transparent: true,
      clearcoat: 1, clearcoatRoughness: 0.06,
      iridescence: 0.35, iridescenceIOR: 1.3, iridescenceThicknessRange: [120, 420],
    });
    const purple = new THREE.MeshPhysicalMaterial({
      color: "#8b3df2", metalness: 0.92, roughness: 0.14,
      emissive: new THREE.Color("#b14bff"), emissiveIntensity: 0.9,
      envMapIntensity: 1.8, transparent: true,
      clearcoat: 1, clearcoatRoughness: 0.1,
    });
    const halo = new THREE.MeshBasicMaterial({
      color: "#d24bff", transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return { white, purple, halo };
  }, []);

  const { entranceGroup, loopGroup, entranceMeshes, loopMeshes, disposables } = useMemo(() => {
    const make = (chunks: Chunk[], mat: THREE.Material, withHalo: boolean) =>
      chunks.map((c) => {
        const mesh = new THREE.Mesh(c.geometry, mat);
        mesh.position.copy(c.pivot);
        mesh.userData.pivot = c.pivot;
        mesh.userData.dir = c.dir;
        if (withHalo) {
          const halo = new THREE.Mesh(c.geometry, mats.halo);
          halo.scale.setScalar(1.22);
          mesh.add(halo);
        }
        return mesh;
      });

    const ent = buildLogoChunks(4, 3); // 7 cacos
    const lp = buildLogoChunks(3, 2); // 5 cacos
    const entranceMeshes = [
      ...make(ent.white, mats.white, false),
      ...make(ent.purple, mats.purple, false),
    ];
    const loopMeshes = [
      ...make(lp.white, mats.white, true),
      ...make(lp.purple, mats.purple, true),
    ];

    const entranceGroup = new THREE.Group();
    entranceMeshes.forEach((m) => entranceGroup.add(m));
    const loopGroup = new THREE.Group();
    loopMeshes.forEach((m) => loopGroup.add(m));

    const disposables = [
      ...entranceMeshes.map((m) => m.geometry),
      ...loopMeshes.map((m) => m.geometry),
    ];
    return { entranceGroup, loopGroup, entranceMeshes, loopMeshes, disposables };
  }, [mats]);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.12, enabled });

  // Suprime a logo do hero quando uma transição cobre a tela (handoff).
  useEffect(() => {
    const off = txBus.on((e) => {
      if (e === "cover") suppressed.current = true;
      else if (e === "reveal") suppressed.current = false;
    });
    return () => { off(); };
  }, []);

  useLayoutEffect(() => {
    const tls: gsap.core.Timeline[] = [];

    const startLoop = () => {
      built.current = 1;
      loopGroup.visible = true;
      loopMeshes.forEach((m, idx) => {
        const pivot = m.userData.pivot as THREE.Vector3;
        const dir = m.userData.dir as THREE.Vector3;
        const amt = 0.32 + (idx % 3) * 0.05;
        const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: idx * 0.07 });
        tl.to(m.position, {
          x: pivot.x + dir.x * amt,
          y: pivot.y + dir.y * amt,
          z: pivot.z + dir.z * amt,
          duration: LOOP_DUR,
          ease: "sine.inOut",
        });
        tls.push(tl);
      });
      const gtl = gsap.timeline({ repeat: -1, yoyo: true });
      gtl.to(glow, { current: 1, duration: LOOP_DUR, ease: "sine.inOut" });
      tls.push(gtl);
    };

    // Se a INTRO full-screen vai tocar, ela faz a entrada grandiosa — o hero só
    // revela a marca já montada (loop). Evita entrada duplicada.
    if (entrancePlayed || introWillPlay()) {
      entranceGroup.visible = false;
      loopGroup.visible = true;
      fade.current = 1;
      startLoop();
    } else {
      loopGroup.visible = false;
      entranceGroup.visible = true;
      entranceGroup.rotation.y = -Math.PI * 1.6; // giro inicial
      entranceMeshes.forEach((m) => {
        const pivot = m.userData.pivot as THREE.Vector3;
        const dir = m.userData.dir as THREE.Vector3;
        gsap.set(m.position, {
          x: pivot.x + dir.x * (5 + Math.random() * 3) + (Math.random() - 0.5) * 3,
          y: pivot.y + dir.y * (5 + Math.random() * 3) + (Math.random() - 0.5) * 3,
          z: pivot.z + dir.z * 3 + (Math.random() - 0.5) * 4,
        });
        gsap.set(m.rotation, {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
          z: (Math.random() - 0.5) * 6,
        });
        gsap.set(m.scale, { x: 0.2, y: 0.2, z: 0.2 });
      });

      const prog = { v: 0 };
      const tl = gsap.timeline({
        onUpdate: () => (built.current = prog.v),
        onComplete: () => {
          entrancePlayed = true;
          entranceGroup.visible = false;
          startLoop();
        },
      });
      // giro do conjunto inteiro antes de assentar
      tl.to(entranceGroup.rotation, { y: 0, duration: 1.8, ease: "power3.out" }, 0);
      entranceMeshes.forEach((m, idx) => {
        const pivot = m.userData.pivot as THREE.Vector3;
        const at = idx * 0.08;
        tl.to(m.position, { x: pivot.x, y: pivot.y, z: pivot.z, duration: 1.5, ease: "expo.out" }, at);
        tl.to(m.rotation, { x: 0, y: 0, z: 0, duration: 1.6, ease: "expo.out" }, at);
        tl.to(m.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "back.out(1.6)" }, at + 0.1);
      });
      tl.to(prog, { v: 1, duration: 1.8, ease: "power2.out" }, 0);
      // flash de brilho ao encaixar (via `glow`, que o useFrame traduz em emissive)
      tl.to(glow, { current: 1.4, duration: 0.22, ease: "power2.out" }, 1.5)
        .to(glow, { current: 0, duration: 0.7, ease: "power2.out" });
      tls.push(tl);
    }

    return () => tls.forEach((t) => t.kill());
  }, [entranceGroup, loopGroup, entranceMeshes, loopMeshes]);

  useEffect(() => {
    return () => {
      disposables.forEach((g) => g.dispose());
      mats.white.dispose();
      mats.purple.dispose();
      mats.halo.dispose();
    };
  }, [disposables, mats]);

  useFrame((state) => {
    const g = lookRef.current;
    if (g) {
      const t = state.clock.elapsedTime;
      const b = built.current;
      const tgtY = (state.pointer.x * 0.9 + Math.sin(t * 0.3) * 0.22) * b;
      const tgtX = (-state.pointer.y * 0.6 + Math.sin(t * 0.22) * 0.1) * b;
      g.rotation.y += (tgtY - g.rotation.y) * 0.07;
      g.rotation.x += (tgtX - g.rotation.x) * 0.07;
      g.rotation.z = Math.sin(t * 0.15) * 0.06 * b;
    }

    const gl = glow.current;
    mats.white.emissiveIntensity = 0.15 + gl * 0.7;
    mats.purple.emissiveIntensity = 0.9 + gl * 1.9;
    mats.halo.opacity = Math.min(gl, 1) * 0.6;

    const target = suppressed.current || !enabledRef.current ? 0 : 1;
    fade.current += (target - fade.current) * (suppressed.current ? 0.3 : 0.12);
    const f = fade.current;
    mats.white.opacity = f;
    mats.purple.opacity = f;
    const root = groupRef.current;
    if (root) {
      root.visible = f > 0.01;
      // menor no mobile (viewport estreita faz o mesmo tamanho-mundo ocupar mais tela)
      root.scale.setScalar(state.size.width < 768 ? 0.27 : 0.62);
    }
  });

  return (
    <group ref={groupRef} scale={0.62}>
      <group ref={lookRef}>
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.9}>
          <primitive object={entranceGroup} />
          <primitive object={loopGroup} />
        </Float>
      </group>
      <Sparkles count={16} scale={[7, 6, 5]} size={2.2} speed={0.28} opacity={0.4} color="#d24bff" />
    </group>
  );
}
