import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pacotes e preços — Neovanguard",
  description:
    "Escolha um pacote pronto com preço fechado: Vitrine, Presença e mais. Transparente, sem letra miúda e sem contrato mínimo.",
};

export default function PacotesPage() {
  return (
    <main id="main" className="route-pacotes">
      <section className="comprar-area" aria-label="Pacotes e preços">
        <PricingSection />
      </section>
    </main>
  );
}
