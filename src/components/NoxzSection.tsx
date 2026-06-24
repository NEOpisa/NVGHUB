"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

const CARDS = [
  {
    num: "01",
    name: "O que é o Noxz?",
    tag: "Força-tarefa",
    text: "O Plano Noxz é a metodologia de execução da NVG que funde as competências do time em um ecossistema focado em Segurança Extrema, Velocidade e Eficácia Cirúrgica. Em vez de atuações isoladas, o projeto é tratado de ponta a ponta por uma força-tarefa síncrona.",
  },
  {
    num: "02",
    name: "Segurança extrema",
    tag: "Zero Trust",
    text: "O projeto é desenhado desde o primeiro dia sob o conceito de Zero Trust. Toda a arquitetura de back-end e infraestrutura é estruturada com criptografia de ponta e redundância de servidores, garantindo estabilidade total e blindagem contra falhas ou vulnerabilidades.",
  },
  {
    num: "03",
    name: "Eficácia Modular",
    tag: "Código limpo",
    text: "Foco estratégico no que gera valor real para o negócio. A coordenação técnica implacável garante que o código limpo se alinhe perfeitamente a uma estratégia de comunicação e aquisição de clientes, transformando tecnologia em resultado comercial.",
  },
  {
    num: "04",
    name: "Velocidade",
    tag: "Time-to-Market",
    text: "Time-to-Market Acelerado: Eliminação de burocracias e retrabalho. Através de um front-end otimizado e design de interface fluido, o produto é validado e colocado no ar no menor tempo possível, garantindo uma experiência de usuário imediata e sem fricção.",
  },
];

export default function NoxzSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="metodologia" className="noxz-section" aria-label="Metodologia — Plano Noxz">
      <span className="noxz-aurora noxz-aurora-a" aria-hidden="true" />
      <span className="noxz-aurora noxz-aurora-b" aria-hidden="true" />

      <div className="inner">
        <div className="noxz-section-header" ref={headerRef} data-parallax="0.12">
          <span className="noxz-badge">
            <span className="noxz-badge-pulse" aria-hidden="true" />
            Metodologia exclusiva NVG
          </span>
          <h1 className="noxz-title">
            Plano <span className="noxz-title-shimmer">Noxz</span>
          </h1>
          <p className="section-sub">
            Uma metodologia de execução síncrona e implacável — projetada para
            entregar com velocidade e segurança extrema.
          </p>
        </div>

        <div className="noxz-section-grid" ref={gridRef} data-skew>
          {CARDS.map((card) => (
            <article key={card.name} className="noxz-card">
              <span className="noxz-card-num" aria-hidden="true">{card.num}</span>
              <span className="noxz-card-tag">{card.tag}</span>
              <div className="noxz-name">{card.name}</div>
              <p className="noxz-area">{card.text}</p>
            </article>
          ))}
        </div>

        <div className="noxz-section-footer">
          <a
            href={`${WA}?text=${encodeURIComponent("Olá! Quero saber mais sobre o Plano Noxz da Neovanguard.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary noxz-cta btn-whatsapp"
          >
            <WhatsAppIcon size={15} />
            Ativar o Plano Noxz
          </a>
          <span className="noxz-footer-note">
            Vagas limitadas por ciclo de execução
          </span>
        </div>
      </div>
    </section>
  );
}
