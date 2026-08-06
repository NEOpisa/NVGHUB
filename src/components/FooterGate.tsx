"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

/**
 * Gate legado da jornada (a home tinha rodapé próprio no capítulo final).
 * Hoje a home é uma página normal e assina com o mesmo rodapé do site —
 * o gate segue aqui só para páginas que peçam exceção no futuro.
 */
const SEM_FOOTER: string[] = [];

export default function FooterGate() {
  const pathname = usePathname();
  if (SEM_FOOTER.includes(pathname)) return null;
  return <Footer />;
}
