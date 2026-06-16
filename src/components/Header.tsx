"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Quem somos", href: "/sobre" },
  { label: "Orçamento", href: "/orcamento" },
  { label: "Pacotes", href: "/pacotes" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={[
          "site-header",
          scrolled ? "is-scrolled" : "",
          menuOpen ? "is-menu-open" : "",
        ].join(" ")}
      >
        <div className="site-header-inner">

          <Link
            href="/"
            className="wordmark"
            aria-label="NEOVANGUARD — página inicial"
            onClick={closeMenu}
          >
            <img src="/logo.png" alt="" aria-hidden className="nav-logo" />
            <span className="wordmark-text">
              N<span className="accent-letters">E</span>OVANGUAR
              <span className="accent-letters">D</span>
            </span>
          </Link>

          <div className="site-header-right">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Solicitar orçamento
            </a>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-overlay"
            >
              <span className="menu-toggle-label">
                {menuOpen ? "Fechar" : "Menu"}
              </span>
              <span className="menu-toggle-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-overlay"
        className={`menu-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="menu-nav" aria-label="Navegação principal">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`menu-link${pathname === href ? " is-active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
              onClick={closeMenu}
            >
              <span className="menu-link-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="menu-link-label">{label}</span>
            </Link>
          ))}
        </nav>

        <aside className="menu-aside">
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
          <a href="mailto:contato@neovanguard.com.br" className="menu-contact">
            contato@neovanguard.com.br
          </a>

          <div className="menu-aside-meta">
            <span>100% remoto · atende o Brasil inteiro</span>
            <span>Entrega em até 16 dias úteis</span>
          </div>
        </aside>
      </div>
    </>
  );
}
