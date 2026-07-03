"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { CheckIcon, StoreIcon, MapPinIcon, GearIcon, CartIcon, RocketIcon } from "@/components/icons";
import TiltCard from "@/components/TiltCard";
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
    <div id="precos" className="comprar-part comprar-part--divider" aria-label="Tipos de solução">
      <div className="inner">
        <div ref={headerRef} className="comprar-part-head" data-parallax="0.12">
          <span className="section-eyebrow">Soluções</span>
          <h3 className="comprar-part-title" data-split>Tipos de solução que a gente entrega</h3>
          <p className="section-sub">
            Da vitrine digital à loja virtual completa — veja o que dá pra fazer e a gente monta o seu sob medida.
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
              <div className="pricing-features">
                {plan.features.map((f) => (
                  <div key={f} className="pricing-feature">
                    <CheckIcon size={14} />
                    {f}
                  </div>
                ))}
              </div>
              <div className={`pricing-cta${plan.featured ? " primary" : ""}`}>
                <Link href="/solucao">
                  {plan.cta}
                </Link>
              </div>
            </article>
            </TiltCard>
          ))}
        </div>

        <div className="comprar-crosslink">
          <p>Não sabe por onde começar? Faça o diagnóstico em 1 minuto.</p>
          <Link href="/solucao" className="btn-primary">
            Montar minha solução
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
