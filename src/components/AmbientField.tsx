"use client";

import { useEffect, useRef } from "react";

export default function AmbientField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  // orbs reagem sutilmente ao mouse (paralaxe de profundidade)
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orbs = field.querySelectorAll<HTMLElement>(".ambient-orb");
    const depths = [22, -16, 12];
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    // Os orbs têm filter: blur(120px); reescrever o transform deles a cada
    // frame é caríssimo e trava o scroll. Por isso o loop só roda enquanto
    // ainda há diferença a interpolar — quando o paralaxe "assenta", ele para
    // e só é religado no próximo mousemove.
    let raf = 0;
    let running = false;

    const apply = () => {
      orbs.forEach((orb, i) => {
        const d = depths[i] ?? 14;
        orb.style.translate = `${pos.x * d * 2}px ${pos.y * d * 2}px`;
      });
    };

    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.04;
      pos.y += (mouse.y - pos.y) * 0.04;
      apply();
      // settled? para o loop para não repintar os blurs à toa
      if (Math.abs(mouse.x - pos.x) < 0.0005 && Math.abs(mouse.y - pos.y) < 0.0005) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
      start();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="ambient-field" aria-hidden="true" ref={fieldRef}>
      <div className="ambient-grain" />
      <div className="ambient-3d">
        <div className="ambient-3d-plane ambient-3d-floor" />
        <div className="ambient-3d-plane ambient-3d-ceiling" />
        <div className="ambient-3d-plane ambient-3d-left" />
        <div className="ambient-3d-plane ambient-3d-right" />
      </div>
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-beam" />
    </div>
  );
}
