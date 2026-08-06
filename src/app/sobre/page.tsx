import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";

export const metadata = pageMetadata({
  title: "Quem somos — Neovanguard",
  description:
    "A Neovanguard é um estúdio de tecnologia 100% remoto que atende o Brasil inteiro: resolvemos problemas de negócio criando a ferramenta certa — sistemas, automações e IA como um só ecossistema.",
  path: "/sobre",
});

const PILARES = [
  {
    n: "01",
    t: "Segurança extrema",
    d: "Arquitetura pensada sob Zero Trust desde o primeiro dia: infraestrutura blindada, criptografia de ponta e estabilidade total.",
  },
  {
    n: "02",
    t: "Velocidade real",
    d: "Time-to-market acelerado, sem burocracia. Seu produto validado e no ar no menor tempo possível — em dias, não meses.",
  },
  {
    n: "03",
    t: "Eficácia cirúrgica",
    d: "Foco no que gera resultado de verdade. Código limpo alinhado a uma estratégia de aquisição de clientes — tecnologia que vira venda.",
  },
];

const ETAPAS = [
  { code: "ET_01", name: "Briefing", dur: "dia 0", desc: "Uma conversa direta para entender o negócio, o público e o que precisa acontecer. Sem formulário de 40 campos." },
  { code: "ET_02", name: "Blueprint", dur: "dias 1–3", desc: "Desenhamos a estrutura: mapa do site, textos-base e referências visuais. Você aprova antes de qualquer linha de código." },
  { code: "ET_03", name: "Build", dur: "dias 4–12", desc: "Construção de verdade: design, código, conteúdo e integrações rodando em ambiente de homologação que você acompanha." },
  { code: "ET_04", name: "Launch", dur: "dias 13–16", desc: "Domínio, SSL, Google e métricas configurados. O site entra no ar redondo — e testado em celular de verdade." },
  { code: "ET_05", name: "Suporte", dur: "contínuo", desc: "De 2 a 5 meses inclusos, direto no WhatsApp. Ajustes, dúvidas e monitoramento — você não fica falando com robô." },
];

const COMPROMISSOS = [
  {
    n: "01",
    t: "Entrega no prazo ou você não paga",
    d: "O prazo é fechado por escrito antes de começar. Estourou por nossa causa? O projeto sai de graça.",
  },
  {
    n: "02",
    t: "O site é seu, de verdade",
    d: "Domínio, código e conteúdo registrados em seu nome. Sem aluguel de site, sem refém de plataforma.",
  },
  {
    n: "03",
    t: "Sem letra miúda",
    d: "Orçamento fechado por escrito antes de começar, sem contrato mínimo e sem taxa surpresa. O combinado é o que vale.",
  },
];

const NUMEROS = [
  ["16 dias", "prazo de entrega — ou você não paga"],
  ["3 meses", "de suporte incluso"],
  ["0", "contrato mínimo ou fidelidade"],
  ["100%", "remoto, atendendo o Brasil inteiro"],
] as const;

export default function SobrePage() {
  return (
    <>
      <section className="panel" aria-labelledby="sobre-h">
        <span className="eyebrow">Quem somos</span>
        <h1 id="sobre-h" className="h-xl">
          Ferramentas pensadas como
          <br />
          <em className="h-accent">um só ecossistema.</em>
        </h1>
        <p className="lead">
          Somos a Neovanguard — uma operação 100% remota que atende o Brasil
          inteiro. Resolvemos problemas de negócio criando a ferramenta certa:
          sistemas, automações e IA não são serviços soltos —{" "}
          <strong>funcionam como um organismo único</strong>, conduzido por uma
          força-tarefa síncrona do briefing à entrega.
        </p>
      </section>

      <section className="panel" aria-labelledby="pilares-h">
        <header className="sec-head">
          <span className="eyebrow">Pilares</span>
          <h2 id="pilares-h" className="h-lg">
            Três princípios <em className="h-accent">inegociáveis.</em>
          </h2>
        </header>
        <div className="cards">
          {PILARES.map((p) => (
            <article key={p.n} className="card">
              <span className="card-n">{p.n}</span>
              <h3 className="card-t">{p.t}</h3>
              <p className="card-d">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-label="Manifesto">
        <span className="eyebrow">Manifesto</span>
        <p className="claim">
          Não vendemos página bonita.{" "}
          <em className="h-accent">Construímos a infraestrutura digital</em> que
          um negócio pequeno precisa para competir como um grande.
        </p>
        <div className="claim-lines" aria-hidden="true">
          <span>pequeno no tamanho, grande na presença</span>
          <span>tecnologia que vira venda, não enfeite</span>
          <span>o combinado é o que vale</span>
        </div>
      </section>

      <section className="panel" aria-labelledby="proc-h">
        <header className="sec-head">
          <span className="eyebrow">Como trabalhamos</span>
          <h2 id="proc-h" className="h-lg">
            Do briefing ao ar em <em className="h-accent">5 etapas medidas.</em>
          </h2>
        </header>
        <ol className="steps">
          {ETAPAS.map((e) => (
            <li key={e.code} className="step">
              <span className="step-code">{e.code}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{e.name}</h3>
                  <span className="step-dur">{e.dur}</span>
                </div>
                <p className="step-desc">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--accent" aria-label="Números">
        <dl className="nums">
          {NUMEROS.map(([n, l]) => (
            <div key={l} className="num">
              <dt>{n}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="comp-h">
        <header className="sec-head">
          <span className="eyebrow">Compromissos</span>
          <h2 id="comp-h" className="h-lg">
            O que assumimos <em className="h-accent">por escrito.</em>
          </h2>
        </header>
        <div className="cards">
          {COMPROMISSOS.map((c) => (
            <article key={c.n} className="card">
              <span className="card-n">{c.n}</span>
              <h3 className="card-t">{c.t}</h3>
              <p className="card-d">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closer" aria-label="Metodologia">
        <h2 className="h-xl">Tudo isso vira execução no Plano Noxz.</h2>
        <p className="lead">
          Nossa metodologia de força-tarefa síncrona — segurança extrema,
          velocidade e eficácia cirúrgica do briefing à entrega.
        </p>
        <div className="pill-row">
          <Link href="/metodologia" className="pill">
            Conhecer o Plano Noxz
            <ArrowUpRight />
          </Link>
          <Link href="/contato" className="pill pill--ghost">
            Falar com a gente
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
