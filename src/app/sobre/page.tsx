import Link from "next/link";
import type { Metadata } from "next";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, VERSAO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Por que o Neovanguard OS existe, o que ele assume, e o que ele não é. Uma distribuição Linux construída em torno de uma ideia fixa: a máquina é sua.",
};

/**
 * SOBRE — a página que diz por que isto existe, e o que custa.
 *
 * A seção "o que ele não é" não é modéstia: é a informação mais útil da
 * página. Um sistema que promete tudo é um sistema que ninguém consegue
 * avaliar, e quem chega aqui está avaliando.
 */

const NAO_E = [
  {
    n: "01",
    t: "Não é uma distro para iniciantes em Linux",
    d: "A área de trabalho é amigável, mas a camada que dá sentido a ela — nó, relay, cofre — pressupõe que você queira operar isso. Se a sua pergunta é qual Linux instalar no primeiro computador, existem escolhas melhores, e elas são honestamente melhores.",
  },
  {
    n: "02",
    t: "Não é anonimato",
    d: "Há Tor, killswitch, MAC aleatório e log em RAM. Nada disso torna ninguém anônimo — torna difícil o rastro acidental. Quem precisa de anonimato contra um adversário sério precisa de um projeto que faça só isso, e existe.",
  },
  {
    n: "03",
    t: "Não é um produto com garantia",
    d: "É GPL-3.0, sem garantia, e o código diz isso. O que oferecemos no lugar é o contrário do silêncio: as decisões estão escritas ao lado do código, e os defeitos corrigidos ficam registrados com o motivo.",
  },
  {
    n: "04",
    t: "Não guarda nada seu",
    d: "Não há conta, servidor de sincronização nem telemetria. A consequência é que ninguém pode devolver o que você perder — perdeu a chave, perdeu a identidade. É a mesma propriedade vista dos dois lados.",
  },
];

export default function Sobre() {
  return (
    <>
      <section className="hero" aria-label="Sobre o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">O projeto</span>
          <h1 className="h-xl">
            Uma ideia fixa:
            <br />a máquina é sua.
          </h1>
          <p className="lead">
            Quase todo sistema operacional trata a identidade como algo que
            pertence a outra pessoa: uma conta, num servidor, que pode ser
            suspensa. O Neovanguard OS inverte isso. A sua chave é a conta, o
            cofre de configurações é seu, e a infraestrutura que você usa roda na
            sua mesa.
          </p>
        </div>
      </section>

      <section className="panel" aria-labelledby="porque">
        <div className="sec-head">
          <span className="eyebrow">Por que existe</span>
          <h2 className="h-lg" id="porque">
            Soberania costuma parar no <span className="h-accent">discurso</span>
          </h2>
        </div>
        <p className="lead">
          É fácil dizer que a máquina é sua. É trabalhoso fazer com que isso
          seja verdade quando você formata o disco, troca de computador ou
          perde o notebook numa viagem. Foi esse o problema escolhido: não
          &ldquo;instalar Bitcoin junto&rdquo;, e sim fazer com que a identidade
          e o ambiente atravessem a máquina, sem passar por ninguém.
        </p>
        <p className="lead">
          O resto decorre daí. Se a identidade é uma chave, o instalador precisa
          entendê-la. Se o ambiente tem de voltar, precisa haver um cofre. Se
          nada passa por um servidor nosso, o nó e o relay têm de ser seus — e
          alguém precisa escrever os comandos que tornam isso operável.
        </p>
      </section>

      <section className="panel panel--accent" aria-labelledby="naoe">
        <div className="sec-head">
          <span className="eyebrow">Honestidade</span>
          <h2 className="h-lg" id="naoe">
            O que ele <span className="h-accent">não</span> é
          </h2>
          <p className="lead">
            Esta é a seção mais útil da página. Um sistema que promete tudo é um
            sistema que ninguém consegue avaliar.
          </p>
        </div>
        <div className="cards">
          {NAO_E.map((x) => (
            <article className="card" key={x.n}>
              <span className="card-n">{x.n}</span>
              <h3 className="card-t">{x.t}</h3>
              <p className="card-d">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="como">
        <div className="sec-head">
          <span className="eyebrow">Como é feito</span>
          <h2 className="h-lg" id="como">
            Todo defeito vira uma <span className="h-accent">verificação</span>
          </h2>
        </div>
        <p className="lead">
          É a regra da casa. Quando algo quebra de um jeito novo, a correção vem
          acompanhada de um teste que reprova aquele defeito específico — e o
          teste é conferido nos dois sentidos: com o defeito de volta, ele falha
          com a mensagem certa; sem ele, passa.
        </p>
        <p className="lead">
          O motivo é chato e concreto: num instalador, o erro que importa
          aparece depois de o disco já ter sido apagado. Descobrir na hora de
          usar é caro demais, então a build descobre antes.
        </p>
        <div className="pill-row">
          <a
            className="pill"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o código
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="closer" aria-label="Começar">
        <h2 className="h-xl">Versão {VERSAO}.</h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Baixar
            <ArrowUpRight />
          </Link>
          <Link href="/recursos" className="pill pill--ghost">
            O que vem dentro
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
