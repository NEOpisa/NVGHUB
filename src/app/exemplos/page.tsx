import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import ExemplosGrid from "@/components/blocos/ExemplosGrid";
import { ArrowUpRight } from "@/components/icons";

export const metadata = pageMetadata({
  title: "Exemplos — Ferramentas, Automações e Sites — Neovanguard",
  description:
    "Exemplos reais do que a Neovanguard constrói: ferramentas sob medida (PDV, agendamento, IA), automações que trabalham sozinhas e sites completos e navegáveis.",
  path: "/exemplos",
});

export default function ExemplosPage() {
  return (
    <>
      <section className="panel" aria-labelledby="ex-h">
        <span className="eyebrow">Exemplos</span>
        <h1 id="ex-h" className="h-xl">
          Exemplos <em className="h-accent">de verdade</em>,<br />
          para ver e usar.
        </h1>
        <p className="lead">
          Três coleções: <strong>ferramentas</strong> que resolvem um problema
          específico, <strong>automações</strong> que trabalham sozinhas e{" "}
          <strong>sites</strong> completos e navegáveis. Escolha o tipo, filtre
          por categoria e explore.
        </p>
      </section>

      <section className="panel" aria-label="Coleções de exemplos">
        <ExemplosGrid />
      </section>

      <section className="closer" aria-label="Personalizar">
        <h2 className="h-xl">Gostou de algum?</h2>
        <p className="lead">
          Personalizamos com a sua marca, os seus textos e as suas fotos — e
          adaptamos ao fluxo do seu negócio.
        </p>
        <div className="pill-row">
          <Link href="/solucao" className="pill">
            Montar minha solução
            <ArrowUpRight />
          </Link>
          <Link href="/contato" className="pill pill--ghost">
            Falar com a gente
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
