import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Exemplos de Sites — Neovanguard",
  description:
    "Modelos de sites prontos da Neovanguard. Clique em qualquer exemplo e navegue pelo site completo, funcionando de verdade.",
};

export default function ExemplosPage() {
  return (
    <main id="main" className="exemplos-page">
      <section className="exemplos-hero">
        <div className="inner">
          <Link href="/" className="exemplos-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Voltar para a Neovanguard
          </Link>
          <h1 className="section-heading">
            Veja sites <span className="text-accent-nvg">de verdade</span>, prontos pra usar
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
          <div className="exemplos-grid">
            {TEMPLATES.map((t) => (
              <a
                key={t.slug}
                className="exemplo-card"
                href={`/templates/${t.slug}/index.html`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ["--card-accent" as string]: t.accent }}
              >
                <div className="exemplo-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/exemplos/${t.slug}.webp`} alt={`Prévia de site — ${t.category}`} loading="lazy" width={760} height={534} />
                  <span className="exemplo-open">
                    Abrir exemplo
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
                  </span>
                </div>
                <div className="exemplo-body">
                  <h3 className="exemplo-name">{t.category}</h3>
                  <p className="exemplo-desc">{t.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="exemplos-foot">
            <p>Gostou de algum? A gente personaliza com a sua marca, textos e fotos.</p>
            <Link href="/orcamento" className="btn-primary">Montar meu orçamento</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
