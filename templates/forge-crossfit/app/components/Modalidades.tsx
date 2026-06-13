"use client";

import { useState } from "react";
import { modalidades } from "@/app/data/modalidades";

export default function Modalidades() {
  const [activeId, setActiveId] = useState(modalidades[0].id);

  return (
    <section id="modalidades" className="sec">
      <h2 className="sec-title">
        O que você <span>treina</span> aqui
      </h2>
      <p className="sec-lead">
        Quatro frentes de treino, uma base comum: movimento bem executado, com
        carga e intensidade ajustadas para o seu nível.
      </p>
      <div className="mod-tabs">
        {modalidades.map((m) => (
          <button
            key={m.id}
            className={`mod-tab${activeId === m.id ? " active" : ""}`}
            onClick={() => setActiveId(m.id)}
            type="button"
          >
            {m.label}
          </button>
        ))}
      </div>

      {modalidades.map((m) => (
        <div
          key={m.id}
          className={`mod-content${activeId === m.id ? " active" : ""}`}
          id={`mod-${m.id}`}
        >
          <div
            className="mod-img"
            style={{ backgroundImage: `url('${m.img}')` }}
          ></div>
          <div className="mod-info">
            <h3>{m.title}</h3>
            {m.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="mod-tags">
              {m.tags.map((tag) => (
                <span className="mod-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
