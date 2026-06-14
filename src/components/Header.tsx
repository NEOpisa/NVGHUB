"use client";

import { useEffect, useState } from "react";
import NoxzModal from "@/components/NoxzSection";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Orçamento", href: "#orcamento" },
  { label: "Pacotes", href: "#precos" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [noxzOpen, setNoxzOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = () => setNoxzOpen(true);
    window.addEventListener("open-noxz", handler);
    return () => window.removeEventListener("open-noxz", handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
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
        <a href="#hero" className="wordmark" aria-label="NEOVANGUARD — página inicial" onClick={closeMobile}>
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
        <nav aria-label="Navegação principal" className="nav-desktop">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
          <button className="nav-link nav-link-btn" onClick={() => setNoxzOpen(true)}>
            Metodologia
          </button>
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="nav-cta btn-whatsapp">
            Solicitar orçamento
          </a>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="nav-mobile-toggle-bar" />
            <span className="nav-mobile-toggle-bar" />
            <span className="nav-mobile-toggle-bar" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="nav-mobile-overlay" onClick={closeMobile} aria-hidden="true" />
      )}
      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Navegação mobile" className="nav-mobile-menu">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-mobile-link" onClick={closeMobile}>
              {label}
            </a>
          ))}
          <button
            className="nav-mobile-link"
            onClick={() => {
              setNoxzOpen(true);
              closeMobile();
            }}
          >
            Metodologia
          </button>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary nav-mobile-cta btn-whatsapp"
            onClick={closeMobile}
          >
            <WhatsAppIcon />
            Solicitar orçamento
          </a>
        </nav>
      )}

      <NoxzModal isOpen={noxzOpen} onClose={() => setNoxzOpen(false)} />
    </>
  );
}
