"use client";

import { useState } from "react";
import { antesDepois } from "../site.config";
import Reveal from "./Reveal";

/* Comparador de antes & depois com fotos reais da mesma cliente.
   Um único <input type="range"> invisível cobre a moldura inteira:
   arrastar, tocar e setas do teclado funcionam de graça. */

export default function AntesDepois() {
  const [pos, setPos] = useState(50);

  return (
    <section className="ba" id="resultados">
      <div className="wrap">
        <Reveal as="header" className="sec-head stack">
          <h2>{antesDepois.titulo}</h2>
        </Reveal>

        <Reveal>
          <div className="ba-frame" style={{ "--ba": `${pos}%` } as React.CSSProperties}>
            <img
              className="ba-before"
              src={antesDepois.antes.src}
              alt={antesDepois.antes.alt}
              loading="lazy"
              width={800}
              height={1067}
            />
            <img
              className="ba-after"
              src={antesDepois.depois.src}
              alt={antesDepois.depois.alt}
              loading="lazy"
              width={800}
              height={1067}
            />
            <div className="ba-divider" aria-hidden>
              <span className="ba-grip">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 6 3.5 12 9 18M15 6l5.5 6L15 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <span className="ba-tag antes">Antes</span>
            <span className="ba-tag depois">Depois</span>
            <input
              className="ba-range"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Arraste para comparar o antes e o depois"
            />
          </div>
        </Reveal>

        <p className="ba-note">{antesDepois.legenda}</p>
      </div>
    </section>
  );
}
