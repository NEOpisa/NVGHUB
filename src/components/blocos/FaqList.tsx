"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string; tag: string };

/** Acordeão do sistema — uma resposta aberta por vez, tudo sempre no DOM. */
export default function FaqList({ itens }: { itens: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div>
      {itens.map((f, i) => {
        const isOpen = open === i;
        return (
          <article key={f.q} className={`acc${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="acc-q"
              aria-expanded={isOpen}
              aria-controls={`${id}-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="acc-code" aria-hidden="true">
                Q_{String(i + 1).padStart(2, "0")}
              </span>
              <span>{f.q}</span>
              <span className="tag" aria-hidden="true">
                {f.tag}
              </span>
              <span className="acc-sign" aria-hidden="true" />
            </button>
            <div className="acc-a" id={`${id}-${i}`} hidden={!isOpen}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
