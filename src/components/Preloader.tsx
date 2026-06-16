"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const WHITE_D =
  "M48 25 L86 44 L168 93 L194 143 L94 78 L94 144 L155 216 L138 206 L71 151 L70 48 Z";
const PURPLE_D = "M287 27 L202 219 L153 175 L110 116 L190 169 Z";

export default function Preloader() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const firstVisit =
      pathname === "/" && !sessionStorage.getItem("nvg:preloaded");
    if (!firstVisit) {
      document.body.classList.add("site-loaded");
      return;
    }
    sessionStorage.setItem("nvg:preloaded", "1");
    setShow(true);
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    const reveal = () => document.body.classList.add("site-loaded");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (counterRef.current) counterRef.current.textContent = "100%";
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      setDone(true);
      reveal();
      return;
    }

    const start = performance.now();
    const DURATION = 1672;
    let raf = 0;

    const tick = (now: number) => {
      const linear = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      const pct = Math.round(eased * 100);
      if (counterRef.current) counterRef.current.textContent = `${pct}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (statusRef.current && pct >= 100) {
        statusRef.current.textContent = "Pronto para explorar";
      }
      if (linear < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setDone(true);
          reveal();
        }, 167);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  if (!show) return null;

  return (
    <div className={`preloader${done ? " preloader--done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <svg className="preloader-logo" viewBox="0 0 320 240" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="pl-grad-white" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c9c9d6" />
            </linearGradient>
            <linearGradient id="pl-grad-purple" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b69bff" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <path className="pl-stroke pl-white" d={WHITE_D} />
          <path className="pl-stroke pl-purple" d={PURPLE_D} />
          <path className="pl-spark pl-spark-white" d={WHITE_D} />
          <path className="pl-spark pl-spark-purple" d={PURPLE_D} />
        </svg>
        <span className="preloader-counter" ref={counterRef}>0%</span>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" ref={barRef} />
        </div>
        <span className="preloader-status" ref={statusRef}>
          Construindo a marca…
        </span>
      </div>
    </div>
  );
}
