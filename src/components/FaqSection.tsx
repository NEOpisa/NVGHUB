const FAQ: { q: string; a: string }[] = [
  {
    q: "Em quanto tempo o site fica pronto?",
    a: "Depende do pacote: a Vitrine sai em até 7 dias úteis, a Presença em até 16, o Sistema em até 26 e o E-commerce em até 35 dias úteis. O prazo é combinado e fechado antes de começar.",
  },
  {
    q: "Vocês têm contrato mínimo ou mensalidade?",
    a: "Não. Os pacotes são de pagamento único, sem contrato mínimo e sem letra miúda. Você paga pelo que contratou e o site é seu.",
  },
  {
    q: "Vocês atendem a minha cidade?",
    a: "Sim. A Neovanguard é uma operação 100% remota que atende o Brasil inteiro — todo o processo é feito à distância, do briefing à entrega.",
  },
  {
    q: "Quanto custa um site?",
    a: "O valor depende do que o seu negócio precisa. A gente monta uma solução sob medida e fecha tudo com você no atendimento, antes de começar — sem surpresa e sem letra miúda.",
  },
  {
    q: "Tem suporte depois que o site é entregue?",
    a: "Sim. Cada pacote inclui de 2 a 5 meses de suporte, com atendimento direto pelo WhatsApp para dúvidas e ajustes.",
  },
  {
    q: "Vocês cuidam do Google e do SEO?",
    a: "Sim. A partir do pacote Presença incluímos SEO local básico e a configuração do Google Meu Negócio, para o seu negócio aparecer nas buscas.",
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

export default function FaqSection() {
  return (
    <section className="faq-section" aria-label="Perguntas frequentes">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="inner faq-inner">
        <h1 className="section-heading faq-heading">
          Perguntas <span className="text-accent-nvg">frequentes</span>
        </h1>
        <div className="faq-list">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary className="faq-question">{q}</summary>
              <p className="faq-answer">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
