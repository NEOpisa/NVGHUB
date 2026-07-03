"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { CheckIcon } from "@/components/icons";

const ETAPAS = [
  {
    code: "ET_01",
    name: "Briefing",
    dur: "dia 0",
    desc: "Uma conversa direta pra entender o negócio, o público e o que precisa acontecer. Sem formulário de 40 campos.",
  },
  {
    code: "ET_02",
    name: "Blueprint",
    dur: "dias 1–3",
    desc: "Desenhamos a estrutura: mapa do site, textos-base e referências visuais. Você aprova antes de qualquer linha de código.",
  },
  {
    code: "ET_03",
    name: "Build",
    dur: "dias 4–12",
    desc: "Construção de verdade: design, código, conteúdo e integrações rodando em ambiente de homologação que você acompanha.",
  },
  {
    code: "ET_04",
    name: "Launch",
    dur: "dias 13–16",
    desc: "Domínio, SSL, Google e métricas configurados. O site entra no ar redondo — e testado em celular de verdade.",
  },
  {
    code: "ET_05",
    name: "Suporte",
    dur: "contínuo",
    desc: "De 2 a 5 meses inclusos, direto no WhatsApp. Ajustes, dúvidas e monitoramento — você não fica falando com robô.",
  },
];

const COMPROMISSOS = [
  {
    title: "Entrega no prazo ou você não paga",
    desc: "O prazo é fechado por escrito antes de começar. Estourou por nossa causa? O projeto sai de graça.",
  },
  {
    title: "O site é seu, de verdade",
    desc: "Domínio, código e conteúdo registrados em seu nome. Sem aluguel de site, sem refém de plataforma.",
  },
  {
    title: "Sem letra miúda",
    desc: "Pagamento único nos pacotes, sem contrato mínimo e sem taxa surpresa. O combinado é o que vale.",
  },
];

/**
 * Bloco institucional do /sobre — manifesto, o processo em 5 etapas (a
 * "jornada" da entrega, na linguagem blueprint) e os compromissos públicos.
 */
export default function InstitucionalSection() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const etapasRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  useReveal(manifestoRef);
  useReveal(etapasRef, 80);
  useReveal(compRef, 80);

  return (
    <section className="inst" aria-label="Manifesto, processo e compromissos">
      <div className="inner">
        {/* ── manifesto ── */}
        <div className="inst-manifesto" ref={manifestoRef}>
          <span className="section-eyebrow">Manifesto</span>
          <p className="inst-claim">
            A gente não vende página bonita.{" "}
            <span className="text-accent-nvg">
              Constrói a infraestrutura digital
            </span>{" "}
            que um negócio pequeno precisa pra competir como um grande.
          </p>
          <div className="inst-lines" aria-hidden="true">
            <span>{"// "}pequeno no tamanho, grande na presença</span>
            <span>{"// "}tecnologia que vira venda, não enfeite</span>
            <span>{"// "}o combinado é o que vale</span>
          </div>
        </div>

        {/* ── processo em 5 etapas ── */}
        <div className="inst-etapas" ref={etapasRef}>
          <div className="inst-etapas-head">
            <span className="section-eyebrow">Como a gente trabalha</span>
            <h2 className="section-heading inst-h2">
              Do briefing ao ar em{" "}
              <span className="text-accent-nvg">5 etapas medidas</span>
            </h2>
          </div>
          <ol className="inst-timeline">
            {ETAPAS.map((e, i) => (
              <li key={e.code} className="inst-etapa" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="inst-etapa-code" aria-hidden="true">
                  {e.code}
                </span>
                <div className="inst-etapa-body">
                  <div className="inst-etapa-top">
                    <h3 className="inst-etapa-name">{e.name}</h3>
                    <span className="inst-etapa-dur">{e.dur}</span>
                  </div>
                  <p className="inst-etapa-desc">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── compromissos públicos ── */}
        <div className="inst-comp" ref={compRef}>
          <span className="section-eyebrow">Compromissos</span>
          <div className="inst-comp-grid">
            {COMPROMISSOS.map((c) => (
              <article key={c.title} className="inst-comp-card">
                <span className="inst-comp-check" aria-hidden="true">
                  <CheckIcon size={14} strokeWidth={2.6} />
                </span>
                <h3 className="inst-comp-title">{c.title}</h3>
                <p className="inst-comp-desc">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
