import dynamic from "next/dynamic";
import Link from "next/link";
import BlueprintStage from "@/components/BlueprintStage";
import BismuthCrystal from "@/components/BismuthCrystal";
import { pageMetadata } from "@/lib/seo";

// #006 · quiz pesado fora do chunk inicial da rota
const TierQuiz = dynamic(() => import("@/components/TierQuiz"));

export const metadata = pageMetadata({
  title: "Platina — a parceria sob medida",
  description:
    "A divisão Platina da Neovanguard: um sistema completo de captação desenhado para o seu negócio, com diagnóstico profundo, resultado assumido e otimização contínua.",
  path: "/platina",
});

const SETUP = [
  "Site e landing de alta conversão",
  "Agendamento integrado",
  "Tracking completo (Pixel + eventos)",
  "Automação de WhatsApp",
  "Campanha estruturada de mídia",
];

const RECORRENCIA = [
  "Gestão e otimização de tráfego",
  "Ajustes contínuos de página e criativos",
  "Relatório mensal com números de negócio",
];

const ESCADA = [
  { eixo: "Personalização", valor: "Tudo sob medida" },
  { eixo: "Estratégia", valor: "Diagnóstico + plano dedicado" },
  { eixo: "Resultado", valor: "Assumido — leads e agendamentos" },
  { eixo: "Recorrência", valor: "Otimização contínua, todo mês" },
  { eixo: "Atenção", valor: "Dedicada e prioritária" },
  { eixo: "Relatórios", valor: "Mensais, com números reais" },
];

const PASSOS = [
  {
    num: "01",
    title: "Aplicação",
    desc: "Uma qualificação curta filtra perfil e momento do negócio.",
  },
  {
    num: "02",
    title: "Diagnóstico",
    desc: "30–45 minutos para entender o caso, mostrar o buraco e projetar o resultado.",
  },
  {
    num: "03",
    title: "Proposta sob medida",
    desc: "Um plano desenhado para o seu negócio — valor apresentado na conversa.",
  },
];

/**
 * DIVISÃO PLATINA — fria, espaçosa, silenciosa. Serif editorial leve,
 * muito espaço negativo, movimento lento. Parceria consultiva sob medida.
 */
