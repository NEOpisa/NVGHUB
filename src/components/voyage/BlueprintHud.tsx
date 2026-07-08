"use client";

import { useEffect, useRef } from "react";
import { journey } from "@/components/journey/journeyState";

const CHAPTERS = ["INÍCIO", "DNA", "A ESCOLHA"];

/**
 * Camada BLUEPRINT 2D da voyage — a planta técnica viva sobre a cena:
 *   · grade 1px que só aparece ao redor do cursor (halo de máscara radial);
 *   · linha de varredura (scan do plotter) descendo em loop;
 *   · moldura HUD com cantoneiras + label mono do capítulo AO VIVO.
 * Tudo indigo, tudo herdado das classes .bp-* já existentes.
 */
export default function BlueprintHud() {
  const gridRef = useRef<HTMLSpanElement>(null);
  const chapRef = useRef<HTMLElement>(null);

  // grid reativo: segue o cursor via --mx/--my (rAF-throttled)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let raf = 0;
    let mx = 50;
    let my = 50;
    let idleT: number;
    const move = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          grid.style.setProperty("--mx", `${mx.toFixed(2)}%`);
          grid.style.setProperty("--my", `${my.toFixed(2)}%`);
          grid.classList.add("is-on");
          window.clearTimeout(idleT);
          idleT = window.setTimeout(() => grid.classList.remove("is-on"), 1600);
        });
    };
    const leave = () => grid.classList.remove("is-on");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleT);
    };
  }, []);

  // label do capítulo ao vivo (lê o progresso, zero re-render)
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const p = journey.progress;
      const ch = p < 0.16 ? 0 : p < 0.5 ? 1 : 2;
      if (ch !== last && chapRef.current) {
        last = ch;
        chapRef.current.textContent = `CAP_0${ch + 1} · ${CHAPTERS[ch]}`;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="vy-hud" aria-hidden="true">
      <span ref={gridRef} className="bp-grid vy-grid-cursor" />
      <span className="bp-scan" />
      <div className="bp-frame">
        <span className="bp-frame-label bp-frame-br">
          <i>{"//"}</i> <b ref={chapRef}>CAP_01 · INÍCIO</b> · ©{" "}
          {new Date().getFullYear()} neovanguard
        </span>
      </div>
    </div>
  );
}
