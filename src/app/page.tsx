import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import PricingSection from "@/components/PricingSection";
import NoxzSection from "@/components/NoxzSection";
import ContatoSection from "@/components/ContatoSection";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ServicesSection />
      <DiferenciaisSection />
      <PricingSection />
      <NoxzSection />
      <ContatoSection />
    </main>
  );
}
