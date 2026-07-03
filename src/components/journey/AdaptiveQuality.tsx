"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

/**
 * Governor de DPR por frame-time real: mira 90fps (budget ~11ms). Mede a média
 * de 60 frames; acima de 14ms desce um degrau de DPR, abaixo de 9ms sobe de
 * volta (com cooldown p/ não oscilar). Nunca desliga o 3D — só resolução.
 */
export default function AdaptiveQuality({
  start,
  min = 0.75,
}: {
  start: number;
  min?: number;
}) {
  const setDpr = useThree((s) => s.setDpr);
  const st = useRef({ dpr: start, acc: 0, n: 0, cool: 1.5 });

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
    if (avg > 0.014 && s.dpr > min) {
      s.dpr = Math.max(min, s.dpr - 0.25);
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
