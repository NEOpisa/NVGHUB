import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";
import { WA } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Metodologia — Plano Noxz",
  description:
    "O Plano Noxz é a metodologia da Neovanguard: um processo claro, do briefing à entrega, que coloca sites e sistemas no ar com prazo definido e suporte real.",
  path: "/metodologia",
});

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Plano Noxz — metodologia Neovanguard",
  serviceType: "Desenvolvimento de sites e sistemas",
  description:
    "Processo claro do briefing à entrega: sites e sistemas no ar com prazo definido e suporte real.",
  provider: { "@type": "Organization", name: "Neovanguard" },
  areaServed: "BR",
};

const CARDS = [
  {
    n: "01",
    tag: "Força-tarefa",
    t: "O que é o Noxz?",
    d: "A metodologia de execução da NVG, que funde as competências do time num ecossistema focado em segurança extrema, velocidade e eficácia cirúrgica. Em vez de atuações isoladas, o projeto é tratado de ponta a ponta por uma força-tarefa síncrona.",
  },
  {
    n: "02",
    tag: "Zero Trust",
    t: "Segurança extrema",
    d: "O projeto é desenhado desde o primeiro dia sob Zero Trust. Back-end e infraestrutura estruturados com criptografia de ponta e redundância de servidores, garantindo estabilidade e blindagem contra falhas ou vulnerabilidades.",
  },
  {
    n: "03",
    tag: "Código limpo",
    t: "Eficácia modular",
    d: "Foco estratégico no que gera valor real. A coordenação técnica garante que o código limpo se alinhe a uma estratégia de comunicação e aquisição de clientes, transformando tecnologia em resultado comercial.",
  },
  {
    n: "04",
    tag: "Time-to-market",
    t: "Velocidade",
    d: "Eliminação de burocracia e retrabalho. Com front-end otimizado e interface fluida, o produto é validado e colocado no ar no menor tempo possível — experiência imediata, sem fricção.",
  },
];

export default function MetodologiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <section className="panel" aria-labelledby="noxz-h">
        <span className="eyebrow">Metodologia exclusiva NVG</span>
        <h1 id="noxz-h" className="h-xl">
          Plano <em className="h-accent">Noxz.</em>
        </h1>
        <p className="lead">
          Uma metodologia de execução síncrona e implacável — projetada para
          entregar com velocidade e segurança extrema, do briefing à entrega.
        </p>
      </section>

      <section className="panel" aria-label="Os quatro eixos do Plano Noxz">
        <div className="cards">
          {CARDS.map((c) => (
            <article key={c.n} className="card">
              <span className="card-n">{c.n}</span>
              <span className="tag">{c.tag}</span>
              <h2 className="card-t">{c.t}</h2>
              <p className="card-d">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closer" aria-label="Ativar o Plano Noxz">
        <h2 className="h-xl">Vagas limitadas por ciclo de execução.</h2>
        <p className="lead">
          Cada ciclo comporta um número fixo de projetos — é assim que o prazo
          de 16 dias se sustenta.
        </p>
        <div className="pill-row">
          <a href={`${WA}?text=${encodeURIComponent("Olá! Quero saber mais sobre o Plano Noxz da Neovanguard.")}`} target="_blank" rel="noopener noreferrer" className="pill">
            <WhatsAppIcon />
            Ativar o Plano Noxz
          </a>
          <Link href="/solucao" className="pill pill--ghost">
            Fazer a consulta rápida
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
