"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Contornos da marca NV (mesmo viewBox 320×240 usado no LogoScene 3D).
const WHITE_D =
  "M48 25 L86 44 L168 93 L194 143 L94 78 L94 144 L155 216 L138 206 L71 151 L70 48 Z";
const PURPLE_D = "M287 27 L202 219 L153 175 L110 116 L190 169 Z";

export default function Preloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reveal = () => document.body.classList.add("site-loaded");

    // Loading só no primeiro acesso à home; exemplos e demais páginas
    // entram direto, sem a tela de construção.
    const firstVisit =
      pathname === "/" && !sessionStorage.getItem("nvg:preloaded");

    if (!firstVisit) {
      reveal();
      return;
    }

    setShow(true);
    sessionStorage.setItem("nvg:preloaded", "1");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setDone(true);
      reveal();
      return;
    }

    const start = performance.now();
    // dá tempo da marca "se construir" (desenho + preenchimento ~2.2s)
    const DURATION = 2200;
    let raf: number;

    const tick = (now: number) => {
      const linear = Math.min((now - start) / DURATION, 1);
      // ease-out: acelera no começo, desacelera chegando em 100
      const eased = 1 - Math.pow(1 - linear, 3);
      setProgress(Math.round(eased * 100));
      if (linear < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          reveal();
        }, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (!show) return null;

  return (
    <div className={`preloader${done ? " preloader--done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <svg
          className="preloader-logo"
          viewBox="0 0 320 240"
          fill="none"
          aria-hidden="true"
        >
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
        <span className="preloader-counter">{progress}%</span>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="preloader-status">
          {progress < 100 ? "Construindo a marca…" : "Pronto para explorar"}
        </span>
      </div>
    </div>
  );
}
