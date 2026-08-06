"use client";

import { useMemo, useState } from "react";
import { FERRAMENTAS, AUTOMACOES } from "@/lib/ferramentas";
import { TEMPLATES } from "@/lib/templates";

type Seg = "ferramentas" | "automacoes" | "sites";

const SEGS: { id: Seg; label: string; nota: string }[] = [
  { id: "ferramentas", label: "Ferramentas", nota: "Resolvem um problema específico da operação." },
  { id: "automacoes", label: "Automações", nota: "Trabalham sozinhas, no fundo, todo dia." },
  { id: "sites", label: "Sites", nota: "Presença completa e navegável, pronta pro Google." },
];

const TODAS = "Todas";

/**
 * Vitrine de exemplos: três coleções (ferramentas, automações e sites), com
 * filtro por categoria. Cada card conta a mesma história curta —
 * problema → ferramenta → resultado.
 */
export default function ExemplosGrid() {
  const [seg, setSeg] = useState<Seg>("ferramentas");
  const [cat, setCat] = useState<string>(TODAS);

  const itens = useMemo(
    () => (seg === "ferramentas" ? FERRAMENTAS : seg === "automacoes" ? AUTOMACOES : []),
    [seg],
  );
  const cats = useMemo(() => {
    const base = seg === "sites" ? TEMPLATES.map((t) => t.category) : itens.map((i) => i.category);
    return [TODAS, ...Array.from(new Set(base))];
  }, [seg, itens]);

  const trocaSeg = (s: Seg) => {
    setSeg(s);
    setCat(TODAS);
  };

  const sites = TEMPLATES.filter((t) => cat === TODAS || t.category === cat);
  const lista = itens.filter((i) => cat === TODAS || i.category === cat);
  const nota = SEGS.find((s) => s.id === seg)!.nota;

  return (
    <div>
      <div className="filters" role="tablist" aria-label="Tipo de exemplo">
        {SEGS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={seg === s.id}
            className={`filter${seg === s.id ? " is-on" : ""}`}
            onClick={() => trocaSeg(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="grid-note">{nota}</p>

      <div className="filters" aria-label="Categoria">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter${cat === c ? " is-on" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {seg === "sites" ? (
        <div className="cards">
          {sites.map((t) => (
            <article key={t.slug} className="card card--shot">
              <img
                src={`/exemplos/${t.slug}.webp`}
                alt={`Prévia do site ${t.slug.replace(/-/g, " ")}`}
                loading="lazy"
                width={640}
                height={400}
              />
              <div className="card-body">
                <span className="card-n">{t.category}</span>
                <h3 className="card-t">{t.slug.replace(/-/g, " ")}</h3>
                <p className="card-d">{t.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="cards">
          {lista.map((i) => (
            <article key={i.slug} className="card">
              <span className="card-n">{i.category}</span>
              <h3 className="card-t">{i.title}</h3>
              <p className="card-d">
                <b className="card-lbl">Problema</b>
                {i.problema}
              </p>
              <p className="card-d">
                <b className="card-lbl">Ferramenta</b>
                {i.ferramenta}
              </p>
              <p className="card-res">{i.resultado}</p>
              <div className="card-tags">
                {i.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
