"use client";

import { useState } from "react";
import { rituais, site } from "../site.config";
import Reveal from "./Reveal";

/** Clicar num ritual leva ao agendamento já com o serviço escolhido. */
export function irParaAgendar(ritual: string) {
  window.dispatchEvent(new CustomEvent("aura:ritual", { detail: ritual }));
  const alvo = document.getElementById("agendar");
  const reduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  alvo?.scrollIntoView({ behavior: reduzido ? "auto" : "smooth" });
}

export default function Rituais() {
  // Em telas largas, a prévia lateral fixa acompanha a linha sob o
  // cursor/foco com crossfade; em telas menores o thumb embutido assume.
  const [ativo, setAtivo] = useState(0);

  return (
    <section id="rituais">
      <div className="wrap">
        <Reveal as="header" className="sec-head split">
          <h2>O menu de rituais</h2>
          <p>
            Preço e duração reais, sem surpresa na cadeira. Toque em um ritual
            para reservar.
          </p>
        </Reveal>

        <div className="menu-wrap">
          <Reveal>
            <ul className="menu-list">
              {rituais.map((r, i) => (
                <li className="menu-row" key={r.nome}>
                  <button
                    type="button"
                    className="menu-btn"
                    onClick={() => irParaAgendar(r.nome)}
                    onPointerEnter={() => setAtivo(i)}
                    onFocus={() => setAtivo(i)}
                  >
                    <span className="menu-thumb" aria-hidden>
                      <img
                        src={r.imagem}
                        alt=""
                        loading="lazy"
                        width={140}
                        height={170}
                      />
                    </span>
                    <span className="menu-name">
                      <h3>{r.nome}</h3>
                      <p>{r.desc}</p>
                    </span>
                    <span className="menu-meta">
                      <span className="dur">{r.duracao}</span>
                      <b className="preco">{r.preco}</b>
                      <span className="go" aria-hidden>
                        Reservar ✦
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="menu-foot">
              Dúvidas sobre qual ritual combina com você?{" "}
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  "Olá! Vim pelo site e queria uma indicação de qual ritual combina comigo."
                )}`}
                target="_blank"
                rel="noopener"
              >
                Pergunte no WhatsApp
              </a>
              .
            </p>
          </Reveal>

          <Reveal as="figure" className="menu-side" aria-hidden="true">
            {rituais.map((r, i) => (
              <img
                key={r.nome}
                src={r.imagem}
                alt=""
                loading="lazy"
                className={ativo === i ? "show" : ""}
              />
            ))}
            <figcaption>
              <b>{rituais[ativo].nome}</b>
              <span>
                {rituais[ativo].duracao} · {rituais[ativo].preco}
              </span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
