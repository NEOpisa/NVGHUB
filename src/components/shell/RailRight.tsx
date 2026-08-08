"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ASSUNTOS, FATOS } from "@/lib/constants";
import { ArrowUpRight } from "@/components/icons";

/**
 * TRILHO DIREITO — não é menu nenhum. O esquerdo diz para onde ir; aqui a
 * casa fala: em que pé está o estúdio, o que ela pensa sobre o próprio
 * trabalho (os assuntos) e o que já está combinado antes de você perguntar.
 * Cada assunto tem um argumento em uma linha — se o link fosse tirado, o
 * cartão continuaria valendo por si.
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

      <div className="rcard">
        <span className="rcard-h">Assuntos da casa</span>
        <div className="assuntos">
          {ASSUNTOS.map((a) => (
            <Link key={a.k} href={a.href} className="assunto">
              <span className="assunto-k">{a.k}</span>
              <span className="assunto-t">
                {a.t}
                <ArrowUpRight />
              </span>
              <span className="assunto-d">{a.d}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rcard">
        <span className="rcard-h">Já combinado</span>
        <dl className="rfatos">
          {FATOS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

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
