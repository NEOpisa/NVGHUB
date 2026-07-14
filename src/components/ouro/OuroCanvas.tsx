"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildLogoChunks } from "@/components/scene/logoGeometry";

/**
 * Cenário 3D próprio da DIVISÃO OURO: a marca NV fundida em OURO flutua à
 * direita do hero, ladeada por barras de ouro em deriva e poeira dourada.
 * O scroll da página dirige tudo (a marca recua e gira conforme desce) —
 * mesma luz única do site: key branca-quente vindo do topo-esquerda.
 */

function scrollP(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

function GoldWorld() {
  const logo = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Group>(null);
  const p = useRef(0);

  const mats = useMemo(() => {
    const gold = new THREE.MeshStandardMaterial({
      color: "#d9a441",
      metalness: 0.85,
      roughness: 0.28,
      emissive: new THREE.Color("#7a5514"),
      emissiveIntensity: 0.35,
    });
    const goldLight = new THREE.MeshStandardMaterial({
      color: "#f4d089",
      metalness: 0.75,
      roughness: 0.22,
      emissive: new THREE.Color("#9c7020"),
      emissiveIntensity: 0.4,
      transparent: true,
    });
    // só a marca esmaece (as barras continuam ao fundo da página inteira)
    const goldFade = gold.clone();
    goldFade.transparent = true;
    return { gold, goldLight, goldFade };
  }, []);

  // a marca NV inteira, em ouro (peça "branca" clara + peça "roxa" escura)
  const { group, geos } = useMemo(() => {
    const built = buildLogoChunks(1, 1);
    const g = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];
    [
      ...built.white.map((c) => ({ c, mat: mats.goldLight })),
      ...built.purple.map((c) => ({ c, mat: mats.goldFade })),
    ].forEach(({ c, mat }) => {
      const mesh = new THREE.Mesh(c.geometry, mat);
      mesh.position.copy(c.pivot);
      g.add(mesh);
      geos.push(c.geometry);
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
      mats.gold.dispose();
      mats.goldLight.dispose();
      mats.goldFade.dispose();
      barGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    },
    [geos, mats, barGeo, dustGeo, dustMat],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const sp = p.current;
    const l = logo.current;
    if (l) {
      // hero: à direita, de frente; ao descer, recua girando e SE DISSOLVE
      // (senão a marca gigante atravessa o conteúdo das seções)
      const vis = 1 - THREE.MathUtils.clamp((sp - 0.06) / 0.1, 0, 1);
      l.visible = vis > 0.01;
      mats.goldLight.opacity = vis;
      mats.goldFade.opacity = vis;
      l.position.x = 2.3 + sp * 3;
      l.position.y = 0.1 + Math.sin(t * 0.5) * 0.12 + sp * 1.4;
      l.position.z = -sp * 6;
      l.rotation.y = -0.35 + t * 0.1 + sp * 2.6;
      l.rotation.x = Math.sin(t * 0.33) * 0.06;
      const s = 0.95 - sp * 0.3;
      l.scale.setScalar(Math.max(s, 0.1));
    }
    const bg = barsRef.current;
    if (bg) bg.position.y = sp * 3.4; // parallax: barras sobem mais devagar
    barRefs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.y += dt * bars[i].sp;
      m.rotation.x = Math.sin(t * 0.3 + i * 2.1) * 0.25;
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
            material={mats.gold}
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
