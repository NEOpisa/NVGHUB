"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import AmbientField from "@/components/AmbientField";

// O canvas WebGL (three/fiber/drei) vive num chunk separado.
// É carregado sob demanda quando há suporte, inclusive no mobile,
// para permitir a logo 3D no hero.
const SceneCanvasGL = dynamic(
  () => import("@/components/scene/SceneCanvasGL"),
  {
    ssr: false,
  },
);

/**
 * Decide o fundo do site por capacidade:
 *  - Com WebGL e sem reduced-motion → camada 3D global.
 *  - Sem WebGL (ou com reduced-motion) → AmbientField CSS leve.
 * O conteúdo principal continua no DOM por cima (SEO/acessibilidade).
 */
export default function SceneCanvas() {
  const pathname = usePathname();
  const [useGL, setUseGL] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  // Home e /menu têm canvas próprios (jornada 3D / MenuCanvas) — não duplicar.
  if (pathname === "/" || pathname === "/menu") return null;
  if (useGL === null) return null;
  if (!useGL) return <AmbientField />;
  return <SceneCanvasGL />;
}
