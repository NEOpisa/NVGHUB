"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const AREAS = [
  { num: "01", label: "Quem somos", href: "/sobre", desc: "Quem somos, nossos números e a metodologia." },
  { num: "02", label: "Orçamento", href: "/orcamento", desc: "Monte o seu sob medida e veja o preço na hora." },
  { num: "03", label: "Pacotes", href: "/pacotes", desc: "Planos fechados, com preço transparente." },
  { num: "04", label: "Contato", href: "/contato", desc: "Fale com a gente pelo WhatsApp ou formulário." },
];

export default function ExploreSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(listRef, 80);

  return (
    <section id="explorar" className="explore" aria-label="Navegue pelo site">
      <div className="inner">
        <div className="explore-head" ref={headerRef}>
          <span className="section-eyebrow">Navegue</span>
          <h2 className="section-heading">
            Explore a <span className="text-accent-nvg">Neovanguard</span>
          </h2>
          <p className="section-sub">
            Cada área num lugar próprio. Escolha por onde começar.
          </p>
        </div>

        <div className="explore-list" ref={listRef}>
          {AREAS.map((a) => (
            <Link key={a.href} href={a.href} className="explore-link">
              <span className="explore-index" aria-hidden="true">{a.num}</span>
              <span className="explore-label">{a.label}</span>
              <span className="explore-desc">{a.desc}</span>
              <span className="explore-arrow" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
