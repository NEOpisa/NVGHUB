"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Pacotes", href: "/pacotes" },
  { label: "Quem somos", href: "/sobre" },
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Contato", href: "/contato" },
];

/**
 * Página /menu — a navegação principal virou uma ROTA com fundo de canvas
 * próprio (variante da cena, ativada por SceneCanvas em pathname === "/menu").
 * A transição (logo se abrindo) entra de graça pela PageTransition nos <Link>.
 */
export default function MenuView() {
  const router = useRouter();
  const pathname = usePathname();

  // Esc fecha (volta).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="menu-page" aria-label="Menu de navegação">
      <div className="menu-page-inner">
        <nav className="menu-nav" aria-label="Navegação principal">
          <span className="menu-nav-eyebrow" aria-hidden="true">
            Navegação
          </span>
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`menu-link${pathname === href ? " is-active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <span className="menu-link-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="menu-link-label">{label}</span>
            </Link>
          ))}
        </nav>

        <aside className="menu-aside">
          <Link href="/solucao" className="menu-solucao-cta">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
            </svg>
            <span className="menu-solucao-cta-label">Sua solução</span>
          </Link>

          <span className="menu-aside-label">Vamos conversar</span>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-contact"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-contact"
          >
            <InstagramIcon size={16} />
            Instagram
          </a>
          <a
            href="mailto:comercial@neovanguard.com.br"
            className="menu-contact"
          >
            comercial@neovanguard.com.br
          </a>

          <div className="menu-aside-meta">
            <span>100% remoto · atende o Brasil inteiro</span>
            <span>Entrega em até 16 dias úteis</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
