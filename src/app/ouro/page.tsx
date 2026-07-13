import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";
import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo";
import BlueprintStage from "@/components/BlueprintStage";
import BismuthCrystal from "@/components/BismuthCrystal";

// #006 · quiz pesado fora do chunk inicial da rota
const TierQuiz = dynamic(() => import("@/components/TierQuiz"));

export const metadata = pageMetadata({
  title: "Ouro — presença digital sólida, entregue rápido",
  description:
    "A divisão Ouro da Neovanguard: sites, sistemas e e-commerce com escopo claro e consulta objetiva. Valor apresentado na consulta.",
  path: "/ouro",
});

const OFERTAS = [
  {
    num: "01",
    title: "Vitrine Digital",
    desc: "Página única de alta conversão para colocar seu negócio no mapa — rápida, bonita e encontrável.",
    tags: ["Landing", "SEO local", "WhatsApp"],
  },
  {
    num: "02",
    title: "Presença Web",
    desc: "Site institucional completo com blog e Google Meu Negócio configurado para dominar a busca local.",
    tags: ["Institucional", "GMN", "Blog"],
  },
  {
    num: "03",
    title: "Sistema Web",
    desc: "Agendamento online, cardápio digital ou catálogo com painel de controle — operação na sua mão.",
    tags: ["Agendamento", "Painel", "Automação"],
  },
  {
    num: "04",
    title: "E-commerce",
    desc: "Loja online integrada a pagamento e frete, pronta para vender desde o primeiro dia.",
    tags: ["Loja", "Pagamentos", "Checkout"],
  },
];

const PASSOS = [
  {
    num: "01",
    title: "Quiz de qualificação",
    desc: "Três minutos para entendermos o que você já tem e o que precisa.",
  },
  {
    num: "02",
    title: "Consulta objetiva",
    desc: "20–30 minutos: indicamos o produto certo e apresentamos o valor.",
  },
  {
    num: "03",
    title: "Proposta e entrega",
    desc: "Proposta enxuta, produção sistematizada e entrega em até 16 dias úteis.",
  },
];

/**
 * DIVISÃO OURO — quente, densa, direta ("vamos fazer acontecer").
 * Produto consultivo: escopo claro, consulta leve, sem preço no site.
 */
export default function OuroPage() {
  return (
    <main id="main" data-tier="ouro" className="tp tp-ouro">
      {/* fundo blueprint — mesma assinatura das demais internas */}
      <BlueprintStage code="divisão ouro" index="B1" />
      <span className="bp-grid tp-grid" aria-hidden="true" />

      {/* hero */}
      <section className="tp-hero">
        <BismuthCrystal />
        <div className="tp-hero-card card-1">
          <span className="section-eyebrow">Divisão Ouro · Produto consultivo</span>
          <h1 className="tp-h1">
            Presença digital <em>sólida</em>, entregue rápido.
          </h1>
          <p className="tp-sub">
            Quatro produtos com escopo claro e produção sistematizada. Uma
            consulta objetiva define o caminho — e é nela que o valor é
            apresentado.
          </p>
          <div className="tp-cta-row">
            <a href="#quiz" className="btn-primary">
              Começar pelo quiz
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
          </div>
          <p className="tp-trust">
            entrega em até 16 dias úteis · sem contrato mínimo · suporte
            via WhatsApp
          </p>
        </div>
      </section>

      {/* ofertas */}
      <section className="tp-sec" aria-label="Produtos da divisão Ouro">
        <div className="tp-head card-2">
          <span className="section-eyebrow">Os produtos</span>
          <h2 className="tp-h2">Escopo claro. Valor na consulta.</h2>
        </div>
        <div className="tp-grid-cards">
          {OFERTAS.map((o) => (
            <article key={o.num} className="tp-card card-1">
              <span className="tp-num">{o.num}</span>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <ul className="tp-tags">
                {o.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* como funciona */}
      <section className="tp-sec" aria-label="Como funciona a consulta Ouro">
        <div className="tp-head card-2">
          <span className="section-eyebrow">Como funciona</span>
          <h2 className="tp-h2">Consulta leve, caminho direto.</h2>
        </div>
        <div className="tp-steps">
          {PASSOS.map((p) => (
            <article key={p.num} className="tp-step card-1">
              <span className="tp-step-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* quiz Ouro — a porta de entrada */}
      <section id="quiz" className="tp-sec" aria-label="Quiz de qualificação Ouro">
        <div className="tp-head card-2">
          <span className="section-eyebrow">Comece aqui</span>
          <h2 className="tp-h2">Três perguntas. Consulta marcada.</h2>
        </div>
        <TierQuiz tier="ouro" />
      </section>

      {/* #088 · comparativo claro: onde o Ouro termina e a Platina começa */}
      <section className="tp-sec" aria-label="Comparativo Ouro e Platina">
        <div className="tp-head card-2">
          <span className="section-eyebrow">As duas divisões</span>
          <h2 className="tp-h2">Qual é a sua etapa?</h2>
        </div>
        <div className="tp-compare card-1" role="table" aria-label="Ouro versus Platina">
          <div className="tp-compare-row tp-compare-head" role="row">
            <span role="columnheader" className="tpc-attr" aria-hidden="true" />
            <span role="columnheader" className="tpc-col is-here">Ouro · você está aqui</span>
            <span role="columnheader" className="tpc-col">Platina</span>
          </div>
          {[
            ["Formato", "Produto com escopo claro", "Parceria sob medida, operada"],
            ["Ritmo", "Entrega em até 16 dias úteis", "Evolução contínua, mês a mês"],
            ["Consulta", "Objetiva — 20 a 30 minutos", "Diagnóstico profundo ao vivo"],
            ["Resultado", "Presença digital no ar", "Máquina de captação completa"],
          ].map(([attr, ouro, platina]) => (
            <div key={attr} className="tp-compare-row" role="row">
              <span role="rowheader" className="tpc-attr">{attr}</span>
              <span role="cell" className="tpc-col is-here">{ouro}</span>
              <span role="cell" className="tpc-col">{platina}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ponte pra Platina */}
      <section className="tp-sec" aria-label="Ascensão para a Platina">
        <div className="tp-bridge card-1">
          <span className="section-eyebrow">A ponte</span>
          <h2 className="tp-h2">Seu negócio cresceu?</h2>
          <p className="tp-sub">
            Quem valida o modelo no Ouro recebe o convite para a{" "}
            <strong>Platina</strong> — o sistema completo, sob medida, com
            resultado assumido.
          </p>
          <Link href="/platina" className="btn-ghost tp-bridge-cta">
            Conhecer a Platina
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
      </section>

      {/* #042 · CTA primário sticky (só mobile, via c2.css) */}
      <div className="tp-sticky-cta" aria-hidden="false">
        <a href="#quiz" className="btn-primary">
          Começar as 3 perguntas
        </a>
      </div>
    </main>
  );
}
