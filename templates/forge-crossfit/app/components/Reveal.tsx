"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
};

export default function Reveal({
  as: Component = "div",
  className = "",
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      el.classList.add("in");
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component ref={ref} className={`rev ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}
