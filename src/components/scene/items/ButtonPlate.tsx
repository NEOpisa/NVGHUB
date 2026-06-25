"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type PlateState = { hover: boolean; press: boolean };
export type PlateTone = "accent" | "whats" | "ghost";

const TONES: Record<PlateTone, { color: string; emissive: string; base: number; opacity: number }> = {
  accent: { color: "#7c3aed", emissive: "#a855f7", base: 0.45, opacity: 1 },
  whats: { color: "#16a34a", emissive: "#22c55e", base: 0.4, opacity: 1 },
  ghost: { color: "#1b1430", emissive: "#7c3aed", base: 0.25, opacity: 0.82 },
};

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

const _v = new THREE.Vector3();
const _dir = new THREE.Vector3();

/**
 * Placa 3D de um botão: vive no canvas global e segue o retângulo do botão DOM
 * (posição + tamanho), atrás do texto (que continua no DOM = SEO/clique/a11y).
 * Hover → eleva e brilha; clique (press) → afunda.
 */
export default function ButtonPlate({
  anchorRef,
  state,
  tone = "accent",
}: {
  anchorRef: RefObject<HTMLElement | null>;
  state: RefObject<PlateState>;
  tone?: PlateTone;
}) {
  const { camera, size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const elev = useRef(0);
  const glow = useRef(0);

  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(1, 1, 0.26), {
      depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2,
    });
    g.translate(0, 0, -0.06);
    return g;
  }, []);

  const material = useMemo(() => {
    const t = TONES[tone];
    return new THREE.MeshStandardMaterial({
      color: t.color,
      emissive: new THREE.Color(t.emissive),
      emissiveIntensity: t.base,
      metalness: 0.45,
      roughness: 0.5,
      transparent: t.opacity < 1,
      opacity: t.opacity,
    });
  }, [tone]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    const mesh = meshRef.current;
    const el = anchorRef.current;
    if (!mesh || !el) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;

    // mundo-por-pixel no plano z=0 (câmera perspectiva, olhando -z)
    const cam = camera as THREE.PerspectiveCamera;
    const worldH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * Math.abs(cam.position.z);
    const wpp = worldH / size.height;
    mesh.scale.set(r.width * wpp, r.height * wpp, 1);

    // centro do botão (px) → mundo em z=0
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    _v.set((cx / size.width) * 2 - 1, -((cy / size.height) * 2 - 1), 0.5).unproject(camera);
    _dir.copy(_v).sub(camera.position).normalize();
    const dist = -camera.position.z / _dir.z;
    const p = camera.position.clone().add(_dir.multiplyScalar(dist));

    const st = state.current;
    const tElev = st?.press ? -0.14 : st?.hover ? 0.3 : 0;
    const tGlow = st?.hover || st?.press ? 1 : 0;
    elev.current += (tElev - elev.current) * 0.2;
    glow.current += (tGlow - glow.current) * 0.15;

    mesh.position.set(p.x, p.y, elev.current);
    material.emissiveIntensity = TONES[tone].base + glow.current * 1.5;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
