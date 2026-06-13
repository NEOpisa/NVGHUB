"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
}

export default function Reveal({ children, className = "", as: Tag = "div", ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIn(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      className={`rev${isIn ? " in" : ""}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
