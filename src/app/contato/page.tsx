import type { Metadata } from "next";
import ContatoSection from "@/components/ContatoSection";

export const metadata: Metadata = {
  title: "Contato — Neovanguard",
  description:
    "Fale com a Neovanguard pelo WhatsApp ou pelo formulário. Resposta rápida, sem burocracia.",
};

export default function ContatoPage() {
  return (
    <main id="main">
      <ContatoSection />
    </main>
  );
}
