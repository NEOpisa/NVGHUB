"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  buildServiceIcon,
  disposeIcon,
  type ServiceKind,
} from "@/components/services/serviceIcons3d";
import { journey, rangeN, CH } from "../journeyState";
import { WORLD } from "../path";

const KINDS: ServiceKind[] = ["site", "system", "seo", "support", "saas"];

/**
 * Estação SOLUÇÕES: cada serviço é um "santuário" — o ícone 3D levita sobre
 * um pedestal de anéis luminosos com pilar de luz; um CUBO wireframe
 * (linguagem bloquinho) orbita o ícone ativo. A câmera serpenteia de
 * estação em estação.
 */
export default function ServicesRing() {
  const group = useRef<THREE.Group>(null);
  const stationRefs = useRef<(THREE.Group | null)[]>([]);
  const iconRefs = useRef<(THREE.Group | null)[]>([]);
  const padRefs = useRef<(THREE.Group | null)[]>([]);
  const gemRefs = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef<THREE.PointLight>(null);
  const mobK = useRef(0); // 0 = desktop · 1 = retrato (mobile)

  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d8dbe8",
        metalness: 0.88,
        roughness: 0.28,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const accents = useMemo(
    () =>
      KINDS.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: "#8b5cf6",
            emissive: "#8b5cf6",
            emissiveIntensity: 0.7,
            metalness: 0.3,
            roughness: 0.35,
            side: THREE.DoubleSide,
          }),
      ),
    [],
  );
  const icons = useMemo(
    () => KINDS.map((kind, i) => buildServiceIcon(kind, metal, accents[i])),
    [metal, accents],
  );

  // pedestal compartilhado: anel + disco + pilar de luz (materiais por ícone
  // para animar opacidade individualmente)
  const ringGeo = useMemo(
    () => new THREE.TorusGeometry(1.35, 0.018, 8, 72),
    [],
  );
  const ring2Geo = useMemo(
    () => new THREE.TorusGeometry(1.05, 0.01, 8, 64),
    [],
  );
  const discGeo = useMemo(() => new THREE.CircleGeometry(1.3, 48), []);
  const beamGeo = useMemo(
    () => new THREE.CylinderGeometry(0.9, 1.25, 3.4, 24, 1, true),
    [],
  );
  const gemGeo = useMemo(() => new THREE.BoxGeometry(1.9, 1.9, 1.9), []);
  const padMats = useMemo(
    () =>
      KINDS.map(() => ({
        ring: new THREE.MeshBasicMaterial({
          color: "#a78bfa",
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        disc: new THREE.MeshBasicMaterial({
          color: "#4c1d95",
          transparent: true,
          opacity: 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
        beam: new THREE.MeshBasicMaterial({
          color: "#8b5cf6",
          transparent: true,
          opacity: 0.05,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
        gem: new THREE.MeshBasicMaterial({
          color: "#a78bfa",
          wireframe: true,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      })),
    [],
  );

  useEffect(
    () => () => {
      icons.forEach(disposeIcon);
      metal.dispose();
      accents.forEach((m) => m.dispose());
      ringGeo.dispose();
      ring2Geo.dispose();
      discGeo.dispose();
      beamGeo.dispose();
      gemGeo.dispose();
      padMats.forEach((p) => {
        p.ring.dispose();
        p.disc.dispose();
        p.beam.dispose();
        p.gem.dispose();
      });
    },
    [
      icons,
      metal,
      accents,
      ringGeo,
      ring2Geo,
      discGeo,
      beamGeo,
      gemGeo,
      padMats,
    ],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm > 0.4 && sm < 0.82;
    if (!g.visible) return;

    const time = state.clock.elapsedTime;
    const l = rangeN(sm, CH.services.start, 0.72);
    const active = Math.min(4, Math.floor(l * 5));

    // retrato (mobile): estações menores e mais perto do centro —
    // sem isso os ícones estouram as bordas do enquadramento estreito.
    const portrait = state.viewport.aspect < 0.8;
    mobK.current = THREE.MathUtils.damp(mobK.current, portrait ? 1 : 0, 6, dt);
    const mk = mobK.current;
    const mobileStationScale = 0.175; // metade do ajuste mobile anterior: 0.35 → 0.175
    const mobileXFactor = 0.12; // ±2.1 → ±0.25, mais próximo do centro
    const stScale = THREE.MathUtils.lerp(1, mobileStationScale, mk);
    const xK = THREE.MathUtils.lerp(1, mobileXFactor, mk);

    for (let i = 0; i < icons.length; i++) {
      const st = stationRefs.current[i];
      if (st) {
        st.position.x = WORLD.serviceX[i] * xK;
        st.scale.setScalar(stScale);
      }
      const ig = iconRefs.current[i];
      if (!ig) continue;
      const on = i === active;
      const target = on ? 1.12 : 0.72;
      ig.scale.setScalar(THREE.MathUtils.damp(ig.scale.x, target, 5, dt));
      ig.rotation.y += dt * (on ? 0.55 : 0.16);
      ig.position.y = WORLD.serviceY[i] + Math.sin(time * 0.8 + i * 1.7) * 0.08;
      accents[i].emissiveIntensity = THREE.MathUtils.damp(
        accents[i].emissiveIntensity,
        on ? 2.2 : 0.65,
        5,
        dt,
      );

      const pad = padRefs.current[i];
      if (pad) {
        pad.rotation.y += dt * (on ? 0.5 : 0.12);
        const m = padMats[i];
        m.ring.opacity = THREE.MathUtils.damp(
          m.ring.opacity,
          on ? 0.85 : 0.3,
          5,
          dt,
        );
        m.disc.opacity = THREE.MathUtils.damp(
          m.disc.opacity,
          on ? 0.3 : 0.1,
          5,
          dt,
        );
        m.beam.opacity = THREE.MathUtils.damp(
          m.beam.opacity,
          on ? 0.13 : 0.03,
          5,
          dt,
        );
      }
      const gem = gemRefs.current[i];
      if (gem) {
        gem.rotation.y += dt * 0.6;
        gem.rotation.x = Math.sin(time * 0.5 + i) * 0.3;
        padMats[i].gem.opacity = THREE.MathUtils.damp(
          padMats[i].gem.opacity,
          i === active ? 0.35 : 0,
          4,
          dt,
        );
      }
    }

    if (light.current) {
      light.current.position.x = THREE.MathUtils.damp(
        light.current.position.x,
        WORLD.serviceX[active] * xK,
        4,
        dt,
      );
      light.current.position.z = THREE.MathUtils.damp(
        light.current.position.z,
        WORLD.serviceZ[active] + 1.5,
        4,
        dt,
      );
    }
  });

  return (
    <group ref={group}>
      {icons.map((icon, i) => (
        // estação inteira: escala/posição ajustadas por viewport no useFrame
        <group
          key={KINDS[i]}
          ref={(el) => {
            stationRefs.current[i] = el;
          }}
          position={[WORLD.serviceX[i], 0, WORLD.serviceZ[i]]}
        >
          {/* ícone levitando */}
          <group
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            position={[0, WORLD.serviceY[i], 0]}
            scale={0.72}
          >
            <primitive object={icon} />
            <mesh
              ref={(el) => {
                gemRefs.current[i] = el;
              }}
              geometry={gemGeo}
              material={padMats[i].gem}
            />
          </group>
          {/* pedestal: anéis + disco + pilar de luz */}
          <group
            ref={(el) => {
              padRefs.current[i] = el;
            }}
            position={[0, WORLD.serviceY[i] - 1.55, 0]}
          >
            <mesh
              geometry={ringGeo}
              material={padMats[i].ring}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <mesh
              geometry={ring2Geo}
              material={padMats[i].ring}
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, 0.18, 0]}
            />
            <mesh
              geometry={discGeo}
              material={padMats[i].disc}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              geometry={beamGeo}
              material={padMats[i].beam}
              position={[0, 1.7, 0]}
            />
          </group>
        </group>
      ))}
      <pointLight
        ref={light}
        position={[WORLD.serviceX[0], 0.8, WORLD.serviceZ[0] + 1.5]}
        intensity={45}
        color="#a78bfa"
        distance={10}
      />
    </group>
  );
}
