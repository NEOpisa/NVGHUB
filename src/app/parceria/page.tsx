import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";
import { WA } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Seja nosso parceiro ou parceira",
  description:
    "A parceria da Neovanguard: sistemas, automações e lojas com escopo fechado, prazo por escrito e consulta objetiva. O valor é apresentado na consulta.",
  path: "/parceria",
});

const LEVA = [
  {
    n: "01",
    t: "A ferramenta no ar",
    d: "Sistema, automação ou loja funcionando em produção — domínio, SSL, painel e dados no lugar.",
  },
  {
    n: "02",
    t: "Escopo fechado por escrito",
    d: "O que entra, o que não entra e o prazo — combinados antes de qualquer linha de código.",
  },
  {
    n: "03",
    t: "Suporte incluso",
    d: "WhatsApp direto com quem construiu, por meses, para ajustes e dúvidas. Sem fila de ticket.",
  },
  {
    n: "04",
    t: "Sem contrato mínimo",
    d: "Nada de fidelidade. O código, o domínio e o conteúdo ficam no seu nome, desde o primeiro dia.",
  },
];

const ETAPAS = [
  { code: "ET_01", name: "Consulta", dur: "20–30 min", desc: "Uma conversa objetiva sobre o problema, a operação e a urgência. Sai dela com o escopo e o valor na mesa." },
  { code: "ET_02", name: "Blueprint", dur: "dias 1–3", desc: "Estrutura, telas-base e integrações desenhadas. Você aprova antes de começarmos a construir." },
  { code: "ET_03", name: "Build", dur: "dias 4–12", desc: "Construção de verdade em ambiente de homologação que você acompanha — nada de vitrine só no fim." },
  { code: "ET_04", name: "Launch", dur: "dias 13–16", desc: "Produção, domínio, SSL, medição e testes em aparelho real. A ferramenta entra no ar redonda." },
];

const NUMEROS = [
  ["16 dias", "prazo máximo de entrega"],
  ["20–30 min", "duração da consulta"],
  ["3 h", "janela típica de resposta"],
  ["0", "contrato mínimo"],
] as const;

export default function ParceriaPage() {
  return (
    <>
      <section className="panel panel--gold-hero" aria-labelledby="parceria-h">
        <span className="eyebrow">Trabalhar junto</span>
        <h1 id="parceria-h" className="h-xl">
          Seja nosso <em className="h-gold">parceiro ou parceira</em>.
        </h1>
        <p className="lead">
          Sistema, automação ou loja com escopo fechado e produção
          sistematizada. Uma consulta objetiva define a ferramenta certa — e é
          nela que o valor é apresentado.
        </p>
        <div className="pill-row">
          <Link href="/solucao" className="pill pill--gold">
            Começar pela consulta
            <ArrowUpRight />
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="pill pill--ghost">
            <WhatsAppIcon />
            Falar pelo WhatsApp
          </a>
        </div>
        <p className="hero-note hero-note--static">
          sem contrato mínimo · suporte incluso · valor na consulta
        </p>
      </section>

      <section className="panel" aria-labelledby="leva-h">
        <header className="sec-head">
          <span className="eyebrow">O que você leva</span>
          <h2 id="leva-h" className="h-lg">
            Quatro entregas, <em className="h-accent">todas por escrito.</em>
          </h2>
        </header>
        <div className="cards">
          {LEVA.map((c) => (
            <article key={c.n} className="card">
              <span className="card-n">{c.n}</span>
              <h3 className="card-t">{c.t}</h3>
              <p className="card-d">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--accent" aria-label="Números da parceria">
        <dl className="nums">
          {NUMEROS.map(([n, l]) => (
            <div key={l} className="num">
              <dt>{n}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="etapas-h">
        <header className="sec-head">
          <span className="eyebrow">Como acontece</span>
          <h2 id="etapas-h" className="h-lg">
            Do briefing ao ar em <em className="h-accent">quatro etapas medidas.</em>
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

      <section className="closer" aria-label="Começar a parceria">
        <h2 className="h-xl">Uma consulta define tudo.</h2>
        <p className="lead">
          Três perguntas rápidas e já entendemos o seu momento — o escopo e o
          valor saem na conversa seguinte.
        </p>
        <div className="pill-row">
          <Link href="/solucao" className="pill">
            Fazer a consulta rápida
            <ArrowUpRight />
          </Link>
          <Link href="/exemplos" className="pill pill--ghost">
            Ver exemplos
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
