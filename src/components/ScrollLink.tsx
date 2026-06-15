"use client";

import type { ReactNode, MouseEvent } from "react";
import { getLenisInstance } from "@/lib/lenis";

const HEADER_OFFSET = 72;

type Props = {
  href: string;        // URL limpa exibida na barra (ex.: "/orcamento")
  target?: string;     // id da seção na home (ex.: "orcamento"); ausente = topo
  className?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
  children: ReactNode;
};

// Link de seção: na home, rola suave (Lenis) e troca a URL para a versão limpa
// (sem #) via pushState. Fora da home, faz navegação real para a rota.
export default function ScrollLink({
  href,
  target,
  className,
  ariaLabel,
  onNavigate,
  children,
}: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // respeita ctrl/cmd/click do meio (abrir em nova aba)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const el = target ? document.getElementById(target) : null;
    const isTop = href === "/" && !target;

    if (el || isTop) {
      e.preventDefault();
      const lenis = getLenisInstance();
      if (isTop) {
        if (lenis) lenis.scrollTo(0, { offset: 0 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -HEADER_OFFSET });
        else
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
            behavior: "smooth",
          });
      }
      window.history.pushState(null, "", href);
      onNavigate?.();
    } else {
      // seção não existe nesta página (ex.: estamos em /exemplos) → navegação
      // real: o servidor aplica o rewrite p/ a home e o ScrollToSection rola
      // até a seção certa no carregamento. (router.push client + rewrite às
      // vezes não rola pra área certa.)
      e.preventDefault();
      onNavigate?.();
      window.location.assign(href);
    }
  };

  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}
