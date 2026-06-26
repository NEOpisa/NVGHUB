"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDomAnchor } from "@/components/scene/useDomAnchor";

export type SectionVariant = "orb" | "rings" | "halo";

const pointVert = `
  uniform float uSize;
  uniform float uTime;
  attribute float aGlow;
  varying float vGlow;
  void main(){
    vGlow = aGlow;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float tw = 0.7 + 0.3 * sin(uTime * 1.5 + aGlow * 6.2831);
    gl_PointSize = uSize * tw * (1.0 / -mv.z);
  }
`;
const pointFrag = `
  precision mediump float;
  uniform float uOpacity;
  varying float vGlow;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 violet = vec3(0.55, 0.36, 0.96);
    vec3 magenta = vec3(0.78, 0.27, 0.92);
    vec3 col = mix(violet, magenta, vGlow);
    gl_FragColor = vec4(col, a * a * uOpacity);
  }
`;

/**
 * Acento 3D de uma seção: um "campo de energia" — nuvem de pontos brilhantes
 * (aditivos) numa casca esférica + anéis finos luminosos, girando devagar.
 * Aditivo = só ADICIONA luz (nunca escurece a seção). Leve (pontos), sem
 * geometria sólida pra não bugar/clipar. Ancorado ao DOM da seção; texto fica
 * no DOM (SEO). Usa só materiais próprios (não depende de luz da cena).
 */
export default function SectionObject({
  anchorRef,
  variant = "orb",
  enabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  variant?: SectionVariant;
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const fade = useRef(0);

  const { object, pointsMat, ringMats, geos } = useMemo(() => {
    const object = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];

    // nuvem de pontos numa casca esférica (distribuição fibonacci + jitter)
    // reduzida para aliviar GPU/CPU na seção ecossistema (desktop).
    const N = variant === "rings" ? 120 : variant === "halo" ? 100 : 160;
    const R = 1.35;
    const pos = new Float32Array(N * 3);
    const glow = new Float32Array(N);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const j = 0.9 + Math.random() * 0.22;
      pos[i * 3] = Math.cos(th) * r * R * j;
      pos[i * 3 + 1] = y * R * j;
      pos[i * 3 + 2] = Math.sin(th) * r * R * j;
      glow[i] = Math.random();
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pg.setAttribute("aGlow", new THREE.BufferAttribute(glow, 1));
    geos.push(pg);
    const pointsMat = new THREE.ShaderMaterial({
      vertexShader: pointVert,
      fragmentShader: pointFrag,
      uniforms: {
        uSize: { value: 26 },
        uTime: { value: 0 },
        uOpacity: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pg, pointsMat);
    points.frustumCulled = false;
    object.add(points);

    // anéis finos luminosos (aditivos)
    const ringMats: THREE.MeshBasicMaterial[] = [];
    const ringDefs =
      variant === "rings"
        ? [
            [1.7, Math.PI / 2.1, 0],
            [2.0, Math.PI / 1.6, 0.5],
          ]
        : variant === "halo"
          ? [[1.9, Math.PI / 2, 0]]
          : [[1.75, Math.PI / 2.2, 0]];
    ringDefs.forEach(([rad, rx, rz]) => {
      const g = new THREE.TorusGeometry(rad, 0.012, 8, 64);
      geos.push(g);
      const m = new THREE.MeshBasicMaterial({
        color: "#a98bff",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      ringMats.push(m);
      const ring = new THREE.Mesh(g, m);
      ring.rotation.set(rx, 0, rz);
      object.add(ring);
    });

    return { object, pointsMat, ringMats, geos };
  }, [variant]);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.1, enabled });

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      pointsMat.dispose();
      ringMats.forEach((m) => m.dispose());
    };
  }, [geos, pointsMat, ringMats]);

  useFrame((state, delta) => {
    pointsMat.uniforms.uTime.value += Math.min(delta, 0.05);
    const s = spin.current;
    if (s) {
      s.rotation.y += delta * 0.18 + state.pointer.x * 0.0015;
      s.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
    }

    // Fade dirigido por visibilidade (IntersectionObserver no SectionScene)
    // para evitar getBoundingClientRect a cada frame (layout thrash).
    const target = enabled ? 1 : 0;
    fade.current += (target - fade.current) * 0.1;
    const f = fade.current;
    pointsMat.uniforms.uOpacity.value = f;
    ringMats.forEach((m) => (m.opacity = f * 0.55));
    const root = groupRef.current;
    if (root) {
      root.visible = f > 0.01;
      root.scale.setScalar(state.size.width < 768 ? 0.6 : 1);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={spin}>
        <primitive object={object} />
      </group>
    </group>
  );
}
