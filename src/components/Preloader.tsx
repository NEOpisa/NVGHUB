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

    // "Útil": espera DE VERDADE as fontes + todos os recursos da página
    // (window.load), em vez de um timer fixo. A barra sobe até 90% por tempo e
    // só completa quando carregou. Min 0.7s (não pisca) e failsafe de 5s.
    let ready = false;
    const loadP =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true })
          );
    const fontsP = document.fonts?.ready ?? Promise.resolve();
    Promise.all([loadP, fontsP]).then(() => {
      ready = true;
    });

    const start = performance.now();
    const MIN = 700;
    const MAX = 5000;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      let pct: number;
      if ((ready && elapsed >= MIN) || elapsed >= MAX) {
        pct = 100;
      } else {
        const t = Math.min(elapsed / 1600, 1);
        pct = Math.round((1 - Math.pow(1 - t, 3)) * 90);
      }
      if (counterRef.current) counterRef.current.textContent = `${pct}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
      if (statusRef.current && pct >= 100) {
        statusRef.current.textContent = "Pronto para explorar";
      }
      if (pct >= 100) {
        window.setTimeout(() => {
          setDone(true);
          reveal();
        }, 150);
      } else {
        raf = requestAnimationFrame(tick);
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

        <span className="preloader-wordmark">
          NEO<b>VANGUARD</b>
        </span>

        <div className="preloader-bar">
          <div className="preloader-bar-fill" ref={barRef} />
        </div>

        <div className="preloader-meta">
          <span className="preloader-status" ref={statusRef}>
            Construindo a marca
          </span>
          <span className="preloader-counter" ref={counterRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
