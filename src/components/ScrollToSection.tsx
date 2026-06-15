"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance } from "@/lib/lenis";

// Rotas "bonitas" (URL só com /, sem #hash) que apontam para uma seção da home.
const ROUTE_TO_ID: Record<string, string> = {
  "/comprar": "comprar",
  "/orcamento": "orcamento",
  "/pacotes": "precos",
  "/solucoes": "servicos",
  "/contato": "contato",
};

const HEADER_OFFSET = 72;

export default function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname?.replace(/\/+$/, "") || "/";

    // Início: volta ao topo
    if (path === "/") {
      const toTop = () => {
        const lenis = getLenisInstance();
        if (lenis) lenis.scrollTo(0, { offset: 0 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      };
      const t = window.setTimeout(toTop, 60);
      return () => window.clearTimeout(t);
    }

    const id = ROUTE_TO_ID[path];
    if (!id) return;

    let tries = 0;
    let timer: number;

    const go = () => {
      const el = document.getElementById(id);
      if (el) {
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(el, { offset: -HEADER_OFFSET });
        } else {
          const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      } else if (tries++ < 60) {
        timer = window.setTimeout(go, 80);
      }
    };

    // pequeno atraso para o layout inicial assentar
    timer = window.setTimeout(go, 120);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
