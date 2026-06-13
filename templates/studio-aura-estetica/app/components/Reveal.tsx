"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("in");

    // If the element is already within (or near) the viewport at mount,
    // reveal it right away — nothing should wait on a scroll that won't come.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.9) {
      show();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    obs.observe(el);

    // Failsafe: never let a section stay invisible because the observer
    // missed it (backgrounded tab, fast programmatic scroll, headless render).
    const failsafe = window.setTimeout(show, 1600);

    return () => {
      obs.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag ref={ref} className={`rev ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
