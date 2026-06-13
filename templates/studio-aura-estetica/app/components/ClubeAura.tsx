"use client";

import { useRef, useState } from "react";
import { clube, site } from "../site.config";
import Reveal from "./Reveal";

export default function ClubeAura() {
  const [selos, setSelos] = useState<boolean[]>(
    Array(clube.selos).fill(false)
  );
  const cardRef = useRef<HTMLDivElement | null>(null);

  const toggle = (i: number) =>
    setSelos((prev) => prev.map((v, j) => (j === i ? !v : v)));

  const n = selos.filter(Boolean).length;
  const completo = n === clube.selos;
  const hint = completo
    ? clube.recompensa
    : n === 0
      ? "Cada atendimento vale um selo — toque e experimente"
      : `${n} de ${clube.selos} selos — o próximo mimo está chegando`;

  // Tilt 3D + brilho holográfico seguindo o ponteiro.
  // Só com ponteiro fino e sem reduced-motion; no toque o cartão fica plano.
  const onMove = (e: React.PointerEvent) => {
    const card = cardRef.current;
    if (!card || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    card.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
    card.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  const [antes, destaque] = site.nome.split(site.destaque);

  return (
    <section className="clube" id="clube">
      <div className="wrap clube-grid">
        <Reveal className="clube-copy">
          <h2>{clube.titulo}</h2>
          <p className="texto">{clube.texto}</p>
          <p className="dica">✦ {clube.dica}</p>
        </Reveal>

        <Reveal>
          <div
            className="tilt-zone"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <div className="card3d" ref={cardRef}>
              <div className="card-top">
                <b>
                  {antes}
                  <span>{site.destaque}</span>
                  {destaque}
                </b>
                <em>{clube.nome}</em>
              </div>
              <div
                className="selos"
                role="group"
                aria-label="Selos do cartão fidelidade"
              >
                {selos.map((on, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`selo${on ? " on" : ""}`}
                    onClick={() => toggle(i)}
                    aria-pressed={on}
                    aria-label={`Selo ${i + 1} de ${clube.selos}`}
                  >
                    ✦
                  </button>
                ))}
              </div>
              <p
                className={`card-hint${completo ? " done" : ""}`}
                aria-live="polite"
              >
                {hint}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
