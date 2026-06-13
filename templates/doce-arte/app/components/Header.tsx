"use client";

import { useState } from "react";
import { useStore } from "@/app/context/StoreContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCozinhaModal } = useStore();

  return (
    <nav>
      <div className="nav-logo">
        Doce <span>Arte</span>
      </div>
      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        <li>
          <a href="#mais-vendidos" onClick={() => setMenuOpen(false)}>
            Destaques
          </a>
        </li>
        <li>
          <a href="#cardapio" onClick={() => setMenuOpen(false)}>
            Cardápio
          </a>
        </li>
        <li>
          <a href="#historia" onClick={() => setMenuOpen(false)}>
            Nossa História
          </a>
        </li>
        <li>
          <a href="#encomendas" onClick={() => setMenuOpen(false)}>
            Encomendas
          </a>
        </li>
        <li>
          <a href="#info" onClick={() => setMenuOpen(false)}>
            Localização
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              openCozinhaModal();
            }}
          >
            Cozinha
          </a>
        </li>
      </ul>
      <a href="#pedido" className="nav-cta">
        Pedir agora
      </a>
      <div className="hamburger" onClick={() => setMenuOpen((v) => !v)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
