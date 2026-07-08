"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN } from "@/components/journey/journeyState";

/**
 * FORK GATE — a bifurcação em 3D, capítulo FINAL da voyage.
 * Duas estelas de metal com cantos em bevel (a linguagem neobsidian levada
 * ao 3D): OURO (quente, #e9a319) à esquerda e PLATINA (fria, #d8dce4) à
 * direita, separadas pelo fio indigo da marca. Mesma gramática da logo:
 * MeshPhysical metálico + juntas de luz (EdgesGeometry aditivo) + halo.
 * O hover das portas DOM (journey.forkHover) energiza o lado correspondente.
 */

const GATE_Z = 3.4;
const SLAB_W = 1.35;
const SLAB_H = 2.0;
const SLAB_D = 0.3;
const CUT = 0.16; // canto cortado — o bevel do design system, em 3D

function bevelSlabGeometry(w: number, h: number, d: number, c: number) {
  const hw = w / 2;
  const hh = h / 2;
  const s = new THREE.Shape();
  s.moveTo(-hw + c, -hh);
  s.lineTo(hw - c, -hh);
  s.lineTo(hw, -hh + c);
  s.lineTo(hw, hh - c);
  s.lineTo(hw - c, hh);
  s.lineTo(-hw + c, hh);
  s.lineTo(-hw, hh - c);
  s.lineTo(-hw, -hh + c);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
  g.translate(0, 0, -d / 2);
  return g;
}

type Side = {
  key: "ouro" | "platina";
  x: number;
  metal: string;
  emissive: string;
  seam: string;
  halo: string;
  roughness: number;
};

const SIDES: Side[] = [
  {
    key: "ouro",
    x: -1.3,
    metal: "#e9a319",
    emissive: "#ffcb47",
    seam: "#ffcb47",
    halo: "#ffcb47",
    roughness: 0.16,
  },
  {
    key: "platina",
    x: 1.3,
    metal: "#d8dce4",
    emissive: "#9ca3b0",
    seam: "#eef0f4",
    halo: "#d8dce4",
    roughness: 0.08,
  },
];

export default function ForkGate() {
  const root = useRef<THREE.Group>(null);
  const groupRefs = useRef<(THREE.Group | null)[]>([null, null]);
  const lightRefs = useRef<(THREE.PointLight | null)[]>([null, null]);
  const energy = useRef([0.55, 0.55]);

  const built = useMemo(() => {
    const geo = bevelSlabGeometry(SLAB_W, SLAB_H, SLAB_D, CUT);
    const edges = new THREE.EdgesGeometry(geo, 12);
    const sides = SIDES.map((side) => {
      const metalMat = new THREE.MeshPhysicalMaterial({
        color: side.metal,
        metalness: 1,
        roughness: side.roughness,
        emissive: new THREE.Color(side.emissive),
        emissiveIntensity: 0.1,
        envMapIntensity: 1.8,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      });
      const seamMat = new THREE.LineBasicMaterial({
        color: side.seam,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const haloMat = new THREE.MeshBasicMaterial({
        color: side.halo,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      });
      const mesh = new THREE.Mesh(geo, metalMat);
      const seams = new THREE.LineSegments(edges, seamMat);
      const halo = new THREE.Mesh(geo, haloMat);
      halo.scale.setScalar(1.045);
      mesh.add(seams, halo);
      return { side, mesh, metalMat, seamMat, haloMat };
    });
    // o fio indigo da marca — divisor neutro entre os dois metais
    const beamMat = new THREE.MeshBasicMaterial({
      color: "#6c5cff",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beamGeo = new THREE.PlaneGeometry(0.02, 3.1);
    const beam = new THREE.Mesh(beamGeo, beamMat);
    return { geo, edges, sides, beam, beamMat, beamGeo };
  }, []);

  useEffect(
    () => () => {
      built.geo.dispose();
      built.edges.dispose();
      built.beamGeo.dispose();
      built.beamMat.dispose();
      built.sides.forEach((s) => {
        s.metalMat.dispose();
        s.seamMat.dispose();
        s.haloMat.dispose();
      });
    },
    [built],
  );

  useFrame((state, dt) => {
    const g = root.current;
    if (!g) return;
    const sm = journey.smooth;
    // só existe no capítulo final
    g.visible = sm > 0.42;
    if (!g.visible) return;

    const t = state.clock.elapsedTime;
    const enter = rangeN(sm, 0.55, 0.8); // materialização do portal
    const ease = enter * enter * (3 - 2 * enter); // smoothstep

    const portrait = state.viewport.aspect < 0.8;
    const spread = portrait ? 0.72 : 1.3;
    const baseScale = (portrait ? 0.6 : 1) * (0.72 + 0.28 * ease);

    // fio central
    built.beam.position.set(0, 0.05, GATE_Z - 0.4);
    built.beamMat.opacity = ease * (0.3 + 0.12 * Math.sin(t * 1.6));
    built.beam.scale.y = 0.4 + 0.6 * ease;

    built.sides.forEach((s, i) => {
      const grp = groupRefs.current[i];
      const light = lightRefs.current[i];
      if (!grp) return;

      // energia do lado: hover DOM alimenta o 3D
      const hov = journey.forkHover;
      const target = hov === s.side.key ? 1 : hov ? 0.22 : 0.55;
      energy.current[i] = THREE.MathUtils.damp(
        energy.current[i],
        target,
        6,
        dt,
      );
      const e = energy.current[i];

      // posição/entrada: as estelas SOBEM da névoa e se assentam
      const dir = i === 0 ? -1 : 1;
      grp.position.x = dir * spread * (1.25 - 0.25 * ease);
      grp.position.y =
        -1.1 + 1.15 * ease + Math.sin(t * 0.9 + i * 2.4) * 0.05;
      grp.position.z = GATE_Z;
      grp.scale.setScalar(baseScale * (1 + e * 0.05));

      // respiração + olhar: giro sutil pro centro + segue o ponteiro
      grp.rotation.y =
        dir * (-0.24 + 0.1 * Math.sin(t * 0.5 + i)) * (1 - e * 0.3) +
        state.pointer.x * 0.08;
      grp.rotation.x = -state.pointer.y * 0.05 + Math.cos(t * 0.7 + i) * 0.02;
      grp.rotation.z = Math.sin(t * 0.4 + i * 1.7) * 0.015;

      // materiais respiram com a energia
      const breathe = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 3.1);
      s.metalMat.emissiveIntensity = 0.06 + e * (0.22 + breathe * 0.18);
      s.seamMat.opacity = ease * (0.16 + e * (0.3 + breathe * 0.22));
      s.haloMat.opacity = ease * e * (0.06 + breathe * 0.05);
      if (light) light.intensity = ease * e * (portrait ? 10 : 16);
    });
  });

  return (
    <group ref={root} visible={false}>
      <primitive object={built.beam} />
      {built.sides.map((s, i) => (
        <group
          key={s.side.key}
          ref={(el: THREE.Group | null) => {
            groupRefs.current[i] = el;
          }}
        >
          <primitive object={s.mesh} />
          <pointLight
            ref={(el: THREE.PointLight | null) => {
              lightRefs.current[i] = el;
            }}
            position={[0, 0.3, 1.6]}
            intensity={0}
            color={s.side.halo}
            distance={7}
          />
        </group>
      ))}
    </group>
  );
}
