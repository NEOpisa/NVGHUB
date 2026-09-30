import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS, CHAVE_FPR, REPO_PACOTES, DOCS_URL } from "@/lib/constants";

export const metadata = pageMetadata({
  path: "/baixar",
  title: "Imagens ISO",
  description:
    "Imagens Live e Install do Neovanguard OS: disponibilidade, diferenças e verificação de integridade e assinatura.",
});

export default function Baixar() {
  return (
    <>
      <section className="hero" aria-label="Baixar o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Versão {VERSAO}</span>
          <h1 className="h-xl">Imagens ISO</h1>
          <p className="lead">
            A Live executa o sistema pelo pendrive. A Install permite instalá-lo
            no disco. Consulte a disponibilidade e as instruções de verificação
            antes de preparar a mídia.
          </p>
        </div>
      </section>

      <section className="panel panel--accent" aria-label="Estado das imagens">
        <div className="sec-head">
          <span className="eyebrow">Disponibilidade</span>
          <h2 className="h-lg">
            Versão {VERSAO}: <span className="h-accent">ISOs não publicadas</span>
          </h2>
        </div>
        <p className="lead">
          O repositório de pacotes está disponível. As ISOs ainda aguardam
          publicação; por enquanto, você pode consultar o guia de construção
          ou conhecer as diferenças entre as mídias abaixo.
        </p>
        <div className="pill-row">
          <Link className="pill" href="/novidades">Acompanhar o desenvolvimento</Link>
          <a
            className="pill"
            href={`${DOCS_URL}/COMO-CONSTRUIR.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Construir a partir do código (acesso restrito)
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
          <span className="eyebrow">Comparação</span>
          <h2 className="h-lg" id="imagens">
            Live e <span className="h-accent">Install</span>
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
                  <span className="tag">inicialização: {im.boot}</span>
                  <span className="tag">internet: {im.rede}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="grid-note">
          A <strong>Live</strong> permite testar o ambiente e a compatibilidade
          do hardware. Para instalar, prepare um pendrive com a imagem
          <strong> Install</strong>.
        </p>
      </section>

      <section className="panel" aria-labelledby="conferir">
        <div className="sec-head">
          <span className="eyebrow">Depois de baixar</span>
          <h2 className="h-lg" id="conferir">
            Verificação da <span className="h-accent">imagem</span>
          </h2>
          <p className="lead">
            Antes de gravar a ISO, verifique a soma SHA-256 e a assinatura GPG.
            Os exemplos abaixo usam a imagem Live; para a Install, use os
            arquivos correspondentes.
          </p>
        </div>

        <ol className="steps">
          <li className="step">
            <span className="step-code">1 · SHA-256</span>
            <div>
              <div className="step-top">
                <h3 className="step-name">Verificar integridade</h3>
              </div>
              <p className="step-desc">
                A soma detecta diferenças entre o arquivo baixado e o valor
                publicado. Ela não comprova a origem da imagem.
              </p>
              <CodeBlock>{`sha256sum -c NeovanguardOS-Live-${VERSAO}-x86_64.iso.sha256`}</CodeBlock>
              <p className="step-desc">O resultado esperado é o nome do arquivo seguido de OK. Isso confirma a integridade; confira também a assinatura.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-code">2 · assinatura</span>
            <div>
              <div className="step-top">
                <h3 className="step-name">Verificar assinatura</h3>
              </div>
              <p className="step-desc">
                A assinatura vincula a imagem à chave de lançamento. Para
                verificá-la, a chave pública correspondente deve estar
                importada no GPG.
              </p>
              <CodeBlock>{`gpg --verify NeovanguardOS-Live-${VERSAO}-x86_64.iso.asc NeovanguardOS-Live-${VERSAO}-x86_64.iso`}</CodeBlock>
              <p className="step-desc">
                Confira a impressão digital completa da chave usada na assinatura.
                O valor esperado é:
              </p>
              <CodeBlock label="Impressão digital da chave">{CHAVE_FPR}</CodeBlock>
            </div>
          </li>
        </ol>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Guia de instalação</h2>
        <div className="pill-row">
          <Link href="/instalacao" className="pill">
            Consultar o guia
            <ArrowUpRight />
          </Link>
          <Link href="/recursos" className="pill pill--ghost">
            Recursos
          </Link>
        </div>
      </section>
    </>
  );
}
