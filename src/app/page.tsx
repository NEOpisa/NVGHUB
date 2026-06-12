import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ManifestoSection from "@/components/ManifestoSection";
import ServicesSection from "@/components/ServicesSection";
import OrcamentoSection from "@/components/OrcamentoSection";
import PricingSection from "@/components/PricingSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import ContatoSection from "@/components/ContatoSection";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <ManifestoSection />
      <ServicesSection />
      <OrcamentoSection />
      <PricingSection />
      <DiferenciaisSection />
      <ContatoSection />
    </main>
  );
}
