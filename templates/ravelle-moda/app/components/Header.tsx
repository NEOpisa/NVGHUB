"use client";

import { useEffect, useState } from "react";
import { site } from "../site.config";

const links = [
  { href: "#provador", label: "Provador" },
  { href: "#colecao", label: "Coleção" },
  { href: "#atelier", label: "Atelier" },
  { href: "#lookbook", label: "Lookbook" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [antes, depois] = site.nome.split(site.destaque);

  return (
    <>
      <header className={`hd${solid || open ? " solid" : ""}`}>
        <div className="wrap">
          <nav>
            <a className="logo" href="#" aria-label={`${site.nome} — início`}>
              {antes}
              <span>{site.destaque}</span>
              {depois}
            </a>

            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <a className="btn-nav" href="#provador">
                Abrir provador
              </a>

              <button
                type="button"
                className="nav-burger"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  {open ? (
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn" href="#provador" onClick={() => setOpen(false)}>
          Abrir o provador
        </a>
      </div>
    </>
  );
}
