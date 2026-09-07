import Link from "next/link";
import NVMark3D from "@/components/brand/NVMark3D";
import Showcase from "@/components/blocos/Showcase";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS } from "@/lib/constants";


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
      <section className="hero hero--home" aria-label="Apresentação do Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Sistema operacional · Arch Linux · v{VERSAO}</span>
          <h1 className="h-xl">
            <span className="hero-line"><span>A máquina é sua.</span></span>
            <span className="hero-line"><span>Sua identidade também.</span></span>
          </h1>
          <p className="lead">
            Um Linux baseado em Arch, com KDE Plasma e ferramentas para operar
            sua identidade Nostr, Bitcoin e Lightning na sua própria máquina.
          </p>
          <div className="pill-row">
            <Link href="/baixar" className="pill">
              Conhecer a versão {VERSAO}
              <ArrowUpRight />
            </Link>
            <Link href="/instalacao" className="pill pill--ghost">
              Guia de instalação
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <svg className="hero-mark-filter" width="0" height="0" aria-hidden="true" focusable="false">
            <defs>
              <filter id="hero-mark-tone" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values=".08 .16 .03 0 0 .14 .28 .05 0 0 .24 .48 .08 0 0 0 0 0 1 0" />
              </filter>
            </defs>
          </svg>
          <NVMark3D />
        </div>
        <p className="hero-note">
          <span>Arch Linux</span><span>KDE Plasma</span><span>Código aberto</span><span>Duas imagens</span>
        </p>
        <a className="scroll-cue" href="#pilares" aria-label="Explorar o sistema"><span aria-hidden="true">↓</span> Explorar</a>
      </section>

      <div className="brand-edge" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 0H689L720 86L751 0H1440V100H0Z" /><path className="brand-edge-line" d="M0 1H689L720 87L751 1H1440" /></svg>
      </div>

      <section className="panel pillars" aria-labelledby="pilares">
        <div className="sec-head">
          <span className="eyebrow">O que muda</span>
          <h2 className="h-lg" id="pilares">
            Controle para ir <span className="h-accent">além.</span>
          </h2>
        </div>
        <div className="cards bento">
          {PILARES.map((p) => (
            <article className={`card pillar-${p.n}`} key={p.n}>
              <span className="card-n">{p.n}</span>
              <h3 className="card-t">{p.t}</h3>
              <p className="card-d">{p.d}</p>
              {p.n === "01" && <span className="key-signature" aria-hidden="true"><svg viewBox="0 0 180 50"><circle cx="25" cy="25" r="18" /><path d="M43 25H170M125 25v17M151 25v11" /></svg>Nostr · identidade local</span>}
              {p.n === "02" && <svg className="stack-diagram" viewBox="0 0 300 280" role="img" aria-label="Bitcoin, Lightning e relay Nostr conectados na sua máquina"><path d="M150 55L55 205H245ZM150 55V145M55 205L150 145L245 205" /><circle cx="150" cy="55" r="22" /><circle cx="55" cy="205" r="22" /><circle cx="245" cy="205" r="22" /><text x="150" y="60">₿</text><text x="55" y="210">↯</text><text x="245" y="210">N</text><text className="node-label" x="150" y="18">BITCOIN</text><text className="node-label" x="55" y="252">LIGHTNING</text><text className="node-label" x="245" y="252">RELAY NOSTR</text><text className="node-label" x="150" y="142">LOCAL</text></svg>}
              {p.n === "03" && <div className="terminal-detail"><span>Registro em memória</span><code className="log-trace">$ journalctl -b</code></div>}
              {p.n === "04" && <div className="terminal-detail"><span>Pacotes à vista</span><code>$ pacman -Q</code></div>}
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--accent workbench" aria-label="Números">
        <dl className="nums">
          {NUMEROS.map(([n, d]) => (
            <div className="num" key={d}>
              <dt>{/^\d+$/.test(n) ? <><span className="sr-only">{n}</span><span aria-hidden="true" data-count>{n}</span></> : n}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Showcase />

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
        <div className="image-split">
          {IMAGENS.map((im) => (
            <article className={`image-option image-option--${im.id}`} key={im.id} aria-labelledby={`image-${im.id}`}>
              <span className="eyebrow">{im.para}</span>
              <h3 id={`image-${im.id}`}>{im.nome}</h3>
              <p>{im.d}</p>
              <dl className="image-specs"><div><dt>Imagem</dt><dd>{im.tamanho}</dd></div><div><dt>Boot</dt><dd>{im.boot}</dd></div><div><dt>Rede</dt><dd>{im.rede}</dd></div></dl>
              <Link href="/baixar" className="pill pill--ghost">Conhecer a {im.nome}<ArrowUpRight /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closer" aria-label="Começar">
        <span className="eyebrow">A próxima sessão é sua</span>
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
        <span className="closer-wordmark" aria-hidden="true">neovanguard.</span>
      </section>
    </>
  );
}
