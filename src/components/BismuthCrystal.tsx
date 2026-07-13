"use client";

import { useRef, type CSSProperties } from "react";

const STEPS = 8;

/**
 * Cristal de bismuto — degraus concêntricos iridescentes (hopper crystal),
 * assinatura visual das divisões. Agora INTERATIVO: inclina seguindo o
 * ponteiro e, no hover, os degraus se separam (a faceta "abre") — soltando,
 * tudo volta com mola. CSS 3D puro, zero canvas.
 */
export default function BismuthCrystal() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const pend = useRef<{ x: number; y: number } | null>(null);

  const apply = () => {
    raf.current = 0;
    const el = ref.current;
    const p = pend.current;
    if (!el || !p) return;
    const r = el.getBoundingClientRect();
    const nx = (p.x - r.left) / r.width - 0.5;
    const ny = (p.y - r.top) / r.height - 0.5;
    el.style.setProperty("--tiltY", `${(nx * 26).toFixed(1)}deg`);
    el.style.setProperty("--tiltX", `${(-ny * 20).toFixed(1)}deg`);
  };

  const onMove = (e: React.PointerEvent) => {
    pend.current = { x: e.clientX, y: e.clientY };
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tiltY", "0deg");
    el.style.setProperty("--tiltX", "0deg");
  };

  return (
    <div
      ref={ref}
      className="bmt"
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="bmt-halo" />
      <div className="bmt-spin">
        {Array.from({ length: STEPS }, (_, i) => (
          <span
            key={i}
            className="bmt-step"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
