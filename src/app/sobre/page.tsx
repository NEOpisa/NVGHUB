import type { Metadata } from "next";
import SobreSection from "@/components/SobreSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";

export const metadata: Metadata = {
  title: "Quem somos — Neovanguard",
  description:
    "A Neovanguard é uma agência digital 100% remota que atende o Brasil inteiro, operando sites, sistemas, SEO e suporte como um só ecossistema.",
};

export default function SobrePage() {
  return (
    <main id="main">
      <SobreSection />
      <DiferenciaisSection />
    </main>
  );
}
