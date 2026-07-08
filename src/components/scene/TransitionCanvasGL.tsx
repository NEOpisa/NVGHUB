"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { txBus } from "@/components/scene/transitionBus";
import { buildLogoChunks } from "@/components/scene/logoGeometry";

const _v = new THREE.Vector3();
const _dir = new THREE.Vector3();

// centro de um elemento (px de tela) → mundo no plano z, na câmera dada.
function screenToWorld(cx: number, cy: number, camera: THREE.Camera, z: number) {
  const ndcX = (cx / window.innerWidth) * 2 - 1;
  const ndcY = -((cy / window.innerHeight) * 2 - 1);
  _v.set(ndcX, ndcY, 0.5).unproject(camera);
  _dir.copy(_v).sub(camera.position).normalize();
  const dist = (z - camera.position.z) / _dir.z;
  return camera.position.clone().add(_dir.multiplyScalar(dist));
}

/**
 * A transição entre páginas é a MARCA NV 3D INTEIRA (nada de cacos): ela surge
 * no meio da tela (vindo da posição do hero, se a navegação parte de lá),
 * pulsa com glow violeta enquanto a rota troca e se dissolve ao revelar a nova
 * área — mesma linguagem obsidian/violeta da jornada.
 */
function TransitionLogo({ onActive }: { onActive: (a: boolean) => void }) {
  const { camera } = useThree();
  const backdropRef = useRef<THREE.Mesh>(null);
  const glow = useRef(0);

  const mats = useMemo(() => {
    const white = new THREE.MeshStandardMaterial({
      color: "#2a2438", metalness: 0.85, roughness: 0.32,
      emissive: new THREE.Color("#6d5bb8"), emissiveIntensity: 0.35, transparent: true, opacity: 0,
    });
    const purple = new THREE.MeshStandardMaterial({
      color: "#3b2566", metalness: 0.7, roughness: 0.36,
      emissive: new THREE.Color("#6c5cff"), emissiveIntensity: 0.8, transparent: true, opacity: 0,
    });
    const halo = new THREE.MeshBasicMaterial({
      color: "#6c5cff", transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return { white, purple, halo };
  }, []);

  // logo inteira: 1 peça branca + 1 roxa, sempre MONTADAS no pivô
  const { group, geos } = useMemo(() => {
    const built = buildLogoChunks(1, 1);
    const group = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];
    [...built.white.map((c) => ({ c, mat: mats.white })),
     ...built.purple.map((c) => ({ c, mat: mats.purple }))].forEach(({ c, mat }) => {
      const mesh = new THREE.Mesh(c.geometry, mat);
      mesh.position.copy(c.pivot);
      const halo = new THREE.Mesh(c.geometry, mats.halo);
      halo.scale.setScalar(1.05);
      mesh.add(halo);
      group.add(mesh);
      geos.push(c.geometry);
    });
    return { group, geos };
  }, [mats]);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;
    const setOpacity = (o: number) => {
      mats.white.opacity = o;
      mats.purple.opacity = o;
    };

    const off = txBus.on((e) => {
      if (e === "cover") {
        tl?.kill();
        onActive(true);

        // origem: posição do hero (se visível) ou fora da tela, embaixo à
        // esquerda — a marca VOA girando até o centro, e só então a rota troca
        const heroEl = document.querySelector<HTMLElement>(".logo-scene");
        let fromHero = false;
        let start = new THREE.Vector3(-7.5, -4.5, -1.5);
        if (heroEl) {
          const r = heroEl.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) {
            start = screenToWorld(r.left + r.width / 2, r.top + r.height / 2, camera, 0);
            fromHero = true;
          }
        }
        gsap.set(group.position, { x: start.x, y: start.y, z: start.z });
        gsap.set(group.scale, {
          x: fromHero ? 0.62 : 0.3,
          y: fromHero ? 0.62 : 0.3,
          z: fromHero ? 0.62 : 0.3,
        });
        gsap.set(group.rotation, {
          x: fromHero ? 0 : 0.5,
          y: fromHero ? -1.8 : -3.4,
          z: fromHero ? 0 : -1.1,
        });
        setOpacity(fromHero ? 1 : 0);

        tl = gsap.timeline({ onComplete: () => txBus.emit("covered") });
        if (backdropRef.current) {
          tl.to(backdropRef.current.material as THREE.Material, { opacity: 0.97, duration: 0.34, ease: "power2.out" }, 0);
        }
        tl
          // voo em arco: sobe além do centro e assenta
          .to(group.position, { x: 0, y: 0.5, z: 0.2, duration: 0.42, ease: "power2.out" }, 0)
          .to(group.position, { y: 0, z: 0, duration: 0.3, ease: "power2.inOut" }, 0.42)
          // gira o caminho inteiro até "encaixar" de frente
          .to(group.rotation, { x: 0, y: 0, z: 0, duration: 0.72, ease: "power3.out" }, 0)
          .to(group.scale, { x: 0.92, y: 0.92, z: 0.92, duration: 0.65, ease: "back.out(1.4)" }, 0.05)
          .to(glow, { current: 1, duration: 0.4, ease: "power2.out" }, 0.15);
        if (!fromHero) tl.to([mats.white, mats.purple], { opacity: 1, duration: 0.26, ease: "power2.out" }, 0);
      } else if (e === "reveal") {
        tl?.kill();
        tl = gsap.timeline({ onComplete: () => onActive(false) });
        tl
          // sai VOANDO por cima da câmera, girando no próprio eixo
          .to(group.position, { x: 1.6, y: 2.2, z: 4.6, duration: 0.5, ease: "power2.in" }, 0)
          .to(group.rotation, { y: 1.6, z: 0.7, duration: 0.5, ease: "power2.in" }, 0)
          .to(group.scale, { x: 1.25, y: 1.25, z: 1.25, duration: 0.5, ease: "power2.in" }, 0)
          .to([mats.white, mats.purple], { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.16)
          .to(glow, { current: 0, duration: 0.32 }, 0.1);
        if (backdropRef.current) {
          tl.to(backdropRef.current.material as THREE.Material, { opacity: 0, duration: 0.44, ease: "power2.inOut" }, 0.1);
        }
      }
    });
    return () => {
      off();
      tl?.kill();
    };
  }, [camera, group, mats, onActive]);

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      mats.white.dispose();
      mats.purple.dispose();
      mats.halo.dispose();
    };
  }, [geos, mats]);

  useFrame((state, delta) => {
    const gl = glow.current;
    const t = state.clock.elapsedTime;
    // respiração do glow enquanto a cortina está fechada
    const breathe = 0.5 + 0.5 * Math.sin(t * 4.2);
    mats.white.emissiveIntensity = 0.35 + gl * (0.4 + breathe * 0.25);
    mats.purple.emissiveIntensity = 0.8 + gl * (0.7 + breathe * 0.5);
    mats.halo.opacity = gl * (0.22 + breathe * 0.16) * mats.purple.opacity;
    // cortina fechada: a marca continua girando devagar (nunca estática)
    group.rotation.z += delta * 0.12 * gl;
    group.rotation.y += Math.sin(t * 0.8) * delta * 0.14 * gl;
    group.rotation.x += Math.cos(t * 0.6) * delta * 0.06 * gl;
  });

  return (
    <group>
      <mesh ref={backdropRef} position={[0, 0, -2]} renderOrder={-1}>
        <planeGeometry args={[40, 30]} />
        <meshBasicMaterial color="#06050c" transparent opacity={0} depthWrite={false} />
      </mesh>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 6]} intensity={1.8} color="#b89bff" />
      <pointLight position={[-5, -2, 4]} intensity={30} color="#5a45f0" />
      <primitive object={group} />
    </group>
  );
}

export default function TransitionCanvasGL() {
  const [active, setActive] = useState(false);

  return (
    <div className={`page-transition-gl ${active ? "is-active" : ""}`} aria-hidden="true">
      <Canvas
        dpr={1}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <TransitionLogo onActive={setActive} />
      </Canvas>
    </div>
  );
}
