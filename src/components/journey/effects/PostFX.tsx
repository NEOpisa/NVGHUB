"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { journey } from "../journeyState";

const isMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 ||
    !!window.matchMedia?.("(pointer: coarse)").matches);

// #017 · quem pede menos transparência ou economia de dados não recebe o
// pós-processamento (bloom/aberração/vinheta são camadas extras de composição)
const hardOff = () => {
  if (typeof window === "undefined") return false;
  const n = navigator as Navigator & { connection?: { saveData?: boolean } };
  return (
    !!window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches ||
    n.connection?.saveData === true
  );
};

/**
 * Pós-processamento da jornada (linguagem igloo): bloom curto nos emissivos,
 * aberração cromática sutil nas bordas e vinheta. Desligado no tier 0 e ao
 * vivo pelo toggle GFX LEVE (evento `nvg-gfx` do HudControls).
 *
 * #003 · No mobile, um guardião de fps desliga o PostFX se o quadro médio cair
 * abaixo de ~60fps de forma sustentada — a taxa de quadros vale mais que o
 * brilho onde a GPU é fraca. Uma vez desligado por performance, não reativa.
 */
export default function PostFX() {
  const [on, setOn] = useState(() => journey.tier === 2 && !hardOff());
  const perf = useRef({ acc: 0, n: 0, warm: 1.5, killed: false, mobile: false });

  useEffect(() => {
    perf.current.mobile = isMobile();
    // reduced-transparency/save-data: trava desligado (o toggle GFX não reativa)
    if (hardOff()) perf.current.killed = true;
    const sync = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (perf.current.killed) return; // fps ruim já desligou: não reativa
      setOn(detail !== "leve");
    };
    window.addEventListener("nvg-gfx", sync);
    return () => window.removeEventListener("nvg-gfx", sync);
  }, []);

  // guardião de fps (só mobile, só enquanto ligado)
  useFrame((_, dt) => {
    const p = perf.current;
    if (!on || p.killed || !p.mobile) return;
    if (p.warm > 0) {
      p.warm -= dt; // ignora o aquecimento inicial
      return;
    }
    p.acc += Math.min(dt, 0.1);
    p.n++;
    if (p.n < 90) return;
    const fps = p.n / p.acc;
    p.acc = 0;
    p.n = 0;
    if (fps < 58) {
      p.killed = true;
      setOn(false);
    }
  });

  if (!on) return null;
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.28}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.22}
        mipmapBlur
      />
      <ChromaticAberration offset={[0.0006, 0.0004]} />
      <Vignette offset={0.24} darkness={0.5} eskil={false} />
    </EffectComposer>
  );
}
