"use client";

import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { usePathname } from "next/navigation";
import { NAV, VERSAO } from "@/lib/constants";

/**
 * TRILHO ESQUERDO — NAVEGAÇÃO, e só. Aqui estão todos os destinos do site,
 * em linhas compactas no mesmo padrão de cartão do trilho direito: os blocos
 * chapados de 124px viviam encavalados e roubavam a coluna inteira. A cor da
 * rota sobrou onde importa — uma lasca vertical no canto esquerdo da linha.
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
        <span className="rail-tag">Arch Linux · GPL-3.0</span>
      </Link>

      <nav className="navcard" aria-label="Seções">
        <span className="rcard-h">Ir para</span>
        {NAV.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={`nlink nlink--${r.tone}`}
            aria-current={path === r.href ? "page" : undefined}
          >
            <span className="nlink-n">{r.n}</span>
            <span className="nlink-label">{r.label}</span>
            <ArrowUpRight />
          </Link>
        ))}
      </nav>

      {/* O CTA de um site de distro é um só, e é baixar. Interno e não
          externo: a página de download explica as três imagens antes de
          entregar um arquivo de 4 GB para alguém que não sabe qual quer. */}
      <Link href="/baixar" className="rail-cta">
        Baixar o Neovanguard OS
        <span className="rail-cta-v">{VERSAO}</span>
      </Link>

      <div className="rmeta">
        <span>livre e de código aberto</span>
        <span>© {new Date().getFullYear()} Neovanguard</span>
      </div>
    </aside>
  );
}
