import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO } from "@/lib/constants";

export const metadata = pageMetadata({
  path: "/instalacao",
  title: "Instalação",
  description:
    "Guia de instalação do Neovanguard OS: preparação do pendrive, inicialização e configuração com a imagem NVG Install.",
});

/** Preparação da mídia e etapas do instalador NVG Install. */

const GRAVAR = [
  {
    n: "01",
    t: "Confira a imagem",
    d: "Verifique a soma SHA-256 e a assinatura GPG seguindo as instruções da página de imagens.",
  },
  {
    n: "02",
    t: "Grave no pendrive",
    d: "Use uma ferramenta compatível com imagens ISO híbridas, como dd, Ventoy, Gravador de imagens USB do GNOME ou Etcher. Não descompacte a ISO.",
  },
  {
    n: "03",
    t: "Inicie pelo pendrive",
    d: "Selecione o pendrive no menu de inicialização do computador. Desative o Secure Boot em sistemas UEFI, pois as imagens ainda não têm assinatura compatível.",
  },
];

const NVG = [
  ["Início", "Apresentação do instalador e da instalação sem internet."],
  ["Rede", "Conexão opcional para recuperar dados da identidade Nostr."],
  ["Identidade", "Configuração opcional da chave Nostr."],
  ["Disco", "Seleção do disco e verificação do espaço necessário."],
  ["Conta", "Definição de usuário, senha, teclado e fuso horário."],
  ["Revisão", "Conferência das alterações antes de gravar no disco."],
  ["Instalação", "Cópia do sistema da mídia para o disco."],
] as const;


export default function Instalacao() {
  return (
    <>
      <section className="hero" aria-label="Instalar o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Guia · versão {VERSAO}</span>
          <h1 className="h-xl">Instalação</h1>
          <p className="lead">
            Use a imagem NVG Install para instalar o sistema sem internet.
            Depois de iniciar pelo pendrive, abra o instalador no terminal.
            A imagem Live serve para experimentar e não inclui o instalador.
          </p>
        </div>
      </section>

      <section className="panel" aria-labelledby="preparar">
        <div className="sec-head"><span className="eyebrow">Preparação</span><h2 className="h-lg" id="preparar">Antes de começar</h2></div>
        <p className="lead">Confira a disponibilidade da imagem na <Link href="/baixar">página de download</Link> e faça uma cópia dos arquivos que deseja manter. A instalação padrão apaga o disco escolhido. O instalador informa o espaço necessário antes de continuar.</p>
      </section>
      <section className="panel" aria-labelledby="gravar">
        <div className="sec-head">
          <span className="eyebrow">Mídia de instalação</span>
          <h2 className="h-lg" id="gravar">
            Preparação do <span className="h-accent">pendrive</span>
          </h2>
        </div>
        <div className="cards">
          {GRAVAR.map((g) => (
            <article className="card" key={g.n}>
              <span className="card-n">{g.n}</span>
              <h3 className="card-t">{g.t}</h3>
              <p className="card-d">{g.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="iniciar">
        <div className="sec-head"><span className="eyebrow">Na mídia Install</span><h2 className="h-lg" id="iniciar">Abra o instalador</h2></div>
        <CodeBlock>{"nvginstall"}</CodeBlock>
        <p className="step-desc">O resultado esperado é a tela de início do instalador no terminal. Se o comando não for encontrado, confira se você iniciou pela imagem Install.</p>
      </section>
      <section className="panel" aria-labelledby="mbn">
        <div className="sec-head">
          <span className="eyebrow">NVG Install</span>
          <h2 className="h-lg" id="mbn">
            Instalação básica <span className="h-accent">offline</span>
          </h2>
          <p className="lead">
            O sistema incluído na mídia é copiado para o disco. A rede é
            opcional e permite trazer sua identidade Nostr. Antes de gravar,
            a etapa de revisão apresenta o disco escolhido e as alterações.
            O resumo abaixo agrupa as decisões; o número de telas depende da mídia e do perfil recuperado.
          </p>
        </div>
        <ol className="steps">
          {NVG.map(([t, d], i) => (
            <li className="step" key={t}>
              <span className="step-code">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{t}</h3>
                </div>
                <p className="step-desc">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--accent" aria-labelledby="cuidados">
        <div className="sec-head">
          <span className="eyebrow">Cuidados</span>
          <h2 className="h-lg" id="cuidados">
            Disco, identidade e conclusão
          </h2>
        </div>
        <div className="cards">
          <article className="card">
            <span className="card-n">01</span>
            <h3 className="card-t">Apagamento do disco</h3>
            <p className="card-d">
              A instalação padrão apaga todo o disco selecionado. O modo manual
              permite usar partições existentes. Confira o disco e as
              alterações na tela de revisão antes de confirmar.
            </p>
          </article>
          <article className="card">
            <span className="card-n">02</span>
            <h3 className="card-t">A chave Nostr é opcional</h3>
            <p className="card-d">
              É possível criar uma conta local sem chave Nostr. A instalação
              pode continuar sem rede ou quando o relay está indisponível.
            </p>
          </article>
          <article className="card">
            <span className="card-n">03</span>
            <h3 className="card-t">Avisos de conclusão</h3>
            <p className="card-d">
              Falhas nas etapas finais são registradas como avisos quando o
              sistema já foi gravado. O assistente da primeira inicialização
              reapresenta essas pendências.
            </p>
          </article>
        </div>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Primeiros passos</h2>
        <div className="pill-row">
          <Link href="/documentacao#primeiros-passos" className="pill">
            Documentação
            <ArrowUpRight />
          </Link>
          <Link href="/guias" className="pill pill--ghost">
            Guias do sistema
          </Link>
        </div>
      </section>
    </>
  );
}
