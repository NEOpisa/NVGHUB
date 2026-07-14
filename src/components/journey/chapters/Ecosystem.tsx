"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN } from "../journeyState";
import { eco, ECO_COUNT, ECO_PER_WHEEL } from "../ecoState";
import { WORLD } from "../path";

/**
 * Estação ECOSSISTEMA — o catálogo inteiro em DUAS RODAS VERTICAIS, uma de
 * cada lado da tela (linguagem igloo): dez placas opacas por roda, tangentes
 * ao aro como um tambor de revólver. Rolar com o ponteiro sobre uma roda a
 * GIRA (handler no overlay escreve eco.wheelIdx); a placa da frente é o
 * módulo selecionado. O vão central fica livre — é por ele que a câmera
 * mergulha no warp. O 3D publica posição/raio projetados em `eco.screen`.
 */
const PER = ECO_PER_WHEEL;
const WHEEL_X = 2.35; // afastamento lateral de cada roda
const WHEEL_R = 1.55;
const PANE_W = 0.72;
const PANE_H = 0.88;
const CHAMFER = 0.1;
const GLYPH_SCALE = 1.05;

/* glifo wireframe por módulo — geometria abstrata, uma por opção */
function glyphGeo(i: number): THREE.BufferGeometry {
  switch (i) {
    case 0: return new THREE.BoxGeometry(0.5, 0.34, 0.05); // site: tela
    case 1: return new THREE.BoxGeometry(0.34, 0.34, 0.34); // mercado: caixa
    case 2: return new THREE.CylinderGeometry(0.24, 0.24, 0.3, 6); // agenda
    case 3: return new THREE.IcosahedronGeometry(0.27, 0); // saas
    case 4: return new THREE.DodecahedronGeometry(0.26, 0); // crm
    case 5: return new THREE.TorusGeometry(0.22, 0.08, 4, 12); // integrações
    case 6: return new THREE.ConeGeometry(0.24, 0.42, 5); // seo
    case 7: return new THREE.OctahedronGeometry(0.28, 0); // ia
    case 8: return new THREE.TetrahedronGeometry(0.32, 0); // lavoura
    case 9: return new THREE.CylinderGeometry(0.26, 0.26, 0.1, 10); // bi
    case 10: return new THREE.BoxGeometry(0.42, 0.3, 0.24); // loja: pacote
    case 11: return new THREE.BoxGeometry(0.26, 0.46, 0.05); // app: celular
    case 12: return new THREE.BoxGeometry(0.52, 0.32, 0.03); // landing: placa
    case 13: return new THREE.OctahedronGeometry(0.3, 1); // branding: gema
    case 14: return new THREE.ConeGeometry(0.28, 0.44, 4); // tráfego: seta
    case 15: return new THREE.CylinderGeometry(0.28, 0.08, 0.42, 6); // funil
    case 16: return new THREE.TorusGeometry(0.26, 0.05, 3, 6); // portal: elo
    case 17: return new THREE.CylinderGeometry(0.2, 0.2, 0.44, 8); // rpa
    case 18: return new THREE.SphereGeometry(0.26, 6, 4); // dados: globo
    default: return new THREE.CylinderGeometry(0.06, 0.3, 0.42, 5); // cro
  }
}

/* moldura da placa: retângulo com cantos chanfrados (chapa blueprint) */
function paneFrameGeo(): THREE.BufferGeometry {
  const w = PANE_W / 2;
  const h = PANE_H / 2;
  const c = CHAMFER;
  const pts = [
    [-w + c, h], [w - c, h], [w, h - c], [w, -h + c], [w - c, -h],
    [-w + c, -h], [-w, -h + c], [-w, h - c],
  ];
  const pos: number[] = [];
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k];
    const b = pts[(k + 1) % pts.length];
    pos.push(a[0], a[1], 0, b[0], b[1], 0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return g;
}

const _wp = new THREE.Vector3();

