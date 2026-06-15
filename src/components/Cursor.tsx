"use client";

import { useEffect, useRef } from "react";

// Cursor custom inspirado no NVGinstitucional, em vanilla (sem framer-motion):
// um ponto que segue o mouse com leve inércia e cresce sobre elementos
// interativos. Só em ponteiro fino; respeita prefers-reduced-motion.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let visible = false;
    let raf = 0;

    const loop = () => {
      // segue bem rápido (quase grudado no ponteiro, com um leve amortecimento)
      pos.x += (target.x - pos.x) * 0.55;
      pos.y += (target.y - pos.y) * 0.55;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.classList.add("is-visible");
      }
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor], input, textarea, select, label");
      dot.classList.toggle("is-hover", !!interactive);
    };
    const onLeave = () => {
      visible = false;
      dot.classList.remove("is-visible");
    };
    const onDown = () => dot.classList.add("is-down");
    const onUp = () => dot.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
