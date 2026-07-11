"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { TEMPLATES } from "@/lib/templates";

/* Filtro por SEGMENTO (as 12 categorias são únicas — agrupamos em 4 grupos
   úteis). Chips mono no padrão Neobsidian; grid re-renderiza filtrada. */
const SEGMENTS: Record<string, string[]> = {
  Alimentação: ["Restaurante & Delivery", "Confeitaria"],
  "Saúde & bem-estar": ["Odontologia & Saúde", "Estética & Beleza", "Academia & CrossFit"],
  "Serviços profissionais": [
    "Advocacia & Jurídico", "Arquitetura & Engenharia", "Imobiliária", "Oficina & Auto Center",
  ],
  "Comércio & turismo": ["Moda & Vestuário", "Pousada & Turismo", "Curso & Plataforma"],
};
const ALL = "Todos";

export default function ExemplosGrid() {
  const [seg, setSeg] = useState(ALL);
  const list = useMemo(() => {
    if (seg === ALL) return TEMPLATES;
    const cats = new Set(SEGMENTS[seg] ?? []);
    return TEMPLATES.filter((t) => cats.has(t.category));
  }, [seg]);

  return (
    <>
      <div className="exemplos-filter" role="group" aria-label="Filtrar por segmento">
        {[ALL, ...Object.keys(SEGMENTS)].map((s) => (
          <button
            key={s}
            type="button"
            className={`exemplos-chip${s === seg ? " is-on" : ""}`}
            aria-pressed={s === seg}
            onClick={() => setSeg(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="exemplos-grid">
        {list.map((t, i) => (
          <a
            key={t.slug}
            className="exemplo-card"
            href={`/templates/${t.slug}/index.html`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ["--card-accent" as string]: t.accent }}
          >
            <div className="exemplo-thumb">
              <Image
                src={`/exemplos/${t.slug}.webp`}
                alt={`Prévia de site — ${t.category}`}
                width={760}
                height={534}
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                priority={i < 3}
                loading={i < 3 ? undefined : "lazy"}
              />
              <span className="exemplo-open">
                Abrir exemplo
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </span>
            </div>
            <div className="exemplo-body">
              <h3 className="exemplo-name">{t.category}</h3>
              <p className="exemplo-desc">{t.description}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
