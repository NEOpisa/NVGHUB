"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { WHITE_POINTS, PURPLE_POINTS } from "@/components/scene/logoGeometry";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * BLUEPRINT 3D da marca NV (linguagem igloo.inc): o contorno FRONTAL se
 * desenha em traço de luz; o contorno TRASEIRO o segue com atraso; ARESTAS
 * verticais sobem ligando os dois planos — o volume aparece — enquanto
 * crosshairs e ANOTAÇÕES em mono com linhas-guia medem a construção.
 * A cabeça de scan pulsa na ponta do traço; uma barra de varredura sobe na
 * materialização. Tudo cintila, respira e vive.
 *
 * - getBuild(): 0→1 — branco traça em 0→0.5, roxo em 0.4→0.85.
 * - getFill(): 0→1 — fase da materialização (barra de scan).
 * - getFade(): opacidade geral (0 some; volta fantasma no scatter do scroll).
 */

const CX = 160;
const CY = 124;
const SCALE = 42;
// meia-espessura da extrusão real (buildLogoChunks: branco 0.55 · roxo 0.75)
const HD_W = 0.275;
const HD_P = 0.375;

function toLocal(points: [number, number][]) {
  return points.map(
    ([x, y]) => [(x - CX) / SCALE, -(y - CY) / SCALE] as const,
  );
}

/** reamostra um polígono fechado em N pontos equidistantes (em z fixo) */
function resample(points: [number, number][], n: number, z: number) {
  const local = toLocal(points);
  const closed = [...local, local[0]];
  const segLen: number[] = [];
  let total = 0;
  for (let i = 0; i < closed.length - 1; i++) {
    const l = Math.hypot(
      closed[i + 1][0] - closed[i][0],
      closed[i + 1][1] - closed[i][1],
    );
    segLen.push(l);
    total += l;
  }
  const out = new Float32Array((n + 1) * 3);
  let seg = 0;
  let acc = 0;
  for (let i = 0; i <= n; i++) {
    const d = (i / n) * total;
    while (seg < segLen.length - 1 && acc + segLen[seg] < d) {
      acc += segLen[seg];
      seg++;
    }
    const t = segLen[seg] > 0 ? (d - acc) / segLen[seg] : 0;
    out[i * 3] = closed[seg][0] + (closed[seg + 1][0] - closed[seg][0]) * t;
    out[i * 3 + 1] = closed[seg][1] + (closed[seg + 1][1] - closed[seg][1]) * t;
    out[i * 3 + 2] = z;
  }
  return out;
}

/** fração do perímetro em que cada VÉRTICE original aparece (p/ arestas) */
function cornerFractions(points: [number, number][]) {
  const local = toLocal(points);
  const closed = [...local, local[0]];
  const fr: number[] = [0];
  let total = 0;
  const acc: number[] = [0];
  for (let i = 0; i < closed.length - 1; i++) {
    total += Math.hypot(
      closed[i + 1][0] - closed[i][0],
      closed[i + 1][1] - closed[i][1],
    );
    acc.push(total);
  }
  for (let i = 1; i < local.length; i++) fr.push(acc[i] / total);
  return { local, fr };
}

