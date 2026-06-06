import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import ServicesSection from "@/components/ServicesSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import ContatoSection from "@/components/ContatoSection";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <PricingSection />
      <ServicesSection />
      <DiferenciaisSection />
      <ContatoSection />
    </main>
  );
}
