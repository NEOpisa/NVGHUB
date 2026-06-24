"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import AmbientField from "@/components/AmbientField";

// Quad em clip-space (cobre a tela inteira, sem depender da câmera).
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ambiente: base escura + nebulosa (fbm) + 2 glows roxos que driftam e reagem
// ao scroll/mouse + vinheta + grão. Tudo num passe de fragment = barato na GPU.
const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
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
    for (int i = 0; i < 4; i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2((uv.x - 0.5) * aspect + 0.5, uv.y);
    float t = uTime * 0.04;
    float scr = uScroll;

    vec3 col = vec3(0.034, 0.034, 0.043);

    // nebulosa
    vec2 np = p * 1.5 + vec2(t, t * 0.4 + scr * 0.25);
    float n  = fbm(np);
    float n2 = fbm(np * 1.9 - vec2(t * 0.6, scr * 0.18));
    float neb = smoothstep(0.42, 1.0, n * 0.6 + n2 * 0.5);
    vec3 purple = vec3(0.486, 0.227, 0.929);
    vec3 violet = vec3(0.624, 0.431, 0.976);
    col += neb * 0.09 * mix(purple, violet, n2);

    // glows reativos a scroll/mouse
    vec2 m = uMouse - 0.5;
    for (int i = 0; i < 2; i++){
      float fi = float(i);
      vec2 gc = vec2(0.5 + 0.28 * sin(t * 1.2 + fi * 2.1),
                     0.46 + 0.20 * cos(t * 0.9 + fi * 3.0) - scr * 0.12);
      gc += m * (0.06 + fi * 0.04);
      float d = distance(uv, gc);
      float g = smoothstep(0.60, 0.0, d);
      col += g * g * 0.13 * mix(purple, violet, fi);
    }

    // grade em perspectiva (faux-3D) na parte de baixo, reativa ao scroll
    float horizon = 0.56;
    float below = horizon - uv.y;
    if (below > 0.0){
      float dz = 0.10 / below;
      float gx = (uv.x - 0.5) * dz * 3.2;
      float gy = dz + t * 0.20 + scr * 1.2;
      vec2 gg = abs(fract(vec2(gx, gy)) - 0.5);
      float ln = smoothstep(0.06, 0.0, min(gg.x, gg.y));
      float fade = smoothstep(0.0, 0.10, below) * smoothstep(3.2, 0.3, dz);
      col += ln * fade * 0.16 * violet;
    }

    // vinheta + grão
    float edge = distance(uv, vec2(0.5));
    col *= 0.5 + 0.5 * smoothstep(1.25, 0.35, edge);
    col += (hash(uv * uRes + fract(t)) - 0.5) * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Ambient() {
  const { size } = useThree();
  const scroll = useRef(0);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
    const target = window.scrollY / Math.max(window.innerHeight, 1);
    scroll.current += (target - scroll.current) * 0.06;
    uniforms.uScroll.value = scroll.current;
    uniforms.uMouse.value.x += (state.pointer.x * 0.5 + 0.5 - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (state.pointer.y * 0.5 + 0.5 - uniforms.uMouse.value.y) * 0.05;
    uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false}>
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

/**
 * Fundo único em WebGL (estilo igloo): o "espaço" do site vira um shader na GPU
 * no lugar do AmbientField (camadas DOM). Mantém todo o conteúdo/SEO no DOM por
 * cima. Em reduced-motion ou sem suporte a WebGL, cai no AmbientField (CSS).
 */
export default function WebGLBackground() {
  const [useGL, setUseGL] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUseGL(false);
      return;
    }
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    setUseGL(ok);
  }, []);

  // SSR + enquanto decide + fallback → AmbientField atual (DOM/CSS).
  if (useGL !== true) return <AmbientField />;

  return (
    <div className="webgl-bg" aria-hidden="true">
      <Canvas
        dpr={1}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <Ambient />
      </Canvas>
    </div>
  );
}
