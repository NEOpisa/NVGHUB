"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

const FAQ: { q: string; a: string; tag: string }[] = [
  {
    q: "Em quanto tempo o site fica pronto?",
    a: "Depende do escopo do seu projeto — em geral entre 7 e 35 dias úteis. O prazo é definido no diagnóstico e fechado por escrito antes de começar.",
    tag: "Prazo",
  },
  {
    q: "Vocês têm contrato mínimo ou mensalidade?",
    a: "Não tem contrato mínimo nem fidelidade. A entrega do projeto é um valor fechado, combinado antes de começar. A manutenção contínua (atualizações, suporte e melhorias) é opcional — você decide se quer, sem obrigação.",
    tag: "Contrato",
  },
  {
    q: "Vocês atendem a minha cidade?",
    a: "Sim. A Neovanguard é uma operação 100% remota que atende o Brasil inteiro — todo o processo é feito à distância, do briefing à entrega.",
    tag: "Atendimento",
  },
  {
    q: "Quanto custa um site?",
    a: "O valor depende do que o seu negócio precisa. A gente faz um diagnóstico, monta uma solução sob medida e fecha tudo com você antes de começar — sem surpresa e sem letra miúda.",
    tag: "Investimento",
  },
  {
    q: "Tem suporte depois que o site é entregue?",
    a: "Sim. Todo projeto já inclui um período de suporte pelo WhatsApp após a entrega, com resposta rápida para dúvidas e ajustes. Depois desse período, você pode seguir com a manutenção contínua se quiser.",
    tag: "Suporte",
  },
  {
    q: "Vocês cuidam do Google e do SEO?",
    a: "Sim. Quando o seu objetivo é aparecer nas buscas, incluímos SEO local e a configuração do Google Meu Negócio para o seu negócio ser encontrado por quem procura na sua região.",
    tag: "SEO",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/**
 * FAQ em linguagem de TERMINAL blueprint: cada pergunta é um registro
 * `Q_XX` com tag mono, toggle "+" que vira "×", e a resposta abre com
 * animação de grid (0fr→1fr) atrás de um trilho violeta. O conteúdo
 * inteiro fica no DOM sempre (SEO + FAQPage ld+json).
 */
export default function FaqSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useReveal(headRef);
  useReveal(listRef, 90);
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="faq-section" aria-label="Perguntas frequentes">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="inner faq-inner">
        <div className="faq-head" ref={headRef}>
          <span className="section-eyebrow">FAQ</span>
          <h1 className="section-heading faq-heading" data-split>
            Perguntas <span className="text-accent-nvg">frequentes</span>
          </h1>
          <p className="faq-meta" aria-hidden="true">
            {String(FAQ.length).padStart(2, "0")} registros · atualizado{" "}
            {new Date().getFullYear()}
          </p>
        </div>

        <div className="faq-list" ref={listRef}>
          {FAQ.map(({ q, a, tag }, i) => {
            const isOpen = open === i;
            return (
              <article key={q} className={`faq-item${isOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="faq-code" aria-hidden="true">
                    Q_{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-q-text">{q}</span>
                  <span className="faq-tag" aria-hidden="true">
                    {tag}
                  </span>
                  <span className="faq-toggle" aria-hidden="true" />
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer-inner">
                    <p className="faq-answer">
                      <span className="faq-a-prefix" aria-hidden="true">
                        {"// "}
                      </span>
                      {a}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="faq-foot">
          <p>Não achou sua resposta? A gente responde em até 3h úteis.</p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-whatsapp"
          >
            <WhatsAppIcon size={15} />
            Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
