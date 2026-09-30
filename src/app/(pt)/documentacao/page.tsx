import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, REPO_PACOTES, CHAVE_FPR, DOCS_URL, VERSAO } from "@/lib/constants";

export const metadata = pageMetadata({
  path: "/documentacao",
  title: "Documentação",
  description:
    "Documentação do Neovanguard OS: instalação, uso, construção de imagens, arquitetura e repositório de pacotes.",
});

const DOCS = [
  {
    f: "documentation/as-isos.md",
    t: "Imagens ISO",
    d: "Como funcionam as imagens Live e Install, o sistema incluído na mídia e a detecção do pendrive.",
  },
  {
    f: "documentation/COMO-CONSTRUIR.md",
    t: "Construção das imagens",
    d: "Dependências, construção de pacotes, geração da ISO e verificações com --check.",
  },
  {
    f: "documentation/briefing-tecnico.md",
    t: "Briefing técnico",
    d: "Arquitetura, decisões de implementação, validações e limitações conhecidas.",
  },
  {
    f: "documentation/estrutura.md",
    t: "Estrutura do repositório",
    d: "Organização dos diretórios, código-fonte e arquivos gerados.",
  },
  {
    f: "documentation/heranca-do-live.md",
    t: "Componentes da sessão Live",
    d: "Componentes exclusivos da sessão Live, remoção durante a instalação e verificações de build.",
  },
  {
    f: "documentation/security-review-scope.md",
    t: "Escopo de revisão de segurança",
    d: "Componentes e verificações prioritários para revisão de segurança.",
  },
];

