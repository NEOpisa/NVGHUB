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
    const hero = el?.closest("#hero") as HTMLElement | null;
    if (!el || !hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.bottom > 0 && rect.top < vh;
      setActive(visible && !document.hidden);
    };

    update();

    const io = new IntersectionObserver(() => update(), { threshold: 0 });
    io.observe(hero);

    const onVisibility = () => update();
    const onScroll = () => update();
    const onResize = () => update();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
