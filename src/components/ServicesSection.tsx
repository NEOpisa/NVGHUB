"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

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
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  useReveal(headerRef);

  const goTo = (idx: number) => setActiveIdx(((idx % SERVICES.length) + SERVICES.length) % SERVICES.length);
  const goPrev = () => goTo(activeIdx - 1);
  const goNext = () => goTo(activeIdx + 1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
  };

  // touch swipe (mobile)
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
    <section id="servicos" aria-label="Nossos serviços">
      <div className="inner">
        <header className="services-header" ref={headerRef}>
          <span className="section-eyebrow">O que fazemos</span>
          <h2 className="section-heading">
            Soluções digitais <span className="text-accent-nvg">que entregam</span>
          </h2>
          <p className="section-sub">
            Do site ao sistema, entrega em até 16 dias úteis. Sem papo de agência grande.
          </p>
        </header>

        {/* Carousel — exibe 1 card por vez, igual em desktop e mobile */}
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
                  <article
                    className={`service-card${svc.featured ? " service-card--featured" : ""}${svc.soon ? " service-card--soon" : ""}`}
                  >
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

        {/* Botão orçamento */}
        <div className="services-orcamento-cta">
          <a href="#orcamento" className="btn-primary">
            <CalcIcon />
            Montar meu orçamento
          </a>
          <button
            className="btn-ghost"
            onClick={() => window.dispatchEvent(new Event("open-noxz"))}
          >
            <SparkIcon />
            Conhecer o Plano Noxz
          </button>
        </div>
      </div>
    </section>
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
function CheckIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>; }
function CalcIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4"/></svg>; }
function SparkIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg>; }
