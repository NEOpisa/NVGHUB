"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "../journeyState";
import {
  makeLabelSprite,
  disposeLabelSprite,
} from "../blueprint/labelSprite";

/**
 * MUNDO AMBIENTE — o corredor deixa de ser vazio: estruturas wireframe
 * violeta em deriva lenta ladeiam o trajeto inteiro da câmera (estética
 * igloo), sobre um piso-grade que se perde na névoa. Tudo em pouquíssimos
 * draw calls (LineSegments + 1 plano shader), com paralaxe sutil de mouse.
 */

const STRUCT_COUNT: Record<0 | 1 | 2, number> = { 0: 6, 1: 10, 2: 14 };

type Struct = {
  mesh: THREE.LineSegments;
  spin: THREE.Vector3;
  baseY: number;
  ph: number;
};

function makeGeo(kind: number): THREE.BufferGeometry {
  if (kind === 0) return new THREE.IcosahedronGeometry(1, 0);
  if (kind === 1) return new THREE.OctahedronGeometry(1, 0);
  if (kind === 2) return new THREE.BoxGeometry(1.4, 1.4, 1.4);
  return new THREE.TetrahedronGeometry(1.2, 0);
}

function Structures() {
  const group = useRef<THREE.Group>(null);
  const { structs, mat, disposables } = useMemo(() => {
    const tier = journey.tier;
    const n = STRUCT_COUNT[tier];
    const mat = new THREE.LineBasicMaterial({
      color: "#6c5cff",
      transparent: true,
      opacity: 0.17,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const disposables: THREE.BufferGeometry[] = [];
    const structs: Struct[] = [];
    // determinístico (nada de flicker entre mounts)
    let s = 7;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < n; i++) {
      const base = makeGeo(i % 4);
      const edges = new THREE.EdgesGeometry(base, 1);
      base.dispose();
      disposables.push(edges);
      const mesh = new THREE.LineSegments(edges, mat);
      // ao longo do corredor inteiro, SEMPRE fora do miolo do conteúdo
      const z = 10 - (i / Math.max(1, n - 1)) * 82 - rnd() * 4;
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (5.5 + rnd() * 9);
      const y = (rnd() - 0.35) * 7;
      mesh.position.set(x, y, z);
      const sc = 1.2 + rnd() * 2.6;
      mesh.scale.setScalar(sc);
      mesh.rotation.set(rnd() * 3.1, rnd() * 3.1, rnd() * 3.1);
      structs.push({
        mesh,
        spin: new THREE.Vector3(
          (rnd() - 0.5) * 0.14,
          (rnd() - 0.5) * 0.18,
          (rnd() - 0.5) * 0.1,
        ),
        baseY: y,
        ph: rnd() * 6.28,
      });
    }
    return { structs, mat, disposables };
  }, []);

  useEffect(
    () => () => {
      disposables.forEach((g) => g.dispose());
      mat.dispose();
    },
    [disposables, mat],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(dt, 0.05);
    for (const st of structs) {
      st.mesh.rotation.x += st.spin.x * d;
      st.mesh.rotation.y += st.spin.y * d;
      st.mesh.rotation.z += st.spin.z * d;
      st.mesh.position.y = st.baseY + Math.sin(t * 0.22 + st.ph) * 0.7;
    }
    // paralaxe de mouse do conjunto (o mundo "responde" ao visitante)
    const g = group.current;
    if (g) {
      g.rotation.y += (state.pointer.x * 0.035 - g.rotation.y) * 0.04;
      g.rotation.x += (-state.pointer.y * 0.02 - g.rotation.x) * 0.04;
    }
    // perto do fim o mundo lateral cede o palco à bifurcação
    mat.opacity = 0.17 * (1 - Math.max(0, (journey.smooth - 0.82) / 0.1) * 0.6);
  });

  return (
    <group ref={group}>
      {structs.map((s, i) => (
        <primitive key={i} object={s.mesh} />
      ))}
    </group>
  );
}

