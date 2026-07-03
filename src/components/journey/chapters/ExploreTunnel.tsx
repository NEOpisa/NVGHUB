"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN, type Tier } from "../journeyState";
import { WORLD } from "../path";

/**
 * Estação EXPLORE — o GRAND FINALE da jornada (kprverse/igloo): molduras de
 * LINHA de 1px recuando pelo corredor (pulsam quando a câmera passa, via cor
 * por vértice) desembocam no destino: um PORTAL de anéis delgados
 * contra-rotativos com núcleo de luz, envolto por uma CONSTELAÇÃO de pontos
 * que se assenta em casca esférica conforme o visitante chega ao fim.
 */

const FRAME_W = 3.4;
const FRAME_H = 2.1;
const STARS: Record<Tier, number> = { 0: 600, 1: 1000, 2: 1500 };

export default function ExploreTunnel() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);
  const core = useRef<THREE.Mesh>(null);

  const zs = useMemo(() => {
    const arr: number[] = [];
    const step =
      (WORLD.tunnelEnd - WORLD.tunnelStart) / (WORLD.tunnelCount - 1);
    for (let i = 0; i < WORLD.tunnelCount; i++)
      arr.push(WORLD.tunnelStart + step * i);
    return arr;
  }, []);

  // molduras: um único LineSegments com cor por vértice (pulso por moldura)
  const { frameGeo, frameColors } = useMemo(() => {
    const pos: number[] = [];
    const hw = FRAME_W / 2;
    const hh = FRAME_H / 2;
    zs.forEach((z, f) => {
      const ox = Math.sin(f * 0.9) * 0.2;
      const oy = Math.cos(f * 0.7) * 0.16;
      const rot = (f % 2 ? 1 : -1) * 0.04 + f * 0.012;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const corners: [number, number][] = [
        [-hw, -hh],
        [hw, -hh],
        [hw, hh],
        [-hw, hh],
      ];
      for (let i = 0; i < 4; i++) {
        const [ax, ay] = corners[i];
        const [bx, by] = corners[(i + 1) % 4];
        pos.push(
          ox + ax * cos - ay * sin, oy + ax * sin + ay * cos, z,
          ox + bx * cos - by * sin, oy + bx * sin + by * cos, z,
        );
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const colors = new Float32Array(pos.length);
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { frameGeo: g, frameColors: colors };
  }, [zs]);

  const frameMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  // portal: anéis finos + núcleo de luz + poeira orbital
  const ringGeoA = useMemo(() => new THREE.TorusGeometry(2.5, 0.012, 8, 128), []);
  const ringGeoB = useMemo(() => new THREE.TorusGeometry(2.15, 0.007, 8, 128), []);
  const ringGeoC = useMemo(() => new THREE.TorusGeometry(2.9, 0.005, 8, 128), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#a78bfa",
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const coreGeo = useMemo(() => new THREE.CircleGeometry(1.9, 48), []);
  const coreMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vP;
          void main(){
            vP = position.xy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vP;
          uniform float uTime;
          void main(){
            float d = length(vP) / 1.9;
            // núcleo suave com ondulação concêntrica lenta
            float rip = 0.5 + 0.5 * sin(d * 14.0 - uTime * 1.6);
            float a = smoothstep(1.0, 0.0, d);
            a = a * a * (0.34 + rip * 0.1);
            vec3 col = mix(vec3(0.545, 0.361, 0.965), vec3(0.85, 0.82, 1.0), rip);
            gl_FragColor = vec4(col, a);
          }
        `,
      }),
    [],
  );

  // constelação do finale: pontos voam da espiral p/ casca fibonacci (GPU)
  const starN = STARS[journey.tier];
  const { starGeo, starUniforms } = useMemo(() => {
    const R = 3.3;
    const target = new Float32Array(starN * 3);
    const seed = new Float32Array(starN);
    const spiral = new Float32Array(starN * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < starN; i++) {
      const yy = 1 - (i / (starN - 1)) * 2;
      const rr = Math.sqrt(1 - yy * yy);
      const th = golden * i;
      target[i * 3] = Math.cos(th) * rr * R;
      target[i * 3 + 1] = yy * R;
      target[i * 3 + 2] = Math.sin(th) * rr * R;
      seed[i] = Math.random();
      spiral[i * 3] = Math.random() * Math.PI * 2;
      spiral[i * 3 + 1] = 4.5 + Math.random() * 4;
      spiral[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(target, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSpiral", new THREE.BufferAttribute(spiral, 3));
    return {
      starGeo: g,
      starUniforms: { uTime: { value: 0 }, uConverge: { value: 0 } },
    };
  }, [starN]);

  const starMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: starUniforms,
        vertexShader: /* glsl */ `
          attribute float aSeed;
          attribute vec3 aSpiral;
          uniform float uTime;
          uniform float uConverge;
          varying float vGlow;
          void main(){
            float eff = clamp(uConverge * 1.5 - aSeed * 0.5, 0.0, 1.0);
            float e = eff * eff * (3.0 - 2.0 * eff);
            float ang = aSpiral.x + uTime * (0.2 + aSeed * 0.35);
            vec3 from = vec3(cos(ang) * aSpiral.y, aSpiral.z, sin(ang) * aSpiral.y);
            vec3 p = mix(from, position, e);
            p *= 1.0 + sin(uTime * 1.6 + aSeed * 6.28) * 0.02 * e;
            vGlow = (0.2 + 0.8 * e) * (0.55 + 0.45 * sin(uTime * 2.4 + aSeed * 40.0));
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = mix(2.0, 4.2, aSeed) * (9.0 / max(-mv.z, 0.1));
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          varying float vGlow;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d);
            a *= a;
            vec3 col = mix(vec3(0.545, 0.361, 0.965), vec3(0.90, 0.88, 1.0), vGlow);
            gl_FragColor = vec4(col * (0.5 + vGlow), a * 0.85);
          }
        `,
      }),
    [starUniforms],
  );

  const DUST_N = 90;
  const dustGeo = useMemo(() => {
    const pos = new Float32Array(DUST_N * 3);
    for (let i = 0; i < DUST_N; i++) {
      const a = (i / DUST_N) * Math.PI * 2;
      const r = 2.5 + (Math.random() - 0.5) * 0.5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const dustMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.045,
        sizeAttenuation: true,
        color: "#cfc8f0",
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(
    () => () => {
      frameGeo.dispose();
      frameMat.dispose();
      ringGeoA.dispose();
      ringGeoB.dispose();
      ringGeoC.dispose();
      ringMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    },
    [frameGeo, frameMat, ringGeoA, ringGeoB, ringGeoC, ringMat, coreGeo, coreMat, dustGeo, dustMat, starGeo, starMat],
  );

  const stars = useRef<THREE.Points>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm > 0.66; // capítulo final: entra e FICA
    if (!g.visible) return;

    const t = state.clock.elapsedTime;

    // constelação converge na reta final da jornada
    starUniforms.uTime.value = t;
    starUniforms.uConverge.value = rangeN(sm, 0.82, 0.96);
    if (stars.current) stars.current.rotation.y += dt * 0.1;

    // pulso das molduras por proximidade da câmera (cor por moldura)
    for (let f = 0; f < zs.length; f++) {
      const dz = zs[f] - journey.camZ;
      const near = Math.exp(-(dz * dz) / 20);
      const b = 0.10 + near * 1.1 + 0.05 * Math.sin(t * 2.2 + f * 1.3);
      // lilás → branco-quente conforme a câmera chega
      const rr = (0.55 + near * 0.4) * b;
      const gg = (0.36 + near * 0.55) * b;
      const bb = (0.97 + near * 0.03) * b;
      for (let v = 0; v < 8; v++) {
        const idx = (f * 8 + v) * 3;
        frameColors[idx] = rr;
        frameColors[idx + 1] = gg;
        frameColors[idx + 2] = bb;
      }
    }
    frameGeo.attributes.color.needsUpdate = true;

    // portal: anéis delgados contra-rotativos + respiração do núcleo
    if (ringA.current) ringA.current.rotation.z += dt * 0.16;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.22;
    if (ringC.current) {
      ringC.current.rotation.z += dt * 0.08;
      ringC.current.rotation.x = Math.sin(t * 0.4) * 0.12;
    }
    if (dust.current) dust.current.rotation.z += dt * 0.1;
    coreMat.uniforms.uTime.value = t;
    ringMat.opacity = 0.5 + Math.sin(t * 1.4) * 0.15;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={frameGeo} material={frameMat} />
      {/* portal-destino (estação de navegação) */}
      <group position={[WORLD.gate.x, WORLD.gate.y, WORLD.gate.z]}>
        <mesh ref={ringA} geometry={ringGeoA} material={ringMat} />
        <mesh ref={ringB} geometry={ringGeoB} material={ringMat} />
        <mesh ref={ringC} geometry={ringGeoC} material={ringMat} />
        <mesh ref={core} geometry={coreGeo} material={coreMat} />
        <points ref={dust} geometry={dustGeo} material={dustMat} />
        <points
          ref={stars}
          geometry={starGeo}
          material={starMat}
          frustumCulled={false}
        />
        <pointLight intensity={40} color="#8b5cf6" distance={12} />
      </group>
    </group>
  );
}
