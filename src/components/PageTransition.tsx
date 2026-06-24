"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { motionEnabled } from "@/lib/motionConfig";

/**
 * Transição "cortina" entre páginas com a logo da Neovanguard.
 *
 * Máquina de estados (robusta contra travar): no clique cobrimos a tela; quando
 * a ROTA realmente muda (pathname) E a cobertura terminou, revelamos. Assim a
 * cortina nunca some antes da página trocar, nem fica presa cobrindo — e há um
 * failsafe que revela mesmo se a navegação não acontecer. Não intercepta o
 * <Link> (navega por baixo). Desliga com reduced-motion / ?motion=off.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const phase = useRef<"idle" | "covering" | "covered">("idle");
  const navigated = useRef(false);
  const safety = useRef<number | undefined>(undefined);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) gsap.set(panel, { yPercent: -100, pointerEvents: "none" });

    const onClick = (e: MouseEvent) => {
      if (!motionEnabled() || phase.current !== "idle") return;
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
      cover(); // sem preventDefault: o <Link> navega por baixo da cortina
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (safety.current) clearTimeout(safety.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A rota mudou de verdade → libera o reveal (se a cobertura já terminou).
  useEffect(() => {
    navigated.current = true;
    maybeReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function cover() {
    const panel = panelRef.current;
    const logo = logoRef.current;
    if (!panel) return;
    phase.current = "covering";
    navigated.current = false;
    gsap.killTweensOf([panel, logo]);
    if (safety.current) clearTimeout(safety.current);

    gsap.set(panel, { yPercent: 100, pointerEvents: "auto" });
    gsap.set(logo, { opacity: 0, scale: 0.92, y: 12 });
    gsap
      .timeline()
      .to(panel, {
        yPercent: 0,
        duration: 0.58,
        ease: "power3.inOut",
        onComplete: () => {
          phase.current = "covered";
          maybeReveal();
        },
      })
      .to(logo, { opacity: 1, scale: 1, y: 0, duration: 0.46, ease: "power2.out" }, 0.18);

    // failsafe: se a navegação não acontecer, revela mesmo assim.
    safety.current = window.setTimeout(() => {
      if (phase.current !== "idle") reveal();
    }, 2400);
  }

  function maybeReveal() {
    if (phase.current === "covered" && navigated.current) reveal();
  }

  function reveal() {
    const panel = panelRef.current;
    const logo = logoRef.current;
    if (!panel || phase.current === "idle") return;
    phase.current = "idle";
    navigated.current = false;
    if (safety.current) clearTimeout(safety.current);
    gsap.killTweensOf([panel, logo]);
    gsap.to(logo, { opacity: 0, duration: 0.3, ease: "power1.in" });
    gsap.to(panel, {
      yPercent: -100,
      duration: 0.72,
      ease: "power3.inOut",
      onComplete: () => {
        if (panelRef.current) gsap.set(panelRef.current, { pointerEvents: "none" });
      },
    });
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
