"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AmbientField from "@/components/AmbientField";
import { MQ } from "@/lib/motionConfig";

// O canvas WebGL (three/fiber/drei) vive num chunk separado, carregado só no
// tier FULL. Mantém `three` fora do bundle inicial — mobile baixa zero Three.js.
const SceneCanvasGL = dynamic(() => import("@/components/scene/SceneCanvasGL"), {
  ssr: false,
});

/**
 * Decide o fundo do site por tier:
 *  - FULL (desktop, ponteiro fino, sem reduced-motion) + WebGL → camada 3D.
 *  - Mobile / coarse-pointer / reduced-motion / sem WebGL → AmbientField (CSS,
 *    leve e animado). O texto/forms continuam no DOM por cima (SEO).
 */
export default function SceneCanvas() {
  const [useGL, setUseGL] = useState<boolean | null>(null);

  useEffect(() => {
    if (!window.matchMedia(MQ.full).matches) {
      setUseGL(false);
      return;
    }
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    setUseGL(ok);
  }, []);

  if (useGL === null) return null;
  if (!useGL) return <AmbientField />;
  return <SceneCanvasGL />;
}
