"use client";

import { useEffect } from "react";
import { intro, introWillPlay, markIntroDone } from "@/components/scene/introState";

/**
 * Gate da intro — 100% 3D, zero HUD em DOM. A marca se DESENHA em traços de
 * luz dentro do canvas da jornada (HeroLogo) e este componente só dirige o
 * ritmo:
 *   1. trava o scroll e espera o palco 3D montar (intro.canvasReady);
 *   2. palco pronto → build 0→1 rápido (o desenho É a intro, sem espera fake);
 *   3. build completo → handoff imediato: logo migra, texto entra, destrava.
 * Toca só na 1ª visita da sessão; fora disso libera o site na hora.
 */
export default function Preloader() {
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
      timers.push(
        window.setTimeout(
          () => document.body.classList.add("site-loaded"), // texto entra
          skip ? 0 : 220,
        ),
        window.setTimeout(
          () => {
            intro.phase = "done";
            markIntroDone();
            unlock();
          },
          skip ? 0 : 780,
        ),
      );
    };

    // failsafe: o canvas nunca montou (erro/modo estático) → libera direto
    const fs = window.setTimeout(() => finish(true), 4000);

    // build 0→1 em ~0.85s assim que o palco monta — sem espera artificial
    let raf = 0;
    let t0 = 0;
    const loop = (now: number) => {
      if (finished) return;
      raf = requestAnimationFrame(loop);
      if (!intro.canvasReady) return;
      if (!t0) t0 = now;
      intro.build = Math.min(1, (now - t0) / 850);
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

  return null;
}
