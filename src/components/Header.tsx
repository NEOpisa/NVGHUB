"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Pacotes", href: "/pacotes" },
  { label: "Quem somos", href: "/sobre" },
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideBrand, setHideBrand] = useState(false);
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

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHideBrand(false);
      return;
    }
    setHideBrand(true);
    const io = new IntersectionObserver(
      ([entry]) => setHideBrand(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={[
          "site-header",
          scrolled ? "is-scrolled" : "",
          menuOpen ? "is-menu-open" : "",
          hideBrand && !menuOpen ? "brand-hidden" : "",
        ].join(" ")}
      >
        <div className="site-header-inner">

          <Link
            href="/"
            className="wordmark"
            aria-label="NEOVANGUARD — página inicial"
            onClick={closeMenu}
          >
            <img src="/logo.png" alt="" aria-hidden width={43} height={32} className="nav-logo" />
            <span className="wordmark-text">
              NEO<b>VANGUARD</b>
            </span>
          </Link>

          <div className="site-header-right">
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
          <Link href="/solucao" className="menu-solucao-cta" onClick={closeMenu}>
            <span className="menu-solucao-cta-label">Sua solução</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
          <a href="mailto:comercial@neovanguard.com.br" className="menu-contact">
            comercial@neovanguard.com.br
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
