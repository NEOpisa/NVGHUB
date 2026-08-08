"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ASSUNTOS } from "@/lib/constants";
import { ArrowUpRight } from "@/components/icons";

/**
 * O DECK DE ASSUNTOS — um cartão só, com um verbete por vez, que troca
 * quando a roda do mouse passa por cima dele.
 *
 * A regra do sequestro de rolagem: a roda só é capturada enquanto o deck
 * AINDA TEM para onde ir naquele sentido. Chegou na ponta, o evento volta
 * inteiro para a página. Sem isso, um trilho fixo vira armadilha — o
 * leitor rola, nada acontece na página, e ele não entende por quê.
 *
 * A troca também responde a arrasto (mobile), teclado e clique nos traços
 * do medidor, porque roda de mouse não é a única forma de navegar e
 * ninguém deveria depender dela.
 */

/** delta acumulado (px) para valer uma troca — filtra o tremor do trackpad */
const LIMIAR = 90;
/** trava entre trocas: um gesto de inércia não pode varrer o deck todo */
const REARME = 380;

export default function AssuntosDeck() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  /** já trocou alguma vez? enquanto não, a dica de rolagem pulsa */
  const [tocado, setTocado] = useState(false);

  const caixa = useRef<HTMLDivElement>(null);
  const acumulado = useRef(0);
  const travadoAte = useRef(0);
  const toqueY = useRef<number | null>(null);

  const ir = useCallback((passo: 1 | -1) => {
    setI((atual) => {
      const alvo = atual + passo;
      if (alvo < 0 || alvo >= ASSUNTOS.length) return atual;
      setDir(passo);
      setTocado(true);
      return alvo;
    });
  }, []);

  // roda do mouse — listener nativo porque precisa ser { passive: false }
  // para poder segurar a página, e o React registra wheel como passivo
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const passo: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const proximo = i + passo;
      // na ponta: devolve a rolagem para a página, sem preventDefault
      if (proximo < 0 || proximo >= ASSUNTOS.length) {
        acumulado.current = 0;
        return;
      }
      e.preventDefault();

      const agora = e.timeStamp;
      if (agora < travadoAte.current) return;

      // inverteu o sentido? zera, senão o resto do gesto anterior conta
      if (Math.sign(acumulado.current) !== passo) acumulado.current = 0;
      acumulado.current += e.deltaY;

      if (Math.abs(acumulado.current) >= LIMIAR) {
        acumulado.current = 0;
        travadoAte.current = agora + REARME;
        ir(passo);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [i, ir]);

  // arrasto vertical no toque
  const onTouchStart = (e: React.TouchEvent) => {
    toqueY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (toqueY.current === null) return;
    const d = toqueY.current - e.touches[0].clientY;
    if (Math.abs(d) < 46) return;
    const passo: 1 | -1 = d > 0 ? 1 : -1;
    toqueY.current = null;
    ir(passo);
  };

  const a = ASSUNTOS[i];
  const primeiro = i === 0;
  const ultimo = i === ASSUNTOS.length - 1;

  return (
    <div
      className="deck"
      ref={caixa}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); ir(1); }
        if (e.key === "ArrowUp") { e.preventDefault(); ir(-1); }
      }}
      tabIndex={0}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Assuntos da casa — role para trocar"
    >
      <div className="deck-top">
        <span className="rcard-h">Assuntos da casa</span>
        <span className="deck-cont" aria-hidden="true">
          {String(i + 1).padStart(2, "0")}
          <i>/</i>
          {String(ASSUNTOS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="deck-corpo">
        {/* medidor: um traço por verbete, clicável e com o atual aceso */}
        <div className="deck-medidor" role="tablist" aria-label="Assuntos">
          {ASSUNTOS.map((x, n) => (
            <button
              key={x.k}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={x.t}
              className={`deck-tr${n === i ? " is-on" : ""}`}
              onClick={() => {
                setDir(n > i ? 1 : -1);
                setTocado(true);
                setI(n);
              }}
            />
          ))}
        </div>

        {/* key força o remonte: é o que dispara a entrada a cada troca */}
        <div
          key={a.k}
          className={`deck-verbete deck-verbete--${dir > 0 ? "desce" : "sobe"}`}
          aria-live="polite"
        >
          <span className="deck-k">{a.k}</span>
          <p className="deck-num">
            <b>{a.n}</b>
            <span>{a.nl}</span>
          </p>
          <h3 className="deck-t">{a.t}</h3>
          <p className="deck-d">{a.d}</p>
          <Link href={a.href} className="deck-cta">
            {a.cta}
            <ArrowUpRight />
          </Link>
        </div>
      </div>

      {/* a indicação de que a peça responde à rolagem: a roda desenhada,
          a seta apontando o sentido que ainda resta e o rótulo */}
      <div className={`deck-dica${tocado ? " is-usada" : ""}`}>
        <span className="deck-roda" aria-hidden="true">
          <i />
        </span>
        <span className="deck-dica-tx">
          {ultimo
            ? "role para cima"
            : primeiro
              ? "role aqui para trocar"
              : `faltam ${ASSUNTOS.length - i - 1}`}
        </span>
      </div>
    </div>
  );
}
