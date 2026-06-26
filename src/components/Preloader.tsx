"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { introWillPlay, markIntroDone } from "@/components/scene/introState";

// A intro é pesada (three + postprocessing) — carrega sob demanda, só quando vai
// tocar (1ª visita na home). Fica fora do bundle inicial.
const IntroCanvas = dynamic(() => import("@/components/scene/IntroCanvas"), {
  ssr: false,
});

/**
 * Gate da abertura do site. Na 1ª visita da home (com WebGL e sem reduced-motion)
 * monta a INTRO full-screen em canvas (plexus + marca NV construída) e só revela
 * o hero quando a construção termina E a página carregou (fontes + window.load).
 * Caso contrário, libera o site na hora.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

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

    markIntroDone();
    setShow(true);

    // espera DE VERDADE fontes + window.load (min 0.6s pra não piscar; failsafe 6s)
    const start = performance.now();
    let cancelled = false;
    const loadP =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true }),
          );
    const fontsP = document.fonts?.ready ?? Promise.resolve();
    Promise.all([loadP, fontsP]).then(() => {
      const wait = Math.max(0, 600 - (performance.now() - start));
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, wait);
    });
    const fs = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 6000);
    return () => {
      cancelled = true;
      clearTimeout(fs);
    };
  }, []);

  const handleComplete = () => {
    document.body.classList.add("site-loaded");
    setDone(true);
  };

  if (!show || done) return null;
  return <IntroCanvas ready={ready} onCompleteAction={handleComplete} />;
}
