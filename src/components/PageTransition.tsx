"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motionEnabled } from "@/lib/motionConfig";

/**
 * Transição "cortina" entre páginas com a logo da Neovanguard.
 * Em vez de interceptar a navegação (e arriscar quebrar o <Link>), só tocamos a
 * cortina visual no clique: o <Link> navega normalmente POR BAIXO da cortina,
 * que cobre → segura (logo) → revela. Time-based, robusto (páginas estáticas
 * carregam instantâneo). Desliga com reduced-motion / ?motion=off.
 */
export default function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) gsap.set(panel, { yPercent: -100 });

    const onClick = (e: MouseEvent) => {
      if (!motionEnabled() || busy.current) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || href.startsWith("#") || target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      // sem preventDefault: o <Link> navega; a cortina só cobre a troca.
      play();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  function play() {
    const panel = panelRef.current;
    const logo = logoRef.current;
    if (!panel) return;
    busy.current = true;
    gsap.killTweensOf([panel, logo]);
    gsap.set(panel, { yPercent: 100, pointerEvents: "auto" });
    gsap.set(logo, { opacity: 0, scale: 0.92, y: 10 });

    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
          gsap.set(panel, { pointerEvents: "none" });
        },
      })
      // cobre (sobe de baixo)
      .to(panel, { yPercent: 0, duration: 0.42, ease: "power3.inOut" })
      // logo entra
      .to(logo, { opacity: 1, scale: 1, y: 0, duration: 0.34, ease: "power2.out" }, 0.12)
      // logo sai
      .to(logo, { opacity: 0, duration: 0.26, ease: "power1.in" }, 0.6)
      // revela (sobe e sai por cima)
      .to(panel, { yPercent: -100, duration: 0.52, ease: "power3.inOut" }, 0.52);
  }

  return (
    <div className="page-transition" ref={panelRef} aria-hidden="true">
      <div className="page-transition-logo" ref={logoRef}>
        <img src="/logo.png" alt="" width={46} height={34} />
        <span className="page-transition-word">
          NEO<b>VANGUARD</b>
        </span>
      </div>
    </div>
  );
}
