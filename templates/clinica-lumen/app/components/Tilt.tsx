"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type TiltProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  max?: number;
};

export default function Tilt({ className = "", style, children, max = 9 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--go", "1");
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--go", "0");
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="tilt-inner">
        {children}
        <span className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
