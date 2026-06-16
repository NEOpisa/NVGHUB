"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { CheckIcon, StoreIcon, MapPinIcon, GearIcon, CartIcon, RocketIcon } from "@/components/icons";
import TiltCard from "@/components/TiltCard";
import { WA } from "@/lib/constants";
import { PACOTES, type PacoteKey } from "@/lib/pacotes";

const ICONS: Record<PacoteKey, ReactNode> = {
  Vitrine: <StoreIcon />,
  Presença: <MapPinIcon />,
  Sistema: <GearIcon />,
  "E-commerce": <CartIcon />,
  SaaS: <RocketIcon />,
};

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
              <div className="pricing-icon" aria-hidden="true">{ICONS[plan.name]}</div>
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
