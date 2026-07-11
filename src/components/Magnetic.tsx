"use client";

import { useEffect, useRef, ReactNode } from "react";

// #035 · deslocamento máximo do ímã, independente do tamanho do alvo
const MAX_PULL_PX = 14;

export default function Magnetic({
  children,
  strength = 0.35,
  disabled = false,
}: {
  children: ReactNode;
  strength?: number;
  /** desliga o efeito (mantém o wrapper p/ layout) */
  disabled?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frame = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);
  // #035 · desligável: prop, reduced-motion ou touch (mousemove emulado no
  // touch deixa o transform "preso") — decidido uma vez por montagem
  const off = useRef(disabled);

  useEffect(() => {
    off.current =
      disabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    return () => cancelAnimationFrame(frame.current);
  }, [disabled]);

  const apply = () => {
    frame.current = 0;
    const el = ref.current;
    const rect = rectRef.current;
    const p = pending.current;
    if (!el || !rect || !p) return;
    const x = p.x - rect.left - rect.width / 2;
    const y = p.y - rect.top - rect.height / 2;
    // #035 · calibra por tamanho: o puxão nunca passa de MAX_PULL_PX,
    // mesmo em alvos grandes (strength era fixo → botão largo voava)
    const eff = Math.min(strength, MAX_PULL_PX / Math.max(rect.width / 2, 1));
    el.style.transform = `translate(${x * eff}px, ${y * eff}px)`;
  };

  const onEnter = () => {
    if (off.current) return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const onMove = (e: React.MouseEvent) => {
    if (off.current) return;
    pending.current = { x: e.clientX, y: e.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el || off.current) return;
    pending.current = null;
    rectRef.current = null;
    // volta ELÁSTICA: overshoot com mola, depois remove a transição p/ o
    // próximo arrasto ser 1:1 de novo
    el.style.transition = "transform 0.55s cubic-bezier(0.22, 1.75, 0.36, 1)";
    el.style.transform = "translate(0px, 0px) scale(1)";
    window.setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 560);
  };

  const onDown = () => {
    const el = ref.current;
    if (!el || off.current) return;
    el.style.transition = "transform 0.12s ease-out";
    el.style.transform += " scale(0.93)";
  };

  const onUp = () => {
    const el = ref.current;
    if (!el || off.current) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1.9, 0.36, 1)";
    el.style.transform = el.style.transform.replace(" scale(0.93)", " scale(1)");
    window.setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 500);
  };

  return (
    <span
      ref={ref}
      className="magnetic"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
    >
      {children}
    </span>
  );
}
