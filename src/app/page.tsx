import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import OrcamentoSection from "@/components/OrcamentoSection";
import PricingSection from "@/components/PricingSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import ContatoSection from "@/components/ContatoSection";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ServicesSection />
      <OrcamentoSection />
      <PricingSection />
      <DiferenciaisSection />
      <ContatoSection />
    </main>
  );
}
