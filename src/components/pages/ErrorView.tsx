"use client";

import Link from "next/link";
import errors from "@/messages/error.json";

/** Limite de erro dos dois idiomas. É componente cliente, então usa um
 * dicionário próprio e pequeno em vez de levar os textos do site ao bundle. */
export default function ErrorView({ locale, error, reset }: { locale: "pt" | "en"; error: Error & { digest?: string }; reset: () => void }) {
  const t = errors[locale];
  return (
    <section className="panel" role="alert" aria-labelledby="err-h">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 id="err-h" className="h-xl">500</h1>
      <p className="lead">
        {t.text}
        {error.digest ? ` ${t.reference.replace("{digest}", error.digest)}` : ""}
      </p>
      <div className="pill-row">
        <button type="button" className="pill" onClick={reset}>
          {t.retry}
        </button>
        <Link href={locale === "en" ? "/en" : "/"} className="pill pill--ghost">
          {t.home}
        </Link>
      </div>
    </section>
  );
}
