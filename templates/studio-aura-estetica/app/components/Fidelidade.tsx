"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const TOTAL_SELOS = 5;

export default function Fidelidade() {
  const [selos, setSelos] = useState<boolean[]>(Array(TOTAL_SELOS).fill(false));

  const toggleSelo = (index: number) => {
    setSelos((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const n = selos.filter(Boolean).length;
  const hint =
    n === TOTAL_SELOS
      ? "🎉 Cartão completo! Próximo serviço é por nossa conta."
      : `${n} de 5 selos — seu próximo mimo está chegando`;

  return (
    <section className="fid" id="fidelidade">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Clube [Nome do Studio]</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Fidelidade que vira presente
          </h2>
          <p style={{ marginTop: "16px" }}>
            A cada atendimento, um selo no seu cartão digital. Complete cinco
            e o sexto serviço é por nossa conta. Sem cartãozinho de papel
            para perder — tudo no seu cadastro.
          </p>
          <p style={{ marginTop: "12px", fontSize: ".9rem" }}>
            ✨ Experimente: toque nos selos do cartão ao lado.
          </p>
        </Reveal>
        <Reveal className="fid-card">
          <div className="top">
            <b>[Nome do Studio]</b>
            <span>Cartão fidelidade</span>
          </div>
          <div className="selos" id="selos">
            {selos.map((on, i) => (
              <div
                key={i}
                className={`selo${on ? " on" : ""}`}
                onClick={() => toggleSelo(i)}
              >
                ✦
              </div>
            ))}
          </div>
          <p className="hint" id="fid-hint">
            {hint}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
