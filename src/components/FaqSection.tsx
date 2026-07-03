"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

const FAQ: { q: string; a: string; tag: string }[] = [
  {
    q: "Em quanto tempo o site fica pronto?",
    a: "Depende do pacote: a Vitrine sai em até 7 dias úteis, a Presença em até 16, o Sistema em até 26 e o E-commerce em até 35 dias úteis. O prazo é combinado e fechado antes de começar.",
    tag: "Prazo",
  },
  {
    q: "Vocês têm contrato mínimo ou mensalidade?",
    a: "Não. Os pacotes são de pagamento único, sem contrato mínimo e sem letra miúda. Você paga pelo que contratou e o site é seu.",
    tag: "Contrato",
  },
  {
    q: "Vocês atendem a minha cidade?",
    a: "Sim. A Neovanguard é uma operação 100% remota que atende o Brasil inteiro — todo o processo é feito à distância, do briefing à entrega.",
    tag: "Atendimento",
  },
  {
    q: "Quanto custa um site?",
    a: "O valor depende do que o seu negócio precisa. A gente monta uma solução sob medida e fecha tudo com você no atendimento, antes de começar — sem surpresa e sem letra miúda.",
    tag: "Investimento",
  },
  {
    q: "Tem suporte depois que o site é entregue?",
    a: "Sim. Cada pacote inclui de 2 a 5 meses de suporte, com atendimento direto pelo WhatsApp para dúvidas e ajustes.",
    tag: "Suporte",
  },
  {
    q: "Vocês cuidam do Google e do SEO?",
    a: "Sim. A partir do pacote Presença incluímos SEO local básico e a configuração do Google Meu Negócio, para o seu negócio aparecer nas buscas.",
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
