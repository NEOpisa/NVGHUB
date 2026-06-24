"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frame = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const apply = () => {
    frame.current = 0;
    const el = ref.current;
    const rect = rectRef.current;
    const p = pending.current;
    if (!el || !rect || !p) return;
    const x = p.x - rect.left - rect.width / 2;
    const y = p.y - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onEnter = () => {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const onMove = (e: React.MouseEvent) => {
    pending.current = { x: e.clientX, y: e.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    pending.current = null;
    rectRef.current = null;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      className="magnetic"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
