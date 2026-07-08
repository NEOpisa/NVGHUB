"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN } from "../journeyState";
import { WORLD } from "../path";

/**
 * Estação ECOSSISTEMA: um "planeta digital" em linguagem de LINHAS — núcleo
 * icosaédrico wireframe com enxame de pontos internos cintilando, 3 camadas
 * orbitais (Base → Conexão → Inteligência) com anéis delgados contra-rotativos
 * e nós esféricos, casca wireframe externa, feixes verticais e cometas.
 * Tudo respira: revela por camada, pulsa, orbita.
 */
const LAYERS = [
  { y: -1.15, r: 2.4, speed: 0.12 },
  { y: 0, r: 1.9, speed: -0.16 },
  { y: 1.15, r: 1.4, speed: 0.2 },
] as const;
const NODES = 12;
const COMETS = 26;
const CORE_PTS = 60;

export default function Ecosystem() {
  const group = useRef<THREE.Group>(null);
  const layerRefs = useRef<(THREE.Group | null)[]>([]);
  const innerRings = useRef<(THREE.Mesh | null)[]>([]);
  const beams = useRef<THREE.LineSegments>(null);
  const shell = useRef<THREE.Mesh>(null);
  const comets = useRef<THREE.Points>(null);
  const coreWire = useRef<THREE.Mesh>(null);
  const corePts = useRef<THREE.Points>(null);

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.07, 10, 10), []);
  const torusGeos = useMemo(
    () => LAYERS.map((l) => new THREE.TorusGeometry(l.r, 0.012, 8, 96)),
    [],
  );
  const innerGeos = useMemo(
    () => LAYERS.map((l) => new THREE.TorusGeometry(l.r - 0.22, 0.006, 8, 96)),
    [],
  );
  const layerMats = useMemo(
    () =>
      LAYERS.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: "#f076e0",
            emissive: "#dd3bc8",
            emissiveIntensity: 0.55,
            metalness: 0.6,
            roughness: 0.35,
            transparent: true,
            opacity: 0,
          }),
      ),
    [],
  );
  const innerMats = useMemo(
    () =>
      LAYERS.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: "#f076e0",
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
      ),
    [],
  );

  const beamGeo = useMemo(() => {
    const pos: number[] = [];
    for (let j = 0; j < NODES; j++) {
      const a = (j / NODES) * Math.PI * 2;
      const x = Math.cos(a) * 1.65;
      const z = Math.sin(a) * 1.65;
      pos.push(x, LAYERS[0].y, z, x, LAYERS[2].y, z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);
  const beamMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#dd3bc8",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const shellGeo = useMemo(() => new THREE.IcosahedronGeometry(3.15, 1), []);
  const shellMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#8f1878",
        wireframe: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  // cometas: pontos orbitando em elipses inclinadas (grupo gira; barato)
  const cometGeo = useMemo(() => {
    const pos = new Float32Array(COMETS * 3);
    for (let i = 0; i < COMETS; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.6 + Math.random() * 1.2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.6;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const cometMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.06,
        sizeAttenuation: true,
        color: "#f076e0",
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // núcleo: icosaedro wireframe + enxame de pontos internos cintilando
  const coreWireGeo = useMemo(() => new THREE.IcosahedronGeometry(0.52, 1), []);
  const coreWireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f076e0",
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const corePtsGeo = useMemo(() => {
    const pos = new Float32Array(CORE_PTS * 3);
    for (let i = 0; i < CORE_PTS; i++) {
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(Math.random() * 2 - 1);
      const rr = Math.random() * 0.42;
      pos[i * 3] = Math.sin(b) * Math.cos(a) * rr;
      pos[i * 3 + 1] = Math.cos(b) * rr;
      pos[i * 3 + 2] = Math.sin(b) * Math.sin(a) * rr;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const corePtsMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.05,
        sizeAttenuation: true,
        color: "#e6e9f6",
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const nodeMeshes = useRef<(THREE.InstancedMesh | null)[]>([]);
  useEffect(() => {
    const o = new THREE.Object3D();
    nodeMeshes.current.forEach((im, li) => {
      if (!im) return;
      for (let j = 0; j < NODES; j++) {
        const a = (j / NODES) * Math.PI * 2;
        o.position.set(
          Math.cos(a) * LAYERS[li].r,
          0,
          Math.sin(a) * LAYERS[li].r,
        );
        o.scale.setScalar(0.6 + (j % 3) * 0.28);
        o.updateMatrix();
        im.setMatrixAt(j, o.matrix);
      }
      im.instanceMatrix.needsUpdate = true;
    });
  }, []);

  useEffect(
    () => () => {
      nodeGeo.dispose();
      torusGeos.forEach((g) => g.dispose());
      innerGeos.forEach((g) => g.dispose());
      layerMats.forEach((m) => m.dispose());
      innerMats.forEach((m) => m.dispose());
      beamGeo.dispose();
      beamMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      cometGeo.dispose();
      cometMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      corePtsGeo.dispose();
      corePtsMat.dispose();
    },
    [nodeGeo, torusGeos, innerGeos, layerMats, innerMats, beamGeo, beamMat, shellGeo, shellMat, cometGeo, cometMat, coreWireGeo, coreWireMat, corePtsGeo, corePtsMat],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm > 0.12 && sm < 0.56;
    if (!g.visible) return;

    const time = state.clock.elapsedTime;
    const l = rangeN(sm, 0.2, 0.44);

    for (let i = 0; i < LAYERS.length; i++) {
      const lg = layerRefs.current[i];
      if (!lg) continue;
      const reveal = rangeN(l, 0.1 + i * 0.22, 0.28 + i * 0.22);
      const s = 0.55 + 0.45 * reveal;
      lg.scale.setScalar(THREE.MathUtils.damp(lg.scale.x, s, 6, dt));
      lg.rotation.y += dt * LAYERS[i].speed * (0.3 + reveal);
      layerMats[i].opacity = reveal;
      layerMats[i].emissiveIntensity =
        0.35 + reveal * (0.85 + Math.sin(time * 1.4 + i) * 0.2);
      const ir = innerRings.current[i];
      if (ir) {
        ir.rotation.z -= dt * LAYERS[i].speed * 2.2;
        innerMats[i].opacity = reveal * 0.3;
      }
    }

    if (beams.current) {
      beams.current.rotation.y -= dt * 0.06;
      beamMat.opacity = rangeN(l, 0.5, 0.85) * 0.3;
    }
    if (shell.current) {
      shell.current.rotation.y += dt * 0.03;
      shell.current.rotation.x = Math.sin(time * 0.08) * 0.1;
      shellMat.opacity = rangeN(l, 0.15, 0.6) * 0.09;
    }
    if (comets.current) {
      comets.current.rotation.y += dt * 0.22;
      comets.current.rotation.x = 0.28;
      cometMat.opacity = rangeN(l, 0.2, 0.6) * 0.7;
    }

    // núcleo: wireframe pulsa e gira; pontos internos cintilam em contra-giro
    const pulse = 1 + Math.sin(time * 1.8) * 0.07;
    if (coreWire.current) {
      coreWire.current.scale.setScalar(pulse * (0.6 + l * 0.4));
      coreWire.current.rotation.y += dt * 0.35;
      coreWire.current.rotation.x = Math.sin(time * 0.5) * 0.25;
      coreWireMat.opacity = 0.3 + l * 0.4 + Math.sin(time * 2.4) * 0.12;
    }
    if (corePts.current) {
      corePts.current.rotation.y -= dt * 0.6;
      corePts.current.scale.setScalar(pulse);
      corePtsMat.opacity = (0.5 + Math.sin(time * 3.1) * 0.3) * l;
    }
    g.rotation.y = Math.sin(time * 0.1) * 0.15;
    g.rotation.z = 0.1; // leve inclinação de composição
  });

  return (
    <group ref={group} position={[WORLD.eco.x, WORLD.eco.y, WORLD.eco.z]}>
      {LAYERS.map((layer, i) => (
        <group
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          position={[0, layer.y, 0]}
        >
          <mesh
            geometry={torusGeos[i]}
            material={layerMats[i]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            ref={(el) => {
              innerRings.current[i] = el;
            }}
            geometry={innerGeos[i]}
            material={innerMats[i]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <instancedMesh
            ref={(el) => {
              nodeMeshes.current[i] = el;
            }}
            args={[nodeGeo, layerMats[i], NODES]}
          />
        </group>
      ))}
      <lineSegments ref={beams} geometry={beamGeo} material={beamMat} />
      <mesh ref={shell} geometry={shellGeo} material={shellMat} />
      <points ref={comets} geometry={cometGeo} material={cometMat} />
      <mesh ref={coreWire} geometry={coreWireGeo} material={coreWireMat} />
      <points ref={corePts} geometry={corePtsGeo} material={corePtsMat} />
      <pointLight intensity={40} color="#dd3bc8" distance={14} />
    </group>
  );
}
