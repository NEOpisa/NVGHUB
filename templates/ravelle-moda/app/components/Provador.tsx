"use client";

import { useMemo, useState } from "react";
import { site, looks, provador } from "../site.config";
import Reveal from "./Reveal";

const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

export default function Provador() {
  const [i, setI] = useState(0);
  const [tamanho, setTamanho] = useState("M");
  const look = looks[i];

  const go = (d: number) => setI((v) => (v + d + looks.length) % looks.length);

  const waLink = useMemo(() => {
    const msg = [
      provador.saudacao,
      "",
      `Look: ${look.nome} (${look.estilo})`,
      ...look.pecas.map((p) => `— ${p}`),
      `Cor: ${look.cor}`,
      `Tamanho: ${tamanho}`,
      `Total: ${brl(look.preco)}`,
      "",
      "Consigo reservar para provar?",
    ].join("\n");
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [look, tamanho]);

  const num = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section className="provador" id="provador">
      <div className="wrap">
        <Reveal className="sec-head stack" as="div">
          <span className="kicker">Provador virtual</span>
          <h2>{provador.titulo}</h2>
          <p>{provador.lead}</p>
        </Reveal>

        <div className="prov-grid">
          {/* Palco — foto real do look em crossfade */}
          <Reveal className="prov-stage" as="div">
            <div className="prov-viewer">
              {looks.map((l, idx) => (
                <img
                  key={l.id}
                  src={l.src}
                  alt={l.alt}
                  className={idx === i ? "show" : ""}
                  loading={idx === 0 ? "eager" : "lazy"}
                  aria-hidden={idx !== i}
                />
              ))}

              <span className="prov-count">
                {num(i)} <i>/ {num(looks.length - 1)}</i>
              </span>

              <button type="button" className="prov-arrow left" onClick={() => go(-1)} aria-label="Look anterior">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="prov-arrow right" onClick={() => go(1)} aria-label="Próximo look">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Seletor de looks (miniaturas) */}
            <div className="prov-thumbs" role="group" aria-label="Escolha um look">
              {looks.map((l, idx) => (
                <button
                  key={l.id}
                  type="button"
                  className={`prov-thumb${idx === i ? " on" : ""}`}
                  aria-pressed={idx === i}
                  aria-label={l.nome}
                  onClick={() => setI(idx)}
                >
                  <img src={l.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </Reveal>

          {/* Painel do look */}
          <Reveal className="prov-panel" as="div">
            <span className="prov-estilo">{look.estilo}</span>
            <h3 className="prov-look-title">{look.nome}</h3>

            <ul className="prov-pecas-list">
              {look.pecas.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="prov-block">
              <h4>Tons do look</h4>
              <div className="prov-paleta">
                {look.paleta.map((hex) => (
                  <span key={hex} className="prov-dot" style={{ background: hex }} />
                ))}
                <span className="prov-cor-nome">{look.cor}</span>
              </div>
            </div>

            <div className="prov-block">
              <h4>Tamanho</h4>
              <div className="prov-tamanhos">
                {provador.tamanhos.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="prov-tam"
                    aria-pressed={tamanho === t}
                    onClick={() => setTamanho(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="prov-resumo">
              <div className="prov-total">
                <span>Total do look</span>
                <b>{brl(look.preco)}</b>
              </div>

              <a className="btn prov-cta" href={waLink} target="_blank" rel="noopener">
                Reservar este look no WhatsApp
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="prov-nota">Sem compromisso — separamos as peças para você provar na loja.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
