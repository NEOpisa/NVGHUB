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
            color: "#dd3bc8",
            emissive: "#dd3bc8",
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
  // fio de luz vertical (linguagem hairline) — substitui o antigo cone
  // volumétrico, que de perto parecia um copo translúcido
  const beamGeo = useMemo(
    () => new THREE.CylinderGeometry(0.016, 0.016, 3.3, 6, 1, true),
    [],
  );
  // gradiente radial pro brilho do chão morrer suave (sem borda dura)
  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(0.45, "rgba(255,255,255,0.3)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  const gemGeo = useMemo(() => new THREE.BoxGeometry(1.9, 1.9, 1.9), []);
  const padMats = useMemo(
    () =>
      KINDS.map(() => ({
        ring: new THREE.MeshBasicMaterial({
          color: "#f076e0",
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        disc: new THREE.MeshBasicMaterial({
          color: "#8f1878",
          map: glowTex,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
        beam: new THREE.MeshBasicMaterial({
          color: "#f076e0",
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
        gem: new THREE.MeshBasicMaterial({
          color: "#f076e0",
          wireframe: true,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      })),
    [glowTex],
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
      glowTex.dispose();
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
      glowTex,
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

    // retrato (mobile): estações um pouco menores, perto do centro e ELEVADAS
    // — o card de texto vive embaixo; a câmera (CameraRig) acompanha a mira
    // e abre o FOV, então o ícone ativo fica grande e legível, não distante.
    const portrait = state.viewport.aspect < 0.8;
    mobK.current = THREE.MathUtils.damp(mobK.current, portrait ? 1 : 0, 6, dt);
    const mk = mobK.current;
    const mobileStationScale = 0.5;
    const stScale = THREE.MathUtils.lerp(1, mobileStationScale, mk);
    const xK = THREE.MathUtils.lerp(1, WORLD.svcMobileX, mk);

    for (let i = 0; i < icons.length; i++) {
      const st = stationRefs.current[i];
      if (st) {
        st.position.x = WORLD.serviceX[i] * xK;
        st.position.y = mk * WORLD.svcMobileLift;
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
          on ? 0.55 : 0.16,
          5,
          dt,
        );
        m.beam.opacity = THREE.MathUtils.damp(
          m.beam.opacity,
          on ? 0.85 : 0.14,
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
      light.current.position.y = 0.8 + mk * WORLD.svcMobileLift;
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
        color="#f076e0"
        distance={10}
      />
    </group>
  );
}
