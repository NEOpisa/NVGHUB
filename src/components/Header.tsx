"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay from "@/components/MenuOverlay";
import { ROUTES } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hideBrand, setHideBrand] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // rota mudou → menu fecha
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHideBrand(false);
      return;
    }
    setHideBrand(true);
    const io = new IntersectionObserver(
      ([entry]) => setHideBrand(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

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
          >
            <img
              src="/logo.png"
              alt=""
              aria-hidden
              width={36}
              height={27}
              className="nav-logo"
            />
            <span className="wordmark-text">
              NEO<b>VANGUARD</b>
            </span>
          </Link>

          <div className="site-header-right">
            {(() => {
              const r = ROUTES.find((x) => x.href === pathname);
              return r ? (
                <span className="route-hud" aria-hidden="true">
                  {r.num.replace("_", " ")} <em>·</em> {r.label.toLowerCase()}
                </span>
              ) : null;
            })()}
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
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
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
