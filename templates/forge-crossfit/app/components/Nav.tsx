"use client";

import { useState } from "react";
import { useStore } from "@/app/context/StoreContext";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openAreaModal } = useStore();

  return (
    <nav>
      <div className="nav-logo">[Nome da Academia]</div>
      <ul className={`nav-links${mobileOpen ? " mobile-open" : ""}`}>
        <li>
          <a href="#porque" onClick={() => setMobileOpen(false)}>
            Por quê aqui
          </a>
        </li>
        <li>
          <a href="#modalidades" onClick={() => setMobileOpen(false)}>
            Modalidades
          </a>
        </li>
        <li>
          <a href="#planos" onClick={() => setMobileOpen(false)}>
            Planos
          </a>
        </li>
        <li>
          <a href="#horarios" onClick={() => setMobileOpen(false)}>
            Horários
          </a>
        </li>
        <li>
          <a href="#professores" onClick={() => setMobileOpen(false)}>
            Coaches
          </a>
        </li>
        <li>
          <a href="#blog" onClick={() => setMobileOpen(false)}>
            Blog
          </a>
        </li>
      </ul>
      <div className="nav-actions">
        <button className="nav-login" onClick={openAreaModal}>
          Área do aluno
        </button>
        <a href="#experimental" className="nav-aula">
          Aula grátis
        </a>
        <button
          className="hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menu"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
