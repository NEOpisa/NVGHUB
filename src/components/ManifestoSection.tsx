"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "Construímos o futuro digital",
  "dos negócios que não aceitam",
  "ficar invisíveis.",
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section
        .querySelectorAll<HTMLElement>(".manifesto-line")
        .forEach((el) => (el.style.backgroundPositionX = "0%"));
      return;
    }

    const ctx = gsap.context(() => {
      // preenchimento progressivo conforme o scroll (efeito "ir completando")
      gsap.utils.toArray<HTMLElement>(".manifesto-line").forEach((line) => {
        gsap.fromTo(
          line,
          { backgroundPositionX: "100%" },
          {
            backgroundPositionX: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      });

      gsap.fromTo(
        ".manifesto-tagline",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto-tagline", start: "top 85%" },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="manifesto"
      aria-label="Manifesto da Neovanguard"
    >
      <div className="inner">
        <h2 className="manifesto-heading">
          {LINES.map((line) => (
            <span className="manifesto-line" key={line}>
              {line}
            </span>
          ))}
        </h2>
        <p className="manifesto-tagline">
          Enquanto a concorrência ainda discute orçamento, o seu site já está
          no ar — vendendo.
        </p>
      </div>
    </section>
  );
}
