"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const ITEMS = [
  {
    number: "16",
    suffix: " dias",
    title: "Prazo de entrega",
    desc: "Se não entregamos em 16 dias úteis, você não paga. Simples assim — sem desculpa, sem asterisco.",
  },
  {
    number: "5",
    suffix: " meses",
    title: "Suporte pós-entrega",
    desc: "Cinco meses de suporte incluso. Você não fica sozinho depois que o site vai ao ar.",
  },
  {
    number: "0",
    suffix: "",
    title: "Contrato mínimo",
    desc: "Sem lock-in, sem fidelidade forçada. Se quiser cancelar, é só falar. A gente confia no trabalho que entrega.",
  },
  {
    number: "100%",
    suffix: "",
    title: "Atendimento nacional",
    desc: "Brasil inteiro, 100% remoto. WhatsApp, videochamada — sem burocracia de reunião presencial.",
  },
];

export default function DiferenciaisSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="diferenciais" aria-label="Nossos diferenciais">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Diferenciais</span>
          <h2 className="section-heading">
            Por que a <span className="text-accent-nvg">Neovanguard?</span>
          </h2>
          <p className="section-sub">
            Nada de promessa vazia. Aqui estão os números que definem como a gente trabalha.
          </p>
        </div>

        <div className="diff-grid" ref={gridRef}>
          {ITEMS.map((item) => (
            <article key={item.title} className="diff-card">
              <div className="diff-number">
                {item.number}
                {item.suffix && (
                  <span style={{ fontSize: "0.5em" }}>{item.suffix}</span>
                )}
              </div>
              <div className="diff-title">{item.title}</div>
              <p className="diff-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