/* etiquetas numéricas flutuando junto às estruturas (os numerozinhos mono do
   igloo): coordenadas fictícias de inspeção que dão escala técnica ao vazio.
   Sprites aditivos baratos, contagem por tier, drift próprio. */
const TAG_COUNT: Record<0 | 1 | 2, number> = { 0: 5, 1: 8, 2: 12 };

type Tag = { sprite: THREE.Sprite; baseY: number; ph: number; base: number };

function TagSprites() {
  const tags = useMemo<Tag[]>(() => {
    // mesmo LCG determinístico das estruturas, semente própria
    let s = 31;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    const n = TAG_COUNT[journey.tier];
    const out: Tag[] = [];
    for (let i = 0; i < n; i++) {
      const num = String(Math.floor(10 + rnd() * 88));
      const sprite = makeLabelSprite(
        num,
        i % 3 === 0 ? "#9d8cff" : "#6f6a8f",
        0.24,
      );
      const z = 8 - (i / Math.max(1, n - 1)) * 80 - rnd() * 5;
      const side = i % 2 === 0 ? 1 : -1;
      // longe o bastante do trilho da câmera p/ nunca virar um número gigante
      sprite.position.set(side * (6.2 + rnd() * 8), (rnd() - 0.3) * 6, z);
      out.push({
        sprite,
        baseY: sprite.position.y,
        ph: rnd() * 6.28,
        base: 0.15 + rnd() * 0.13,
      });
    }
    return out;
  }, []);

  useEffect(() => () => tags.forEach((t) => disposeLabelSprite(t.sprite)), [tags]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // cede o palco à bifurcação junto com as estruturas
    const dim = 1 - Math.max(0, (journey.smooth - 0.82) / 0.1) * 0.7;
    for (const tag of tags) {
      tag.sprite.position.y = tag.baseY + Math.sin(t * 0.18 + tag.ph) * 0.5;
      // cintila de leve, cada um no seu ritmo (dados "vivos")
      const tw = 0.75 + 0.25 * Math.sin(t * 0.9 + tag.ph * 2);
      tag.sprite.material.opacity = tag.base * tw * dim;
    }
  });

  return (
    <group>
      {tags.map((t, i) => (
        <primitive key={i} object={t.sprite} />
      ))}
    </group>
  );
}

/* piso-grade: plano único com linhas procedurais que somem na distância */
const gridVertex = /* glsl */ `
  varying vec3 vWorld;
  void main(){
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const gridFragment = /* glsl */ `
  precision mediump float;
  varying vec3 vWorld;
  uniform float uCamZ;
  void main(){
    // linhas a cada 2 un., finas, com glow curto
    vec2 g = abs(fract(vWorld.xz * 0.5) - 0.5) / fwidth(vWorld.xz * 0.5);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    // esvai com a distância da câmera (janela de ~34 un. ao redor dela)
    float dz = abs(vWorld.z - uCamZ + 14.0);
    float fade = smoothstep(34.0, 6.0, dz);
    // e com a distância lateral
    fade *= smoothstep(26.0, 4.0, abs(vWorld.x));
    vec3 col = vec3(0.424, 0.361, 1.0);
    gl_FragColor = vec4(col, line * fade * 0.10);
    if (gl_FragColor.a < 0.003) discard;
  }
`;

function GridFloor() {
  const uniforms = useMemo(() => ({ uCamZ: { value: 8.6 } }), []);
  useFrame(() => {
    uniforms.uCamZ.value = journey.camZ;
  });
  return (
    <mesh
      position={[0, -4.2, -30]}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={-5}
    >
      <planeGeometry args={[70, 130]} />
      <shaderMaterial
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function AmbientWorld() {
  return (
    <>
      <Structures />
      <TagSprites />
      <GridFloor />
    </>
  );
}
