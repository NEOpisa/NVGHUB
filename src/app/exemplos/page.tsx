import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import BlueprintStage from "@/components/BlueprintStage";
import ExemplosGrid from "@/components/ExemplosGrid";

export const metadata = pageMetadata({
  title: "Exemplos de Sites — Neovanguard",
  description:
    "Modelos de sites prontos da Neovanguard. Clique em qualquer exemplo e navegue pelo site completo, funcionando de verdade.",
  path: "/exemplos",
});

export default function ExemplosPage() {
  return (
    <main id="main" className="exemplos-page">
      <BlueprintStage code="exemplos" index="04" />
      <section className="exemplos-hero">
        <div className="inner">
          <Link href="/" className="exemplos-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Voltar para a Neovanguard
          </Link>
          <span className="section-eyebrow">Exemplos</span>
          <h1 className="section-heading" data-split>
            Veja sites <span className="text-accent-nvg">de verdade</span>, prontos para usar
          </h1>
          <p className="section-sub">
            Cada modelo abaixo é um site completo e funcionando. Clique em
            &ldquo;Abrir exemplo&rdquo; e navegue como se fosse seu — depois é só
            personalizar com a sua marca.
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
