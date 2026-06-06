"use client";

import { useEffect, useState } from "react";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Preços", href: "#precos" },
  { label: "Noxz", href: "#noxz" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(24px, 4vw, 48px)",
        height: "64px",
        transition: "background 300ms, border-color 300ms, backdrop-filter 300ms",
        borderBottom: scrolled
          ? "1px solid rgba(42,42,42,0.6)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
      }}
    >
      {/* Wordmark */}
      <a href="#hero" className="wordmark" aria-label="NEOVANGUARD — página inicial">
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          className="nav-logo"
        />
        <span className="wordmark-text">
          N<span className="accent-letters">E</span>OVANGUAR
          <span className="accent-letters">D</span>
        </span>
      </a>

      {/* Desktop nav */}
      <nav aria-label="Navegação principal" style={{ display: "flex", alignItems: "center", gap: "32px" }} className="nav-desktop">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Desktop CTA + Mobile hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--accent)",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "var(--radius)",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)")}
        >
          Solicitar orçamento
        </a>
      </div>
    </header>
  );
}
