"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WA, ROTAS } from "@/lib/constants";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";

/**
 * TRILHO ESQUERDO — as rotas principais do site, sempre visíveis (sticky em
 * desktop, faixa no topo em telas estreitas). Substitui o header + overlay
 * de menu antigos: navegação é peça de layout, não modal.
 */
export default function RailLeft() {
  const path = usePathname();

  return (
    <aside className="rail rail-left" aria-label="Navegação principal">
      <Link href="/" className="rail-brand" aria-label="NEOVANGUARD — início">
        <img src="/logo.svg" alt="" aria-hidden="true" width={44} height={32} />
        <span className="rail-brand-word">
          neovanguard<b>.</b>
        </span>
        <span className="rail-tag">ferramentas para negócios</span>
      </Link>

      <nav className="rail-nav" aria-label="Seções">
        {ROTAS.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={`tile tile--${r.tone}`}
            aria-current={path === r.href ? "page" : undefined}
          >
            <span className="tile-n">{r.n}</span>
            <span className="tile-arrow">
              <ArrowUpRight />
            </span>
            <span className="tile-label">{r.label}</span>
          </Link>
        ))}
      </nav>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="rail-cta"
      >
        <WhatsAppIcon />
        Falar no WhatsApp
      </a>

      <div className="rmeta">
        <span>Brasil · 100% remoto</span>
        <span>© {new Date().getFullYear()} Neovanguard</span>
      </div>
    </aside>
  );
}
