"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useDomAnchor } from "@/components/scene/useDomAnchor";

export type SectionVariant = "crystal" | "orbit" | "shards";

/**
 * Objeto 3D decorativo de uma seção — item da cena global, ancorado a um
 * elemento DOM da seção (texto continua no DOM, SEO preservado). Flutua, gira
 * devagar, reage de leve ao mouse e some quando a seção sai de vista. Usa as
 * luzes/Environment compartilhados do SceneCanvas.
 */
export default function SectionObject({
  anchorRef,
  variant = "crystal",
  enabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  variant?: SectionVariant;
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const fade = useRef(0);

  const { object, mats, geos } = useMemo(() => {
    const metal = new THREE.MeshStandardMaterial({
      color: "#eef0ff", metalness: 0.95, roughness: 0.18,
      emissive: new THREE.Color("#7c3aed"), emissiveIntensity: 0.25,
      envMapIntensity: 1.3, transparent: true, opacity: 0,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: "#8b3df2", metalness: 0.85, roughness: 0.22,
      emissive: new THREE.Color("#b14bff"), emissiveIntensity: 0.9,
      envMapIntensity: 1.5, transparent: true, opacity: 0,
    });
    const object = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];
    const add = (g: THREE.BufferGeometry, m: THREE.Material, pos?: [number, number, number], rot?: [number, number, number]) => {
      const mesh = new THREE.Mesh(g, m);
      if (pos) mesh.position.set(...pos);
      if (rot) mesh.rotation.set(...rot);
      object.add(mesh);
      geos.push(g);
    };

    if (variant === "orbit") {
      add(new THREE.IcosahedronGeometry(0.85, 0), metal);
      add(new THREE.TorusGeometry(1.5, 0.06, 16, 80), accent, [0, 0, 0], [Math.PI / 2.2, 0, 0]);
      add(new THREE.TorusGeometry(1.85, 0.045, 16, 90), accent, [0, 0, 0], [Math.PI / 1.7, 0.4, 0]);
    } else if (variant === "shards") {
      const oct = new THREE.OctahedronGeometry(0.5, 0);
      geos.push(oct);
      const place: [number, number, number][] = [[0, 0, 0], [1.2, 0.5, -0.4], [-1.0, -0.6, 0.3], [0.5, -1.1, 0.2], [-0.7, 0.9, -0.3]];
      place.forEach((p, i) => {
        const mesh = new THREE.Mesh(oct, i % 2 ? accent : metal);
        mesh.position.set(...p);
        mesh.scale.setScalar(i === 0 ? 1.3 : 0.7 + Math.random() * 0.4);
        object.add(mesh);
      });
    } else {
      // crystal: icosaedro facetado com um "anel" de acento
      add(new THREE.IcosahedronGeometry(1.15, 0), metal);
      add(new THREE.TorusGeometry(1.5, 0.05, 14, 80), accent, [0, 0, 0], [Math.PI / 2, 0, 0]);
    }

    return { object, mats: { metal, accent }, geos };
  }, [variant]);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.1, enabled });

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      mats.metal.dispose();
      mats.accent.dispose();
    };
  }, [geos, mats]);

  useFrame((state, delta) => {
    const s = spin.current;
    if (s) {
      s.rotation.y += delta * 0.25 + state.pointer.x * 0.002;
      s.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }

    // fade pela visibilidade da âncora na viewport
    const el = anchorRef.current;
    let target = 0;
    if (el) {
      const r = el.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const center = r.top + r.height / 2;
      target = THREE.MathUtils.clamp(1 - Math.abs(center - vh / 2) / (vh * 0.8), 0, 1);
    }
    fade.current += (target - fade.current) * 0.1;
    const f = fade.current;
    mats.metal.opacity = f;
    mats.accent.opacity = f;
    const root = groupRef.current;
    if (root) {
      root.visible = f > 0.01;
      root.scale.setScalar((state.size.width < 768 ? 0.55 : 1) * (0.85 + f * 0.15));
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={spin}>
        <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.8}>
          <primitive object={object} />
        </Float>
      </group>
    </group>
  );
}
