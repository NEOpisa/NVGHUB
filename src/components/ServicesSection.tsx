"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckIcon } from "@/components/icons";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: <MonitorIcon />,
    title: "Site Profissional",
    desc: "Landing page ou site institucional com design responsivo, otimizado para SEO local e carregamento rápido. Feito para converter visitante em cliente.",
    outcome: "No ar em até 16 dias úteis",
    tag: "Mais procurado",
    featured: true,
  },
  {
    icon: <LayersIcon />,
    title: "Sistema para Negócio",
    desc: "Cardápio digital, agendamento online ou catálogo interativo com painel de controle.",
    outcome: "Painel de controle incluso",
  },
  {
    icon: <SearchIcon />,
    title: "SEO & Presença Digital",
    desc: "Apareça no Google local com Google Meu Negócio configurado e palavras-chave do seu segmento.",
    outcome: "Resultado em 30–60 dias",
  },
  {
    icon: <ShieldIcon />,
    title: "Manutenção & Suporte",
    desc: "Suporte real via WhatsApp, atualizações e monitoramento. Você chama, a gente resolve.",
    outcome: "Resposta em até 3h úteis",
  },
  {
    icon: <ScreenIcon />,
    title: "SaaS para o seu segmento",
    desc: "Plataforma pronta para clínicas e restaurantes — sem desenvolvimento customizado.",
    outcome: "Em lançamento",
    soon: true,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section
        .querySelectorAll<HTMLElement>(".manifesto-line")
        .forEach((el) => (el.style.backgroundPositionX = "0%"));
      return;
    }
    const header   = section.querySelector<HTMLElement>(".services-header");
    const eyebrow  = section.querySelector<HTMLElement>(".section-eyebrow");
    const lines    = section.querySelectorAll<HTMLElement>(".manifesto-line");
    const sub      = section.querySelector<HTMLElement>(".section-sub");
    const viewport = section.querySelector<HTMLElement>(".carousel-viewport");
    const arrows   = section.querySelectorAll<HTMLElement>(".carousel-arrow");
    const dots     = section.querySelector<HTMLElement>(".services-scroll-dots");
    const cta      = section.querySelector<HTMLElement>(".services-orcamento-cta");
    const exRow    = section.querySelector<HTMLElement>(".services-exemplos-row");

    // Estados iniciais
    if (eyebrow)  gsap.set(eyebrow,  { opacity: 0, x: -20 });
    if (sub)      gsap.set(sub,      { opacity: 0, y: 20 });
    if (viewport) gsap.set(viewport, { opacity: 0, y: 48, scale: 0.96 });
    if (dots)     gsap.set(dots,     { opacity: 0 });
    if (cta) gsap.set(Array.from(cta.children), { opacity: 0, y: 20, scale: 0.94 });
    if (exRow)    gsap.set(exRow,    { opacity: 0, y: 12 });
    if (arrows.length) gsap.set(arrows, { opacity: 0, scale: 0.5 });
    lines.forEach(l => gsap.set(l, { clipPath: "inset(0 0 110% 0)" }));

    const ctx = gsap.context(() => {
      // Eyebrow desliza da esquerda
      if (eyebrow) {
        gsap.to(eyebrow, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out",
          scrollTrigger: { trigger: header ?? section, start: "top 86%", once: true } });
      }

      // Manifesto: clip-reveal + fill de cor scrubado
      lines.forEach((line, i) => {
        gsap.to(line, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.70, ease: "power4.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: line, start: "top 86%", once: true },
        });
        gsap.fromTo(line,
          { backgroundPositionX: "100%" },
          { backgroundPositionX: "0%", duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: line, start: "top 85%", once: true } }
        );
      });

      // Sub fade
      if (sub) {
        gsap.to(sub, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: sub, start: "top 88%", once: true } });
      }

      // Carousel: surge com escala + y (efeito de "emergir")
      if (viewport) {
        gsap.to(viewport, { opacity: 1, y: 0, scale: 1,
          duration: 0.90, ease: "power3.out",
          scrollTrigger: { trigger: viewport, start: "top 82%", once: true } });
      }

      // Arrows: pop com spring
      if (arrows.length) {
        gsap.to(arrows, { opacity: 1, scale: 1, duration: 0.50, ease: "back.out(2.5)",
          stagger: 0.10,
          scrollTrigger: { trigger: viewport ?? section, start: "top 78%", once: true } });
      }

      // Dots fade
      if (dots) {
        gsap.to(dots, { opacity: 1, duration: 0.40,
          scrollTrigger: { trigger: dots, start: "top 92%", once: true } });
      }

      // CTA: cada botão surge com pop (pai já visível, filhos animam)
      if (cta) {
        gsap.to(Array.from(cta.children), {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55, ease: "back.out(1.5)", stagger: 0.08,
          scrollTrigger: { trigger: cta, start: "top 90%", once: true },
        });
      }

      if (exRow) {
        gsap.to(exRow, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out",
          scrollTrigger: { trigger: exRow, start: "top 92%", once: true } });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => setActiveIdx(((idx % SERVICES.length) + SERVICES.length) % SERVICES.length);
  const goPrev = () => goTo(activeIdx - 1);
  const goNext = () => goTo(activeIdx + 1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
  };

  const touchStart = useRef({ x: 0, y: 0 });
  const touchDelta = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchDelta.current = { x: 0, y: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchDelta.current = { x: t.clientX - touchStart.current.x, y: t.clientY - touchStart.current.y };
  };
  const onTouchEnd = () => {
    const { x, y } = touchDelta.current;
    if (Math.abs(x) > Math.abs(y) && Math.abs(x) > 40) {
      if (x < 0) goNext(); else goPrev();
    }
  };

  return (
    <section id="servicos" aria-label="Nossos serviços" ref={sectionRef}>
      <div className="inner">
        <header className="services-header" data-skew>
          <span className="section-eyebrow">Serviços</span>
          <h2 className="services-fill">
            <span className="manifesto-line">Soluções digitais que entregam de verdade.</span>
          </h2>
          <p className="section-sub">
            Do site ao sistema, entrega em até 16 dias úteis. Sem papo de agência grande.
          </p>
        </header>

        <div
          className="services-carousel"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Carrossel de serviços"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <button
            type="button"
            className="carousel-arrow carousel-arrow--prev"
            onClick={goPrev}
            aria-label="Serviço anterior"
          >
            <ChevronIcon direction="left" />
          </button>

          <div
            className="carousel-viewport"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {SERVICES.map((svc, i) => (
                <div
                  className="carousel-slide"
                  key={svc.title}
                  aria-hidden={i !== activeIdx}
                >
                  <TiltCard maxTilt={5}>
                    <article
                      className={`service-card${svc.featured ? " service-card--featured" : ""}${svc.soon ? " service-card--soon" : ""}`}
                    >
                      <span className="service-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="service-card-head">
                        <div className="service-icon" aria-hidden="true">{svc.icon}</div>
                        {svc.tag && <span className="service-tag">{svc.tag}</span>}
                      </div>
                      <div className="service-title">{svc.title}</div>
                      <p className="service-desc">{svc.desc}</p>
                      <div className="service-outcome">
                        <CheckIcon />
                        {svc.outcome}
                      </div>
                    </article>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--next"
            onClick={goNext}
            aria-label="Próximo serviço"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div className="services-scroll-dots">
          {SERVICES.map((svc, i) => (
            <button
              key={svc.title}
              type="button"
              className={`services-scroll-dot${i === activeIdx ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Ir para o serviço: ${svc.title}`}
              aria-current={i === activeIdx}
            />
          ))}
        </div>

        <div className="services-orcamento-cta">
          <Link href="/solucao" className="btn-primary">
            <CalcIcon />
            Montar minha solução
          </Link>
          <Link href="/pacotes" className="btn-ghost">
            Ver tipos de solução
          </Link>
        </div>

        <div className="services-exemplos-row">
          <Link href="/exemplos" className="btn-ghost">
            <GalleryIcon />
            Ver exemplos de sites
            <span className="be-tag">Novo</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 14l4-4 5 5M14 13l3-2 4 4" />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}

function MonitorIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>; }
function LayersIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>; }
function SearchIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>; }
function ShieldIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function ScreenIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}
function CalcIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4"/></svg>; }
