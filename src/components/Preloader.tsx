"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setDone(true);
      document.body.classList.add("site-loaded");
      return;
    }

    const start = performance.now();
    const DURATION = 1000;
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
          document.body.classList.add("site-loaded");
        }, 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`preloader${done ? " preloader--done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-brand">
          N<span className="preloader-brand-accent">E</span>OVANGUAR
          <span className="preloader-brand-accent">D</span>
        </span>
        <span className="preloader-counter">{progress}%</span>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="preloader-status">
          {progress < 100 ? "Carregando o futuro…" : "Pronto para explorar"}
        </span>
      </div>
    </div>
  );
}
