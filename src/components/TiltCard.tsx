"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const apply = () => {
    const el = ref.current;
    const p = pending.current;
    frame.current = 0;
    if (!el || !p) return;
    const rect = rectRef.current ?? el.getBoundingClientRect();
    const px = (p.x - rect.left) / rect.width;
    const py = (p.y - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    el.style.setProperty("--glare-x", `${px * 100}%`);
    el.style.setProperty("--glare-y", `${py * 100}%`);
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
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
