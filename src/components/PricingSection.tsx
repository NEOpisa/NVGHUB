"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";

const PACOTES = [
  {
    name: "Vitrine",
    tagline: "Para quem quer existir online rapidamente",
    from: "A partir de",
    price: "R$ 430",
    period: "pagamento único",
    featured: false,
    badge: "Comece por aqui",
    badgeVariant: "alt",
    features: [
      "Página única profissional com foto e descrição do negócio",
      "Horário de funcionamento em destaque",
      "Botão WhatsApp integrado",
      "Links para todas as suas redes sociais",
      "Entrega em até 7 dias úteis",
      "2 meses de suporte",
    ],
    cta: "Começar com Vitrine",
    href: WA,
  },
  {
    name: "Presença",
    tagline: "Para quem quer ser encontrado no Google",
    from: "A partir de",
    price: "R$ 730",
    period: "pagamento único",
    featured: false,
    features: [
      "Landing page completa e responsiva",
      "SEO local básico",
      "Google Meu Negócio configurado",
      "Botão WhatsApp integrado",
      "Entrega em até 16 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Começar com Presença",
    href: WA,
  },
  {
    name: "Sistema",
    tagline: "Para quem quer o site funcionando como ferramenta do negócio",
    from: "A partir de",
    price: "R$ 1.460",
    period: "pagamento único",
    featured: true,
    badge: "Mais escolhido",
    features: [
      "Tudo do pacote Presença",
      "Cardápio digital, agendamento ou catálogo",
      "Painel de controle do cliente",
      "Treinamento de uso por vídeo (1h)",
      "Entrega em até 26 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Começar com Sistema",
    href: WA,
  },
  {
    name: "E-commerce",
    tagline: "Para quem quer vender online",
    from: "A partir de",
    price: "R$ 4.200",
    period: "pagamento único",
    featured: false,
    features: [
      "Loja virtual completa com carrinho",
      "Pagamento via Pix e Mercado Pago",
      "Gestão básica de estoque",
      "Painel do lojista",
      "Entrega em até 35 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Quero minha loja virtual",
    href: WA,
  },
  {
    name: "SaaS",
    tagline: "Solução escalável em desenvolvimento",
    from: "Assinatura mensal",
    price: "Em breve",
    period: "Detalhes a confirmar",
    featured: false,
    badge: "Em breve",
    badgeVariant: "alt",
    features: [
      "Plataforma pronta pro seu segmento",
      "Sem desenvolvimento customizado",
      "Atualizações e suporte contínuo inclusos",
      "Preço e detalhes revelados em breve",
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
    <section id="precos" aria-label="Pacotes e preços">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Pacotes & Preços</span>
          <h2 className="section-heading">
            Escolha o pacote <span className="text-accent-nvg">certo pra você</span>
          </h2>
          <p className="section-sub">
            Preços transparentes, sem letra miúda. Da vitrine digital à loja virtual completa — tem um pacote pro seu momento.
          </p>
        </div>

        <div className="pricing-grid" ref={gridRef}>
          {PACOTES.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card${plan.featured ? " featured" : ""}`}
            >
              {plan.badge && (
                <div className={`pricing-badge${plan.badgeVariant ? ` pricing-badge--${plan.badgeVariant}` : ""}`}>
                  {plan.badge}
                </div>
              )}
              <div className="pricing-plan">
                {plan.name}
              </div>
              <div className="pricing-tagline">{plan.tagline}</div>
              <div className="pricing-price-wrap">
                <div className="pricing-from">{plan.from}</div>
                <div className="pricing-price">
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
