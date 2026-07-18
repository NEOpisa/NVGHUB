import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import BlueprintStage from "@/components/BlueprintStage";
import ExemplosGrid from "@/components/ExemplosGrid";

export const metadata = pageMetadata({
  title: "Exemplos — Ferramentas, Automações e Sites — Neovanguard",
  description:
    "Exemplos reais do que a Neovanguard constrói: ferramentas sob medida (PDV, agendamento, IA), automações que trabalham sozinhas e sites completos e navegáveis.",
  path: "/exemplos",
});

export default function ExemplosPage() {
  return (
    <main id="main" className="exemplos-page">
      <BlueprintStage accent="teal" />
      <section className="exemplos-hero">
        <div className="inner">
          <Link href="/" className="exemplos-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Voltar para a Neovanguard
          </Link>
          <span className="section-eyebrow">Exemplos</span>
          <h1 className="section-heading" data-split>
            Exemplos <span className="text-accent-nvg">de verdade</span>, para
            ver e usar
          </h1>
          <p className="section-sub">
            Três coleções: <strong>ferramentas</strong> que resolvem um
            problema específico, <strong>automações</strong> que trabalham
            sozinhas e <strong>sites</strong> completos e navegáveis. Escolha
            o tipo, filtre por categoria e explore.
          </p>
        </div>
      </section>

      <section className="exemplos-grid-section">
        <div className="inner">
          <ExemplosGrid />

          <div className="exemplos-foot" data-parallax="0.1">
            <p>Gostou de algum? Personalizamos com a sua marca, textos e fotos.</p>
            <Link href="/solucao" className="btn-primary">Montar minha solução</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
