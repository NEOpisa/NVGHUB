"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const DEPOIMENTOS = [
  {
    name: "Marcos Oliveira",
    role: "Dono — Pizzaria Sabor da Serra, SP",
    text: "Em 11 dias o site estava no ar com o cardápio digital integrado. Minha equipe parou de atender pedido por telefone. Valeu cada centavo.",
    stars: 5,
  },
  {
    name: "Juliana Costa",
    role: "Proprietária — Studio Equilíbrio, RJ",
    text: "O agendamento online reduziu em 80% as mensagens no WhatsApp para marcar aula. Meus alunos adoraram a facilidade e eu consigo focar no que importa.",
    stars: 5,
  },
  {
    name: "Rafael Mendes",
    role: "Proprietário — Ótica Visão Clara, MG",
    text: "Achei que seria complicado e demorado. Foi simples, entregaram antes do prazo e o suporte é de verdade — quando mando mensagem, respondem no mesmo dia.",
    stars: 5,
  },
];

export default function DepoimentosSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="depoimentos" aria-label="Depoimentos de clientes">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Clientes</span>
          <h2 className="section-heading">
            Quem já <span className="text-accent-nvg">confiou</span>
          </h2>
          <p className="section-sub">
            Experiências reais de quem contratou e viu o resultado acontecer.
          </p>
        </div>

        <div className="testimonials-grid" ref={gridRef}>
          {DEPOIMENTOS.map((d) => (
            <article key={d.name} className="testimonial-card">
              <div className="testimonial-stars">{"★".repeat(d.stars)}</div>
              <p className="testimonial-text">&ldquo;{d.text}&rdquo;</p>
              <footer className="testimonial-author">
                <div className="testimonial-name">{d.name}</div>
                <div className="testimonial-role">{d.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
