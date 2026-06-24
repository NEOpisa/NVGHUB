"use client";

import { useEffect, useState } from "react";

/**
 * Medidor de FPS em tela. Aparece só quando a URL tem `?fps` (ex.: /?fps).
 * Verde ≥55 · amarelo 30–54 · vermelho <30. Não afeta nada quando desligado.
 */
export default function FpsMeter() {
  const [show, setShow] = useState(false);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("fps")) return;
    setShow(true);

    let raf = 0;
    let frames = 0;
    let last = performance.now();
    const loop = (now: number) => {
      frames++;
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!show) return null;
  const color = fps >= 55 ? "#46c89c" : fps >= 30 ? "#f5c451" : "#f0616d";
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 12,
        left: 12,
        zIndex: 10000,
        font: "600 12px/1 var(--font-mono, ui-monospace, monospace)",
        color,
        background: "rgba(8,8,12,0.78)",
        border: `1px solid ${color}44`,
        padding: "6px 9px",
        borderRadius: 8,
        letterSpacing: "0.04em",
        pointerEvents: "none",
        backdropFilter: "blur(4px)",
      }}
    >
      {fps} FPS
    </div>
  );
}
