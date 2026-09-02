import Link from "next/link";
import NVMark3D from "@/components/brand/NVMark3D";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS } from "@/lib/constants";

/**
 * HOME — o hero é a marca V em 3D se montando; abaixo, no mesmo ritmo de
 * painéis do resto do site: o que a distro é, as três imagens, os números e
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
    d: "Na instalação você informa a chave Nostr, e a conta do sistema nasce dela — cifrada pela sua própria senha. Formatou, trocou de máquina? Digita a chave e as configurações voltam. Sem nuvem, sem cadastro, sem intermediário.",
  },
  {
    n: "02",
    t: "A pilha inteira é sua",
    d: "Nó Bitcoin, Lightning, carteira e relay Nostr rodam na sua máquina, não na de outra pessoa. Vêm instalados e configurados; 55 comandos neo-* existem para operar isso sem decorar flag de ninguém.",
  },
  {
    n: "03",
    t: "O que a máquina fez não fica no disco",
    d: "O log do sistema vive em memória e /var/log é tmpfs. /dev/shm e /var/tmp não executam nada. Desligou, foi embora — que é o que significa não deixar rastro, em vez de prometer privacidade e escrever tudo.",
  },
  {
    n: "04",
    t: "Arch embaixo, sem esconder",
    d: "Os repositórios são os do Arch e o pacman é o pacman. O que a distro acrescenta vem de um repositório próprio e assinado, em pacotes com nome e versão — e que dá para desinstalar.",
  },
];

const NUMEROS = [
  ["3", "imagens, três públicos"],
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
          três imagens · instalador próprio · repositório assinado · sem edição
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
        <div className="nums">
          {NUMEROS.map(([n, d]) => (
            <div className="num" key={d}>
              <strong>{n}</strong>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="imagens">
        <div className="sec-head">
          <span className="eyebrow">As mídias</span>
          <h2 className="h-lg" id="imagens">
            Uma ISO servia mal a <span className="h-accent">três pessoas</span>
          </h2>
          <p className="lead">
            Quem quer só experimentar, quem já decidiu e quer instalar, e quem
            quer escolher cada peça. A mídia que você grava no pendrive já decide
            o que vai acontecer — o instalador não pergunta o que a escolha da
            imagem já respondeu.
          </p>
        </div>
        <div className="cards">
          {IMAGENS.map((im) => (
            <article className="card" key={im.id}>
              <span className="card-n">{im.tamanho}</span>
              <h3 className="card-t">{im.nome}</h3>
              <p className="card-d">{im.d}</p>
              <div className="card-tags">
                <span className="tag">{im.para}</span>
                <span className="tag">boot: {im.boot}</span>
                <span className="tag">rede: {im.rede}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Escolher e baixar
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <section className="closer" aria-label="Começar">
        <h2 className="h-xl">
          Experimente sem instalar.
          <br />
          A Live roda do pendrive.
        </h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Baixar {VERSAO}
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
