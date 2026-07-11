import { pageMetadata } from "@/lib/seo";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = {
  ...pageMetadata({
    title: "Styleguide — Neobsidian",
    description: "Primitivos vivos do design system Neobsidian.",
    path: "/estilo",
  }),
  robots: { index: false }, // interno
};

/* #057 · Styleguide VIVO: os primitivos reais renderizados com as classes
   reais — se algo divergir aqui, divergiu no site. Não indexada. */
export default function EstiloPage() {
  return (
    <main id="main" className="legal">
      <BlueprintStage code="styleguide" index="S0" />
      <div className="legal-body" style={{ maxWidth: 880 }}>
        <span className="section-eyebrow">Design system</span>
        <h1 className="section-heading">Neobsidian — primitivos</h1>

        <h2>Cores</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            ["#6c5cff", "violeta único"],
            ["#9d8cff", "violeta claro"],
            ["#040309", "obsidian"],
            ["#f0f0f0", "texto"],
          ].map(([hex, name]) => (
            <div key={hex} className="card-1" style={{ padding: 14, minWidth: 130 }}>
              <span style={{ display: "block", height: 34, background: hex, border: "1px solid rgba(255,255,255,.1)" }} />
              <code style={{ fontSize: ".7rem" }}>{hex}</code>
              <p style={{ fontSize: ".75rem", margin: 0 }}>{name}</p>
            </div>
          ))}
        </div>

        <h2>Tipografia</h2>
        <span className="section-eyebrow">eyebrow mono</span>
        <p className="section-heading" style={{ margin: "8px 0" }}>Heading de seção</p>
        <p className="section-sub">Subtítulo — corpo de leitura padrão das internas.</p>

        <h2>Botões</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#" className="btn-primary">Primário</a>
          <a href="#" className="btn-ghost">Ghost</a>
          <a href="#" className="btn-primary btn-whatsapp">WhatsApp</a>
        </div>

        <h2>Cards</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="card-1" style={{ padding: 20 }}>
            <span className="section-eyebrow">card-1</span>
            <p style={{ margin: 0 }}>Bevel + corner ticks no hover.</p>
          </div>
          <div className="card-2" style={{ padding: 20 }}>
            <span className="section-eyebrow">card-2</span>
            <p style={{ margin: 0 }}>Variação de superfície.</p>
          </div>
        </div>

        <h2>Regras de ouro</h2>
        <ul>
          <li>Violeta único <code>#6c5cff</code> — sem cores concorrentes (tier pages: hue só em detalhes).</li>
          <li>Nada redondo: bevel e cantos retos; hairline de 1px.</li>
          <li>Labels mono com prefixo <code>{"// "}</code> (via ::before do eyebrow).</li>
          <li>Todo motion respeita <code>prefers-reduced-motion</code>.</li>
        </ul>
      </div>
    </main>
  );
}
