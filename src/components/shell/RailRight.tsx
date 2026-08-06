"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WA, UTEIS } from "@/lib/constants";
import { ArrowUpRight } from "@/components/icons";

/**
 * TRILHO DIREITO — o que o visitante costuma precisar DEPOIS de já estar
 * numa página: estado do estúdio, atalhos utilitários, consulta rápida,
 * legal e voltar ao topo. Espelha o trilho esquerdo e também nunca some.
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
          Resposta em até 3h úteis · entrega em até 16 dias · escopo fechado
          antes de começar.
        </p>
      </div>

      <Link href="/solucao" className="rail-cta rail-cta--accent">
        Consulta rápida
        <ArrowUpRight />
      </Link>

      <div className="rcard">
        <span className="rcard-h">Úteis</span>
        <div className="rlinks">
          {UTEIS.map((u) => (
            <Link key={u.href} href={u.href} className="rlink">
              {u.label}
              <ArrowUpRight />
            </Link>
          ))}
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="rlink"
          >
            WhatsApp
            <ArrowUpRight />
          </a>
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
        <span>CNPJ 100% remoto · BR</span>
      </div>
    </aside>
  );
}
