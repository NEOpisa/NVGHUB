"use client";

import { useRef, ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onEnter = () => {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const rect = rectRef.current;
    if (!el || !rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
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
