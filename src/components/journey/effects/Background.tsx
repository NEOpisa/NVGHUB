"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "../journeyState";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Nebulosa contínua: a cor "viaja" com o progresso da jornada — cada capítulo
// tem seu próprio matiz (roxo → índigo → magenta → violeta profundo → lilás).
const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform vec2 uRes;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
               mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++){ v += a*noise(p); p *= 2.1; a *= 0.5; }
    return v;
  }

  // matiz ÚNICO (minimal escuro): violeta profundo → violeta acento
  vec3 pal(float x){
    vec3 deep = vec3(0.353, 0.271, 0.941); // #5a45f0
    vec3 acc  = vec3(0.424, 0.361, 1.000); // #6c5cff
    return mix(deep, acc, smoothstep(0.1, 0.9, x));
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2((uv.x - 0.5) * aspect + 0.5, uv.y);
    float t = uTime * 0.04;
    vec3 tint = pal(uProgress);

    vec3 col = vec3(0.0); // PRETO PURO (neobsidian)

    // névoa que "anda" com a jornada (uProgress desloca o campo)
    vec2 np = p * 1.6 + vec2(t + uProgress * 2.6, t * 0.4 + uProgress * 1.4);
    float n  = fbm(np);
    float n2 = fbm(np * 1.9 - vec2(t * 0.6, uProgress * 0.8));
    float neb = smoothstep(0.40, 1.0, n * 0.6 + n2 * 0.5);
    col += neb * 0.05 * tint;

    // dois glows sutis que driftam e seguem levemente o mouse
    vec2 m = uMouse - 0.5;
    for (int i = 0; i < 2; i++){
      float fi = float(i);
      vec2 gc = vec2(0.5 + 0.30 * sin(t * 1.2 + fi * 2.1 + uProgress * 6.283),
                     0.45 + 0.22 * cos(t * 0.9 + fi * 3.0 + uProgress * 4.0));
      gc += m * (0.06 + fi * 0.05);
      float d = distance(uv, gc);
      float g = smoothstep(0.62, 0.0, d);
      col += g * g * 0.045 * tint;
    }

    // AURORA: banda de luz serpenteando no alto do céu (movimento constante)
    float ay = 0.78 + 0.06 * sin(uTime * 0.12 + p.x * 2.6) + 0.03 * sin(uTime * 0.23 + p.x * 5.1);
    float aur = smoothstep(0.16, 0.0, abs(p.y - ay));
    aur *= 0.55 + 0.45 * sin(uTime * 0.4 + p.x * 7.0);
    col += aur * 0.05 * mix(tint, vec3(0.616, 0.549, 1.0), 0.4);

    // vinheta + grão
    float edge = distance(uv, vec2(0.5));
    col *= 0.5 + 0.5 * smoothstep(1.25, 0.35, edge);
    col += (hash(uv * uRes + fract(t)) - 0.5) * 0.028;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Background({
  progressOverride,
}: {
  /** fixa o "capítulo" da paleta (ex.: canvas do /menu) em vez do scroll */
  progressOverride?: number;
}) {
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
    uniforms.uProgress.value = progressOverride ?? journey.smooth;
    uniforms.uMouse.value.x +=
      (state.pointer.x * 0.5 + 0.5 - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y +=
      (state.pointer.y * 0.5 + 0.5 - uniforms.uMouse.value.y) * 0.05;
    uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
