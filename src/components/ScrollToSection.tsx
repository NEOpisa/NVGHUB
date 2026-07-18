"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance } from "@/lib/lenis";

export default function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    // deep-link ?tier=… na home: quem posiciona é o Journey (bifurcação) —
    // mandar pro topo aqui atropelava o salto e "quebrava" a candidatura
    const tier = new URLSearchParams(window.location.search).get("tier");
    if (pathname === "/" && (tier === "ouro" || tier === "platina")) return;
    const toTop = () => {
      const lenis = getLenisInstance();
      if (lenis) lenis.scrollTo(0, { offset: 0, immediate: true });
      else window.scrollTo({ top: 0 });
    };
    const t = window.setTimeout(toTop, 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
