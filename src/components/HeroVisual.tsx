"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SceneItem from "@/components/scene/SceneItem";

// O item da logo vive na cena global (canvas único). Carregado sob demanda.
const LogoItem = dynamic(() => import("@/components/scene/items/LogoItem"), {
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
        <LogoItem anchorRef={anchorRef} enabled={active} />
      </SceneItem>
    </div>
  );
}