export default function PlatinaPage() {
  return (
    <main id="main" data-tier="platina" className="tp tp-platina">
      {/* fundo blueprint — mesma assinatura das demais internas */}
      <BlueprintStage code="divisão platina" index="B2" />
      <span className="bp-grid tp-grid" aria-hidden="true" />

      {/* hero — statement espaçoso */}
      <section className="tp-hero tp-hero--platina">
        <BismuthCrystal />
        <div className="tp-hero-card card-2">
          <span className="section-eyebrow">Divisão Platina · Parceria sob medida</span>
          <h1 className="tp-h1 tp-h1--serif">
            Um sistema de captação, <em>desenhado para o seu negócio.</em>
          </h1>
          <p className="tp-sub">
            Não entregamos um site. Montamos — e operamos — a máquina completa:
            página, agendamento, tracking, automação e mídia, otimizados todo
            mês sobre números reais.
          </p>
          <div className="tp-cta-row">
            <a href="#quiz" className="btn-primary">
              Agendar diagnóstico
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <p className="tp-trust">vagas limitadas · atenção dedicada</p>
        </div>
      </section>

      {/* a oferta */}
      <section className="tp-sec tp-sec--airy" aria-label="O que a Platina entrega">
        <div className="tp-head card-2">
          <span className="section-eyebrow">A máquina</span>
          <h2 className="tp-h2 tp-h2--serif">Setup completo. Evolução contínua.</h2>
        </div>
        <div className="tp-duo">
          <article className="tp-duo-col card-2">
            <span className="tp-duo-tag">SETUP</span>
            <ul className="tp-list">
              {SETUP.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
          <article className="tp-duo-col card-2">
            <span className="tp-duo-tag">RECORRÊNCIA</span>
            <ul className="tp-list">
              {RECORRENCIA.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* escada de superioridade */}
      <section className="tp-sec tp-sec--airy" aria-label="O que torna a Platina superior">
        <div className="tp-head card-2">
          <span className="section-eyebrow">Por que Platina</span>
          <h2 className="tp-h2 tp-h2--serif">Superior em cada eixo.</h2>
        </div>
        <dl className="tp-escada card-2">
          {ESCADA.map((e) => (
            <div key={e.eixo} className="tp-escada-row">
              <dt>{e.eixo}</dt>
              <dd>{e.valor}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* processo */}
      <section className="tp-sec tp-sec--airy" aria-label="O processo de diagnóstico">
        <div className="tp-head card-2">
          <span className="section-eyebrow">O processo</span>
          <h2 className="tp-h2 tp-h2--serif">Profundo, não demorado.</h2>
        </div>
        <div className="tp-steps tp-steps--airy">
          {PASSOS.map((p) => (
            <article key={p.num} className="tp-step card-2">
              <span className="tp-step-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* #088 · comparativo claro: o que muda do Ouro para a Platina */}
      <section className="tp-sec tp-sec--airy" aria-label="Comparativo Ouro e Platina">
        <div className="tp-head card-2">
          <span className="section-eyebrow">As duas divisões</span>
          <h2 className="tp-h2 tp-h2--serif">Do produto à <em>parceria</em>.</h2>
        </div>
        <div className="tp-compare card-1" role="table" aria-label="Ouro versus Platina">
          <div className="tp-compare-row tp-compare-head" role="row">
            <span role="columnheader" className="tpc-attr" aria-hidden="true" />
            <span role="columnheader" className="tpc-col">
              <Link href="/ouro" className="tpc-link">Ouro</Link>
            </span>
            <span role="columnheader" className="tpc-col is-here">Platina · você está aqui</span>
          </div>
          {[
            ["Formato", "Produto com escopo claro", "Parceria sob medida, operada"],
            ["Ritmo", "Entrega em até 16 dias úteis", "Evolução contínua, mês a mês"],
            ["Consulta", "Objetiva — 20 a 30 minutos", "Diagnóstico profundo ao vivo"],
            ["Resultado", "Presença digital no ar", "Máquina de captação completa"],
          ].map(([attr, ouro, platina]) => (
            <div key={attr} className="tp-compare-row" role="row">
              <span role="rowheader" className="tpc-attr">{attr}</span>
              <span role="cell" className="tpc-col">{ouro}</span>
              <span role="cell" className="tpc-col is-here">{platina}</span>
            </div>
          ))}
        </div>
      </section>

      {/* aplicação Platina — o quiz profundo */}
      <section id="quiz" className="tp-sec tp-sec--airy" aria-label="Aplicação para a Platina">
        <div className="tp-head card-2">
          <span className="section-eyebrow">A aplicação</span>
          <h2 className="tp-h2 tp-h2--serif">Quatro perguntas. Um diagnóstico ao vivo.</h2>
        </div>
        <TierQuiz tier="platina" />
      </section>

      {/* CTA final */}
      <section className="tp-sec tp-sec--airy" aria-label="Agendar diagnóstico">
        <div className="tp-bridge card-2 tp-final">
          <h2 className="tp-h2 tp-h2--serif">
            <em>Poucas vagas. Muito cuidado.</em>
          </h2>
          <p className="tp-sub">
            A Platina é dimensionada para poucos clientes por vez — é isso que
            garante a atenção que o resultado exige.
          </p>
          <a href="#quiz" className="btn-primary">
            Agendar diagnóstico
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* #042 · CTA primário sticky (só mobile, via c2.css) */}
      <div className="tp-sticky-cta" aria-hidden="false">
        <a href="#quiz" className="btn-primary">
          Agendar diagnóstico
        </a>
      </div>
    </main>
  );
}
