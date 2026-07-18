"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const isMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 ||
    !!window.matchMedia?.("(pointer: coarse)").matches);

/**
 * Governor de DPR por frame-time real: mira 90fps (budget ~11ms). Mede a média
 * de 60 frames; acima do teto desce um degrau de DPR, abaixo de 9ms sobe de
 * volta (com cooldown p/ não oscilar). Nunca desliga o 3D — só resolução.
 *
 * #003 · No mobile o orçamento é mais agressivo: piso de DPR mais baixo (até
 * 0.55) e degradação mais cedo (>12.5ms), para segurar a taxa de quadros onde
 * a GPU é mais fraca.
 */
export default function AdaptiveQuality({
  start,
  min = 0.75,
}: {
  start: number;
  min?: number;
}) {
  const setDpr = useThree((s) => s.setDpr);
  const st = useRef({
    dpr: start,
    acc: 0,
    n: 0,
    cool: 1.5,
    // piso e teto de frame-time resolvidos uma vez. Piso mobile 0.75:
    // abaixo disso o 3D vira borrão — melhor nítido a 60fps que lavado a 90.
    floor: isMobile() ? Math.min(min, 0.75) : min,
    downMs: isMobile() ? 0.0125 : 0.014,
  });

  useFrame((_, dt) => {
    const s = st.current;
    if (s.cool > 0) {
      s.cool -= dt;
      return;
    }
    s.acc += Math.min(dt, 0.1);
    s.n++;
    if (s.n < 60) return;
    const avg = s.acc / s.n;
    s.acc = 0;
    s.n = 0;
    if (avg > s.downMs && s.dpr > s.floor) {
      s.dpr = Math.max(s.floor, s.dpr - 0.25);
      setDpr(s.dpr);
      s.cool = 1.5;
    } else if (avg < 0.009 && s.dpr < start) {
      s.dpr = Math.min(start, s.dpr + 0.25);
      setDpr(s.dpr);
      s.cool = 3;
    }
  });

  return null;
}
