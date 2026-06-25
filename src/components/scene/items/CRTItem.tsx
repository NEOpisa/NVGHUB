"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useDomAnchor } from "@/components/scene/useDomAnchor";
import { WHITE_POINTS, PURPLE_POINTS, buildGeometry } from "@/components/scene/logoGeometry";
import { txBus } from "@/components/scene/transitionBus";

// A entrada "power-on" só toca no 1º load/reload (escopo de módulo).
let powerOnPlayed = false;

// Retângulo arredondado centrado (face/bezel da TV).
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

const screenVert = `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

// Tela CRT: fósforo + scanlines + vinheta (curvatura) + banda de varredura + flicker.
const screenFrag = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOn;
  uniform float uFlick;
  void main(){
    vec2 uv = vUv;
    vec2 c = uv * 2.0 - 1.0;
    float r2 = dot(c, c);
    float vig = smoothstep(1.6, 0.15, r2);          // escurece bordas (curvatura CRT)
    float lines = 0.5 + 0.5 * sin(uv.y * 430.0);     // scanlines finas
    float scan = mix(0.72, 1.0, lines);
    float band = smoothstep(0.05, 0.0, abs(fract(uv.y - uTime * 0.12) - 0.5) - 0.015);
    vec3 base = vec3(0.035, 0.030, 0.055);
    vec3 glow = vec3(0.33, 0.25, 0.50);              // roxo sóbrio
    vec3 col = base + glow * (0.55 * vig * scan + 0.22 * band * vig);
    col *= uOn * (0.9 + 0.1 * uFlick);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Mascote NeoVision: uma TV CRT 3D (gabinete industrial sóbrio) exibindo o
 * símbolo NV na tela, com scanlines/curvatura/glow roxo sóbrio. Item da cena
 * global, ancorado ao `.hero-visual`. Entrada "power-on" só no 1º load; em loop
 * faz float + flicker ocasional. Some durante a transição (txBus "cover").
 */
export default function CRTItem({
  anchorRef,
  enabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lookRef = useRef<THREE.Group>(null);
  const on = useRef(0);
  const flick = useRef(1);
  const fade = useRef(1);
  const suppressed = useRef(false);

  const screenUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOn: { value: 0 }, uFlick: { value: 1 } }),
    []
  );

  const { tv, mats, geos } = useMemo(() => {
    const cabinet = new THREE.MeshPhysicalMaterial({
      color: "#2a2a30", metalness: 0.25, roughness: 0.72,
      clearcoat: 0.35, clearcoatRoughness: 0.5, transparent: true,
    });
    const bezel = new THREE.MeshPhysicalMaterial({
      color: "#151519", metalness: 0.2, roughness: 0.6,
      clearcoat: 0.5, clearcoatRoughness: 0.35, transparent: true,
    });
    const trim = new THREE.MeshStandardMaterial({
      color: "#c6c4cd", metalness: 0.4, roughness: 0.5, transparent: true,
    });
    const nvWhite = new THREE.MeshStandardMaterial({
      color: "#cdbff0", emissive: new THREE.Color("#7a5fc4"),
      emissiveIntensity: 0.9, metalness: 0.3, roughness: 0.4, transparent: true,
    });
    const nvPurple = new THREE.MeshStandardMaterial({
      color: "#6e54b0", emissive: new THREE.Color("#6e54b0"),
      emissiveIntensity: 1.0, metalness: 0.3, roughness: 0.4, transparent: true,
    });
    const screenMat = new THREE.ShaderMaterial({
      vertexShader: screenVert, fragmentShader: screenFrag,
      uniforms: screenUniforms,
    });

    const tv = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];
    const mesh = (g: THREE.BufferGeometry, m: THREE.Material, pos?: [number, number, number], rot?: [number, number, number]) => {
      const o = new THREE.Mesh(g, m);
      if (pos) o.position.set(...pos);
      if (rot) o.rotation.set(...rot);
      tv.add(o);
      geos.push(g);
      return o;
    };

    // corpo (caixa traseira) + face com furo da tela (bezel)
    mesh(new THREE.BoxGeometry(2.9, 2.45, 1.9), cabinet, [0, 0, -1.0]);
    const faceShape = roundedRect(3.1, 2.65, 0.22);
    const hole = roundedRect(2.35, 1.85, 0.16) as unknown as THREE.Path;
    faceShape.holes = [hole];
    const faceGeo = new THREE.ExtrudeGeometry(faceShape, {
      depth: 0.32, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3, curveSegments: 16,
    });
    faceGeo.center();
    mesh(faceGeo, bezel, [0, 0, 0.06]);

    // tela (fósforo) recuada + vidro NV à frente
    mesh(new THREE.PlaneGeometry(2.3, 1.8), screenMat, [0, 0, 0.0]);

    // símbolo NV na tela (emissivo)
    const nv = new THREE.Group();
    const w = buildGeometry(WHITE_POINTS, 0.1);
    const p = buildGeometry(PURPLE_POINTS, 0.1);
    geos.push(w, p);
    nv.add(new THREE.Mesh(w, nvWhite), new THREE.Mesh(p, nvPurple));
    nv.scale.setScalar(0.3);
    nv.position.set(0, 0, 0.16);
    tv.add(nv);

    // detalhes: 2 knobs + base
    const knob = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 20);
    geos.push(knob);
    mesh(knob, trim, [1.3, -0.95, 0.22], [Math.PI / 2, 0, 0]);
    mesh(knob, trim, [1.3, -0.55, 0.22], [Math.PI / 2, 0, 0]);
    mesh(new THREE.BoxGeometry(1.6, 0.18, 1.0), cabinet, [0, -1.32, -0.4]);

    return { tv, mats: { cabinet, bezel, trim, nvWhite, nvPurple, screenMat }, geos };
  }, [screenUniforms]);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.12, enabled });

  useEffect(() => {
    const off = txBus.on((e) => {
      if (e === "cover") suppressed.current = true;
      else if (e === "reveal") suppressed.current = false;
    });
    return () => { off(); };
  }, []);

  // entrada power-on (só 1º load): flicker → estabiliza
  useLayoutEffect(() => {
    if (powerOnPlayed) { on.current = 1; return; }
    powerOnPlayed = true;
    const o = { v: 0 };
    const tl = gsap.timeline({ onUpdate: () => (on.current = o.v) });
    tl.set(o, { v: 0.0 })
      .to(o, { v: 0.6, duration: 0.06 }).to(o, { v: 0.05, duration: 0.05 })
      .to(o, { v: 0.9, duration: 0.05 }).to(o, { v: 0.2, duration: 0.06 })
      .to(o, { v: 1.0, duration: 0.5, ease: "power2.out" });
    if (lookRef.current) {
      gsap.fromTo(lookRef.current.scale, { y: 0.02 }, { y: 1, duration: 0.5, ease: "back.out(1.6)" });
    }
    return () => void tl.kill();
  }, []);

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [geos, mats]);

  useFrame((state, delta) => {
    screenUniforms.uTime.value += Math.min(delta, 0.05);
    // flicker ocasional
    flick.current += ((Math.random() < 0.04 ? 0.3 + Math.random() * 0.7 : 1) - flick.current) * 0.25;
    screenUniforms.uOn.value = on.current;
    screenUniforms.uFlick.value = flick.current;
    mats.nvWhite.emissiveIntensity = (0.5 + 0.6 * flick.current) * on.current;
    mats.nvPurple.emissiveIntensity = (0.6 + 0.7 * flick.current) * on.current;

    // mouse-look sutil
    const g = lookRef.current;
    if (g) {
      const t = state.clock.elapsedTime;
      const tgtY = state.pointer.x * 0.35 + Math.sin(t * 0.25) * 0.08;
      const tgtX = -state.pointer.y * 0.22 + Math.sin(t * 0.2) * 0.05;
      g.rotation.y += (tgtY - g.rotation.y) * 0.06;
      g.rotation.x += (tgtX - g.rotation.x) * 0.06;
    }

    // fade ao sair do hero / durante transição
    const el = anchorRef.current;
    let target = 1;
    if (suppressed.current) target = 0;
    else if (el) {
      const vh = Math.max(window.innerHeight, 1);
      target = THREE.MathUtils.clamp(el.getBoundingClientRect().bottom / (vh * 0.5), 0, 1);
    }
    fade.current += (target - fade.current) * (suppressed.current ? 0.3 : 0.15);
    const f = fade.current;
    [mats.cabinet, mats.bezel, mats.trim, mats.nvWhite, mats.nvPurple].forEach((m) => (m.opacity = f));
    const root = groupRef.current;
    if (root) {
      root.visible = f > 0.01;
      root.scale.setScalar(state.size.width < 768 ? 0.34 : 0.6);
    }
  });

  return (
    <group ref={groupRef} scale={0.6}>
      <group ref={lookRef}>
        <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.7}>
          <primitive object={tv} />
        </Float>
      </group>
      <Sparkles count={14} scale={[7, 6, 5]} size={1.6} speed={0.2} opacity={0.25} color="#8a78c0" />
    </group>
  );
}
