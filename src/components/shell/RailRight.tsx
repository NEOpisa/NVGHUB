"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import AssuntosDeck from "@/components/shell/AssuntosDeck";

/**
 * TRILHO DIREITO — não é menu nenhum. O esquerdo diz para onde ir; aqui a
 * casa fala: em que pé está o estúdio e o que ela pensa sobre o próprio
 * trabalho (o deck de assuntos, que troca com a roda do mouse).
 *
 * O trilho é sticky pelo TOPO, e isso impõe um teto: o que passar da altura
 * da janela fica abaixo da dobra para sempre, porque uma vez grudado ele não
 * rola mais. Com o deck, o trilho chegou a 899px — mais alto que a janela de
 * um notebook comum. O cartão "Já combinado" saiu por isso, e sem perda: os
 * três compromissos já estão na linha do hero e o deck fala dos três com mais
 * profundidade. Antes de acrescentar peça aqui, meça (scripts/visual-qa.mjs).
 */
export default function RailRight() {
  const [topo, setTopo] = useState(false);

  useEffect(() => {
    const onScroll = () => setTopo(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="rail rail-right" aria-label="Assuntos da casa">
      <div className="rcard">
        <span className="rcard-h">Estado do estúdio</span>
        <p className="rstatus">
          <i aria-hidden="true" />
          Aceitando projetos
        </p>
        <p className="rcard-note">
          Respondemos em até 3h úteis, de segunda a sexta.
        </p>
      </div>

      <Link href="/solucao" className="rail-cta rail-cta--accent">
        Consulta rápida
        <ArrowUpRight />
      </Link>
      <p className="rcta-note">3 perguntas · sem compromisso</p>

      <AssuntosDeck />

      {topo && (
        <button
          type="button"
          className="rail-cta"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          Voltar ao topo
        </button>
      )}

      <div className="rmeta">
        <Link href="/privacidade">Privacidade</Link>
        <Link href="/termos">Termos</Link>
      </div>
    </aside>
  );
}
