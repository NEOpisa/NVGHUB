"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { CheckIcon, StoreIcon, MapPinIcon, GearIcon, CartIcon, RocketIcon } from "@/components/icons";
import TiltCard from "@/components/TiltCard";
import { WA } from "@/lib/constants";

const PACOTES = [
  {
    name: "Vitrine",
    icon: <StoreIcon />,
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
    message: "Olá! Quero contratar o pacote Vitrine (R$ 430, pagamento único).",
  },
  {
    name: "Presença",
    icon: <MapPinIcon />,
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
    message: "Olá! Quero contratar o pacote Presença (R$ 730, pagamento único).",
  },
  {
    name: "Sistema",
    icon: <GearIcon />,
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
    message: "Olá! Quero contratar o pacote Sistema (R$ 1.460, pagamento único).",
  },
  {
    name: "E-commerce",
    icon: <CartIcon />,
    tagline: "Para quem quer vender online",
    from: "A partir de",
    price: "R$ 3.130",
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
    message: "Olá! Quero contratar o pacote E-commerce (R$ 3.130, pagamento único).",
  },
  {
    name: "SaaS",
    icon: <RocketIcon />,
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
    message: "Olá! Quero entrar na lista de espera do pacote SaaS da Neovanguard.",
  },
];

export default function PricingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <div id="precos" className="comprar-part comprar-part--divider" aria-label="Pacotes e preços">
      <div className="inner">
        <div ref={headerRef} className="comprar-part-head">
          <h3 className="comprar-part-title">Escolha um pacote pronto</h3>
          <p className="section-sub">
            Da vitrine digital à loja virtual completa — tem um pacote pro seu momento.
          </p>
        </div>

        <div className="pricing-grid" ref={gridRef}>
          {PACOTES.map((plan) => (
            <TiltCard key={plan.name} maxTilt={10}>
            <article
              className={`pricing-card${plan.featured ? " featured" : ""}`}
            >
              {plan.badge && (
                <div className={`pricing-badge${plan.badgeVariant ? ` pricing-badge--${plan.badgeVariant}` : ""}`}>
                  {plan.badge}
                </div>
              )}
              <div className="pricing-icon" aria-hidden="true">{plan.icon}</div>
              <div className="pricing-plan">
                {plan.name}
              </div>
              <div className="pricing-tagline">{plan.tagline}</div>
              <div className="pricing-price-wrap">
                <div className="pricing-from">{plan.from}</div>
                <div className={`pricing-price${plan.price.startsWith("R$") ? "" : " pricing-price--text"}`}>
                  {plan.price}
                </div>
                <div className="pricing-period">{plan.period}</div>
              </div>
              <div className="pricing-features">
                {plan.features.map((f) => (
                  <div key={f} className="pricing-feature">
                    <CheckIcon size={14} />
                    {f}
                  </div>
                ))}
              </div>
              <div className={`pricing-cta${plan.featured ? " primary" : ""}`}>
                <a href={`${WA}?text=${encodeURIComponent(plan.message)}`} target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </a>
              </div>
            </article>
            </TiltCard>
          ))}
        </div>

        <div className="comprar-crosslink">
          <p>Quer algo sob medida? Monte item a item e veja o preço na hora.</p>
          <Link href="/orcamento" className="btn-primary">
            Montar meu orçamento
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
