"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SceneItem from "@/components/scene/SceneItem";
import type { SectionVariant } from "@/components/scene/items/SectionObject";

const SectionObject = dynamic(() => import("@/components/scene/items/SectionObject"), { ssr: false });

/**
 * Âncora DOM de uma cena 3D de seção. O div não desenha nada — serve de alvo
 * para o SectionObject, que vive no canvas global e segue este retângulo.
 * Posicione via `className` (ver `.section-scene-*` no globals.css).
 */
export default function SectionScene({
  variant = "orb",
  className = "",
}: {
  variant?: SectionVariant;
  className?: string;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    io.observe(el);
    const onVis = () => { if (document.hidden) setActive(false); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className={`section-scene ${className}`} ref={anchorRef} aria-hidden="true">
      <SceneItem>
        <SectionObject anchorRef={anchorRef} variant={variant} enabled={active} />
      </SceneItem>
    </div>
  );
}
