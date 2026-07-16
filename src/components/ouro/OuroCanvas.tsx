"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { buildLogoChunks } from "@/components/scene/logoGeometry";

/**
 * Cenário 3D próprio da DIVISÃO OURO: a MESMA marca NV do hero da home —
 * material físico com clearcoat, filme iridescente e juntas de luz — só que
 * FUNDIDA EM OURO, ladeada por barras em deriva e poeira dourada.
 * Paisagem: a marca vive à direita do hero. Retrato: centrada no topo,
 * acima da copy (nada sai cortado na borda). O scroll dirige tudo.
 */

function scrollP(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

// composição da marca no hero (paisagem / retrato)
const LOGO_LAND = { x: 2.3, y: 0.1, s: 0.95 };
const LOGO_PORT = { x: 0, y: 1.85, s: 0.5 };

function GoldWorld() {
  const logo = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Group>(null);
  const p = useRef(0);

  const mats = useMemo(() => {
    // a peça "branca" do hero, em ouro claro polido
    const goldLight = new THREE.MeshPhysicalMaterial({
      color: "#f2cd86",
      metalness: 1.0,
      roughness: 0.14,
      emissive: new THREE.Color("#b8791e"),
      emissiveIntensity: 0.18,
      envMapIntensity: 1.6,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      // mesmo filme fino iridescente do hero — aqui sobre o ouro
      iridescence: 0.55,
      iridescenceIOR: 1.32,
      iridescenceThicknessRange: [120, 680],
      transparent: true,
    });
    // a peça "roxa" do hero, em ouro profundo que emite calor
    const goldDeep = new THREE.MeshPhysicalMaterial({
      color: "#d9a441",
      metalness: 0.95,
      roughness: 0.18,
      emissive: new THREE.Color("#f4b74a"),
      emissiveIntensity: 0.5,
      envMapIntensity: 1.8,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      iridescence: 0.4,
      iridescenceIOR: 1.32,
      iridescenceThicknessRange: [140, 620],
      transparent: true,
    });
    // halo dourado respirando sobre as peças profundas
    const halo = new THREE.MeshBasicMaterial({
      color: "#ffcb6e",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    // juntas luminosas entre os cacos (as "seams" do hero)
    const seam = new THREE.LineBasicMaterial({
      color: "#ffe9c4",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    // barras de ouro ao fundo
    const bar = new THREE.MeshStandardMaterial({
      color: "#d9a441",
      metalness: 0.85,
      roughness: 0.28,
      emissive: new THREE.Color("#7a5514"),
      emissiveIntensity: 0.35,
    });
    return { goldLight, goldDeep, halo, seam, bar };
  }, []);

  // a marca NV inteira do hero, caco a caco, em ouro
  const { group, geos } = useMemo(() => {
    const built = buildLogoChunks(1, 1);
    const g = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];
    [
      ...built.white.map((c) => ({ c, mat: mats.goldLight, deep: false })),
      ...built.purple.map((c) => ({ c, mat: mats.goldDeep, deep: true })),
    ].forEach(({ c, mat, deep }) => {
      const mesh = new THREE.Mesh(c.geometry, mat);
      mesh.position.copy(c.pivot);
      geos.push(c.geometry);
      // juntas de luz sobre o metal (mesma construção do HeroLogo)
      const edges = new THREE.EdgesGeometry(c.geometry, 24);
      mesh.add(new THREE.LineSegments(edges, mats.seam));
      geos.push(edges);
      if (deep) {
        const halo = new THREE.Mesh(c.geometry, mats.halo);
        halo.scale.setScalar(1.04);
        mesh.add(halo);
      }
      g.add(mesh);
    });
    return { group: g, geos };
  }, [mats]);

  // barras de ouro: caixas chanfradas (escala achatada) em deriva
  const barGeo = useMemo(() => new THREE.BoxGeometry(1, 0.32, 0.5), []);
  const bars = useMemo(
    () => [
      { pos: [-3.4, -1.2, -3] as const, rot: 0.5, s: 1.15, sp: 0.14 },
      { pos: [-2.2, 1.7, -4.5] as const, rot: 2.1, s: 0.8, sp: -0.1 },
      { pos: [3.6, -1.9, -2.5] as const, rot: 1.2, s: 0.95, sp: 0.08 },
      { pos: [2.6, 2.2, -5] as const, rot: 3.6, s: 0.7, sp: -0.16 },
    ],
    [],
  );
  const barRefs = useRef<(THREE.Mesh | null)[]>([]);

  // poeira dourada
  const dustGeo = useMemo(() => {
    const N = 260;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = -1 - Math.random() * 7;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const dustMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.035,
        sizeAttenuation: true,
        color: "#ffcb6e",
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );
  const dust = useRef<THREE.Points>(null);

  useEffect(() => {
    const update = () => {
      p.current = scrollP();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(
    () => () => {
      geos.forEach((g) => g.dispose());
      mats.goldLight.dispose();
      mats.goldDeep.dispose();
      mats.halo.dispose();
      mats.seam.dispose();
      mats.bar.dispose();
      barGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    },
    [geos, mats, barGeo, dustGeo, dustMat],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const sp = p.current;
    const cam = state.camera as THREE.PerspectiveCamera;
    // RETRATO: a marca sobe pro topo, centrada e menor — nada sai cortado
    const k = THREE.MathUtils.clamp((0.9 - cam.aspect) / 0.45, 0, 1);
    const l = logo.current;
    if (l) {
      // hero: em cena, de frente; ao descer, recua girando e SE DISSOLVE
      // (senão a marca gigante atravessa o conteúdo das seções)
      const vis = 1 - THREE.MathUtils.clamp((sp - 0.06) / 0.1, 0, 1);
      l.visible = vis > 0.01;
      mats.goldLight.opacity = vis;
      mats.goldDeep.opacity = vis;

      // LOOP do hero: brilho respirando + juntas de luz + halo pulsando
      const breathe = 0.5 + 0.5 * Math.sin(t * 1.1);
      mats.goldLight.emissiveIntensity = 0.14 + breathe * 0.18;
      mats.goldDeep.emissiveIntensity = 0.4 + breathe * 0.5;
      mats.seam.opacity = (0.12 + breathe * 0.14) * vis;
      mats.halo.opacity = breathe * 0.28 * vis;

      const bx = THREE.MathUtils.lerp(LOGO_LAND.x, LOGO_PORT.x, k);
      const by = THREE.MathUtils.lerp(LOGO_LAND.y, LOGO_PORT.y, k);
      const bs = THREE.MathUtils.lerp(LOGO_LAND.s, LOGO_PORT.s, k);
      l.position.x = bx + sp * 3 * (1 - k);
      l.position.y = by + Math.sin(t * 0.5) * 0.12 + sp * 1.4;
      l.position.z = -sp * 6;
      l.rotation.y = -0.35 * (1 - k * 0.5) + t * 0.1 + sp * 2.6;
      l.rotation.x = Math.sin(t * 0.33) * 0.06;
      l.scale.setScalar(Math.max(bs - sp * 0.3, 0.1));
    }
    const bg = barsRef.current;
    if (bg) bg.position.y = sp * 3.4; // parallax: barras sobem mais devagar
    const barPull = THREE.MathUtils.lerp(1, 0.5, k); // retrato: barras pra dentro
    barRefs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.y += dt * bars[i].sp;
      m.rotation.x = Math.sin(t * 0.3 + i * 2.1) * 0.25;
      m.position.x = bars[i].pos[0] * barPull;
      m.position.y = bars[i].pos[1] + Math.sin(t * 0.4 + i * 1.7) * 0.18;
    });
    if (dust.current) {
      dust.current.rotation.y = t * 0.014;
      dust.current.position.y = sp * 2;
    }
  });

  return (
    <>
      {/* luz única: key quente do topo-esquerda + fill fraco */}
      <ambientLight intensity={0.42} />
      <directionalLight position={[-6, 8, 5]} intensity={2.6} color="#fff3dd" />
      <pointLight position={[3, 1, 3]} intensity={26} color="#f4b74a" distance={14} decay={1.8} />
      {/* reflexos para o metal (bake único, sem rede) — a mesma key
          superior-esquerda domina, com um fill dourado por baixo */}
      <Environment resolution={64} frames={1}>
        <Lightformer
          form="rect"
          intensity={1.9}
          position={[-4, 4, 5]}
          scale={8}
          color="#fff3dd"
        />
        <Lightformer
          form="rect"
          intensity={0.5}
          position={[5, -2, 3]}
          scale={6}
          color="#f4b74a"
        />
      </Environment>

      <group ref={logo}>
        <primitive object={group} />
      </group>

      <group ref={barsRef}>
        {bars.map((b, i) => (
          <mesh
            key={i}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            geometry={barGeo}
            material={mats.bar}
            position={[b.pos[0], b.pos[1], b.pos[2]]}
            rotation={[0, b.rot, 0.12]}
            scale={b.s}
          />
        ))}
      </group>

      <points ref={dust} geometry={dustGeo} material={dustMat} />
    </>
  );
}

export default function OuroCanvas() {
  const [running, setRunning] = useState(true);
  useEffect(() => {
    const update = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div className="ou-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={running ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6.4], fov: 52 }}
      >
        <GoldWorld />
      </Canvas>
    </div>
  );
}
