import Link from "next/link";
import type { Metadata } from "next";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, REPO_PACOTES, CHAVE_FPR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Documentação",
  description:
    "Onde ler sobre o Neovanguard OS: as três imagens, como a build funciona, o repositório de pacotes e a chave que assina tudo.",
};

/**
 * DOCUMENTAÇÃO — um índice honesto, e não uma wiki que não existe.
 *
 * A documentação de verdade desta distro mora no repositório, ao lado do
 * código que ela descreve, e é lá que ela é mantida. Copiá-la para cá criaria
 * uma segunda versão que envelhece sozinha — que é o defeito que os próprios
 * documentos passam metade do tempo consertando.
 */

const DOCS = [
  {
    f: "documentation/tres-isos.md",
    t: "As três ISOs",
    d: "Por que uma virou três, como a Install carrega o sistema inteiro dentro de si, como o instalador acha a mídia mesmo quando o sistema de arquivos de boot já foi desmontado, e o que cada modo do instalador pergunta.",
  },
  {
    f: "documentation/COMO-CONSTRUIR.md",
    t: "Como construir",
    d: "Do clone à ISO. Os pacotes que precisam ser construídos antes, o que o --check confere e por que ele existe.",
  },
  {
    f: "documentation/briefing-tecnico.md",
    t: "Briefing técnico",
    d: "A visão de dentro: decisões, defeitos já corrigidos e o que ainda pode melhorar. É o documento que diz onde estão as bordas.",
  },
  {
    f: "documentation/estrutura.md",
    t: "Estrutura do repositório",
    d: "O que vive onde, e por quê. Útil antes do primeiro patch.",
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
          <span className="eyebrow">Ler mais</span>
          <h1 className="h-xl">A documentação mora no repositório.</h1>
          <p className="lead">
            Ao lado do código que ela descreve, e é lá que é mantida. Uma cópia
            aqui viraria uma segunda versão da verdade, e a de fora envelhece
            primeiro — que é justamente o defeito que estes documentos passam
            metade do tempo consertando.
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

      <section className="panel" aria-labelledby="indice">
        <div className="sec-head">
          <span className="eyebrow">Índice</span>
          <h2 className="h-lg" id="indice">
            O que existe, e o que <span className="h-accent">responde</span>
          </h2>
        </div>
        <ol className="steps">
          {DOCS.map((d, i) => (
            <li className="step" key={d.f}>
              <span className="step-code">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{d.t}</h3>
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
        <pre className="cmd cmd--sem-cifrao">
          <code>{`[neovanguard]
SigLevel = Required DatabaseOptional
Server = ${REPO_PACOTES.replace("/x86_64", "/$arch")}`}</code>
        </pre>
        <p className="lead">
          A chave que assina os pacotes e as imagens é esta, e conferir a
          impressão inteira é o ponto:
        </p>
        <pre className="cmd cmd--sem-cifrao">
          <code>{CHAVE_FPR}</code>
        </pre>
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
          o que fazem, para que servem e o que esperam. Não há um manual à parte
          para eles porque um manual à parte seria a primeira coisa a divergir.
        </p>
        <pre className="cmd">
          <code>{`neo-status --help
neo-zap --help
nvginstall --help`}</code>
        </pre>
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

      <Foot />
    </>
  );
}
