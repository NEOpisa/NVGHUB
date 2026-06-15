"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const PASSOS = [
  {
    num: "01",
    title: "Conversa & diagnóstico",
    desc: "Você conta o que precisa pelo WhatsApp. A gente entende o negócio, o público e o objetivo — sem formulário interminável.",
  },
  {
    num: "02",
    title: "Proposta & escopo",
    desc: "Você recebe um escopo claro, com preço fechado e prazo. Sem letra miúda, sem surpresa no fim.",
  },
  {
    num: "03",
    title: "Execução em força-tarefa",
    desc: "O time atua de ponta a ponta, síncrono. Você acompanha o andamento e valida em etapas.",
  },
  {
    num: "04",
    title: "Entrega & suporte",
    desc: "No ar em até 16 dias úteis, com treinamento e suporte real incluso. Você chama, a gente resolve.",
  },
];

export default function ProcessoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="processo" className="processo" aria-label="Como funciona">
      <div className="inner">
        <div className="processo-head" ref={headerRef}>
          <h2 className="section-heading">
            Do briefing ao ar em{" "}
            <span className="text-accent-nvg">poucos passos</span>
          </h2>
          <p className="section-sub">
            Um processo enxuto e transparente — feito para tirar a sua ideia do
            papel sem fricção.
          </p>
        </div>

        <div className="processo-grid" ref={gridRef}>
          {PASSOS.map((p) => (
            <article key={p.num} className="processo-step">
              <span className="processo-step-num" aria-hidden="true">{p.num}</span>
              <h3 className="processo-step-title">{p.title}</h3>
              <p className="processo-step-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
