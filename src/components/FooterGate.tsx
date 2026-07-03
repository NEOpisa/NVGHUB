"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

/**
 * Na home o rodapé vive DENTRO do capítulo final da jornada (jy-cta-foot) —
 * o footer global só renderiza nas demais páginas.
 */
export default function FooterGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}
