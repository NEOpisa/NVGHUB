"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="link"], [role="button"], input, textarea, select, .quiz-option, .vy-door';

/**
 * Cursor HUD — crosshair fino que segue o ponteiro com inércia e abre em
 * "mira" (colchetes) sobre elementos interativos. Só em ponteiro fino; o
 * cursor nativo é ocultado enquanto o custom está ativo (inputs mantêm caret).
 */
export default function NvCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("nv-cursor-on");

    let x = innerWidth / 2,
      y = innerHeight / 2,
      rx = x,
      ry = y,
      seen = false,
      raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      ring.classList.toggle("is-aim", !!el);
      dot.classList.toggle("is-aim", !!el);
    };
    const onDown = () => ring.classList.add("is-press");
    const onUp = () => ring.classList.remove("is-press");
    const onLeaveDoc = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      seen = false;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      // dot cola no ponteiro; ring persegue com inércia
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("nv-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="nv-cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="nv-cur-ring" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </>
  );
}
