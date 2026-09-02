import Link from "next/link";
import type { Metadata } from "next";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS, CHAVE_FPR, REPO_URL, REPO_PACOTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Baixar",
  description:
    "As três imagens do Neovanguard OS — Live para experimentar, Install para instalar sem rede, MYO para montar o seu — e como conferir o que você baixou.",
};

/**
 * BAIXAR — a página que mais pode mentir num site de distro, então ela diz o
 * estado real: as imagens da 1.0.0 existem e **ainda não foram publicadas**.
 * Um botão que leva a 404 é pior que a ausência dele, e "em breve" sem motivo
 * é pior que os dois.
 *
 * A ordem também é deliberada: escolher a mídia vem antes de baixar, e
 * conferir vem antes de gravar. Numa distro que fala de soberania, ensinar a
 * verificar a assinatura não é rodapé — é a única coisa que separa "eu baixei"
 * de "eu sei o que baixei".
 */
export default function Baixar() {
  return (
    <>
      <section className="hero" aria-label="Baixar o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Versão {VERSAO}</span>
          <h1 className="h-xl">Escolha a sua mídia.</h1>
          <p className="lead">
            São três, e a diferença não é de tamanho: é de para que servem. A
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
          Elas são construídas e testadas, e o repositório de pacotes que o
          sistema usa já está no ar. O que falta é a publicação das imagens em
          si — enquanto isso não acontece, esta página descreve o que elas são e
          como conferi-las, e não oferece um botão que levaria a lugar nenhum.
        </p>
        <div className="pill-row">
          <a
            className="pill"
            href={REPO_URL}
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

      <section className="panel" aria-labelledby="as-tres">
        <div className="sec-head">
          <span className="eyebrow">As três</span>
          <h2 className="h-lg" id="as-tres">
            Qual delas é a <span className="h-accent">sua</span>
          </h2>
        </div>

        <div className="steps">
          {IMAGENS.map((im) => (
            <article className="step" key={im.id}>
              <div className="step-top">
                <span className="step-code">{im.arquivo}</span>
                <span className="step-dur">{im.tamanho}</span>
              </div>
              <h3 className="step-name">
                {im.nome} — {im.para}
              </h3>
              <p className="step-desc">{im.d}</p>
              <div className="card-tags">
                <span className="tag">dá boot em: {im.boot}</span>
                <span className="tag">
                  internet: {im.rede === "obrigatória" ? "obrigatória" : "não precisa"}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="grid-note">
          Na dúvida entre as duas MBN: grave a <strong>Live</strong>, use o
          sistema do pendrive por uma tarde e, se gostar, grave a{" "}
          <strong>Install</strong>. É literalmente o mesmo sistema — o que a
          Install copia para o disco é o mesmo arquivo que a Live roda.
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

        <div className="acc">
          <div className="acc-q">1 · A soma, contra corrupção de download</div>
          <p className="acc-a">
            Pega erro de rede e disco cheio. Não pega adulteração: quem trocar a
            imagem troca a soma junto.
          </p>
          <pre className="acc-code">
            <code>sha256sum -c NeovanguardOS-Live-{VERSAO}-x86_64.iso.sha256</code>
          </pre>

          <div className="acc-q">2 · A assinatura, contra adulteração</div>
          <p className="acc-a">
            Esta é a que importa. A imagem é assinada pela chave de lançamento, e
            a assinatura só fecha se o arquivo for byte a byte o que saiu daqui.
          </p>
          <pre className="acc-code">
            <code>gpg --verify NeovanguardOS-Live-{VERSAO}-x86_64.iso.asc</code>
          </pre>
          <p className="acc-a">
            O gpg vai dizer qual chave assinou. Ela tem de ser esta, e conferir a
            impressão inteira é o ponto — os últimos oito caracteres não bastam:
          </p>
          <pre className="acc-code">
            <code>{CHAVE_FPR}</code>
          </pre>
          <p className="acc-a">
            A mesma chave assina o repositório de pacotes, e as três imagens já a
            trazem dentro: o sistema instalado recusa pacote nosso que não venha
            assinado por ela.
          </p>
        </div>
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

      <Foot />
    </>
  );
}
