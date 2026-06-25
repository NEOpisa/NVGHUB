"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SceneItem from "@/components/scene/SceneItem";

// O mascote CRT (NeoVision) vive na cena global (canvas único). Sob demanda.
const CRTItem = dynamic(() => import("@/components/scene/items/CRTItem"), {
  ssr: false,
});

/**
 * Âncora DOM da marca no hero. O elemento não desenha nada — serve só de alvo
 * para o LogoItem, que é renderizado no canvas global e segue este retângulo.
 */
export default function HeroVisual() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 }
    );
    io.observe(el);
    const onVisibility = () => {
      if (document.hidden) setActive(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="logo-scene" ref={anchorRef} aria-hidden="true">
      <SceneItem>
        <CRTItem anchorRef={anchorRef} enabled={active} />
      </SceneItem>
    </div>
  );
}
