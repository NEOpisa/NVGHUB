"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { CheckIcon, StoreIcon, MapPinIcon, GearIcon, CartIcon, RocketIcon } from "@/components/icons";
import { PACOTES, type PacoteKey } from "@/lib/pacotes";

const ICONS: Record<PacoteKey, ReactNode> = {
  Vitrine: <StoreIcon />,
  Presença: <MapPinIcon />,
  Sistema: <GearIcon />,
  "E-commerce": <CartIcon />,
  SaaS: <RocketIcon />,
};

export default function SolucoesShowcase() {
  const headRef = useRef<HTMLDivElement>(null);
  useReveal(headRef);

  return (
    <section id="solucoes" className="showcase" aria-label="Tipos de solução">
      <div className="inner">
        <div ref={headRef} className="showcase-head">
          <span className="section-eyebrow">O que entregamos</span>
          <h2 className="section-heading">
            Soluções <span className="text-accent-nvg">sob medida</span>
          </h2>
          <p className="section-sub">
            Da vitrine digital ao e-commerce. Arraste para o lado e veja os tipos de solução.
          </p>
        </div>
      </div>

      <div className="showcase-track" role="list">
        {PACOTES.map((plan, i) => (
          <article
            key={plan.name}
            role="listitem"
            className={`showcase-card${plan.featured ? " featured" : ""}`}
          >
            <span className="showcase-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="showcase-icon" aria-hidden="true">{ICONS[plan.name]}</div>
            <h3 className="showcase-card-title">{plan.name}</h3>
            <p className="showcase-card-tagline">{plan.tagline}</p>
            <ul className="showcase-features">
              {plan.features.slice(0, 4).map((f) => (
                <li key={f}>
                  <CheckIcon size={13} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/solucao" className="showcase-cta">
              {plan.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </article>
        ))}
      </div>

      <div className="inner showcase-foot">
        <p>Não sabe por onde começar? Faça o diagnóstico em 1 minuto.</p>
        <Link href="/solucao" className="btn-primary">
          Montar minha solução
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  );
}
