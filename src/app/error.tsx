"use client";

// #079 · erro de runtime na linguagem Neobsidian, com recuperação (reset).
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="nf-stage">
      <div className="nf-card card-1" role="alert">
        <span className="section-eyebrow">falha de sistema</span>
        <h1 className="nf-code">500</h1>
        <p className="nf-msg">
          Algo quebrou do nosso lado. O incidente foi registrado
          {error.digest ? ` (ref ${error.digest})` : ""} — tente de novo.
        </p>
        <div className="nf-actions">
          <button type="button" className="btn-primary" onClick={reset}>
            Tentar novamente
          </button>
          <a href="/" className="btn-ghost">
            Voltar ao início
          </a>
        </div>
      </div>
    </main>
  );
}
