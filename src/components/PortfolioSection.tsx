"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const PROJECTS = [
  {
    thumb: "Sabor da Serra",
    tag: "Site + Cardápio Digital",
    title: "Pizzaria Sabor da Serra",
    desc: "Site responsivo com cardápio digital integrado. O cliente acessa pelo QR code na mesa e faz o pedido sem chamar o garçom.",
    result: "+40% em pedidos online no 1º mês",
  },
  {
    thumb: "Studio Equilíbrio",
    tag: "Agendamento Online",
    title: "Studio de Pilates Equilíbrio",
    desc: "Sistema de agendamento de aulas com confirmação automática. Reduziu em 80% as mensagens de WhatsApp para marcar horário.",
    result: "800+ agendamentos no 1º trimestre",
  },
  {
    thumb: "Ótica Visão Clara",
    tag: "Landing Page + SEO",
    title: "Ótica Visão Clara",
    desc: "Landing page otimizada para SEO local com botão de WhatsApp, mapa de localização e catálogo de armações navegável.",
    result: "1ª posição no Google em 45 dias",
  },
];

export default function PortfolioSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="portfolio" aria-label="Portfólio de projetos">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Portfólio</span>
          <h2 className="section-heading">
            O que a gente <span className="text-accent-nvg">entregou</span>
          </h2>
          <p className="section-sub">
            Projetos reais, resultados mensuráveis. Cada entrega com nome e sobrenome.
          </p>
        </div>

        <div className="portfolio-grid" ref={gridRef}>
          {PROJECTS.map((p) => (
            <article key={p.title} className="portfolio-card">
              <div className="portfolio-thumb">
                <div className="portfolio-thumb-glow" aria-hidden="true" />
                <span className="portfolio-thumb-text">{p.thumb}</span>
              </div>
              <div className="portfolio-body">
                <span className="portfolio-tag">{p.tag}</span>
                <div className="portfolio-title">{p.title}</div>
                <p className="portfolio-desc">{p.desc}</p>
                <div className="portfolio-result">
                  <CheckIcon />
                  {p.result}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
