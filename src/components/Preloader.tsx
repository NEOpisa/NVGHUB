"use client";

import { useEffect, useRef, useState } from "react";
import { intro, introWillPlay, markIntroDone } from "@/components/scene/introState";

/**
 * Gate da intro — a marca se DESENHA em traços de luz dentro do canvas da
 * jornada (HeroLogo) enquanto um boot-HUD mono acompanha em DOM:
 *   1. trava o scroll e espera o palco 3D montar (intro.canvasReady);
 *   2. palco pronto → build 0→1 (~1.6s), HUD narra as fases do desenho;
 *   3. build completo → handoff: logo migra, HUD se apaga, destrava.
 * Toca só na 1ª visita da sessão; fora disso libera o site na hora.
 */

const FASES: [number, string][] = [
  [0.0, "TRAÇANDO VETORES"],
  [0.38, "CALIBRANDO MALHA"],
  [0.72, "MATERIALIZANDO LIGA"],
];

export default function Preloader() {
  const [playing, setPlaying] = useState(false);
  const hud = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let play = introWillPlay();
    if (play) {
      try {
        const c = document.createElement("canvas");
        if (!(c.getContext("webgl2") || c.getContext("webgl"))) play = false;
      } catch {
        play = false;
      }
    }

    if (!play) {
      document.body.classList.add("site-loaded");
      markIntroDone();
      return;
    }

    intro.active = true;
    intro.phase = "load";
    setPlaying(true);
    document.documentElement.classList.add("intro-lock");
    document.body.classList.add("intro-lock");

    const unlock = () => {
      document.documentElement.classList.remove("intro-lock");
      document.body.classList.remove("intro-lock");
    };

    let finished = false;
    const timers: number[] = [];
    const finish = (skip = false) => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fs);
      intro.build = 1;
      intro.phase = "handoff"; // a logo começa a migrar pro hero
      if (statusRef.current) statusRef.current.textContent = "PRONTO";
      hud.current?.classList.add("is-out");
      timers.push(
        window.setTimeout(
          () => document.body.classList.add("site-loaded"), // texto entra
          skip ? 0 : 160,
        ),
        window.setTimeout(
          () => {
            intro.phase = "done";
            markIntroDone();
            unlock();
            setPlaying(false);
          },
          skip ? 0 : 560,
        ),
      );
    };

    // failsafe: o canvas nunca montou (erro/modo estático/device lento) →
    // libera direto. Teto curto: a mensagem do hero é o que importa, não
    // deixar o visitante encarando um loader travado.
    // #005 · teto POR DEVICE: em aparelhos fracos / mobile / save-data o
    // failsafe fecha mais cedo (1.8s) para não prender o visitante.
    const capMs = (() => {
      try {
        const n = navigator as Navigator & {
          deviceMemory?: number;
          connection?: { saveData?: boolean };
        };
        const coarse = window.matchMedia?.("(pointer: coarse)").matches;
        const weak =
          n.connection?.saveData === true ||
          (n.deviceMemory ?? 8) < 4 ||
          (navigator.hardwareConcurrency ?? 8) <= 4 ||
          !!coarse;
        return weak ? 1800 : 2600;
      } catch {
        return 2600;
      }
    })();
    const fs = window.setTimeout(() => finish(true), capMs);

    // enquanto o palco 3D compila, o contador GOTEJA até 55% (mais rápido, sem
    // estacionar visivelmente); palco pronto → o desenho real (~1.1s) completa
    // 55→100. Nunca fica parado no zero nem estagnado em 32%.
    let raf = 0;
    let t0 = 0;
    let disp = 0;
    const loop = (now: number) => {
      if (finished) return;
      raf = requestAnimationFrame(loop);
      if (!intro.canvasReady) {
        disp = Math.min(0.55, disp + 0.009);
      } else {
        if (!t0) t0 = now;
        intro.build = Math.min(1, (now - t0) / 1100);
        disp = 0.55 + intro.build * 0.45;
      }
      if (pctRef.current)
        pctRef.current.textContent = String(Math.round(disp * 100)).padStart(2, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${disp})`;
      if (statusRef.current) {
        let label = FASES[0][1];
        for (const [at, txt] of FASES) if (disp >= at) label = txt;
        if (statusRef.current.textContent !== label)
          statusRef.current.textContent = label;
      }
      if (intro.build >= 1) finish();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fs);
      timers.forEach((t) => window.clearTimeout(t));
      unlock();
    };
  }, []);

  if (!playing) return null;
  return (
    <div ref={hud} className="nv-boot" aria-hidden="true">
      <span ref={statusRef} className="nv-boot-status">
        {"TRAÇANDO VETORES"}
      </span>
      <span className="nv-boot-pct">
        <b ref={pctRef}>00</b>
        <i>%</i>
      </span>
      <span className="nv-boot-bar">
        <i ref={barRef} />
      </span>
    </div>
  );
}
