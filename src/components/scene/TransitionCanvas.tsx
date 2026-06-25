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
 * A transição entre páginas é a MARCA NV 3D (mesma do hero), em versão ESCURA e
 * com glow escuro: as peças se juntam no meio da tela (cover) e se dispersam ao
 * revelar a nova área (reveal). Se a navegação parte do hero, a logo "sai" da
 * posição do hero e voa pro centro (a logo do hero some via txBus → handoff).
 */
function DarkLogo({ onActive }: { onActive: (a: boolean) => void }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const backdropRef = useRef<THREE.Mesh>(null);
  const glow = useRef(0);

  const mats = useMemo(() => {
    const white = new THREE.MeshStandardMaterial({
      color: "#23232b", metalness: 0.7, roughness: 0.4,
      emissive: new THREE.Color("#3a2f55"), emissiveIntensity: 0.3, transparent: true, opacity: 0,
    });
    const purple = new THREE.MeshStandardMaterial({
      color: "#2c1556", metalness: 0.5, roughness: 0.45,
      emissive: new THREE.Color("#4a1d7a"), emissiveIntensity: 0.5, transparent: true, opacity: 0,
    });
    const halo = new THREE.MeshBasicMaterial({
      color: "#5b1e8a", transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return { white, purple, halo };
  }, []);

  const { group, meshes, geos } = useMemo(() => {
    const make = (chunks: ReturnType<typeof buildLogoChunks>["white"], mat: THREE.Material) =>
      chunks.map((c) => {
        const mesh = new THREE.Mesh(c.geometry, mat);
        mesh.userData.pivot = c.pivot;
        mesh.userData.dir = c.dir;
        const halo = new THREE.Mesh(c.geometry, mats.halo);
        halo.scale.setScalar(1.25);
        mesh.add(halo);
        return mesh;
      });
    const lp = buildLogoChunks(3, 2); // 5 cacos
    const meshes = [...make(lp.white, mats.white), ...make(lp.purple, mats.purple)];
    const group = new THREE.Group();
    meshes.forEach((m) => group.add(m));
    const geos = meshes.map((m) => m.geometry);
    return { group, meshes, geos };
  }, [mats]);

  useEffect(() => {
    let coverTl: gsap.core.Timeline | null = null;
    const setOpacity = (o: number) => {
      mats.white.opacity = o;
      mats.purple.opacity = o;
    };

    const off = txBus.on((e) => {
      if (e === "cover") {
        coverTl?.kill();
        onActive(true);

        // origem: posição do hero (se visível) ou o centro
        const heroEl = document.querySelector<HTMLElement>(".logo-scene");
        let fromHero = false;
        let start = new THREE.Vector3(0, 0, 0);
        if (heroEl) {
          const r = heroEl.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) {
            const c = screenToWorld(r.left + r.width / 2, r.top + r.height / 2, camera, 0);
            start = c;
            fromHero = true;
          }
        }
        gsap.set(group.position, { x: start.x, y: start.y, z: start.z });
        gsap.set(group.scale, { x: 0.62, y: 0.62, z: 0.62 });
        gsap.set(group.rotation, { x: 0, y: fromHero ? 0 : -0.6, z: 0 });

        // peças: do hero começam montadas; senão levemente dispersas
        meshes.forEach((m) => {
          const pivot = m.userData.pivot as THREE.Vector3;
          const dir = m.userData.dir as THREE.Vector3;
          const sp = fromHero ? 0 : 1.6;
          gsap.set(m.position, { x: pivot.x + dir.x * sp, y: pivot.y + dir.y * sp, z: pivot.z + dir.z * sp });
        });
        setOpacity(fromHero ? 1 : 0);

        coverTl = gsap.timeline({ onComplete: () => txBus.emit("covered") });
        if (backdropRef.current) {
          coverTl.to(backdropRef.current.material as THREE.Material, { opacity: 0.97, duration: 0.5, ease: "power2.out" }, 0);
        }
        coverTl
          .to(group.position, { x: 0, y: 0, z: 0, duration: 0.7, ease: "power3.inOut" }, 0)
          .to(group.scale, { x: 0.92, y: 0.92, z: 0.92, duration: 0.7, ease: "power3.inOut" }, 0)
          .to(group.rotation, { y: 0, duration: 0.7, ease: "power3.out" }, 0)
          .to(glow, { current: 1, duration: 0.6, ease: "power2.out" }, 0.1);
        meshes.forEach((m) => {
          const pivot = m.userData.pivot as THREE.Vector3;
          coverTl!.to(m.position, { x: pivot.x, y: pivot.y, z: pivot.z, duration: 0.6, ease: "power3.out" }, 0.05);
        });
        if (!fromHero) coverTl.to([mats.white, mats.purple], { opacity: 1, duration: 0.4 }, 0);
      } else if (e === "reveal") {
        coverTl?.kill();
        const tl = gsap.timeline({ onComplete: () => onActive(false) });
        meshes.forEach((m) => {
          const pivot = m.userData.pivot as THREE.Vector3;
          const dir = m.userData.dir as THREE.Vector3;
          tl.to(m.position, { x: pivot.x + dir.x * 3, y: pivot.y + dir.y * 3, z: pivot.z + dir.z * 3, duration: 0.7, ease: "power2.in" }, 0);
        });
        tl.to([mats.white, mats.purple], { opacity: 0, duration: 0.6, ease: "power2.in" }, 0.1);
        tl.to(glow, { current: 0, duration: 0.5 }, 0);
        if (backdropRef.current) {
          tl.to(backdropRef.current.material as THREE.Material, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 0.1);
        }
      }
    });
    return () => {
      off();
      coverTl?.kill();
    };
  }, [camera, group, meshes, mats, onActive]);

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      mats.white.dispose();
      mats.purple.dispose();
      mats.halo.dispose();
    };
  }, [geos, mats]);

  useFrame((_, delta) => {
    const gl = glow.current;
    mats.white.emissiveIntensity = 0.3 + gl * 0.5;
    mats.purple.emissiveIntensity = 0.5 + gl * 0.9;
    mats.halo.opacity = gl * 0.35 * mats.purple.opacity;
    group.rotation.z += delta * 0.05 * gl;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={backdropRef} position={[0, 0, -2]} renderOrder={-1}>
        <planeGeometry args={[40, 30]} />
        <meshBasicMaterial color="#06050c" transparent opacity={0} depthWrite={false} />
      </mesh>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} color="#b89bff" />
      <pointLight position={[-5, -2, 4]} intensity={28} color="#7c3aed" />
      <primitive object={group} />
    </group>
  );
}

export default function TransitionCanvas() {
  const [active, setActive] = useState(false);

  return (
    <div className={`page-transition-gl ${active ? "is-active" : ""}`} aria-hidden="true">
      <Canvas
        dpr={1}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <DarkLogo onActive={setActive} />
      </Canvas>
    </div>
  );
}
