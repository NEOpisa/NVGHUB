"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { intro } from "@/components/scene/introState";

/**
 * PLEXUS da intro — a rede técnica de pontos + linhas do site antigo
 * (IntroCanvas), portada para o palco da jornada em violeta. Envolve a marca
 * enquanto ela se desenha (a intro é 3D do primeiro frame) e se dissolve no
 * handoff pro hero. Só existe quando a intro toca.
 */
const PX_N = 84;
const PX_DIST = 1.8;
const PX_MAX_SEG = 1000;
const PX_BOX = new THREE.Vector3(11, 7, 6);

export default function IntroPlexus() {
  const pointsRef = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const opacity = useRef(0);

  const data = useMemo(() => {
    const pos = new Float32Array(PX_N * 3);
    const vel = new Float32Array(PX_N * 3);
    for (let i = 0; i < PX_N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * PX_BOX.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * PX_BOX.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * PX_BOX.z;
      vel[i * 3] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
    }
    const segPos = new Float32Array(PX_MAX_SEG * 2 * 3);
    const segCol = new Float32Array(PX_MAX_SEG * 2 * 3);
    return { pos, vel, segPos, segCol };
  }, []);

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.pos, 3));
    return g;
  }, [data]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.segPos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(data.segCol, 3));
    return g;
  }, [data]);

  useEffect(
    () => () => {
      pointGeo.dispose();
      lineGeo.dispose();
    },
    [pointGeo, lineGeo],
  );

  const violet = useMemo(() => new THREE.Color("#dd3bc8"), []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // vive enquanto a marca se desenha; dissolve no handoff
    const target = intro.active && intro.phase === "load" ? 0.85 : 0;
    opacity.current = THREE.MathUtils.damp(opacity.current, target, 2.2, delta);
    const op = opacity.current;
    g.visible = op > 0.01;
    if (!g.visible) return;

    const dt = Math.min(delta, 0.05);
    const { pos, vel, segPos, segCol } = data;
    // drift + ricochete na caixa
    for (let i = 0; i < PX_N; i++) {
      for (let a = 0; a < 3; a++) {
        const k = i * 3 + a;
        pos[k] += vel[k] * dt;
        const lim =
          a === 0 ? PX_BOX.x / 2 : a === 1 ? PX_BOX.y / 2 : PX_BOX.z / 2;
        if (pos[k] > lim || pos[k] < -lim) vel[k] *= -1;
      }
    }
    pointGeo.attributes.position.needsUpdate = true;

    // conexões dentro do raio
    let seg = 0;
    for (let i = 0; i < PX_N && seg < PX_MAX_SEG; i++) {
      const ix = pos[i * 3],
        iy = pos[i * 3 + 1],
        iz = pos[i * 3 + 2];
      for (let j = i + 1; j < PX_N && seg < PX_MAX_SEG; j++) {
        const dx = ix - pos[j * 3],
          dy = iy - pos[j * 3 + 1],
          dz = iz - pos[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < PX_DIST) {
          const a = (1 - d / PX_DIST) * op * 0.6;
          const o = seg * 6;
          segPos[o] = ix;
          segPos[o + 1] = iy;
          segPos[o + 2] = iz;
          segPos[o + 3] = pos[j * 3];
          segPos[o + 4] = pos[j * 3 + 1];
          segPos[o + 5] = pos[j * 3 + 2];
          for (let c = 0; c < 2; c++) {
            segCol[o + c * 3] = violet.r * a;
            segCol[o + c * 3 + 1] = violet.g * a;
            segCol[o + c * 3 + 2] = violet.b * a;
          }
          seg++;
        }
      }
    }
    lineGeo.setDrawRange(0, seg * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    if (pointsRef.current)
      (pointsRef.current.material as THREE.PointsMaterial).opacity = op * 0.7;
  });

  // revisita (sem intro): não monta nada
  if (!intro.active) return null;

  return (
    <group ref={group} position={[0, 0, 0.8]} visible={false}>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.05}
          color="#f8b1ec"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
