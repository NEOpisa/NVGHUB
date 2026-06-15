import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ManifestoSection from "@/components/ManifestoSection";
import SobreSection from "@/components/SobreSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessoSection from "@/components/ProcessoSection";
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
      <SobreSection />
      <ServicesSection />
      <ProcessoSection />

      {/* Área de compra: pacotes prontos + orçamento sob medida, juntos */}
      <section id="comprar" className="comprar-area" aria-label="Comprar — pacotes e orçamento">
        <div className="inner">
          <div className="comprar-intro">
            <h2 className="section-heading">
              Orçamento e <span className="text-accent-nvg">pacotes</span>
            </h2>
            <p className="section-sub">
              Monte o seu orçamento sob medida ou escolha um pacote pronto com preço fechado. Transparente, sem letra miúda.
            </p>
          </div>
        </div>
        <OrcamentoSection />
        <PricingSection />
      </section>

      <DiferenciaisSection />
      <ContatoSection />
    </main>
  );
}