export default function Documentacao() {
  return (
    <>
      <section className="hero" aria-label="Documentação">
        <div className="hero-copy">
          <span className="eyebrow">Documentação · versão {VERSAO}</span>
          <h1 className="h-xl">Documentação</h1>
          <p className="lead">
            Guias para instalar, conhecer o sistema e contribuir. A referência
            técnica é mantida junto ao código, no repositório do projeto.
          </p>
          <div className="pill-row">
            <a
              className="pill"
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repositório de desenvolvimento (acesso restrito)
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="panel prose" aria-labelledby="construir">
        <h2 id="construir">Construir a partir do código</h2>
        <p>O repositório de desenvolvimento é privado. Os links técnicos desta página exigem acesso autorizado no GitHub. As ISOs ainda não estão disponíveis para download público.</p>
        <p>Quem já tem acesso deve consultar o guia de construção da revisão que pretende testar. Ele descreve o ambiente Arch Linux, dependências, geração de recursos, validações e testes em máquina virtual.</p>
        <p><a href={`${DOCS_URL}/COMO-CONSTRUIR.md`}>Guia de construção (acesso restrito)</a> · <Link href="/novidades">Estado do desenvolvimento</Link> · <a href="mailto:mizael.neovanguard@gmail.com">Conversar sobre contribuição</a></p>
        <p><Link href="/guias">Consulte os guias públicos</Link> para conhecer os componentes antes de preparar uma instalação.</p>
      </section>

      <section className="panel" aria-labelledby="comecar">
        <div className="sec-head"><span className="eyebrow">Guias</span><h2 className="h-lg" id="comecar">Instalação e uso</h2></div>
        <div className="doc-paths">
          <Link className="doc-path" href="/baixar"><strong>Experimentar</strong><span>Compare Live e Install e confira o estado das imagens.</span><ArrowUpRight /></Link>
          <Link className="doc-path" href="/instalacao"><strong>Instalar</strong><span>Prepare a mídia e acompanhe as etapas do instalador.</span><ArrowUpRight /></Link>
          <a className="doc-path" href="#primeiros-passos"><strong>Usar o sistema</strong><span>Consulte o estado dos serviços e encontre ajuda.</span><ArrowUpRight /></a>
        </div>
      </section>

      <section className="panel" aria-labelledby="primeiros-passos">
        <div className="sec-head"><span className="eyebrow">Depois da instalação</span><h2 className="h-lg" id="primeiros-passos">Estado dos serviços</h2></div>
        <p className="lead">No terminal do Neovanguard OS, execute o painel de diagnóstico. Ele mostra rede, Bitcoin, Lightning, Nostr e memória.</p>
        <CodeBlock>{"neo-status"}</CodeBlock>
        <p className="step-desc">O resultado indica quais serviços estão ativos ou parados. Um serviço parado não significa, por si só, que a instalação falhou. Antes de ativá-lo, consulte sua configuração e os recursos necessários.</p>
        <p className="lead">Para consultar as opções disponíveis, abra a ajuda. O comando abaixo exibe instruções de uso.</p>
        <CodeBlock>{"neo-status --help"}</CodeBlock>
        <p className="grid-note">Esses comandos pertencem ao sistema operacional; não são comandos de desenvolvimento deste site.</p>
      </section>

      <section className="panel" aria-labelledby="problemas">
        <div className="sec-head"><span className="eyebrow">Resolver problemas</span><h2 className="h-lg" id="problemas">Diagnóstico e relato de falhas</h2></div>
        <p className="lead">Comece pelas <Link href="/guias">guias do sistema</Link>. Se o problema continuar, abra uma issue com a versão do sistema, a mídia usada, os passos para reproduzir e a mensagem de erro. Remova chaves privadas, senhas e outras informações pessoais antes de compartilhar a saída de um comando.</p>
        <div className="pill-row"><a className="pill pill--ghost" href="mailto:mizael.neovanguard@gmail.com">Relatar um problema por e-mail <ArrowUpRight /></a></div>
      </section>

      <section className="panel" aria-labelledby="indice">
        <div className="sec-head">
          <span className="eyebrow">Índice</span>
          <h2 className="h-lg" id="indice">
            Referência para <span className="h-accent">contribuir</span>
          </h2>
        </div>
        <ol className="steps">
          {DOCS.map((d, i) => (
            <li className="step" key={d.f}>
              <span className="step-code">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name"><a href={`${DOCS_URL}/${d.f.replace("documentation/", "")}`}>{d.t}</a></h3>
                  <span className="step-dur">{d.f}</span>
                </div>
                <p className="step-desc">{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--accent" aria-labelledby="repo">
        <div className="sec-head">
          <span className="eyebrow">Para o sistema instalado</span>
          <h2 className="h-lg" id="repo">
            O repositório de <span className="h-accent">pacotes</span>
          </h2>
          <p className="lead">
            Os pacotes do Neovanguard são distribuídos por este repositório,
            com verificação de assinatura. O sistema já inclui a chave pública
            e a seguinte configuração em <code>/etc/pacman.conf</code>.
          </p>
        </div>
        <CodeBlock label="pacman.conf">{`[neovanguard]
SigLevel = Required DatabaseOptional
Server = ${REPO_PACOTES.replace("/x86_64", "/$arch")}`}</CodeBlock>
        <p className="lead">
          Impressão digital da chave de lançamento usada para assinar pacotes
          e imagens:
        </p>
        <CodeBlock label="Impressão digital da chave">{CHAVE_FPR}</CodeBlock>
      </section>

      <section className="panel" aria-labelledby="ajuda">
        <div className="sec-head">
          <span className="eyebrow">No próprio sistema</span>
          <h2 className="h-lg" id="ajuda">
            Ajuda dos <span className="h-accent">comandos</span>
          </h2>
        </div>
        <p className="lead">
          Use <code>--help</code> para consultar a sintaxe e as opções dos
          comandos <code>neo-*</code> e do instalador.
        </p>
        <CodeBlock>{`neo-status --help
neo-zap --help
nvginstall --help`}</CodeBlock>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Relate um problema</h2>
        <div className="pill-row">
          <a
            className="pill"
            href="mailto:mizael.neovanguard@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar relato por e-mail
            <ArrowUpRight />
          </a>
          <Link href="/guias" className="pill pill--ghost">
            Guias do sistema
          </Link>
        </div>
      </section>
    </>
  );
}
