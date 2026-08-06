import Link from "next/link";
import NVMark3D from "@/components/brand/NVMark3D";
import Foot from "@/components/shell/Foot";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";
import { WA } from "@/lib/constants";

/**
 * HOME — o hero é a marca V em 3D se montando; abaixo, no mesmo ritmo de
 * painéis do resto do site: frentes de trabalho, números, as duas divisões
 * e o fecho. Rolagem nativa do começo ao fim.
 */

const FRENTES = [
  {
    n: "01",
    t: "Sistemas sob medida",
    d: "Painéis, cadastros e fluxos desenhados para a operação que você já tem — não para um manual genérico.",
  },
  {
    n: "02",
    t: "Automação & IA aplicada",
    d: "Robôs e integrações que tiram o trabalho manual do caminho: orçamento, cobrança, atendimento e relatório.",
  },
  {
    n: "03",
    t: "Lojas e catálogos",
    d: "Cardápio digital, agendamento e e-commerce com painel próprio — no ar, vendendo, com você no controle.",
  },
  {
    n: "04",
    t: "Suporte que responde",
    d: "WhatsApp direto com quem construiu, atualizações e monitoramento. Sem fila, sem ticket, sem contrato mínimo.",
  },
];

const NUMEROS = [
  ["16 dias", "prazo máximo de entrega"],
  ["20–30 min", "consulta que fecha o escopo"],
  ["3 h", "janela típica de resposta"],
  ["100%", "remoto, Brasil inteiro"],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="Apresentação da Neovanguard">
        <div className="hero-copy">
          <span className="eyebrow">Estúdio de tecnologia · desde 2023</span>
          <h1 className="h-xl">
            A ferramenta certa
            <br />
            para o seu problema.
          </h1>
          <p className="lead">
            Sistemas, automações e IA sob medida. Entendemos a dor, fechamos o
            escopo e entregamos funcionando — com prazo definido e sem contrato
            mínimo.
          </p>
          <div className="pill-row">
            <Link href="/solucao" className="pill">
              Quero resolver um problema
              <ArrowUpRight />
            </Link>
            <Link href="/ouro" className="pill pill--ghost">
              Conhecer o Ouro
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <NVMark3D />
        </div>
        <p className="hero-note">
          entrega em até 16 dias · escopo fechado antes de começar · suporte
          via WhatsApp
        </p>
      </section>

      <section className="panel" aria-labelledby="frentes-h">
        <header className="sec-head">
          <span className="eyebrow">O que fazemos</span>
          <h2 id="frentes-h" className="h-lg">
            Quatro frentes, <em className="h-accent">um organismo só.</em>
          </h2>
        </header>
        <div className="cards">
          {FRENTES.map((f) => (
            <article key={f.n} className="card">
              <span className="card-n">{f.n}</span>
              <h3 className="card-t">{f.t}</h3>
              <p className="card-d">{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--accent" aria-label="Como trabalhamos">
        <dl className="nums">
          {NUMEROS.map(([n, l]) => (
            <div key={l} className="num">
              <dt>{n}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="div-h">
        <header className="sec-head">
          <span className="eyebrow">As divisões</span>
          <h2 id="div-h" className="h-lg">
            Duas portas. <em className="h-accent">O mesmo DNA.</em>
          </h2>
        </header>
        <div className="doors">
          <Link href="/ouro" className="door door--gold">
            <span className="door-flag">Comece por aqui</span>
            <h3>Ouro</h3>
            <p>
              O caminho direto: a ferramenta que o negócio precisa, escopo
              fechado e entrega rápida. Uma consulta objetiva define o plano.
            </p>
            <span className="door-cta">
              Entrar no Ouro
              <ArrowUpRight />
            </span>
          </Link>
          <Link href="/contato" className="door door--dark">
            <span className="door-flag">Vagas limitadas</span>
            <h3>Platina</h3>
            <p>
              Parceria completa e sob medida, para poucas operações por vez.
              Você se candidata, nós analisamos e retornamos em até 48h.
            </p>
            <span className="door-cta">
              Candidatar-se
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </section>

      <section className="closer" aria-label="Fale com a gente">
        <h2 className="h-xl">
          Conta o problema.
          <br />A gente devolve a ferramenta.
        </h2>
        <div className="pill-row">
          <Link href="/solucao" className="pill">
            Fazer a consulta rápida
            <ArrowUpRight />
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill--ghost"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </section>

      <Foot />
    </>
  );
}
