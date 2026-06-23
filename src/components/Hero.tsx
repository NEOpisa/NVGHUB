"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { WhatsAppIcon, CheckIcon, InstagramIcon } from "@/components/icons";
import Magnetic from "@/components/Magnetic";
import HeroVisual from "@/components/HeroVisual";
import { WA, IG } from "@/lib/constants";

const AREAS = [
  { num: "01", label: "Sua solução",          href: "/solucao" },
  { num: "02", label: "Pacotes",               href: "/pacotes" },
  { num: "03", label: "Quem somos",            href: "/sobre" },
  { num: "04", label: "Perguntas frequentes",  href: "/faq" },
  { num: "05", label: "Contato",               href: "/contato" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = ref.current;
    if (!s) return;
    // Estados iniciais via useLayoutEffect (antes do paint = sem flash)
    const brand  = s.querySelector(".hero-brand");
    const h1     = s.querySelector(".hero-h1");
    const visual = s.querySelector(".hero-visual");
    if (brand)  gsap.set(brand,  { clipPath: "inset(0 0 110% 0)", y: 10 });
    if (h1)     gsap.set(h1,     { clipPath: "inset(0 0 110% 0)", y: 16, scale: 0.97 });
    if (visual) gsap.set(visual, { opacity: 0, scale: 0.82, rotateY: -8 });
    gsap.set([
      ...Array.from(s.querySelectorAll(".cta-row > *")),
      s.querySelector(".hero-sub"),
      s.querySelector(".hero-bar"),
    ].filter(Boolean), { opacity: 0 });
    gsap.set(Array.from(s.querySelectorAll(".trust-item")), { opacity: 0, x: -16 });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = ref.current;
    if (!s) return;

    const run = () => {
      const q  = (sel: string) => s.querySelector<HTMLElement>(sel);
      const qa = (sel: string) => s.querySelectorAll<HTMLElement>(sel);
      const tl = gsap.timeline();

      // Visual: escala + fade (mais dramático que slide)
      tl.fromTo(q(".hero-visual"),
        { opacity: 0, scale: 0.82, rotateY: -8 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "power3.out" }, 0.0);

      // Brand: clip de baixo para cima
      tl.fromTo(q(".hero-brand"),
        { clipPath: "inset(0 0 110% 0)", y: 10 },
        { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.65, ease: "power4.out" }, 0.18);

      // H1: clip com leve scale (mais impacto)
      tl.fromTo(q(".hero-h1"),
        { clipPath: "inset(0 0 110% 0)", y: 16, scale: 0.97 },
        { clipPath: "inset(0 0 0% 0)", y: 0, scale: 1, duration: 0.85, ease: "power4.out" }, 0.32);

      // Sub: surge de baixo com leve delay
      tl.fromTo(q(".hero-sub"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.70, ease: "power3.out" }, 0.58);

      // Botões: surgem com escala + rotação leve (estilo "pop")
      tl.fromTo(qa(".cta-row > *"),
        { opacity: 0, y: 24, scale: 0.90 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)", stagger: 0.09 }, 0.72);

      // Trust signals: cascata rápida
      tl.fromTo(qa(".trust-item"),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.40, ease: "power2.out", stagger: 0.06 }, 0.88);

      // Bar: slide sutil de baixo
      tl.fromTo(q(".hero-bar"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.98);
    };

    if (document.body.classList.contains("site-loaded")) {
      run();
    } else {
      const obs = new MutationObserver(() => {
        if (document.body.classList.contains("site-loaded")) { obs.disconnect(); run(); }
      });
      obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      return () => obs.disconnect();
    }
  }, []);

  return (
    <section id="hero" ref={ref} aria-label="Apresentação da NEOVANGUARD">
      <div className="hero-glow-veil" aria-hidden="true" />

      <nav className="hero-index" aria-label="Áreas do site">
        {AREAS.map((a) => (
          <Link key={a.href} href={a.href} className="hero-index-link">
            <span className="hero-index-num">{a.num}</span>
            <span className="hero-index-label">{a.label}</span>
          </Link>
        ))}
      </nav>

      <div className="inner hero-grid">
        <div className="hero-copy">
          <div className="hero-brand">
            <img src="/logo.png" alt="" aria-hidden="true" width={40} height={30} />
            <span className="hero-brand-name">NEO<b>VANGUARD</b></span>
            <span className="hero-brand-sep" aria-hidden="true" />
            <span className="hero-brand-tag">Agência digital · Brasil</span>
          </div>

          <h1 className="hero-h1">
            Tudo o que seu negócio precisa no digital,{" "}
            <span className="text-gradient">conectado em um só lugar</span>
          </h1>

          <p className="hero-sub">
            Sites, sistemas, SEO e suporte — operados como um único ecossistema.
            Entrega em até <strong>16 dias úteis</strong>, suporte real, sem contrato mínimo.
          </p>

          <div className="cta-row">
            <Magnetic>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp">
                <WhatsAppIcon />Falar pelo WhatsApp
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/pacotes" className="btn-ghost">
                Ver tipos de solução
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={IG} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <InstagramIcon />Instagram
              </a>
            </Magnetic>
          </div>

          <div className="trust-signals">
            {["Entrega em até 16 dias úteis","Sem contrato mínimo","Suporte via WhatsApp"].map((t) => (
              <span key={t} className="trust-item"><CheckIcon />{t}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <HeroVisual />
        </div>
      </div>

      <div className="hero-bar">
        <span className="hero-scroll-hint">
          <span className="scroll-arrow" aria-hidden="true" />
          Role para explorar
        </span>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="hero-bar-chat">
          Fale com a gente
        </a>
      </div>
    </section>
  );
}
