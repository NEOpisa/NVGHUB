"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button3D from "@/components/Button3D";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hideBrand, setHideBrand] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const onMenu = pathname === "/menu";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={[
        "site-header",
        scrolled ? "is-scrolled" : "",
        onMenu ? "is-menu-open" : "",
        hideBrand && !onMenu ? "brand-hidden" : "",
      ].join(" ")}
    >
      <div className="site-header-inner">
        <Link href="/" className="wordmark" aria-label="NEOVANGUARD — página inicial">
          <img src="/logo.png" alt="" aria-hidden width={43} height={32} className="nav-logo" />
          <span className="wordmark-text">
            NEO<b>VANGUARD</b>
          </span>
        </Link>

        <div className="site-header-right">
          {onMenu ? (
            <Button3D tone="ghost" className="menu-toggle" ariaLabel="Fechar menu" onClick={() => router.back()}>
              <span className="menu-toggle-label">Fechar</span>
              <span className="menu-toggle-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </Button3D>
          ) : (
            <Button3D href="/menu" tone="ghost" className="menu-toggle" ariaLabel="Abrir menu">
              <span className="menu-toggle-label">Menu</span>
              <span className="menu-toggle-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </Button3D>
          )}
        </div>
      </div>
    </header>
  );
}
