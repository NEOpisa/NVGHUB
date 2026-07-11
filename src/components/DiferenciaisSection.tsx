"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import Odometer from "@/components/Odometer";

const ITEMS = [
  {
    stat: "16",
    statSuffix: "dias",
    title: "Prazo de entrega",
    desc: "Se não entregamos em 16 dias úteis, você não paga. Simples assim — sem desculpa, sem asterisco.",
  },
  {
    stat: "3",
    statSuffix: "meses",
    title: "Suporte pós-entrega",
    desc: "Três meses de suporte incluso. Você não fica sozinho depois que o site vai ao ar.",
  },
  {
    stat: "0",
    statSuffix: "lock-in",
    title: "Contrato mínimo",
    desc: "Sem fidelidade forçada. Se quiser cancelar, é só falar — confiamos no trabalho que entregamos.",
  },
  {
    stat: "100%",
    statSuffix: "remoto",
    title: "Atendimento nacional",
    desc: "Brasil inteiro, 100% remoto. WhatsApp, videochamada — sem burocracia de reunião presencial.",
  },
];

export default function DiferenciaisSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);

  return (
    <section id="diferenciais" aria-label="Nossos diferenciais">
      <div className="inner">
        <div ref={headerRef} className="diff-header" data-parallax="0.12">
          <span className="section-eyebrow">Diferenciais</span>
          <h2 className="section-heading" data-split>
            Por que a <span className="text-accent-nvg">Neovanguard?</span>
          </h2>
          <p className="section-sub">
            Nada de promessa vazia. Aqui estão os números que definem como trabalhamos.
          </p>
        </div>

        <div className="diff-rows" ref={rowsRef}>
          {ITEMS.map((item, i) => (
            <DiffRow key={item.title} item={item} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiffRow({ item, delay }: { item: (typeof ITEMS)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, delay);

  return (
    <div className="diff-row" ref={ref}>
      <div className="diff-stat-col">
        <div className="diff-stat">
          <Odometer value={item.stat} />
          <span className="diff-stat-suffix">{item.statSuffix}</span>
        </div>
      </div>
      <div className="diff-body">
        <div className="diff-row-title">{item.title}</div>
        <p className="diff-row-desc">{item.desc}</p>
      </div>
    </div>
  );
}
