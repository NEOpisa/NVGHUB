"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, rangeN } from "../journeyState";
import { makeLabelSprite, disposeLabelSprite } from "./labelSprite";

/**
 * CALLOUTS DE MEDIÇÃO (linguagem igloo) — enquanto a marca se desmonta no
 * scroll (vista explodida), linhas 1px ligam cacos vizinhos com números de
 * inspeção nos nós, como cotas de desenho técnico. A visibilidade é um sino
 * sobre a fase de scatter: nada no hero montado, nada depois que a marca
 * some — só no meio do gesto. Deve viver no MESMO espaço local dos cacos.
 */
const NODES = 5;

export default function MeasureCallouts({
  meshes,
}: {
  meshes: THREE.Mesh[];
}) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { picks, lineGeo, lineMat, sprites } = useMemo(() => {
    // cacos espalhados pela marca: passo largo determinístico
    const step = Math.max(1, Math.floor(meshes.length / NODES));
    const picks: number[] = [];
    for (let i = 0; i < NODES; i++) picks.push((i * step) % meshes.length);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array((NODES - 1) * 2 * 3), 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: "#cfc4ff",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprites = picks.map((p, i) =>
      makeLabelSprite(String(17 + ((p * 7 + i * 13) % 78)), "#c2b3ff", 0.3),
    );
    return { picks, lineGeo, lineMat, sprites };
  }, [meshes]);

  useEffect(
    () => () => {
      lineGeo.dispose();
      lineMat.dispose();
      sprites.forEach(disposeLabelSprite);
    },
    [lineGeo, lineMat, sprites],
  );

  useFrame(() => {
    const scatter = rangeN(journey.smooth, 0.055, 0.19);
    // sino: só no meio da desmontagem
    const amt = Math.sin(Math.PI * scatter);
    const on = amt > 0.02;
    if (lineRef.current) lineRef.current.visible = on;
    for (const s of sprites) s.visible = on;
    if (!on) return;

    const attr = lineGeo.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < NODES; i++) {
      const p = meshes[picks[i]].position;
      // etiqueta levemente acima/ao lado do caco
      sprites[i].position.set(p.x + 0.22, p.y + 0.3, p.z);
      sprites[i].material.opacity = amt * 0.85;
      if (i < NODES - 1) {
        const q = meshes[picks[i + 1]].position;
        const o = i * 6;
        arr[o] = p.x;
        arr[o + 1] = p.y;
        arr[o + 2] = p.z;
        arr[o + 3] = q.x;
        arr[o + 4] = q.y;
        arr[o + 5] = q.z;
      }
    }
    attr.needsUpdate = true;
    lineMat.opacity = amt * 0.5;
  });

  return (
    <>
      <lineSegments ref={lineRef} geometry={lineGeo} material={lineMat} />
      {sprites.map((s, i) => (
        <primitive key={i} object={s} />
      ))}
    </>
  );
}
