"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={solid ? "solid" : ""}>
      <div className="wrap">
        <a className="logo" href="#">
          Alto Padrão<span>.</span>
        </a>
        <nav className="nav-links">
          <a href="#destaques">Imóveis</a>
          <a href="#bairros">Bairros</a>
          <a href="#processo">Como atendemos</a>
          <a href="#depoimentos">Clientes</a>
          <a href="#contato" className="nav-cta">
            Agendar visita
          </a>
        </nav>
      </div>
    </header>
  );
}