export default function Ecosystem() {
  const group = useRef<THREE.Group>(null);
  const wheelOuter = useRef<(THREE.Group | null)[]>([]);
  const spinnerRefs = useRef<(THREE.Group | null)[]>([]);
  const paneRefs = useRef<(THREE.Group | null)[]>([]);
  const glyphRefs = useRef<(THREE.LineSegments | null)[]>([]);
  const thetas = useRef([
    { v: 0, has: false },
    { v: 0, has: false },
  ]);

  const frameGeo = useMemo(() => paneFrameGeo(), []);
  const frameMats = useMemo(
    () =>
      Array.from({ length: ECO_COUNT }, () =>
        new THREE.LineBasicMaterial({
          color: "#9d8cff",
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    [],
  );
  // placa OPACA: chapa escura sólida (depthWrite oclui as placas de trás)
  const fillGeo = useMemo(
    () => new THREE.PlaneGeometry(PANE_W - 0.05, PANE_H - 0.05),
    [],
  );
  const fillMats = useMemo(
    () =>
      Array.from({ length: ECO_COUNT }, () =>
        new THREE.MeshBasicMaterial({
          color: "#0c0918",
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        }),
      ),
    [],
  );
  const glyphGeos = useMemo(
    () =>
      Array.from({ length: ECO_COUNT }, (_, i) => {
        const base = glyphGeo(i);
        const edges = new THREE.EdgesGeometry(base, 1);
        base.dispose();
        return edges;
      }),
    [],
  );
  const glyphMats = useMemo(
    () =>
      Array.from({ length: ECO_COUNT }, () =>
        new THREE.LineBasicMaterial({
          color: "#cfc6ff",
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    [],
  );

  // aro-guia de cada roda (círculo no plano Y-Z da roda)
  const rimGeo = useMemo(() => {
    const N = 96;
    const pos: number[] = [];
    const R = WHEEL_R + 0.14;
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2;
      const b = ((k + 1) / N) * Math.PI * 2;
      pos.push(
        0, Math.sin(a) * R, Math.cos(a) * R,
        0, Math.sin(b) * R, Math.cos(b) * R,
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);
  const rimMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#6c5cff",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      frameGeo.dispose();
      frameMats.forEach((m) => m.dispose());
      fillGeo.dispose();
      fillMats.forEach((m) => m.dispose());
      glyphGeos.forEach((g) => g.dispose());
      glyphMats.forEach((m) => m.dispose());
      rimGeo.dispose();
      rimMat.dispose();
    },
    [frameGeo, frameMats, fillGeo, fillMats, glyphGeos, glyphMats, rimGeo, rimMat],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm > 0.12 && sm < 0.64;
    if (!g.visible) {
      for (const s of eco.screen) s.vis = 0;
      return;
    }

    const time = state.clock.elapsedTime;
    const l = rangeN(sm, 0.2, 0.4);
    // o warp começa: as rodas cedem o palco enquanto a câmera mergulha
    const warpFade = 1 - rangeN(sm, 0.55, 0.63);
    const cam = state.camera as THREE.PerspectiveCamera;
    const tanHalfFov = Math.tan((cam.fov * Math.PI) / 360);

    // parallax mínimo do conjunto
    g.rotation.y = state.pointer.x * 0.02;

    rimMat.opacity = rangeN(l, 0.05, 0.3) * 0.3 * warpFade;

    // RETRATO: as rodas se aproximam, encolhem e sobem — o carrossel
    // funciona em QUALQUER proporção de tela (os chips controlam no touch)
    const k = THREE.MathUtils.clamp((0.95 - cam.aspect) / 0.5, 0, 1);
    const wheelScale = THREE.MathUtils.lerp(1, 0.42, k);
    for (let b = 0; b < 2; b++) {
      const outer = wheelOuter.current[b];
      if (outer) {
        const side = b === 0 ? -1 : 1;
        outer.position.x = side * THREE.MathUtils.lerp(WHEEL_X, 0.62, k);
        outer.position.y = THREE.MathUtils.lerp(0, 0.5, k);
        outer.scale.setScalar(wheelScale);
        outer.rotation.y = -side * 0.34 * THREE.MathUtils.lerp(1, 0.4, k);
      }
      const spinner = spinnerRefs.current[b];
      if (!spinner) continue;
      const th = thetas.current[b];
      // a placa do índice de frente encara a câmera (menor caminho angular)
      const want = (eco.wheelIdx[b] / PER) * Math.PI * 2;
      if (!th.has) {
        th.v = want;
        th.has = true;
      }
      let diff = want - th.v;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      th.v += diff * Math.min(dt * 4.2, 1);
      spinner.rotation.x = th.v;
    }

    for (let i = 0; i < ECO_COUNT; i++) {
      const pane = paneRefs.current[i];
      if (!pane) continue;
      const b = Math.floor(i / PER);
      const baseA = ((i % PER) / PER) * Math.PI * 2;
      // ângulo efetivo da placa na roda (0 = de frente pra câmera)
      let eff = baseA - thetas.current[b].v;
      eff = Math.atan2(Math.sin(eff), Math.cos(eff));
      const face = (Math.cos(eff) + 1) / 2; // 1 = frente · 0 = fundo da roda

      const reveal = rangeN(l, 0.03 + i * 0.008, 0.14 + i * 0.008) * warpFade;
      const isActive = eco.active === i;

      const wantS = reveal * (isActive ? 1.12 : 0.94);
      pane.scale.setScalar(
        THREE.MathUtils.damp(Math.max(pane.scale.x, 1e-3), wantS, 6, dt),
      );

      // OPACO na frente; placas do fundo da roda somem quase por completo
      // (o wireframe delas vazava por cima — AdditiveBlending ignora depth)
      const faceQ = face * face;
      fillMats[i].opacity = reveal * Math.min(1, face * 1.8);
      fillMats[i].color.set(isActive ? "#181240" : "#0c0918");
      frameMats[i].opacity = reveal * (0.05 + faceQ * (isActive ? 0.95 : 0.5));
      frameMats[i].color.set(isActive ? "#e9e4ff" : "#9d8cff");
      glyphMats[i].opacity = reveal * (0.04 + faceQ * (isActive ? 0.96 : 0.6));

      const gl = glyphRefs.current[i];
      if (gl) {
        gl.rotation.y += dt * (isActive ? 0.9 : 0.22);
        gl.rotation.x = Math.sin(time * 0.5 + i) * 0.2;
      }

      // projeção: posição + raio de tela para o retículo DOM — rótulos do
      // fundo da roda somem (face), o resto esmaece com a distância angular
      const s = eco.screen[i];
      pane.getWorldPosition(_wp);
      const dist = cam.position.distanceTo(_wp);
      _wp.project(cam);
      if (_wp.z < 1) {
        s.x = (_wp.x * 0.5 + 0.5) * state.size.width;
        s.y = (-_wp.y * 0.5 + 0.5) * state.size.height;
        s.r =
          ((PANE_H / 2) * pane.scale.x * wheelScale / dist) *
          (state.size.height / 2 / tanHalfFov);
        s.vis = reveal * Math.pow(face, 1.6);
      } else {
        s.vis = 0;
      }
    }
  });

  return (
    <group ref={group} position={[WORLD.eco.x, WORLD.eco.y, WORLD.eco.z]}>
      <pointLight intensity={26} color="#b3a5ff" distance={14} decay={1.6} />

      {/* duas rodas verticais — posição/escala ajustadas por aspecto no
          useFrame (retrato aproxima e encolhe) */}
      {[0, 1].map((b) => (
        <group
          key={b}
          ref={(el) => {
            wheelOuter.current[b] = el;
          }}
          position={[b === 0 ? -WHEEL_X : WHEEL_X, 0, 0]}
          rotation={[0, b === 0 ? 0.34 : -0.34, 0]}
        >
          <lineSegments geometry={rimGeo} material={rimMat} />
          <group
            ref={(el) => {
              spinnerRefs.current[b] = el;
            }}
          >
            {Array.from({ length: PER }, (_, k) => {
              const i = b * PER + k;
              const a = (k / PER) * Math.PI * 2;
              return (
                <group
                  key={i}
                  ref={(el) => {
                    paneRefs.current[i] = el;
                  }}
                  position={[0, Math.sin(a) * WHEEL_R, Math.cos(a) * WHEEL_R]}
                  rotation={[-a, 0, 0]}
                  scale={0.001}
                >
                  <mesh geometry={fillGeo} material={fillMats[i]} />
                  <lineSegments geometry={frameGeo} material={frameMats[i]} />
                  <lineSegments
                    ref={(el) => {
                      glyphRefs.current[i] = el;
                    }}
                    geometry={glyphGeos[i]}
                    material={glyphMats[i]}
                    position={[0, 0, 0.08]}
                    scale={GLYPH_SCALE}
                  />
                </group>
              );
            })}
          </group>
        </group>
      ))}
    </group>
  );
}
