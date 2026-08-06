"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN } from "../journeyState";
import { WORLD } from "../path";

/**
 * O WARP — a transição entre o ecossistema e A Escolha: um corredor de
 * portões octogonais chanfrados (mesma chapa blueprint das placas) que a
 * câmera atravessa em mergulho. Cada portão ACENDE quando a câmera se
 * aproxima e um pulso branco marca a passagem — a única animação é o próprio
 * movimento, dirigido 100% pelo scroll (journey.camZ).
 */
const N = WORLD.warpCount;

/* x do trilho da câmera ao longo do corredor (espelha os waypoints do warp) */
function railX(z: number): number {
  const pts: [number, number][] = [
    [-14, 0], [-30, 0.4], [-44, -0.4], [-58, 0],
  ];
  if (z >= pts[0][0]) return pts[0][1];
  for (let k = 0; k < pts.length - 1; k++) {
    const [za, xa] = pts[k];
    const [zb, xb] = pts[k + 1];
    if (z >= zb) {
      const f = (z - za) / (zb - za);
      return xa + (xb - xa) * f;
    }
  }
  return 0;
}

/* octógono chanfrado (raio 1) em segmentos de linha */
function gateGeo(): THREE.BufferGeometry {
  const pos: number[] = [];
  const S = 8;
  for (let k = 0; k < S; k++) {
    const a = (k / S) * Math.PI * 2 + Math.PI / 8;
    const b = ((k + 1) / S) * Math.PI * 2 + Math.PI / 8;
    pos.push(Math.cos(a), Math.sin(a), 0, Math.cos(b), Math.sin(b), 0);
  }
  // quatro ticks cardeais para fora (mira de passagem)
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2;
    const c = Math.cos(a), s = Math.sin(a);
    pos.push(c * 1.02, s * 1.02, 0, c * 1.14, s * 1.14, 0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return g;
}

export default function WarpGates() {
  const group = useRef<THREE.Group>(null);
  const gateRefs = useRef<(THREE.LineSegments | null)[]>([]);

  const geo = useMemo(() => gateGeo(), []);
  const mats = useMemo(
    () =>
      Array.from({ length: N }, () =>
        new THREE.LineBasicMaterial({
          color: "#a8c0f5",
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    [],
  );

  const gates = useMemo(
    () =>
      Array.from({ length: N }, (_, k) => {
        const z =
          WORLD.warpStart +
          (k / Math.max(1, N - 1)) * (WORLD.warpEnd - WORLD.warpStart);
        return {
          z,
          x: railX(z),
          y: 0.2,
          scale: 2.0 + (k % 3) * 0.18,
          twist: k * 0.42, // o corredor espirala à frente
          spin: k % 2 === 0 ? 0.1 : -0.1,
        };
      }),
    [],
  );

  useEffect(
    () => () => {
      geo.dispose();
      mats.forEach((m) => m.dispose());
    },
    [geo, mats],
  );

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm > 0.46 && sm < 0.88;
    if (!g.visible) return;

    // presença global do corredor: nasce no início do warp, cede no portal
    const on = rangeN(sm, 0.5, 0.56) * (1 - rangeN(sm, 0.8, 0.86));
    const camZ = journey.camZ;

    for (let k = 0; k < N; k++) {
      const gate = gateRefs.current[k];
      if (!gate) continue;
      const gd = gates[k];
      gate.rotation.z += dt * gd.spin;
      // acende conforme a câmera chega; flash branco na passagem
      const d = camZ - gd.z; // >0 = ainda à frente do portão
      const near = THREE.MathUtils.clamp(1 - Math.abs(d) / 7, 0, 1);
      const flash = THREE.MathUtils.clamp(1 - Math.abs(d) / 1.6, 0, 1);
      mats[k].opacity = on * (0.06 + near * near * 0.55 + flash * 0.4);
      mats[k].color.setStyle(flash > 0.55 ? "#efeaff" : "#a8c0f5");
      // respiro: o portão “abre” um tique quando a câmera está perto
      const s = gd.scale * (1 + flash * 0.08);
      gate.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {gates.map((gd, k) => (
        <lineSegments
          key={k}
          ref={(el) => {
            gateRefs.current[k] = el;
          }}
          geometry={geo}
          material={mats[k]}
          position={[gd.x, gd.y, gd.z]}
          rotation={[0, 0, gd.twist]}
          scale={gd.scale}
        />
      ))}
    </group>
  );
}
