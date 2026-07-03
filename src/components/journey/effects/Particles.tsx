"use client";

import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, type Tier } from "../journeyState";

const STAR_COUNT: Record<Tier, number> = { 0: 380, 1: 650, 2: 950 };
const DUST_COUNT: Record<Tier, number> = { 0: 260, 1: 450, 2: 700 };

const starVertex = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vTwinkle;
  void main(){
    // cada estrela CINTILA no seu próprio ritmo
    vTwinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + aSeed * 2.4) + aSeed * 40.0));
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = mix(1.2, 3.4, aSeed) * (10.0 / max(-mv.z, 0.1));
  }
`;
const starFragment = /* glsl */ `
  precision mediump float;
  varying float vTwinkle;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(vec3(0.62, 0.58, 0.85), vec3(0.95, 0.94, 1.0), vTwinkle);
    gl_FragColor = vec4(col, a * 0.75 * vTwinkle);
  }
`;

/** Estrelas cintilantes distribuídas por todo o corredor — 1 draw call. */
function Stars({ tier }: { tier: Tier }) {
  const { geometry, uniforms } = useMemo(() => {
    const n = STAR_COUNT[tier];
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = 14 - Math.random() * 106; // z ∈ [14, -92]
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, uniforms: { uTime: { value: 0 } } };
  }, [tier]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={starVertex}
        fragmentShader={starFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const dustVertex = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vGlow;
  void main(){
    vec3 p = position;
    float ph = aSeed * 6.28318;
    p.x += sin(uTime * 0.25 + position.z * 0.35 + ph) * 0.9;
    p.y += cos(uTime * 0.20 + position.x * 0.40 + ph) * 0.7;
    p.z += sin(uTime * 0.12 + ph) * 0.5;
    vGlow = 0.35 + 0.65 * fract(aSeed * 7.13);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = mix(1.3, 3.7, aSeed);
    gl_PointSize = s * (9.0 / max(-mv.z, 0.1));
  }
`;

const dustFragment = /* glsl */ `
  precision mediump float;
  varying float vGlow;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 violet = vec3(0.55, 0.45, 0.90);
    vec3 bright = vec3(0.85, 0.82, 1.00);
    vec3 col = mix(violet, bright, vGlow);
    gl_FragColor = vec4(col * mix(0.4, 1.0, vGlow), a * 0.65);
  }
`;

/** Poeira sedosa que serpenteia pelo corredor inteiro (deslocamento na GPU). */
function Dust({ tier }: { tier: Tier }) {
  const { geometry, uniforms } = useMemo(() => {
    const n = DUST_COUNT[tier];
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = 10 - Math.random() * 98;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, uniforms: { uTime: { value: 0 } } };
  }, [tier]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Particles() {
  const tier = journey.tier;
  return (
    <>
      <Stars tier={tier} />
      <Dust tier={tier} />
    </>
  );
}
