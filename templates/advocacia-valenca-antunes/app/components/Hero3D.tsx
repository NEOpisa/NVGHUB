"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Os autos" — escultura 3D do hero: uma pilha de folhas A4 suspensa
 * em hélice, com uma única folha-rubrica em vermelho-carimbo.
 * Three.js é importado dinamicamente (não entra no bundle inicial).
 * - prefers-reduced-motion: renderiza um único frame estático
 * - aba oculta / fora do viewport: loop pausado
 * - sem WebGL: fallback 2D em CSS
 */
export default function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let destruido = false;
    let limpar: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (destruido || !wrap) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        setFalhou(true);
        return;
      }

      const reduzMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const largura = wrap.clientWidth || 600;
      const NUM_FOLHAS = largura < 640 ? 10 : 13;
      const FOLHA_RUBRICA = Math.floor(NUM_FOLHAS * 0.62);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(wrap.clientWidth, wrap.clientHeight, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      wrap.appendChild(renderer.domElement);

      const cena = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        32,
        wrap.clientWidth / wrap.clientHeight,
        0.1,
        60
      );
      camera.position.set(5.4, 2.4, 7.2);
      camera.lookAt(0, 0, 0);

      // luz: abajur quente à direita, rebatida fria do vinho, rim carimbo
      cena.add(new THREE.HemisphereLight(0xeef2f1, 0x182829, 1.1));
      const chave = new THREE.DirectionalLight(0xf1f6f5, 2.6);
      chave.position.set(6, 10, 5);
      cena.add(chave);
      const rim = new THREE.DirectionalLight(0x46988f, 0.9);
      rim.position.set(-6, 2, -5);
      cena.add(rim);

      // pseudo-aleatório determinístico — composição estável entre loads
      const rnd = (i: number, salt: number) =>
        Math.sin(i * 127.1 + salt * 311.7) * 0.5 + 0.5;

      const grupo = new THREE.Group();
      const geoFolha = new THREE.BoxGeometry(2.9, 0.045, 4.1);
      const matPapel = new THREE.MeshStandardMaterial({
        color: 0xeef2f1,
        roughness: 0.92,
      });
      const matRubrica = new THREE.MeshStandardMaterial({
        color: 0x46988f,
        roughness: 0.7,
      });

      type Folha = {
        mesh: import("three").Mesh;
        yBase: number;
        rotYBase: number;
        fase: number;
      };
      const folhas: Folha[] = [];

      for (let i = 0; i < NUM_FOLHAS; i++) {
        const mesh = new THREE.Mesh(
          geoFolha,
          i === FOLHA_RUBRICA ? matRubrica : matPapel
        );
        const yBase = (i - (NUM_FOLHAS - 1) / 2) * 0.34;
        const rotYBase = -0.85 + i * 0.165 + (rnd(i, 1) - 0.5) * 0.22;
        mesh.position.set(
          (rnd(i, 2) - 0.5) * 0.3,
          yBase,
          (rnd(i, 3) - 0.5) * 0.3
        );
        mesh.rotation.y = rotYBase;
        mesh.rotation.z = (rnd(i, 4) - 0.5) * 0.04;
        grupo.add(mesh);
        folhas.push({ mesh, yBase, rotYBase, fase: rnd(i, 5) * Math.PI * 2 });
      }
      grupo.rotation.y = -0.2;
      cena.add(grupo);

      // parallax de ponteiro
      let alvoX = 0;
      let alvoY = 0;
      const onPointer = (e: PointerEvent) => {
        alvoX = (e.clientX / window.innerWidth) * 2 - 1;
        alvoY = (e.clientY / window.innerHeight) * 2 - 1;
      };

      const relogio = new THREE.Clock();
      let raf = 0;
      let visivel = true;
      let girarBase = -0.2;
      let girarX = 0;

      const frame = () => {
        const t = relogio.getElapsedTime();
        girarBase += (alvoX * 0.24 - 0.2 - girarBase) * 0.035;
        girarX += (alvoY * 0.05 - girarX) * 0.035;
        grupo.rotation.y = girarBase + t * 0.05;
        grupo.rotation.x = girarX;
        for (const f of folhas) {
          f.mesh.position.y = f.yBase + Math.sin(t * 0.85 + f.fase) * 0.05;
          f.mesh.rotation.y = f.rotYBase + Math.sin(t * 0.4 + f.fase) * 0.018;
        }
        renderer.render(cena, camera);
      };

      const loop = () => {
        frame();
        raf = requestAnimationFrame(loop);
      };

      const onResize = () => {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        if (reduzMotion) frame();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(wrap);

      // pausa quando fora do viewport ou aba oculta
      const io = new IntersectionObserver(
        ([entry]) => {
          visivel = entry.isIntersecting;
          if (reduzMotion) return;
          cancelAnimationFrame(raf);
          if (visivel && !document.hidden) raf = requestAnimationFrame(loop);
        },
        { threshold: 0.02 }
      );
      io.observe(wrap);
      const onVisibility = () => {
        if (reduzMotion) return;
        cancelAnimationFrame(raf);
        if (!document.hidden && visivel) raf = requestAnimationFrame(loop);
      };
      document.addEventListener("visibilitychange", onVisibility);

      if (reduzMotion) {
        frame();
      } else {
        window.addEventListener("pointermove", onPointer, { passive: true });
        raf = requestAnimationFrame(loop);
      }
      setPronto(true);

      limpar = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointer);
        geoFolha.dispose();
        matPapel.dispose();
        matRubrica.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      destruido = true;
      limpar?.();
    };
  }, []);

  if (falhou) {
    return (
      <div className="hero-fallback show" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`hero-canvas${pronto ? " pronto" : ""}`}
      aria-hidden="true"
    />
  );
}
