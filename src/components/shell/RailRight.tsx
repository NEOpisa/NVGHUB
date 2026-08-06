"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UTEIS, FATOS } from "@/lib/constants";
import { ArrowUpRight } from "@/components/icons";

/**
 * TRILHO DIREITO — não repete o esquerdo. Lá ficam os DESTINOS (para onde
 * ir); aqui fica o CONTEXTO: se estamos aceitando projeto, o que já está
 * combinado antes de você perguntar, o que dá para ler sobre a casa, e a
 * única ação que não é uma página — a consulta rápida.
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
    <aside className="rail rail-right" aria-label="Atalhos e informações">
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

      <div className="rcard">
        <span className="rcard-h">Sobre a casa</span>
        <div className="rlinks">
          {UTEIS.map((u) => (
            <Link key={u.href} href={u.href} className="rlink">
              {u.label}
              <ArrowUpRight />
            </Link>
          ))}
        </div>
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
