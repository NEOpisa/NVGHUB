"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useDomAnchor } from "@/components/scene/useDomAnchor";

const WHITE_POINTS: [number, number][] = [
  [48, 25], [86, 44], [168, 93], [194, 143], [94, 78],
  [94, 144], [155, 216], [138, 206], [71, 151], [70, 48],
];
const PURPLE_POINTS: [number, number][] = [
  [287, 27], [202, 219], [153, 175], [110, 116], [190, 169],
];

const CX = 160;
const CY = 124;
const SCALE = 42;

// A entrada (peças voando + montando) só toca no 1º load/reload da página.
// Esta flag vive no escopo do módulo: persiste entre navegações internas
// (não repete a entrada), mas zera num reload de verdade.
let entrancePlayed = false;

function buildGeometry(points: [number, number][], depth: number) {
  const shape = new THREE.Shape(
    points.map(([x, y]) => new THREE.Vector2((x - CX) / SCALE, -(y - CY) / SCALE))
  );
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.05,
    bevelSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

type Chunk = { geometry: THREE.BufferGeometry; pivot: THREE.Vector3; dir: THREE.Vector3 };

// Particiona uma geometria em N cacos rígidos: ordena os triângulos pelo ângulo
// em torno do centro e fatia em N grupos contíguos (garante N peças não-vazias).
// Cada caco é recentrado no próprio pivô (pra girar/escalar em torno de si).
function splitChunks(geo: THREE.BufferGeometry, n: number): Chunk[] {
  const g = geo.toNonIndexed();
  const pos = g.attributes.position as THREE.BufferAttribute;
  const nrm = g.attributes.normal as THREE.BufferAttribute | undefined;
  const triN = pos.count / 3;

  const tris = Array.from({ length: triN }, (_, t) => {
    const i = t * 3;
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    return { t, ang: Math.atan2(cy, cx) };
  }).sort((a, b) => a.ang - b.ang);

  const per = Math.ceil(triN / n);
  const chunks: Chunk[] = [];
  for (let b = 0; b < n; b++) {
    const slice = tris.slice(b * per, (b + 1) * per);
    if (!slice.length) continue;
    const vCount = slice.length * 3;
    const raw = new Float32Array(vCount * 3);
    const rawN = nrm ? new Float32Array(vCount * 3) : null;
    const pivot = new THREE.Vector3();
    let k = 0;
    for (const { t } of slice) {
      const i = t * 3;
      for (let v = 0; v < 3; v++) {
        const x = pos.getX(i + v), y = pos.getY(i + v), z = pos.getZ(i + v);
        raw[k * 3] = x; raw[k * 3 + 1] = y; raw[k * 3 + 2] = z;
        if (rawN && nrm) {
          rawN[k * 3] = nrm.getX(i + v); rawN[k * 3 + 1] = nrm.getY(i + v); rawN[k * 3 + 2] = nrm.getZ(i + v);
        }
        pivot.x += x; pivot.y += y; pivot.z += z;
        k++;
      }
    }
    pivot.multiplyScalar(1 / vCount);
    for (let j = 0; j < raw.length; j += 3) {
      raw[j] -= pivot.x; raw[j + 1] -= pivot.y; raw[j + 2] -= pivot.z;
    }
    const cg = new THREE.BufferGeometry();
    cg.setAttribute("position", new THREE.BufferAttribute(raw, 3));
    if (rawN) cg.setAttribute("normal", new THREE.BufferAttribute(rawN, 3));
    else cg.computeVertexNormals();
    const dir = pivot.clone();
    dir.z += 0.4;
    if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
    dir.normalize();
    chunks.push({ geometry: cg, pivot, dir });
  }
  g.dispose();
  return chunks;
}

/**
 * A marca NV 3D — item da cena global, ancorado ao `.hero-visual`.
 * - ENTRADA (7 cacos): só no 1º load/reload — peças voam de fora e se montam.
 * - LOOP (5 cacos): peças se afastam de leve com aura/glow magenta (estilo
 *   Black Desert) e se juntam, em loop.
 * Some suavemente quando o hero sai de vista (não vaza sobre a seção de baixo).
 */
export default function LogoItem({
  anchorRef,
  enabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lookRef = useRef<THREE.Group>(null);
  const built = useRef(0); // 0 = montando, 1 = montado (libera o olhar-pro-mouse)
  const glow = useRef(0); // 0..1 intensidade da aura no loop
  const fade = useRef(1);

  // Materiais (compartilhados pelos cacos do mesmo tom)
  const mats = useMemo(() => {
    const white = new THREE.MeshStandardMaterial({
      color: "#e8e8ee", metalness: 0.85, roughness: 0.28,
      emissive: new THREE.Color("#b9a3ff"), emissiveIntensity: 0, transparent: true,
    });
    const purple = new THREE.MeshStandardMaterial({
      color: "#7c3aed", metalness: 0.55, roughness: 0.3,
      emissive: new THREE.Color("#a855f7"), emissiveIntensity: 0.9, transparent: true,
    });
    const halo = new THREE.MeshBasicMaterial({
      color: "#d24bff", transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return { white, purple, halo };
  }, []);

  // Constrói os dois conjuntos de cacos (entrada 7 = 4 brancos + 3 roxos;
  // loop 5 = 3 brancos + 2 roxos). Cada conjunto é um THREE.Group de meshes.
  const { entranceGroup, loopGroup, entranceMeshes, loopMeshes, disposables } = useMemo(() => {
    const whiteGeo = buildGeometry(WHITE_POINTS, 0.55);
    const purpleGeo = buildGeometry(PURPLE_POINTS, 0.75);

    const make = (chunks: Chunk[], mat: THREE.Material, withHalo: boolean) =>
      chunks.map((c) => {
        const mesh = new THREE.Mesh(c.geometry, mat);
        mesh.position.copy(c.pivot);
        mesh.userData.pivot = c.pivot;
        mesh.userData.dir = c.dir;
        if (withHalo) {
          const halo = new THREE.Mesh(c.geometry, mats.halo);
          halo.scale.setScalar(1.22);
          mesh.add(halo);
        }
        return mesh;
      });

    const entranceMeshes = [
      ...make(splitChunks(whiteGeo, 4), mats.white, false),
      ...make(splitChunks(purpleGeo, 3), mats.purple, false),
    ];
    const loopMeshes = [
      ...make(splitChunks(whiteGeo, 3), mats.white, true),
      ...make(splitChunks(purpleGeo, 2), mats.purple, true),
    ];

    const entranceGroup = new THREE.Group();
    entranceMeshes.forEach((m) => entranceGroup.add(m));
    const loopGroup = new THREE.Group();
    loopMeshes.forEach((m) => loopGroup.add(m));

    const disposables = [
      whiteGeo, purpleGeo,
      ...entranceMeshes.map((m) => m.geometry),
      ...loopMeshes.map((m) => m.geometry),
    ];
    return { entranceGroup, loopGroup, entranceMeshes, loopMeshes, disposables };
  }, [mats]);

  useDomAnchor(groupRef, anchorRef, { z: 0, lerp: 0.12, enabled });

  // Estado inicial sem flash + máquina entrada→loop.
  useLayoutEffect(() => {
    const tls: gsap.core.Timeline[] = [];

    const startLoop = () => {
      built.current = 1;
      loopGroup.visible = true;
      // cada caco oscila de leve pra fora e volta, com aura subindo/descendo
      loopMeshes.forEach((m, idx) => {
        const pivot = m.userData.pivot as THREE.Vector3;
        const dir = m.userData.dir as THREE.Vector3;
        const amt = 0.32 + (idx % 3) * 0.05;
        const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: idx * 0.05 });
        tl.to(m.position, {
          x: pivot.x + dir.x * amt,
          y: pivot.y + dir.y * amt,
          z: pivot.z + dir.z * amt,
          duration: 1.9,
          ease: "sine.inOut",
        });
        tls.push(tl);
      });
      const gtl = gsap.timeline({ repeat: -1, yoyo: true });
      gtl.to(glow, { current: 1, duration: 1.9, ease: "sine.inOut" });
      tls.push(gtl);
    };

    if (entrancePlayed) {
      // já tocou nesta sessão de página → começa direto no loop, montado
      entranceGroup.visible = false;
      loopGroup.visible = true;
      fade.current = 1;
      startLoop();
    } else {
      // ENTRADA: espalha os 7 cacos e traz pra posição montada
      loopGroup.visible = false;
      entranceGroup.visible = true;
      entranceMeshes.forEach((m) => {
        const pivot = m.userData.pivot as THREE.Vector3;
        const dir = m.userData.dir as THREE.Vector3;
        gsap.set(m.position, {
          x: pivot.x + dir.x * (5 + Math.random() * 3) + (Math.random() - 0.5) * 3,
          y: pivot.y + dir.y * (5 + Math.random() * 3) + (Math.random() - 0.5) * 3,
          z: pivot.z + dir.z * 3 + (Math.random() - 0.5) * 4,
        });
        gsap.set(m.rotation, {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4,
          z: (Math.random() - 0.5) * 4,
        });
        gsap.set(m.scale, { x: 0.2, y: 0.2, z: 0.2 });
      });

      const prog = { v: 0 };
      const tl = gsap.timeline({
        onUpdate: () => (built.current = prog.v),
        onComplete: () => {
          entrancePlayed = true;
          entranceGroup.visible = false;
          startLoop();
        },
      });
      entranceMeshes.forEach((m, idx) => {
        const pivot = m.userData.pivot as THREE.Vector3;
        const at = idx * 0.08;
        tl.to(m.position, { x: pivot.x, y: pivot.y, z: pivot.z, duration: 1.5, ease: "expo.out" }, at);
        tl.to(m.rotation, { x: 0, y: 0, z: 0, duration: 1.6, ease: "expo.out" }, at);
        tl.to(m.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "back.out(1.6)" }, at + 0.1);
      });
      tl.to(prog, { v: 1, duration: 1.8, ease: "power2.out" }, 0);
      tls.push(tl);
    }

    return () => tls.forEach((t) => t.kill());
  }, [entranceGroup, loopGroup, entranceMeshes, loopMeshes]);

  // descarte de geometrias/materiais ao desmontar
  useEffect(() => {
    return () => {
      disposables.forEach((g) => g.dispose());
      mats.white.dispose();
      mats.purple.dispose();
      mats.halo.dispose();
    };
  }, [disposables, mats]);

  useFrame((state) => {
    // olhar pro mouse (entra conforme montado)
    const g = lookRef.current;
    if (g) {
      const t = state.clock.elapsedTime;
      const b = built.current;
      const tgtY = (state.pointer.x * 0.9 + Math.sin(t * 0.3) * 0.22) * b;
      const tgtX = (-state.pointer.y * 0.6 + Math.sin(t * 0.22) * 0.1) * b;
      g.rotation.y += (tgtY - g.rotation.y) * 0.07;
      g.rotation.x += (tgtX - g.rotation.x) * 0.07;
      g.rotation.z = Math.sin(t * 0.15) * 0.06 * b;
    }

    // aura/glow do loop
    const gl = glow.current;
    mats.white.emissiveIntensity = 0.15 + gl * 0.7;
    mats.purple.emissiveIntensity = 0.9 + gl * 1.9;
    mats.halo.opacity = gl * 0.6;

    // fade ao sair do hero (não vaza pra seção de baixo)
    const el = anchorRef.current;
    if (el) {
      const vh = Math.max(window.innerHeight, 1);
      const target = THREE.MathUtils.clamp(el.getBoundingClientRect().bottom / (vh * 0.5), 0, 1);
      fade.current += (target - fade.current) * 0.15;
    }
    const f = fade.current;
    mats.white.opacity = f;
    mats.purple.opacity = f;
    const root = groupRef.current;
    if (root) root.visible = f > 0.01;
  });

  return (
    <group ref={groupRef} scale={0.62}>
      <group ref={lookRef}>
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.9}>
          <primitive object={entranceGroup} />
          <primitive object={loopGroup} />
        </Float>
      </group>
      <Sparkles count={16} scale={[7, 6, 5]} size={2.2} speed={0.28} opacity={0.4} color="#d24bff" />
    </group>
  );
}
