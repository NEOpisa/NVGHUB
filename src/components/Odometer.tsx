"use client";

import { useEffect, useRef, useState } from "react";

const STRIP = "0123456789";

/**
 * Número-odômetro: cada dígito é uma coluna 0–9 que ROLA até o valor final
 * quando o elemento entra na tela (spring stagger da direita p/ esquerda).
 * Sufixos não numéricos ("%", "+") ficam estáticos. Respeita reduced-motion.
 */
export default function Odometer({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGo(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chars = value.split("");
  const digits = chars.filter((c) => /\d/.test(c)).length;
  let seen = 0;

  return (
    <span ref={ref} className={`odo${go ? " is-go" : ""}`} aria-label={value}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) {
          return (
            <span key={i} className="odo-static" aria-hidden="true">
              {c}
            </span>
          );
        }
        const idx = seen++;
        return (
          <span key={i} className="odo-digit" aria-hidden="true">
            <span
              className="odo-strip"
              style={{
                transform: go
                  ? `translateY(${-parseInt(c, 10) * 10}%)`
                  : "translateY(0)",
                transitionDelay: `${(digits - 1 - idx) * 110}ms`,
              }}
            >
              {STRIP.split("").map((d) => (
                <em key={d}>{d}</em>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
