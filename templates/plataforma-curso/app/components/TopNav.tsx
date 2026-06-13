"use client";

import { View } from "../page";

interface TopNavProps {
  view: View;
  setView: (v: View) => void;
  onShowLogin: () => void;
  onToggleSidebar: () => void;
  smoothTo: (id: string) => void;
}

export default function TopNav({
  view,
  setView,
  onShowLogin,
  onToggleSidebar,
  smoothTo,
}: TopNavProps) {
  const isMembers = view === "members";

  function handleLoginClick(e: React.MouseEvent) {
    e.preventDefault();
    if (isMembers) {
      setView("sales");
    } else {
      onShowLogin();
    }
  }

  function handlePricingScroll(e: React.MouseEvent) {
    e.preventDefault();
    document.getElementById("pricingSection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="top-nav">
      <a
        className="nav-logo"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setView("sales");
        }}
      >
        [Nome da Plataforma/Curso]
      </a>
      <div className="nav-links" id="navLinks">
        {!isMembers && (
          <>
            <a
              href="#"
              id="navSalesCurriculum"
              onClick={(e) => {
                e.preventDefault();
                smoothTo("curriculum");
              }}
            >
              Conteúdo
            </a>
            <a
              href="#"
              id="navSalesExpert"
              onClick={(e) => {
                e.preventDefault();
                smoothTo("expert");
              }}
            >
              Mentor
            </a>
            <a
              href="#"
              id="navSalesTestimonials"
              onClick={(e) => {
                e.preventDefault();
                smoothTo("testimonials");
              }}
            >
              Depoimentos
            </a>
          </>
        )}
        {isMembers && (
          <a
            href="#"
            id="navMembers"
            onClick={(e) => {
              e.preventDefault();
              setView("members");
            }}
          >
            Minha área
          </a>
        )}
        {isMembers && (
          <button
            className="mobile-sidebar-toggle"
            id="sidebarToggle"
            onClick={onToggleSidebar}
            style={{ display: "inline-block" }}
          >
            ☰ Módulos
          </button>
        )}
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <a href="#" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }} onClick={handleLoginClick} id="navLoginBtn">
          {isMembers ? "Sair" : "Entrar"}
        </a>
        {!isMembers && (
          <a href="#" className="nav-cta" onClick={handlePricingScroll} id="navBuyBtn">
            Quero me inscrever
          </a>
        )}
      </div>
    </nav>
  );
}
