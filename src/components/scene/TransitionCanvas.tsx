"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MQ } from "@/lib/motionConfig";

// A transição WebGL (marca NV 3D entre páginas) é eye-candy de desktop. Fica
// num chunk separado, carregado só no tier FULL — mobile não baixa Three.js
// nem roda o canvas (a transição cai no fade CSS de PageTransition).
const TransitionCanvasGL = dynamic(
  () => import("@/components/scene/TransitionCanvasGL"),
  { ssr: false }
);

export default function TransitionCanvas() {
  const [heavy, setHeavy] = useState(false);

  useEffect(() => {
    setHeavy(window.matchMedia(MQ.full).matches);
  }, []);

  if (!heavy) return null;
  return <TransitionCanvasGL />;
}
