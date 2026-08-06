import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import FaqList, { type FaqItem } from "@/components/blocos/FaqList";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";
import { WA } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Perguntas frequentes — Neovanguard",
  description:
    "Tire suas dúvidas sobre prazos, suporte e como a Neovanguard trabalha: ferramentas sob medida, 100% remoto, atendendo o Brasil inteiro.",
  path: "/faq",
});

const FAQ: FaqItem[] = [
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
    a: "O valor depende do que o seu negócio precisa. Fazemos um diagnóstico, montamos uma solução sob medida e fechamos tudo com você antes de começar — sem surpresa e sem letra miúda.",
    tag: "Investimento",
  },
  {
    q: "Tem suporte depois que o site é entregue?",
    a: "Sim. Todo projeto já inclui um período de suporte pelo WhatsApp após a entrega, com resposta rápida para dúvidas e ajustes. Depois desse período, você pode seguir com a manutenção contínua se quiser.",
    tag: "Suporte",
  },
  {
    q: "Vocês fazem marketing ou tráfego pago?",
    a: "Não — somos uma empresa de software. Construímos a ferramenta (sistema, site, automação, IA) e entregamos tudo tecnicamente impecável, rápido e pronto para o Google indexar. Campanhas e anúncios ficam com você ou com a sua agência — a nossa parte é garantir que, quando o cliente chegar, a ferramenta converta.",
    tag: "Escopo",
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

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="panel" aria-labelledby="faq-h">
        <span className="eyebrow">FAQ · {FAQ.length} registros</span>
        <h1 id="faq-h" className="h-xl">
          Perguntas <em className="h-accent">frequentes.</em>
        </h1>
        <p className="lead">
          Prazo, contrato, suporte e escopo — o que perguntam antes de começar,
          respondido sem rodeio.
        </p>
      </section>

      <section className="panel" aria-label="Lista de perguntas">
        <FaqList itens={FAQ} />
      </section>

      <section className="closer" aria-label="Ainda com dúvida">
        <h2 className="h-xl">Não achou sua resposta?</h2>
        <p className="lead">Respondemos em até 3h úteis, direto no WhatsApp.</p>
        <div className="pill-row">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="pill">
            <WhatsAppIcon />
            Perguntar no WhatsApp
          </a>
          <Link href="/contato" className="pill pill--ghost">
            Mandar mensagem
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
