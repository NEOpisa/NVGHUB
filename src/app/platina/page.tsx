import TierQuiz from "@/components/TierQuiz";
import BismuthCrystal from "@/components/BismuthCrystal";
import { pageMetadata } from "@/lib/seo";

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
    num: "P_01",
    title: "Aplicação",
    desc: "Uma qualificação curta filtra perfil e momento do negócio.",
  },
  {
    num: "P_02",
    title: "Diagnóstico",
    desc: "30–45 minutos para entender o caso, mostrar o buraco e projetar o resultado.",
  },
  {
    num: "P_03",
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
            <span className="tp-duo-tag">FASE_01 · SETUP</span>
            <ul className="tp-list">
              {SETUP.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
          <article className="tp-duo-col card-2">
            <span className="tp-duo-tag">FASE_02 · RECORRÊNCIA</span>
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

      {/* aplicação Platina — o quiz profundo */}
      <section className="tp-sec tp-sec--airy" aria-label="Aplicação para a Platina">
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
    </main>
  );
}
