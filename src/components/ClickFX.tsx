"use client";

import { useEffect } from "react";

const SEL =
  ".btn-primary,.btn-ghost,.nav-cta,.form-submit,.contact-whatsapp";

export default function ClickFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      const host = (e.target as HTMLElement | null)?.closest(SEL) as HTMLElement | null;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const span = document.createElement("span");
      span.className = "click-ripple";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      span.addEventListener("animationend", () => span.remove(), { once: true });
      host.appendChild(span);
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
