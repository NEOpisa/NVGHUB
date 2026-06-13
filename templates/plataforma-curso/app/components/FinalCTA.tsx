"use client";

export default function FinalCTA() {
  function scrollToPricing() {
    document.getElementById("pricingSection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section style={{ padding: "6rem 2rem", textAlign: "center", background: "var(--ink-soft)" }}>
      <div className="section-inner">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="section-label">Última chamada</div>
          <h2 className="section-title">
            A mesma decisão que adiou vai <em>continuar adiando</em>
          </h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "3rem", lineHeight: 1.7 }}>
            Daqui a 12 meses, você vai estar em dois lugares: no mesmo patamar de hoje, ou com um
            sistema funcionando que claramente veio de uma decisão diferente. O método existe. A
            vaga está disponível. O que decide é você.
          </p>
          <button
            className="btn-primary"
            onClick={scrollToPricing}
            style={{ fontSize: "1rem", padding: "1.1rem 3rem" }}
          >
            Quero minha vaga agora →
          </button>
          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "1.5rem" }}>
            Vagas limitadas · Turma 2025 · Garantia de 7 dias
          </p>
        </div>
      </div>
    </section>
  );
}
