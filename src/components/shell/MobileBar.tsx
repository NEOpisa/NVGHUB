"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WA, ROTAS, UTEIS, FATOS } from "@/lib/constants";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";

/**
 * MOBILE — no lugar dos dois trilhos (que somem abaixo de 980px), uma barra
 * no topo: marca, a ação principal e o botão de menu. O menu abre em tela
 * cheia com os destinos CENTRALIZADOS; abaixo deles, o que o trilho direito
 * carrega no desktop (estado, combinados e leitura).
 */
export default function MobileBar() {
  const [aberto, setAberto] = useState(false);
  const path = usePathname();

  // rota mudou → fecha
  useEffect(() => setAberto(false), [path]);

  // menu aberto trava a rolagem do fundo
  useEffect(() => {
    document.body.classList.toggle("menu-aberto", aberto);
    return () => document.body.classList.remove("menu-aberto");
  }, [aberto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="mbar">
        <Link href="/" className="mbar-brand" aria-label="NEOVANGUARD — início">
          <img src="/logo.svg" alt="" aria-hidden="true" width={34} height={25} />
          <span>
            neovanguard<b>.</b>
          </span>
        </Link>

        <Link href="/solucao" className="mbar-cta">
          Consulta rápida
        </Link>

        <button
          type="button"
          className="mbar-burger"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <span className={aberto ? "is-x" : ""} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      {aberto && (
        <div className="mmenu" role="dialog" aria-modal="true" aria-label="Menu">
          <nav className="mmenu-nav">
            {ROTAS.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`mmenu-item${path === r.href ? " is-on" : ""}`}
              >
                <span className="mmenu-n">{r.n}</span>
                {r.label}
              </Link>
            ))}
          </nav>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="pill mmenu-wa"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>

          <div className="mmenu-fatos">
            <p className="rstatus">
              <i aria-hidden="true" />
              Aceitando projetos · resposta em até 3h
            </p>
            <dl className="rfatos">
              {FATOS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mmenu-uteis">
            {UTEIS.map((u) => (
              <Link key={u.href} href={u.href} className="rlink">
                {u.label}
                <ArrowUpRight />
              </Link>
            ))}
            <Link href="/privacidade" className="rlink">
              Privacidade
              <ArrowUpRight />
            </Link>
            <Link href="/termos" className="rlink">
              Termos
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
