import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/components/icons";
import {
  JOAO_LINKEDIN,
  MIZAEL_LINKEDIN,
  REPO_URL,
  VERSAO,
} from "@/lib/constants";

export const metadata = pageMetadata({
  path: "/sobre",
  title: "Sobre",
  description:
    "Objetivos, requisitos e desenvolvimento do Neovanguard OS, uma distribuição baseada em Arch Linux para Bitcoin, Lightning e Nostr.",
});

/** Objetivos, limitações e desenvolvimento do projeto. */

const NAO_E = [
  {
    n: "01",
    t: "Conhecimento de Linux",
    d: "A administração de nós, relays e carteiras exige familiaridade com Linux, terminal e redes. O projeto é voltado a quem pretende operar esses serviços.",
  },
  {
    n: "02",
    t: "Limites de privacidade",
    d: "Tor, bloqueio de tráfego fora do túnel, randomização de MAC e logs em RAM são ferramentas de privacidade. Seu uso não garante anonimato.",
  },
  {
    n: "03",
    t: "Licença e garantia",
    d: "O projeto declara a licença GPL-3.0, sem garantia. O desenvolvimento permanece em repositório privado; os guias e as notas públicas descrevem o estado atual, sem anunciar ISOs disponíveis.",
  },
  {
    n: "04",
    t: "Custódia das chaves",
    d: "O projeto não mantém cópias das chaves nem oferece recuperação de identidade. Cabe ao usuário guardar a chave Nostr e seus backups.",
  },
];

export default function Sobre() {
  return (
    <>
      <section className="hero" aria-label="Sobre o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">O projeto</span>
          <h1 className="h-xl">
            Sobre o
            <br />Neovanguard OS
          </h1>
          <p className="lead">
            Distribuição baseada em Arch Linux para operar Bitcoin, Lightning e
            Nostr. Integra ferramentas de linha de comando, identidade por
            chave e serviços locais ao ambiente KDE Plasma.
          </p>
        </div>
      </section>

      <section className="panel" aria-labelledby="porque">
        <div className="sec-head">
          <span className="eyebrow">Objetivo</span>
          <h2 className="h-lg" id="porque">
            Operação de <span className="h-accent">serviços locais</span>
          </h2>
        </div>
        <p className="lead">
          O projeto reúne os componentes necessários para administrar nós,
          carteiras e relays no próprio computador. A integração com Nostr
          permite usar uma chave para a identidade e restaurar configurações
          entre instalações.
        </p>
        <p className="lead">
          O instalador, o cofre de configurações e os comandos neo-* dão suporte
          a esse uso. Os componentes são distribuídos como pacotes para Arch Linux.
        </p>
      </section>

      <section className="panel" aria-labelledby="quem-faz">
        <div className="sec-head">
          <span className="eyebrow">Quem faz</span>
          <h2 className="h-lg" id="quem-faz">
            Empresa e produto, cada um com seu <span className="h-accent">nome</span>
          </h2>
        </div>
        <p className="lead">
          A Neovanguard é a empresa. O Neovanguard OS é o produto de código
          aberto que ela desenvolve. Mizael Ribeiro, cofundador e CEO, lidera
          produto e desenvolvimento. João Antônio Rodrigues, cofundador e COO,
          lidera operação, qualidade e segurança.
        </p>
        <div className="pill-row">
          <a className="pill pill--ghost" href={MIZAEL_LINKEDIN} target="_blank" rel="noopener noreferrer">
            Mizael Ribeiro
            <ArrowUpRight />
          </a>
          <a className="pill pill--ghost" href={JOAO_LINKEDIN} target="_blank" rel="noopener noreferrer">
            João Antônio Rodrigues
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="panel panel--accent" aria-labelledby="naoe">
        <div className="sec-head">
          <span className="eyebrow">Escopo</span>
          <h2 className="h-lg" id="naoe">
            Requisitos e <span className="h-accent">limitações</span>
          </h2>
          <p className="lead">
            Considere os conhecimentos necessários, os limites de privacidade e
            a responsabilidade sobre as chaves antes de instalar.
          </p>
        </div>
        <div className="cards">
          {NAO_E.map((x) => (
            <article className="card" key={x.n}>
              <span className="card-n">{x.n}</span>
              <h3 className="card-t">{x.t}</h3>
              <p className="card-d">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="como">
        <div className="sec-head">
          <span className="eyebrow">Desenvolvimento</span>
          <h2 className="h-lg" id="como">
            Código e <span className="h-accent">testes</span>
          </h2>
        </div>
        <p className="lead">
          As correções incluem testes de regressão para os defeitos identificados.
          Esses testes verificam a falha na versão afetada e o resultado após
          a correção.
        </p>
        <p className="lead">
          As verificações de build buscam detectar problemas antes da instalação,
          especialmente nas etapas que alteram o disco.
        </p>
        <div className="pill-row">
          <a
            className="pill"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Código-fonte
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="closer" aria-label="Começar">
        <h2 className="h-xl">Versão {VERSAO}</h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Consultar imagens
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
