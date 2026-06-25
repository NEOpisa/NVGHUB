"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildCrt, type Crt } from "@/components/scene/crtMesh";

type WallTv = { crt: Crt; phase: number; nextStatic: number };

/**
 * Parede de fundo com VÁRIAS TVs CRT (gabinetes simplificados) ao longe,
 * exibindo estática/scanlines esporádicas — atmosfera "Industrial Cyberpunk".
 * Item da cena global, atrás de tudo. Dim (uOn baixo) pra não competir com o hero.
 */
export default function CrtWall() {
  const ref = useRef<THREE.Group>(null);

  const { group, tvs } = useMemo(() => {
    const group = new THREE.Group();
    const tvs: WallTv[] = [];
    const cols = 5, rows = 3;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const crt = buildCrt("#6e54b0", true);
        crt.group.position.set(
          (c - (cols - 1) / 2) * 3.1 + (Math.random() - 0.5) * 0.7,
          (r - (rows - 1) / 2) * 2.7 + (Math.random() - 0.5) * 0.5,
          -10 - Math.random() * 3.5
        );
        crt.group.scale.setScalar(0.7 + Math.random() * 0.25);
        crt.group.rotation.set((Math.random() - 0.5) * 0.18, (Math.random() - 0.5) * 0.32, 0);
        crt.uniforms.uOn.value = 0.32 + Math.random() * 0.28;
        group.add(crt.group);
        tvs.push({ crt, phase: Math.random() * 10, nextStatic: 1 + Math.random() * 5 });
      }
    }
    return { group, tvs };
  }, []);

  useEffect(() => () => tvs.forEach((o) => o.crt.dispose()), [tvs]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    tvs.forEach((o) => {
      o.crt.uniforms.uTime.value += dt;
      o.nextStatic -= dt;
      if (o.nextStatic <= 0) { o.crt.uniforms.uStatic.value = 0.85; o.nextStatic = 2.5 + Math.random() * 6; }
      o.crt.uniforms.uStatic.value *= 0.9;
      o.crt.uniforms.uFlick.value = 0.7 + 0.3 * Math.sin(t * 3 + o.phase);
    });
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.05) * 0.04;
  });

  return (
    <group ref={ref}>
      <primitive object={group} />
    </group>
  );
}
