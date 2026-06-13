"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const projetos = [
  { n: "01", t: "Casa Pátio", tipo: "Residencial", ano: "2024", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80" },
  { n: "02", t: "Edifício Lâmina", tipo: "Corporativo", ano: "2023", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80" },
  { n: "03", t: "Galpão Industrial Norte", tipo: "Industrial", ano: "2023", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" },
  { n: "04", t: "Retrofit Centro", tipo: "Reforma", ano: "2022", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&q=80" },
  { n: "05", t: "Residência Mata", tipo: "Residencial", ano: "2022", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80" },
  { n: "06", t: "Clínica Branca", tipo: "Institucional", ano: "2021", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80" },
];

export default function Projetos() {
  const [active, setActive] = useState<string | null>(null);

  const current = projetos.find((p) => p.n === active);

  return (
    <div className="proj-wrap">
      <div className="sec-head">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>
            Projetos selecionados
          </p>
          <h2>Índice de obras 2021—2024</h2>
        </Reveal>
        <Reveal>
          <p>
            Uma seleção do que construímos. Passe o cursor para ver cada projeto
            — substitua por fotos e textos reais do seu portfólio.
          </p>
        </Reveal>
      </div>

      <Reveal as="div" className="proj-list">
        {projetos.map((p) => (
          <a
            key={p.n}
            className="proj"
            href="#contato"
            onMouseEnter={() => setActive(p.n)}
            onMouseLeave={() => setActive((a) => (a === p.n ? null : a))}
          >
            <span className="idx">{p.n}</span>
            <h3>{p.t}</h3>
            <span className="pt">{p.tipo}</span>
            <span className="py">São Paulo - SP · {p.ano}</span>
            <span className="go" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
        ))}
      </Reveal>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`proj-thumb${active ? " show" : ""}`}
        src={current?.img || projetos[0].img}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
