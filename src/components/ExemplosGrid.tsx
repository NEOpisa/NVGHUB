"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { TEMPLATES } from "@/lib/templates";
import {
  FERRAMENTAS,
  FERRAMENTA_CATS,
  AUTOMACOES,
  AUTOMACAO_CATS,
  type FerramentaItem,
} from "@/lib/ferramentas";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

/* Três coleções — FERRAMENTAS (sistemas e painéis), AUTOMAÇÕES (robôs e
   rotinas) e SITES (modelos navegáveis). O menu de tipos troca a coleção
   inteira; dentro de cada uma, chips filtram por categoria. */

/* Sites: as 12 categorias agrupadas em 4 segmentos úteis */
const SEGMENTS: Record<string, string[]> = {
  Alimentação: ["Restaurante & Delivery", "Confeitaria"],
  "Saúde & bem-estar": ["Odontologia & Saúde", "Estética & Beleza", "Academia & CrossFit"],
  "Serviços profissionais": [
    "Advocacia & Jurídico", "Arquitetura & Engenharia", "Imobiliária", "Oficina & Auto Center",
  ],
  "Comércio & turismo": ["Moda & Vestuário", "Pousada & Turismo", "Curso & Plataforma"],
};
const ALL = "Todos";

type Collection = "ferramentas" | "automacoes" | "sites";

const MENU: {
  id: Collection;
  label: string;
  desc: string;
}[] = [
  {
    id: "ferramentas",
    label: "Exemplos de Ferramentas",
    desc: "Sistemas, painéis e IA sob medida",
  },
  {
    id: "automacoes",
    label: "Exemplos de Automações",
    desc: "Robôs e rotinas que trabalham sozinhos",
  },
  {
    id: "sites",
    label: "Exemplos de Sites",
    desc: "Sites completos, navegáveis de verdade",
  },
];

const CHIPS: Record<Collection, string[]> = {
  ferramentas: [ALL, ...FERRAMENTA_CATS],
  automacoes: [ALL, ...AUTOMACAO_CATS],
  sites: [ALL, ...Object.keys(SEGMENTS)],
};

function FerCard({ f }: { f: FerramentaItem }) {
  return (
    <article
      className="fer-card"
      style={{ ["--card-accent" as string]: f.accent }}
    >
      <span className="fer-bar" aria-hidden="true" />
      <span className="fer-cat">{f.category}</span>
      <h3 className="fer-title">{f.title}</h3>
      <dl className="fer-case">
        <div>
          <dt>Problema</dt>
          <dd>{f.problema}</dd>
        </div>
        <div>
          <dt>Ferramenta</dt>
          <dd>{f.ferramenta}</dd>
        </div>
      </dl>
      <p className="fer-resultado">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        {f.resultado}
      </p>
      <ul className="fer-tags">
        {f.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <a
        href={`${WA}?text=${encodeURIComponent(`Quero uma ferramenta assim: ${f.title}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fer-cta"
      >
        <WhatsAppIcon />
        Quero uma assim
      </a>
    </article>
  );
}

export default function ExemplosGrid() {
  const [col, setCol] = useState<Collection>("ferramentas");
  const [seg, setSeg] = useState(ALL);

  const sites = useMemo(() => {
    if (seg === ALL) return TEMPLATES;
    const cats = new Set(SEGMENTS[seg] ?? []);
    return TEMPLATES.filter((t) => cats.has(t.category));
  }, [seg]);

  const cases = useMemo(() => {
    const src = col === "automacoes" ? AUTOMACOES : FERRAMENTAS;
    if (seg === ALL) return src;
    return src.filter((f) => f.category === seg);
  }, [col, seg]);

  const switchCol = (c: Collection) => {
    setCol(c);
    setSeg(ALL); // cada coleção tem suas categorias
  };

  return (
    <>
      {/* menu de TIPOS de exemplo: a primeira escolha do visitante */}
      <div className="exemplos-menu" role="tablist" aria-label="Tipo de exemplo">
        {MENU.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={col === m.id}
            className={`exemplos-menu-btn${col === m.id ? " is-on" : ""}`}
            onClick={() => switchCol(m.id)}
          >
            <span className="exemplos-menu-label">{m.label}</span>
            <span className="exemplos-menu-desc">{m.desc}</span>
          </button>
        ))}
      </div>

      <div className="exemplos-filter" role="group" aria-label="Filtrar por categoria">
        {CHIPS[col].map((s) => (
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

      {col === "sites" ? (
        <div className="exemplos-grid">
          {sites.map((t, i) => (
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
      ) : (
        <div className="exemplos-grid exemplos-grid--fer">
          {cases.map((f) => (
            <FerCard key={f.slug} f={f} />
          ))}
        </div>
      )}
    </>
  );
}
