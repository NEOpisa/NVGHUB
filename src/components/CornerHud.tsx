"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * HUD de cantos (linguagem igloo) — micro-painéis de dados em mono nos cantos
 * livres da viewport (superior-direito e inferior-esquerdo; os outros dois
 * pertencem ao Header e aos controles SOM). Puro DOM decorativo:
 * pointer-events none, aria-hidden, entra só depois do site-loaded.
 * Atualização por rAF throttled (~4Hz) escrevendo direto nos nós — zero
 * re-render de React durante o scroll.
 */
export default function CornerHud() {
  const pathname = usePathname();
  const clockRef = useRef<HTMLSpanElement>(null);
  const vpRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const routeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (routeRef.current)
      routeRef.current.textContent = `ROTA ${pathname === "/" ? "/HOME" : pathname.toUpperCase()}`;
  }, [pathname]);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 250) return; // 4Hz é suficiente p/ relógio e %
      last = now;
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      if (clockRef.current)
        clockRef.current.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      if (vpRef.current)
        vpRef.current.textContent = `${window.innerWidth}×${window.innerHeight} · ${(window.devicePixelRatio || 1).toFixed(1)}X`;
      if (scrollRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const p = total > 0 ? Math.round((window.scrollY / total) * 100) : 0;
        scrollRef.current.textContent = `SCROLL ${String(p).padStart(3, "0")}%`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="chud" aria-hidden="true">
      <div className="chud-panel chud-tr">
        <span className="chud-line">NVG//SYS · ONLINE</span>
        <span className="chud-line" ref={clockRef} />
        <span className="chud-line" ref={vpRef} />
      </div>
      <div className="chud-panel chud-bl">
        <span className="chud-line" ref={routeRef} />
        <span className="chud-line" ref={scrollRef} />
      </div>
    </div>
  );
}
