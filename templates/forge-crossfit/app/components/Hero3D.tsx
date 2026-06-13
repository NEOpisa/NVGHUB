"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
 * Barbell 3D da forja: metal escuro com rim-light laranja + fagulhas.
 * Decorativo (aria-hidden). Pausa fora da viewport/aba oculta, DPR ≤ 2,
 * frame único sob prefers-reduced-motion.
 */

const FORGE = 0xff5e1a;
const METAL_DARK = 0x16181f;
const METAL_PLATE = 0x101218;

function buildBarbell() {
  const group = new THREE.Group();

  const barMat = new THREE.MeshStandardMaterial({
    color: METAL_DARK,
    metalness: 0.92,
    roughness: 0.32,
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: METAL_PLATE,
    metalness: 0.85,
    roughness: 0.42,
  });
  const ringMat = new THREE.MeshBasicMaterial({ color: FORGE });

  const lieFlat = (mesh: THREE.Mesh) => {
    mesh.rotation.z = Math.PI / 2;
    return mesh;
  };

  // Barra
  group.add(
    lieFlat(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 7.4, 32), barMat))
  );

  // Luvas (sleeves) mais grossas nas pontas
  for (const side of [-1, 1]) {
    const sleeve = lieFlat(
      new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.9, 32), barMat)
    );
    sleeve.position.x = side * 2.95;
    group.add(sleeve);
  }

  // Anilhas: três por lado, decrescentes; a maior leva um aro incandescente
  const plates: Array<[number, number, number]> = [
    [2.45, 1.12, 0.2], // [posição x, raio, espessura]
    [2.72, 0.86, 0.16],
    [2.94, 0.58, 0.12],
  ];
  for (const side of [-1, 1]) {
    for (const [x, radius, depth] of plates) {
      const plate = lieFlat(
        new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 48), plateMat)
      );
      plate.position.x = side * x;
      group.add(plate);
    }
    // Aro emissivo na borda da anilha maior — metal em temperatura de trabalho
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.015, 12, 72), ringMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = side * 2.45;
    group.add(ring);

    // Presilha
    const collar = lieFlat(
      new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 24), barMat)
    );
    collar.position.x = side * 2.18;
    group.add(collar);
  }

  return group;
}

function buildEmbers(count: number) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    speeds[i] = 0.15 + Math.random() * 0.45;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: FORGE,
    size: 0.055,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  return { points: new THREE.Points(geo, mat), speeds };
}

export default function Hero3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // sem WebGL: o hero segue só com os gradientes de fundo
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0.3, 9.5);

    const barbell = buildBarbell();
    barbell.rotation.set(0.34, 0.5, -0.16); // o "lean" da marca em 3D
    barbell.position.x = -0.3;
    scene.add(barbell);
    let baseY = 0;

    const emberCount = window.innerWidth < 900 ? 60 : 130;
    const { points: embers, speeds } = buildEmbers(emberCount);
    scene.add(embers);

    // Forja: key laranja quente, rim por trás, fill frio mínimo
    const key = new THREE.PointLight(FORGE, 110, 0, 1.8);
    key.position.set(-5, 3, 5);
    scene.add(key);
    const rim = new THREE.PointLight(FORGE, 70, 0, 1.8);
    rim.position.set(5, -2, -4);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x8b8fa8, 0.5);
    fill.position.set(2, 4, 6);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.06));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Afasta a câmera quando o container é estreito para o barbell caber
      camera.position.z = w < 560 ? 11.5 : 10.2;
      baseY = w < 560 ? -0.4 : 0;
      barbell.position.y = baseY;
      if (reducedMotion) renderer.render(scene, camera);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let running = false;
    let inView = true;
    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    const onPointerMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      barbell.rotation.y += dt * 0.25;
      barbell.position.y = baseY + Math.sin(t * 0.7) * 0.18;
      // Parallax suave do mouse
      barbell.rotation.x += (0.34 + pointer.y * 0.12 - barbell.rotation.x) * 0.04;
      barbell.rotation.z += (-0.16 + pointer.x * 0.08 - barbell.rotation.z) * 0.04;

      // Fagulhas sobem e reentram por baixo
      const pos = embers.geometry.attributes.position;
      for (let i = 0; i < speeds.length; i++) {
        let y = pos.getY(i) + speeds[i] * dt;
        if (y > 3.6) y = -3.6;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      renderer.render(scene, camera); // frame único, sem loop
    } else {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      start();
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onPointerMove);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-3d" aria-hidden="true" />;
}