/** arestas verticais (frente↔trás) em cada vértice, ordenadas pelo traço */
function buildRisers(points: [number, number][], hd: number) {
  const { local, fr } = cornerFractions(points);
  const pos = new Float32Array(local.length * 6);
  local.forEach(([x, y], i) => {
    pos.set([x, y, -hd, x, y, hd], i * 6);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setDrawRange(0, 0);
  return { geo: g, fractions: fr, count: local.length };
}

const N_WHITE = 320;
const N_PURPLE = 200;
const MIN_Y = -2.4;
const MAX_Y = 2.35;
const MIN_X = -2.8;
const MAX_X = 3.1;

function ScanHead({
  color,
  headRef,
}: {
  color: string;
  headRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={headRef} visible={false}>
      <mesh>
        <circleGeometry args={[0.07, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[0.24, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** crosshair + linha-guia + etiqueta mono (anotação igloo) */
function Callout({
  anchor,
  dir,
  labelRef,
  lineMat,
}: {
  anchor: [number, number, number];
  dir: [number, number];
  labelRef: React.RefObject<HTMLSpanElement | null>;
  lineMat: THREE.LineBasicMaterial;
}) {
  const { leader, cross } = useMemo(() => {
    const [ax, ay, az] = anchor;
    const ex = ax + dir[0];
    const ey = ay + dir[1];
    const leaderG = new THREE.BufferGeometry();
    leaderG.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [ax, ay, az, ex, ey, az, ex + Math.sign(dir[0]) * 0.42, ey, az],
        3,
      ),
    );
    const c = 0.07;
    const crossG = new THREE.BufferGeometry();
    crossG.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [ax - c, ay, az, ax + c, ay, az, ax, ay - c, az, ax, ay + c, az],
        3,
      ),
    );
    return {
      leader: new THREE.Line(leaderG, lineMat),
      cross: new THREE.LineSegments(crossG, lineMat),
    };
  }, [anchor, dir, lineMat]);

  useEffect(
    () => () => {
      leader.geometry.dispose();
      cross.geometry.dispose();
    },
    [leader, cross],
  );

  const [ax, ay, az] = anchor;
  return (
    <group>
      <primitive object={leader} />
      <primitive object={cross} />
      <Html
        position={[ax + dir[0] + Math.sign(dir[0]) * 0.5, ay + dir[1], az]}
        center
        wrapperClass="jy-callout-wrap"
        zIndexRange={[1, 1]}
      >
        <span className="jy-callout" ref={labelRef} />
      </Html>
    </group>
  );
}

export default function BlueprintLogo({
  getBuild,
  getFill,
  getFade,
}: {
  getBuild: () => number;
  getFill?: () => number;
  getFade?: () => number;
}) {
  // contornos frente/trás por forma
  const wFront = useMemo(() => resample(WHITE_POINTS, N_WHITE, HD_W), []);
  const wBack = useMemo(() => resample(WHITE_POINTS, N_WHITE, -HD_W), []);
  const pFront = useMemo(() => resample(PURPLE_POINTS, N_PURPLE, HD_P), []);
  const pBack = useMemo(() => resample(PURPLE_POINTS, N_PURPLE, -HD_P), []);

  const makeGeo = (pos: Float32Array, drawn = 0) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setDrawRange(0, drawn);
    return g;
  };
  const wFrontGeo = useMemo(() => makeGeo(wFront), [wFront]);
  const wBackGeo = useMemo(() => makeGeo(wBack), [wBack]);
  const pFrontGeo = useMemo(() => makeGeo(pFront), [pFront]);
  const pBackGeo = useMemo(() => makeGeo(pBack), [pBack]);
  const wGhostGeo = useMemo(() => makeGeo(wFront, Infinity), [wFront]);
  const pGhostGeo = useMemo(() => makeGeo(pFront, Infinity), [pFront]);

  // arestas verticais (o VOLUME nascendo)
  const wRisers = useMemo(() => buildRisers(WHITE_POINTS, HD_W), []);
  const pRisers = useMemo(() => buildRisers(PURPLE_POINTS, HD_P), []);

  const whiteMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#e6e9f6",
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const purpleMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#a78bfa",
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const backMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#8b5cf6",
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const riserMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#cfc8f0",
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const ghostMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#8b5cf6",
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const calloutMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#cfc8f0",
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const beadMatW = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#e6e9f6",
        size: 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const beadMatP = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#a78bfa",
        size: 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const scanBarMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#c4b5fd",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  // objetos THREE via <primitive> (o JSX <line> colide com o SVG line)
  const objs = useMemo(
    () => ({
      wFrontL: new THREE.Line(wFrontGeo, whiteMat),
      wBackL: new THREE.Line(wBackGeo, backMat),
      pFrontL: new THREE.Line(pFrontGeo, purpleMat),
      pBackL: new THREE.Line(pBackGeo, backMat),
      wGhost: new THREE.Line(wGhostGeo, ghostMat),
      pGhost: new THREE.Line(pGhostGeo, ghostMat),
      wRiserL: new THREE.LineSegments(wRisers.geo, riserMat),
      pRiserL: new THREE.LineSegments(pRisers.geo, riserMat),
      wBeads: new THREE.Points(wFrontGeo, beadMatW),
      pBeads: new THREE.Points(pFrontGeo, beadMatP),
    }),
    [wFrontGeo, wBackGeo, pFrontGeo, pBackGeo, wGhostGeo, pGhostGeo, wRisers, pRisers, whiteMat, backMat, purpleMat, ghostMat, riserMat, beadMatW, beadMatP],
  );

  const whiteHead = useRef<THREE.Group>(null);
  const purpleHead = useRef<THREE.Group>(null);
  const scanBar = useRef<THREE.Mesh>(null);
  const calloutW = useRef<HTMLSpanElement>(null);
  const calloutP = useRef<HTMLSpanElement>(null);

  useEffect(
    () => () => {
      [wFrontGeo, wBackGeo, pFrontGeo, pBackGeo, wGhostGeo, pGhostGeo].forEach(
        (g) => g.dispose(),
      );
      wRisers.geo.dispose();
      pRisers.geo.dispose();
      [whiteMat, purpleMat, backMat, riserMat, ghostMat, calloutMat, beadMatW, beadMatP, scanBarMat].forEach(
        (m) => m.dispose(),
      );
    },
    [wFrontGeo, wBackGeo, pFrontGeo, pBackGeo, wGhostGeo, pGhostGeo, wRisers, pRisers, whiteMat, purpleMat, backMat, riserMat, ghostMat, calloutMat, beadMatW, beadMatP, scanBarMat],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const build = clamp01(getBuild());
    const fill = clamp01(getFill?.() ?? 0);
    const fade = clamp01(getFade?.() ?? 1);

    // fases: branco 0→0.5 · roxo 0.4→0.85; traseira segue com atraso
    const wPhase = clamp01(build / 0.5);
    const pPhase = clamp01((build - 0.4) / 0.45);
    const wBackPh = clamp01(wPhase * 1.25 - 0.25);
    const pBackPh = clamp01(pPhase * 1.25 - 0.25);
    wFrontGeo.setDrawRange(0, Math.floor(wPhase * N_WHITE) + 1);
    pFrontGeo.setDrawRange(0, Math.floor(pPhase * N_PURPLE) + 1);
    wBackGeo.setDrawRange(0, Math.floor(wBackPh * N_WHITE) + 1);
    pBackGeo.setDrawRange(0, Math.floor(pBackPh * N_PURPLE) + 1);

    // arestas verticais: sobem quando o traço passa pelo seu vértice
    let wc = 0;
    for (let i = 0; i < wRisers.count; i++)
      if (wRisers.fractions[i] <= wBackPh) wc++;
    wRisers.geo.setDrawRange(0, wc * 2);
    let pc = 0;
    for (let i = 0; i < pRisers.count; i++)
      if (pRisers.fractions[i] <= pBackPh) pc++;
    pRisers.geo.setDrawRange(0, pc * 2);

    // o traço CINTILA enquanto desenha (laser vivo)
    const flicker = 0.82 + 0.18 * Math.sin(t * 26) * Math.sin(t * 7.3);
    whiteMat.opacity = fade * (wPhase < 1 ? flicker : 0.9);
    purpleMat.opacity = fade * (pPhase < 1 ? flicker : 0.9);
    backMat.opacity = fade * 0.38;
    riserMat.opacity = fade * (0.4 + 0.2 * Math.sin(t * 3.2));
    beadMatW.opacity = fade * 0.85 * flicker;
    beadMatP.opacity = fade * 0.85 * flicker;
    ghostMat.opacity = fade * (0.07 + 0.04 * Math.sin(t * 2.2));
    calloutMat.opacity = fade * (build < 1 ? 0.5 : 0.15);

    // etiquetas mono com dados VIVOS (linguagem igloo)
    const el1 = calloutW.current;
    if (el1) {
      el1.textContent = `SEG_W ▸ ${String(Math.round(wPhase * 100)).padStart(3, "0")}%`;
      el1.style.opacity = String(fade * (wPhase > 0.02 && build < 1 ? 1 : 0));
    }
    const el2 = calloutP.current;
    if (el2) {
      el2.textContent =
        fill > 0
          ? `MAT ▸ ${String(Math.round(fill * 100)).padStart(3, "0")}%`
          : `SEG_P ▸ ${String(Math.round(pPhase * 100)).padStart(3, "0")}%`;
      el2.style.opacity = String(fade * (pPhase > 0.02 && fill < 1 ? 1 : 0));
    }

    // cabeças de scan na ponta do traço (pulsam)
    const place = (
      head: THREE.Group | null,
      posArr: Float32Array,
      phase: number,
      n: number,
    ) => {
      if (!head) return;
      const active = phase > 0.001 && phase < 0.999 && fade > 0.3;
      head.visible = active;
      if (!active) return;
      const i = Math.min(Math.floor(phase * n), n);
      head.position.set(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2] + 0.02);
      const pulse = 1 + Math.sin(t * 18) * 0.3;
      head.scale.setScalar(pulse);
    };
    place(whiteHead.current, wFront, wPhase, N_WHITE);
    place(purpleHead.current, pFront, pPhase, N_PURPLE);

    // barra de varredura da materialização: sobe com o fill, pulsando
    const bar = scanBar.current;
    if (bar) {
      const on = fill > 0.001 && fill < 0.999;
      bar.visible = on && fade > 0.2;
      if (bar.visible) {
        bar.position.y = MIN_Y + (MAX_Y - MIN_Y) * fill;
        scanBarMat.opacity = fade * (0.5 + 0.3 * Math.sin(t * 30));
      }
    }
  });

  return (
    <group>
      <primitive object={objs.wGhost} />
      <primitive object={objs.pGhost} />
      <primitive object={objs.wBackL} />
      <primitive object={objs.pBackL} />
      <primitive object={objs.wRiserL} />
      <primitive object={objs.pRiserL} />
      <primitive object={objs.wFrontL} />
      <primitive object={objs.pFrontL} />
      <primitive object={objs.wBeads} />
      <primitive object={objs.pBeads} />
      <ScanHead color="#e6e9f6" headRef={whiteHead} />
      <ScanHead color="#a78bfa" headRef={purpleHead} />
      {/* anotações de medição (mono + linha-guia + crosshair) */}
      <Callout
        anchor={[0.19, 0.74, HD_W]}
        dir={[1.15, 0.65]}
        labelRef={calloutW}
        lineMat={calloutMat}
      />
      <Callout
        anchor={[1, -2.26, HD_P]}
        dir={[-1.5, -0.4]}
        labelRef={calloutP}
        lineMat={calloutMat}
      />
      <mesh ref={scanBar} visible={false} position={[(MIN_X + MAX_X) / 2, 0, 0.05]}>
        <planeGeometry args={[MAX_X - MIN_X + 0.6, 0.018]} />
        <primitive object={scanBarMat} attach="material" />
      </mesh>
    </group>
  );
}
