"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { IconVariant } from "@/components/services/IconCanvasGL";

const IconCanvasGL = dynamic(() => import("@/components/services/IconCanvasGL"), {
  ssr: false,
});

/**
 * Wrapper leve para um ícone 3D. Só monta o canvas WebGL quando entra na
 * viewport (IntersectionObserver) e desmonta ao sair — limita o nº de contextos
 * WebGL ativos e mantém o custo baixo, inclusive no mobile.
 */
export default function IconCanvas({
  variant,
  kind,
  className = "",
}: {
  variant: IconVariant;
  kind: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setShow(e.isIntersecting && !document.hidden),
      { threshold: 0.05, rootMargin: "140px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`icon-canvas ${className}`} aria-hidden="true">
      {show && <IconCanvasGL variant={variant} kind={kind} />}
    </div>
  );
}
