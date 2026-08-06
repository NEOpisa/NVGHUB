"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="panel" role="alert" aria-labelledby="err-h">
      <span className="eyebrow">Falha de sistema</span>
      <h1 id="err-h" className="h-xl">500</h1>
      <p className="lead">
        Algo quebrou do nosso lado. O incidente foi registrado
        {error.digest ? ` (ref ${error.digest})` : ""} — tente de novo.
      </p>
      <div className="pill-row">
        <button type="button" className="pill" onClick={reset}>
          Tentar de novo
        </button>
        <Link href="/" className="pill pill--ghost">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
