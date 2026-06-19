"use client";

import { usePathname } from "next/navigation";

/**
 * Esconde o "chrome" do site (Header, Footer, moldura) em rotas específicas,
 * como o anúncio full-bleed em /anuncio. Os filhos são passados pelo layout
 * (servidor), então continuam renderizando no servidor — este wrapper só decide
 * se aparecem.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/anuncio")) return null;
  return <>{children}</>;
}
