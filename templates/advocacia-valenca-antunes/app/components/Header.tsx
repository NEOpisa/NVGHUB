"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#areas", label: "Áreas de atuação" },
  { href: "#socios", label: "Sócios" },
  { href: "#insights", label: "Insights" },
  { href: "#contato", label: "Contato" },
  { href: "#", label: "Área do cliente" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={rolou || open ? "rolou" : undefined}>
        <div className="wrap">
          <nav>
            <a className="logo" href="#">
              Valença <em>&amp;</em> Antunes
              <small>Advocacia</small>
            </a>
            <ul className="nav-links">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a className="btn nav-cta" href="#contato">
              Agendar consulta
            </a>
            <button
              className="nav-burger"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <nav className="nav-mobile" aria-label="Menu mobile">
          <div>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
          <a className="btn solid" href="#contato" onClick={() => setOpen(false)}>
            Agendar consulta
          </a>
        </nav>
      )}
    </>
  );
}
