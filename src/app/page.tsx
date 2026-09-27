import Link from "next/link";
import NVMark3D from "@/components/brand/NVMark3D";
import Showcase from "@/components/blocos/Showcase";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS } from "@/lib/constants";


const PILARES = [
  {
    n: "01",
    t: "Identidade Nostr",
    d: "Integração com chaves Nostr para criar a conta local e restaurar perfil e configurações.",
  },
  {
    n: "02",
    t: "Bitcoin e Lightning",
    d: "Ferramentas para operar um nó Bitcoin, canais Lightning e um relay Nostr na própria máquina.",
  },
  {
    n: "03",
    t: "Logs em memória",
    d: "Logs do sistema armazenados em RAM por padrão e descartados ao desligar.",
  },
  {
    n: "04",
    t: "Base Arch Linux",
    d: "Pacotes gerenciados pelo pacman, com repositório próprio para os componentes do Neovanguard.",
  },
];

const NUMEROS = [
  ["2", "imagens ISO"],
  ["55", "comandos neo-*"],
  ["0", "cadastros obrigatórios"],
  ["GPL-3.0", "código aberto"],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero hero--home" aria-label="Apresentação do Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Sistema operacional · Arch Linux · v{VERSAO}</span>
          <h1 className="h-xl">
            <span className="hero-line"><span>Linux para Bitcoin,</span></span>
            <span className="hero-line"><span>Lightning e Nostr</span></span>
          </h1>
          <p className="lead">
            Neovanguard OS é uma distribuição baseada em Arch Linux, com KDE Plasma
            e ferramentas para operar nós, carteiras e identidade Nostr.
          </p>
          <div className="pill-row">
            <Link href="/baixar" className="pill">
              Imagens da versão {VERSAO}
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
        <a className="scroll-cue" href="#pilares" aria-label="Ver recursos do sistema"><span aria-hidden="true">↓</span> Recursos</a>
      </section>

      <div className="brand-edge" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 0H689L720 86L751 0H1440V100H0Z" /><path className="brand-edge-line" d="M0 1H689L720 87L751 1H1440" /></svg>
      </div>

      <section className="panel pillars" aria-labelledby="pilares">
        <div className="sec-head">
          <span className="eyebrow">Recursos</span>
          <h2 className="h-lg" id="pilares">
            Ferramentas do <span className="h-accent">sistema</span>
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
              {p.n === "04" && <div className="terminal-detail"><span>Pacotes instalados</span><code>$ pacman -Q</code></div>}
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
          <span className="eyebrow">Imagens ISO</span>
          <h2 className="h-lg" id="imagens">
            Live e <span className="h-accent">Install</span>
          </h2>
          <p className="lead">
            Use a Live para testar o sistema pelo pendrive. Use a Install para
            instalar no disco sem conexão com a internet. As duas imagens
            contêm o mesmo sistema.
          </p>
        </div>
        <div className="image-split">
          {IMAGENS.map((im) => (
            <article className={`image-option image-option--${im.id}`} key={im.id} aria-labelledby={`image-${im.id}`}>
              <span className="eyebrow">{im.para}</span>
              <h3 id={`image-${im.id}`}>{im.nome}</h3>
              <p>{im.d}</p>
              <dl className="image-specs"><div><dt>Imagem</dt><dd>{im.tamanho}</dd></div><div><dt>Inicialização</dt><dd>{im.boot}</dd></div><div><dt>Rede</dt><dd>{im.rede}</dd></div></dl>
              <Link href="/baixar" className="pill pill--ghost">Detalhes da {im.nome}<ArrowUpRight /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closer" aria-label="Começar">
        <span className="eyebrow">Instalação</span>
        <h2 className="h-xl">
          Consulte as imagens
          <br />
          e o guia de instalação
        </h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Consultar imagens
            <ArrowUpRight />
          </Link>
          <Link href="/instalacao" className="pill pill--ghost">
            Guia de instalação
          </Link>
        </div>
        <span className="closer-wordmark" aria-hidden="true">neovanguard.</span>
      </section>
    </>
  );
}
