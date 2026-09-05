import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, REPO_PACOTES, CHAVE_FPR, DOCS_URL, VERSAO } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/documentacao" },
  title: "Documentação",
  description:
    "Onde ler sobre o Neovanguard OS: as duas imagens, como a build funciona, o repositório de pacotes e a chave que assina tudo.",
};

const DOCS = [
  {
    f: "documentation/as-isos.md",
    t: "As imagens",
    d: "Como funcionam as imagens Live e Install, o sistema incluído na mídia e a detecção do pendrive.",
  },
  {
    f: "documentation/COMO-CONSTRUIR.md",
    t: "Como construir",
    d: "Do clone à ISO. Os pacotes que precisam ser construídos antes, o que o --check confere e por que ele existe.",
  },
  {
    f: "documentation/briefing-tecnico.md",
    t: "Briefing técnico",
    d: "Arquitetura, decisões de implementação, validações e limitações conhecidas.",
  },
  {
    f: "documentation/estrutura.md",
    t: "Estrutura do repositório",
    d: "Diretórios, fontes e arquivos gerados. O ponto de partida para o primeiro patch.",
  },
  {
    f: "documentation/heranca-do-live.md",
    t: "O que o live deixa para trás",
    d: "O que existe só na sessão do pendrive e é removido na instalação — e como isso é conferido a cada build.",
  },
  {
    f: "documentation/security-review-scope.md",
    t: "Escopo de revisão de segurança",
    d: "O que uma auditoria deveria olhar primeiro, escrito por quem construiu.",
  },
];

export default function Documentacao() {
  return (
    <>
      <section className="hero" aria-label="Documentação">
        <div className="hero-copy">
          <span className="eyebrow">Documentação · versão {VERSAO}</span>
          <h1 className="h-xl">Um caminho para cada etapa.</h1>
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
              Abrir o repositório
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="comecar">
        <div className="sec-head"><span className="eyebrow">Comece aqui</span><h2 className="h-lg" id="comecar">O que você quer fazer?</h2></div>
        <div className="doc-paths">
          <Link className="doc-path" href="/baixar"><strong>Experimentar</strong><span>Compare Live e Install e confira o estado das imagens.</span><ArrowUpRight /></Link>
          <Link className="doc-path" href="/instalacao"><strong>Instalar</strong><span>Prepare a mídia e acompanhe as etapas do instalador.</span><ArrowUpRight /></Link>
          <a className="doc-path" href="#primeiros-passos"><strong>Usar o sistema</strong><span>Consulte o estado dos serviços e encontre ajuda.</span><ArrowUpRight /></a>
        </div>
      </section>

      <section className="panel" aria-labelledby="primeiros-passos">
        <div className="sec-head"><span className="eyebrow">Depois da instalação</span><h2 className="h-lg" id="primeiros-passos">Conheça o estado da máquina</h2></div>
        <p className="lead">No terminal do Neovanguard OS, execute o painel de diagnóstico. Ele mostra rede, Bitcoin, Lightning, Nostr e memória.</p>
        <CodeBlock>{"neo-status"}</CodeBlock>
        <p className="step-desc">O resultado indica quais serviços estão ativos ou parados. Um serviço parado não significa, por si só, que a instalação falhou. Antes de ativá-lo, consulte sua configuração e os recursos necessários.</p>
        <p className="lead">Para consultar as opções disponíveis, abra a ajuda. O comando abaixo exibe instruções de uso.</p>
        <CodeBlock>{"neo-status --help"}</CodeBlock>
        <p className="grid-note">Esses comandos pertencem ao sistema operacional; não são comandos de desenvolvimento deste site.</p>
      </section>

      <section className="panel" aria-labelledby="problemas">
        <div className="sec-head"><span className="eyebrow">Resolver problemas</span><h2 className="h-lg" id="problemas">Uma informação de cada vez</h2></div>
        <p className="lead">Comece pelas <Link href="/faq">perguntas frequentes</Link>. Se o problema continuar, abra uma issue com a versão do sistema, a mídia usada, os passos para reproduzir e a mensagem de erro. Remova chaves privadas, senhas e outras informações pessoais antes de compartilhar a saída de um comando.</p>
        <div className="pill-row"><a className="pill pill--ghost" href={`${REPO_URL}/issues`}>Relatar um problema <ArrowUpRight /></a></div>
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
            O que a distro acrescenta ao Arch vem daqui, e é assinado. Uma
            máquina com Neovanguard OS já tem esta seção no{" "}
            <code>/etc/pacman.conf</code> e a chave no chaveiro — não é preciso
            configurar nada.
          </p>
        </div>
        <CodeBlock label="pacman.conf">{`[neovanguard]
SigLevel = Required DatabaseOptional
Server = ${REPO_PACOTES.replace("/x86_64", "/$arch")}`}</CodeBlock>
        <p className="lead">
          A chave que assina os pacotes e as imagens é esta, e conferir a
          impressão inteira é o ponto:
        </p>
        <CodeBlock label="Impressão da chave">{CHAVE_FPR}</CodeBlock>
      </section>

      <section className="panel" aria-labelledby="ajuda">
        <div className="sec-head">
          <span className="eyebrow">No próprio sistema</span>
          <h2 className="h-lg" id="ajuda">
            Todo comando se <span className="h-accent">explica</span>
          </h2>
        </div>
        <p className="lead">
          Os 55 comandos <code>neo-*</code> respondem a <code>--help</code> com
          o que fazem, para que servem e o que esperam. Use a ajuda como referência de opções e os guias acima para acompanhar uma tarefa.
        </p>
        <CodeBlock>{`neo-status --help
neo-zap --help
nvginstall --help`}</CodeBlock>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Achou um defeito?</h2>
        <div className="pill-row">
          <a
            className="pill"
            href={`${REPO_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir uma issue
            <ArrowUpRight />
          </a>
          <Link href="/faq" className="pill pill--ghost">
            Perguntas frequentes
          </Link>
        </div>
      </section>
    </>
  );
}
