"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Rotas "bonitas" que apontam para uma seção da home (sem #hash na barra).
const ROUTE_TO_ID: Record<string, string> = {
  "/orcamento": "orcamento",
};

export default function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    const id = ROUTE_TO_ID[pathname?.replace(/\/+$/, "") || "/"];
    if (!id) return;

    let tries = 0;
    let timer: number;

    const go = () => {
      const el = document.getElementById(id);
      if (el) {
        // compensa o header fixo (~72px)
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
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
