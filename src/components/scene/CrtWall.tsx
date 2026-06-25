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
        // espalhadas: espaçamento maior, jitter forte e bastante variação de profundidade
        crt.group.position.set(
          (c - (cols - 1) / 2) * 5.2 + (Math.random() - 0.5) * 3.0,
          (r - (rows - 1) / 2) * 4.4 + (Math.random() - 0.5) * 2.4,
          -9 - Math.random() * 12
        );
        crt.group.scale.setScalar(0.6 + Math.random() * 0.5);
        crt.group.rotation.set((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.5, 0);
        crt.uniforms.uOn.value = 0.3 + Math.random() * 0.3;
        group.add(crt.group);
        tvs.push({ crt, phase: Math.random() * 10, nextStatic: 1 + Math.random() * 6 });
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
