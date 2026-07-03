"use client";

import { useEffect, useRef, useState } from "react";
import { intro, introWillPlay, markIntroDone } from "@/components/scene/introState";

/**
 * Gate da intro — um LOADING DISFARÇADO. Não tem canvas próprio: a logo se
 * constrói de bloquinhos DENTRO do canvas da jornada (HeroLogo). Este overlay
 * só cuida do HUD (marca, % e barra) e do roteiro:
 *   1. fundo sólido enquanto o chunk 3D baixa;
 *   2. canvas pronto → fundo fica transparente e a construção aparece;
 *   3. 100% → handoff: a logo migra para o hero, o texto entra, o HUD sai.
 * Toca só na 1ª visita da sessão; fora disso libera o site na hora.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const finishing = useRef(false);

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
    setShow(true);
    document.documentElement.classList.add("intro-lock");
    document.body.classList.add("intro-lock");

    // sem espera artificial: o único gate real é o palco 3D montar
    // (failsafe 5s se o canvas nunca vier — modo estático/erro)
    let force = false;
    const fs = window.setTimeout(() => {
      force = true;
    }, 5000);

    const unlock = () => {
      document.documentElement.classList.remove("intro-lock");
      document.body.classList.remove("intro-lock");
    };

    let raf = 0;
    let fake = 0;
    let shown = false;
    let revealAt = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      // a construção precisa ser VISTA: segura o 100% até a logo ter tido
      // ~0.9s de palco depois que o fundo abriu — e nada além disso
      const staged = shown && performance.now() - revealAt > 900;
      const ready = (intro.canvasReady && staged) || force;
      if (!ready) {
        fake = Math.min(86, fake + (86 - fake) * 0.03);
      } else {
        fake = Math.min(100, fake + (100 - fake) * 0.06 + 0.8);
      }
      intro.build = fake / 100;
      setPct(Math.round(fake));

      // canvas montou → tira o fundo sólido e revela a construção
      if (intro.canvasReady && !shown) {
        shown = true;
        revealAt = performance.now();
        setRevealed(true);
      }

      if (fake >= 100 && !finishing.current) {
        finishing.current = true;
        intro.phase = "handoff"; // a logo começa a migrar pro hero
        window.setTimeout(() => setLeaving(true), 200);
        window.setTimeout(() => {
          document.body.classList.add("site-loaded"); // texto do hero entra
        }, 420);
        window.setTimeout(() => {
          intro.phase = "done";
          markIntroDone();
          unlock();
          setDone(true);
        }, 1100);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fs);
      unlock();
    };
  }, []);

  if (!show || done) return null;
  return (
    <div
      className={[
        "warp-intro",
        revealed ? "is-revealed" : "",
        leaving ? "is-leaving" : "",
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="warp-intro-ui warp-intro-ui-bottom">
        <span className="warp-intro-brand">
          NEO<b>VANGUARD</b>
        </span>
        <span className="warp-intro-label">
          {pct < 82 ? "Desenhando a marca" : "Materializando"}
        </span>
        <span className="warp-intro-pct">{pct}%</span>
        <span className="warp-intro-bar">
          <span className="warp-intro-bar-fill" style={{ width: `${pct}%` }} />
        </span>
        <span className="warp-intro-data" aria-hidden="true">
          {`BLD ${String(pct).padStart(3, "0")} /// SEG ${
            pct < 45 ? "W" : pct < 82 ? "P" : "MAT"
          } /// PTS ${String(Math.round(pct * 5.2)).padStart(3, "0")}`}
        </span>
      </div>
    </div>
  );
}
