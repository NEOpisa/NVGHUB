"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { num: "01", title: "Site Profissional",      outcome: "No ar em até 16 dias úteis", href: "/solucao" },
  { num: "02", title: "Sistema para Negócio",   outcome: "Painel de controle incluso", href: "/solucao" },
  { num: "03", title: "SEO & Presença Digital", outcome: "Resultado em 30–60 dias",    href: "/solucao" },
  { num: "04", title: "Manutenção & Suporte",   outcome: "Resposta em até 3h úteis",   href: "/solucao" },
  { num: "05", title: "SaaS para seu segmento", outcome: "Em lançamento",              href: "/solucao" },
];

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list    = listRef.current;
    if (!section || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const header = section.querySelector<HTMLElement>(".services-editorial-header");
    const rows   = list.querySelectorAll<HTMLElement>(".service-row");
    const cta    = section.querySelector<HTMLElement>(".services-editorial-cta");

    if (header) gsap.set(header, { opacity: 0, y: 24 });
    gsap.set(rows, { opacity: 0, y: 20 });
    if (cta) gsap.set(cta, { opacity: 0, y: 16 });

    const ctx = gsap.context(() => {
      if (header) {
        gsap.to(header, {
          opacity: 1, y: 0, duration: 0.80, ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 88%", once: true },
        });
      }

      rows.forEach((row, i) => {
        gsap.to(row, {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: list, start: "top 82%", once: true },
        });
      });

      if (cta) {
        gsap.to(cta, {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: cta, start: "top 90%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" ref={sectionRef} aria-label="Nossos serviços">
      <div className="inner">

        <header className="services-editorial-header">
          <span className="section-eyebrow">Serviços</span>
          <h2 className="section-heading chroma">
            Soluções digitais<br />que entregam.
          </h2>
          <p className="section-sub">
            Do site ao sistema, entrega em até 16 dias úteis. Sem papo de agência grande.
          </p>
        </header>

        <div className="services-list" ref={listRef}>
          {SERVICES.map((s) => (
            <Link key={s.num} href={s.href} className="service-row">
              <span className="service-row-num">{s.num}</span>
              <span className="service-row-title">{s.title}</span>
              <span className="service-row-outcome">{s.outcome}</span>
              <span className="service-row-arrow"><ArrowIcon /></span>
            </Link>
          ))}
        </div>

        <div className="services-editorial-cta">
          <Link href="/solucao" className="btn-primary">
            Montar minha solução
          </Link>
          <Link href="/pacotes" className="btn-ghost">
            Ver tipos de solução
          </Link>
        </div>

      </div>
    </section>
  );
}
