import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS, CHAVE_FPR, REPO_PACOTES, DOCS_URL } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/baixar" },
  title: "Baixar",
  description:
    "As duas imagens do Neovanguard OS — Live para experimentar, Install para instalar sem rede — e como conferir o que você baixou.",
};

export default function Baixar() {
  return (
    <>
      <section className="hero" aria-label="Baixar o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Versão {VERSAO}</span>
          <h1 className="h-xl">Escolha a sua mídia.</h1>
          <p className="lead">
            São duas, e a diferença não é de tamanho: é de para que servem. A
            que você gravar no pendrive já decide o que vai acontecer quando a
            máquina ligar.
          </p>
        </div>
      </section>

      <section className="panel panel--accent" aria-label="Estado das imagens">
        <div className="sec-head">
          <span className="eyebrow">Antes de tudo</span>
          <h2 className="h-lg">
            As imagens da {VERSAO} <span className="h-accent">ainda não estão publicadas</span>
          </h2>
        </div>
        <p className="lead">
          O repositório de pacotes está disponível. As ISOs ainda aguardam
          publicação; por enquanto, você pode consultar o guia de construção
          ou conhecer as diferenças entre as mídias abaixo.
        </p>
        <div className="pill-row">
          <a
            className="pill"
            href={`${DOCS_URL}/COMO-CONSTRUIR.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Construir a partir do código
            <ArrowUpRight />
          </a>
          <a
            className="pill pill--ghost"
            href={REPO_PACOTES}
            target="_blank"
            rel="noopener noreferrer"
          >
            Repositório de pacotes
          </a>
        </div>
      </section>

      <section className="panel" aria-labelledby="imagens">
        <div className="sec-head">
          <span className="eyebrow">As duas</span>
          <h2 className="h-lg" id="imagens">
            Qual delas é a <span className="h-accent">sua</span>
          </h2>
        </div>

        <ol className="steps">
          {IMAGENS.map((im) => (
            <li className="step" key={im.id}>
              <span className="step-code">{im.nome}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{im.para}</h3>
                  <span className="step-dur">{im.tamanho}</span>
                </div>
                <p className="step-desc">{im.d}</p>
                <div className="card-tags">
                  <span className="tag">{im.arquivo}</span>
                  <span className="tag">boot: {im.boot}</span>
                  <span className="tag">internet: {im.rede}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="grid-note">
          Na dúvida: grave a <strong>Live</strong>, use o sistema do pendrive
          por uma tarde e, se gostar, grave a <strong>Install</strong>. É
          literalmente o mesmo sistema — o que a Install copia para o disco é o
          mesmo arquivo que a Live roda.
        </p>
      </section>

      <section className="panel" aria-labelledby="conferir">
        <div className="sec-head">
          <span className="eyebrow">Depois de baixar</span>
          <h2 className="h-lg" id="conferir">
            Conferir vem <span className="h-accent">antes</span> de gravar
          </h2>
          <p className="lead">
            Uma imagem de sistema operacional roda como root na sua máquina
            antes de qualquer senha existir. Baixar sem conferir é confiar no
            transporte e em quem hospeda — que é exatamente o que esta distro
            existe para não fazer.
          </p>
        </div>

        <ol className="steps">
          <li className="step">
            <span className="step-code">1 · soma</span>
            <div>
              <div className="step-top">
                <h3 className="step-name">Contra download corrompido</h3>
              </div>
              <p className="step-desc">
                Pega erro de rede e disco cheio. <strong>Não</strong> pega
                adulteração: quem trocar a imagem troca a soma junto.
              </p>
              <CodeBlock>{`sha256sum -c NeovanguardOS-Live-${VERSAO}-x86_64.iso.sha256`}</CodeBlock>
              <p className="step-desc">O resultado esperado é o nome do arquivo seguido de OK. Isso confirma a integridade; confira também a assinatura.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-code">2 · assinatura</span>
            <div>
              <div className="step-top">
                <h3 className="step-name">Contra adulteração</h3>
              </div>
              <p className="step-desc">
                Esta é a que importa. A assinatura só fecha se o arquivo for byte
                a byte o que saiu daqui, e ela não pode ser refeita por quem não
                tem a chave.
              </p>
              <CodeBlock>{`gpg --verify NeovanguardOS-Live-${VERSAO}-x86_64.iso.asc NeovanguardOS-Live-${VERSAO}-x86_64.iso`}</CodeBlock>
              <p className="step-desc">
                O gpg dirá qual chave assinou. Tem de ser esta — e é a impressão
                inteira que se confere, não os últimos oito caracteres:
              </p>
              <CodeBlock label="Impressão da chave">{CHAVE_FPR}</CodeBlock>
            </div>
          </li>
        </ol>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Gravou o pendrive?</h2>
        <div className="pill-row">
          <Link href="/instalacao" className="pill">
            Como instalar
            <ArrowUpRight />
          </Link>
          <Link href="/recursos" className="pill pill--ghost">
            O que vem dentro
          </Link>
        </div>
      </section>
    </>
  );
}
