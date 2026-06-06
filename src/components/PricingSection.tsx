"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";

const PLANS = [
  {
    name: "Presença",
    tagline: "Para quem quer estar no digital agora",
    from: "A partir de",
    price: "R$ 930 ",
    period: "pagamento único",
    featured: false,
    features: [
      "Landing page responsiva",
      "SEO local básico + Google Meu Negócio",
      "Botão WhatsApp integrado",
      "Entrega em até 16 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Começar com Presença",
    href: WA,
  },
  {
    name: "Sistema",
    tagline: "Para quem quer automatizar e vender mais",
    from: "A partir de",
    price: "R$ 2.490",
    period: "pagamento único",
    featured: true,
    badge: "Mais escolhido",
    features: [
      "Tudo do plano Presença",
      "Cardápio digital / Agendamento / Catálogo",
      "Painel de controle do cliente",
      "Entrega em até 26 dias úteis",
      "5 meses de suporte incluídos",
      "Treinamento de uso (1h via vídeo)",
    ],
    cta: "Começar com Sistema",
    href: WA,
  },
  {
    name: "SaaS",
    taglineSuffix: "(em breve)",
    tagline: "Solução pronta para o seu segmento",
    from: "Assinatura mensal",
    price: "Em lançamento",
    priceMuted: true,
    period: "preço revelado em breve",
    featured: false,
    features: [
      "Sem desenvolvimento customizado",
      "Pronto para clínicas e restaurantes",
      "Atualizações automáticas incluídas",
      "Suporte contínuo no plano",
    ],
    cta: "Entrar na lista de espera",
    href: WA,
  },
];

export default function PricingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="precos" aria-label="Planos e preços">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Planos & Preços</span>
          <h2 className="section-heading">
            Escolha o plano <span className="text-accent-nvg">certo pra você</span>
          </h2>
          <p className="section-sub">
            Preços transparentes, sem letra miúda. Entrega em até 16 dias úteis — ou você não paga.
          </p>
        </div>

        <div className="pricing-grid" ref={gridRef}>
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card${plan.featured ? " featured" : ""}`}
            >
              {plan.featured && plan.badge && (
                <div className="pricing-badge">{plan.badge}</div>
              )}
              <div className="pricing-plan">
                {plan.name}
                {plan.taglineSuffix && (
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 400 }}>
                    {" "}({plan.taglineSuffix})
                  </span>
                )}
              </div>
              <div className="pricing-tagline">{plan.tagline}</div>
              <div className="pricing-price-wrap">
                <div className="pricing-from">{plan.from}</div>
                <div
                  className="pricing-price"
                  style={plan.priceMuted ? { fontSize: "22px", color: "var(--text-secondary)" } : undefined}
                >
                  {plan.price}
                </div>
                <div className="pricing-period">{plan.period}</div>
              </div>
              <div className="pricing-features">
                {plan.features.map((f) => (
                  <div key={f} className="pricing-feature">
                    <CheckIcon />
                    {f}
                  </div>
                ))}
              </div>
              <div className={`pricing-cta${plan.featured ? " primary" : ""}`}>
                <a href={plan.href} target={plan.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {plan.cta}
                </a>
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
