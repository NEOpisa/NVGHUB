"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "@/components/Magnetic";
import HeroOrb from "@/components/HeroOrb";
import { WA } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Oculta antes do paint
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = sectionRef.current;
    if (!s) return;
    gsap.set([
      s.querySelector(".hero-eyebrow"),
      s.querySelector(".hero-h1-editorial"),
      s.querySelector(".hero-sub-editorial"),
      s.querySelector(".hero-cta-row"),
      s.querySelector(".hero-bottom-bar"),
    ].filter(Boolean), { opacity: 0, y: 32 });
  }, []);

  // Timeline cinematográfica após preloader
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = sectionRef.current;
    if (!s) return;

    const run = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const eyebrow = s.querySelector(".hero-eyebrow");
      const h1      = s.querySelector(".hero-h1-editorial");
      const sub     = s.querySelector(".hero-sub-editorial");
      const cta     = s.querySelector(".hero-cta-row");
      const bar     = s.querySelector(".hero-bottom-bar");

      if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.65 }, 0.20);
      if (h1)      tl.to(h1,      { opacity: 1, y: 0, duration: 0.90 }, 0.36);
      if (sub)     tl.to(sub,     { opacity: 1, y: 0, duration: 0.75 }, 0.72);
      if (cta)     tl.to(cta,     { opacity: 1, y: 0, duration: 0.60 }, 0.92);
      if (bar)     tl.to(bar,     { opacity: 1, y: 0, duration: 0.55 }, 1.08);
    };

    if (document.body.classList.contains("site-loaded")) {
      run();
    } else {
      const obs = new MutationObserver(() => {
        if (document.body.classList.contains("site-loaded")) {
          obs.disconnect();
          run();
        }
      });
      obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      return () => obs.disconnect();
    }
  }, []);

  return (
    <section id="hero" ref={sectionRef} aria-label="Apresentação da NEOVANGUARD">

      {/* Orb 3D — fundo superior direito */}
      <div className="hero-orb" aria-hidden="true">
        <HeroOrb />
      </div>

      {/* Conteúdo editorial */}
      <div className="hero-editorial">

        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          <span>NEOVANGUARD</span>
          <span aria-hidden="true">·</span>
          <span>Agência digital</span>
          <span aria-hidden="true">·</span>
          <span>Brasil</span>
        </div>

        {/* Headline gigante */}
        <h1 className="hero-h1-editorial chroma">
          Tudo o que<br />
          seu negócio<br />
          <span className="text-accent">precisa.</span>
        </h1>

        {/* Subtítulo */}
        <p className="hero-sub-editorial">
          Sites, sistemas, SEO e suporte — operados como um único
          ecossistema. Entrega em até <strong>16 dias úteis</strong>,
          suporte real, sem contrato mínimo.
        </p>

        {/* 1 CTA */}
        <div className="hero-cta-row">
          <Magnetic>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hero-cta-primary">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
          </Magnetic>
          <Link href="/pacotes" className="hero-cta-ghost">
            Ver tipos de solução →
          </Link>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="hero-bottom-bar">
        <span>Scroll ↓</span>
        <span>16 dias úteis · 100% remoto · Brasil inteiro</span>
      </div>
    </section>
  );
}
