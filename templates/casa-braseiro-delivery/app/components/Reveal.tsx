"use client";

import { useReveal } from "../hooks/useReveal";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable wrapper that applies the `.rev` reveal-on-scroll class and adds
 * `.in` once the element enters the viewport (mirrors the original
 * IntersectionObserver behaviour).
 */
export default function Reveal({
  as: Component = "div",
  className = "",
  children,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <Component ref={ref} className={`rev ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}
