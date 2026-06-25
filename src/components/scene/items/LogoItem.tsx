"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useDomAnchor } from "@/components/scene/useDomAnchor";

const WHITE_POINTS: [number, number][] = [
  [48, 25], [86, 44], [168, 93], [194, 143], [94, 78],
  [94, 144], [155, 216], [138, 206], [71, 151], [70, 48],
];
const PURPLE_POINTS: [number, number][] = [
  [287, 27], [202, 219], [153, 175], [110, 116], [190, 169],
];

const CX = 160;
const CY = 124;
const SCALE = 42;

function buildGeometry(points: [number, number][], depth: number) {
  const shape = new THREE.Shape(
    points.map(([x, y]) => new THREE.Vector2((x - CX) / SCALE, -(y - CY) / SCALE))
  );
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.05,
    bevelSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  // Cacos: cada triângulo ganha um centro e uma direção de explosão própria.
  const g = geo.toNonIndexed();
  const pos = g.attributes.position;
  const n = pos.count;
  const aDir = new Float32Array(n * 3);
  const aCenter = new Float32Array(n * 3);
  const c = new THREE.Vector3();
  for (let i = 0; i < n; i += 3) {
    c.set(
      (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3,
      (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3,
      (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3
    );
    // direção: para fora do centro do caco + jitter, magnitude aleatória
    let dx = c.x + (Math.random() - 0.5) * 1.4;
    let dy = c.y + (Math.random() - 0.5) * 1.4;
    let dz = c.z + (Math.random() - 0.5) * 1.4 + 0.3;
    const len = Math.hypot(dx, dy, dz) || 1;
    const mag = 1.6 + Math.random() * 2.8;
    dx = (dx / len) * mag;
    dy = (dy / len) * mag;
    dz = (dz / len) * mag;
    for (let k = 0; k < 3; k++) {
      aDir[(i + k) * 3] = dx;
      aDir[(i + k) * 3 + 1] = dy;
      aDir[(i + k) * 3 + 2] = dz;
      aCenter[(i + k) * 3] = c.x;
      aCenter[(i + k) * 3 + 1] = c.y;
      aCenter[(i + k) * 3 + 2] = c.z;
    }
  }
  g.setAttribute("aDir", new THREE.BufferAttribute(aDir, 3));
  g.setAttribute("aCenter", new THREE.BufferAttribute(aCenter, 3));
  return g;
}

// Injeta o deslocamento por caco na material PBR (preserva o brilho metálico).
function patchShatter(mat: THREE.Material, uShatter: { value: number }) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uShatter = uShatter;
    shader.vertexShader =
      "uniform float uShatter;\nattribute vec3 aDir;\nattribute vec3 aCenter;\n" +
      shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         transformed = aCenter + (transformed - aCenter) * (1.0 + uShatter * 0.45);
         transformed += aDir * uShatter;`
      );
  };
  mat.customProgramCacheKey = () => "logo-shatter";
}

/**
 * A marca NV 3D — item da cena global, ancorado ao `.hero-visual`. Ciclo
 * contínuo: estilhaça em cacos e remonta, com flashes/sparkles na remontagem.
 * Some suavemente quando o hero sai de vista (não vaza sobre a seção de baixo).
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
  const whiteRef = useRef<THREE.Mesh>(null);
  const purpleRef = useRef<THREE.Mesh>(null);
  const sparkRef = useRef<THREE.Group>(null);

  const uShatter = useRef({ value: 1 }); // começa estilhaçado → 1ª remontagem = entrada
  const glint = useRef({ v: 0 }); // 0..1 brilho extra na remontagem
  const fade = useRef(0);

  const whiteMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#e8e8ee", metalness: 0.85, roughness: 0.28,
      emissive: new THREE.Color("#cbb9ff"), emissiveIntensity: 0,
      transparent: true,
    });
    patchShatter(m, uShatter.current);
    return m;
  }, []);
  const purpleMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#7c3aed", metalness: 0.55, roughness: 0.3,
      emissive: new THREE.Color("#5b21b6"), emissiveIntensity: 0.9,
      transparent: true,
    });
    patchShatter(m, uShatter.current);
    return m;
  }, []);

  const whiteGeo = useMemo(() => buildGeometry(WHITE_POINTS, 0.55), []);
  const purpleGeo = useMemo(() => buildGeometry(PURPLE_POINTS, 0.75), []);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.12, enabled });

  // Ciclo despedaçar → remontar (loop). O flash de brilho dispara ao remontar.
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.to(uShatter.current, { value: 0, duration: 1.2, ease: "power3.out" }) // remonta (entrada)
      .to(glint.current, { v: 1, duration: 0.18, ease: "power2.out" }, "-=0.35")
      .to(glint.current, { v: 0, duration: 0.9, ease: "power2.out" })
      .to({}, { duration: 1.6 }) // segura montada
      .to(uShatter.current, { value: 1, duration: 0.6, ease: "power2.in" }); // estilhaça
    return () => void tl.kill();
  }, []);

  useFrame((state) => {
    // olhar pro mouse (entra conforme a logo está montada)
    const g = lookRef.current;
    if (g) {
      const t = state.clock.elapsedTime;
      const b = 1 - uShatter.current.value;
      const tgtY = (state.pointer.x * 0.9 + Math.sin(t * 0.3) * 0.22) * b;
      const tgtX = (-state.pointer.y * 0.6 + Math.sin(t * 0.22) * 0.1) * b;
      g.rotation.y += (tgtY - g.rotation.y) * 0.07;
      g.rotation.x += (tgtX - g.rotation.x) * 0.07;
      g.rotation.z = Math.sin(t * 0.15) * 0.06 * b;
    }

    // brilho da remontagem
    const gl = glint.current.v;
    whiteMat.emissiveIntensity = gl * 1.4;
    purpleMat.emissiveIntensity = 0.9 + gl * 1.8;

    // fade ao sair do hero (não vaza pra seção de baixo) — lido do retângulo DOM
    const el = anchorRef.current;
    if (el) {
      const vh = Math.max(window.innerHeight, 1);
      const target = THREE.MathUtils.clamp(el.getBoundingClientRect().bottom / (vh * 0.5), 0, 1);
      fade.current += (target - fade.current) * 0.15;
    }
    const f = fade.current;
    whiteMat.opacity = f;
    purpleMat.opacity = f;
    const root = groupRef.current;
    if (root) root.visible = f > 0.01;
    if (sparkRef.current) sparkRef.current.scale.setScalar(0.9 + gl * 0.4);
  });

  return (
    <group ref={groupRef} scale={0.62}>
      <group ref={lookRef}>
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.9}>
          <mesh ref={whiteRef} geometry={whiteGeo} material={whiteMat} />
          <mesh ref={purpleRef} geometry={purpleGeo} material={purpleMat} />
        </Float>
      </group>
      <group ref={sparkRef}>
        <Sparkles count={18} scale={[7, 6, 5]} size={2.4} speed={0.3} opacity={0.5} color="#b89bff" />
      </group>
    </group>
  );
}
