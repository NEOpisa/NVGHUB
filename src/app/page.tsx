import Link from "next/link";
import NVMark3D from "@/components/brand/NVMark3D";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS } from "@/lib/constants";

/**
 * HOME — o hero é a marca V em 3D se montando; abaixo, no mesmo ritmo de
 * painéis do resto do site: o que a distro é, as duas imagens, os números e
 * o fecho. Rolagem nativa do começo ao fim.
 *
 * A ordem das seções é a de quem chega sem saber o que é isto. Primeiro a
 * frase que diz o que muda (a chave é a conta), depois o que vem dentro, só
 * então qual mídia pegar. Um site de distro que abre com a tabela de download
 * está pedindo uma decisão antes de dar a informação para tomá-la.
 */

const PILARES = [
  {
    n: "01",
    t: "A sua chave é a sua conta",
    d: "Sem cadastro, sem servidor de senha. Digitou a chave, a máquina volta a ser a sua.",
  },
  {
    n: "02",
    t: "A pilha inteira é sua",
    d: "Nó Bitcoin, Lightning e relay Nostr rodando aqui — você não é cliente da infraestrutura de ninguém.",
  },
  {
    n: "03",
    t: "O que a máquina fez não fica no disco",
    d: "O registro do sistema vive em memória. Desligou, foi embora.",
  },
  {
    n: "04",
    t: "Arch embaixo, sem esconder",
    d: "O pacman é o pacman. O que a distro acrescenta tem nome, versão e desinstala.",
  },
];

const NUMEROS = [
  ["2", "imagens, duas perguntas"],
  ["55", "comandos neo-*"],
  ["0", "contas para criar"],
  ["GPL-3.0", "código aberto"],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="Apresentação do Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Sistema operacional · Arch Linux</span>
          <h1 className="h-xl">
            A máquina é sua.
            <br />
            Inclusive a identidade.
          </h1>
          <p className="lead">
            Neovanguard OS é uma distribuição Linux em que a sua chave Nostr é a
            conta do sistema, e o nó Bitcoin, o Lightning e o relay são seus,
            rodando aqui. Formatou? Digita a chave e a máquina volta a ser a sua.
          </p>
          <div className="pill-row">
            <Link href="/baixar" className="pill">
              Baixar a versão {VERSAO}
              <ArrowUpRight />
            </Link>
            <Link href="/recursos" className="pill pill--ghost">
              O que vem dentro
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <NVMark3D />
        </div>
        <p className="hero-note">
          duas imagens · instalador próprio · repositório assinado · sem edição
          paga
        </p>
      </section>

      <section className="panel" aria-labelledby="pilares">
        <div className="sec-head">
          <span className="eyebrow">O que muda</span>
          <h2 className="h-lg" id="pilares">
            Quatro coisas que esta distro faz{" "}
            <span className="h-accent">diferente</span>
          </h2>
        </div>
        <div className="cards">
          {PILARES.map((p) => (
            <article className="card" key={p.n}>
              <span className="card-n">{p.n}</span>
              <h3 className="card-t">{p.t}</h3>
              <p className="card-d">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--accent" aria-label="Números">
        <dl className="nums">
          {NUMEROS.map(([n, d]) => (
            <div className="num" key={d}>
              <dt>{n}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="imagens">
        <div className="sec-head">
          <span className="eyebrow">As mídias</span>
          <h2 className="h-lg" id="imagens">
            Experimentar e instalar são{" "}
            <span className="h-accent">coisas diferentes</span>
          </h2>
          <p className="lead">
            A Live roda do pendrive e não instala nada — existe para você olhar
            antes de decidir. A Install leva o mesmo sistema dentro dela e o
            copia para o disco, sem precisar de rede. A mídia que você grava já
            decide o que vai acontecer.
          </p>
        </div>
        <dl className="ficha">
          {IMAGENS.map((im) => (
            <div key={im.id}>
              <dt>{im.nome}</dt>
              <dd>
                {im.para} · {im.tamanho}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="closer" aria-label="Começar">
        <h2 className="h-xl">
          Experimente sem instalar.
          <br />
          A Live roda do pendrive.
        </h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Comparar as duas imagens
            <ArrowUpRight />
          </Link>
          <Link href="/instalacao" className="pill pill--ghost">
            Como instalar
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
