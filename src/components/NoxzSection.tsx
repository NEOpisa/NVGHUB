"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const CARDS = [
  {
    avatar: "NOXZ",
    name: "O que é o Noxz?",
    text: "O Plano Noxz é a metodologia de execução da NVG que funde as competências do time em um ecossistema focado em Segurança Extrema, Velocidade e Eficácia Cirúrgica. Em vez de atuações isoladas, o projeto é tratado de ponta a ponta por uma força-tarefa síncrona.",
  },
  {
    name: "Segurança extrema",
    text: "O projeto é desenhado desde o primeiro dia sob o conceito de Zero Trust. Toda a arquitetura de back-end e infraestrutura é estruturada com criptografia de ponta e redundância de servidores, garantindo estabilidade total e blindagem contra falhas ou vulnerabilidades.",
  },
  {
    name: "Eficácia Modular",
    text: "Foco estratégico no que gera valor real para o negócio. A coordenação técnica implacável garante que o código limpo se alinhe perfeitamente a uma estratégia de comunicação e aquisição de clientes, transformando tecnologia em resultado comercial.",
  },
  {
    name: "Velocidade",
    text: "Time-to-Market Acelerado: Eliminação de burocracias e retrabalho. Através de um front-end otimizado e design de interface fluido, o produto é validado e colocado no ar no menor tempo possível, garantindo uma experiência de usuário imediata e sem fricção.",
  },
];

export default function NoxzSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="noxz" aria-label="Noxz — Metodologia de Execução NEOVANGUARD">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Metodologia</span>
          <h2 className="section-heading">
            <span className="text-gradient">Plano Noxz</span>
          </h2>
          <p className="section-sub">
            Uma metodologia de execução síncrona e implacável — projetada para entregar com velocidade e segurança extrema.
          </p>
        </div>

        <div className="noxz-grid" ref={gridRef}>
          {CARDS.map((card) => (
            <article key={card.name} className="noxz-card">
              {card.avatar && (
                <div className="noxz-avatar" aria-hidden="true">
                  {card.avatar}
                </div>
              )}
              <div className="noxz-name">{card.name}</div>
              <p className="noxz-area">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
