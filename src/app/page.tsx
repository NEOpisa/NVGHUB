import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesSection from "@/components/ServicesSection";
import ExploreSection from "@/components/ExploreSection";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <ServicesSection />
      <ExploreSection />

      <section className="home-cta" aria-label="Vamos começar">
        <div className="inner home-cta-inner">
          <div className="home-cta-copy">
            <h2 className="section-heading">
              Pronto para tirar a ideia <span className="text-accent-nvg">do papel?</span>
            </h2>
            <p className="section-sub">
              Sem contrato mínimo, sem letra miúda. Conte o que você precisa e a
              gente devolve um escopo claro com preço fechado.
            </p>
          </div>
          <div className="home-cta-actions">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
            <Link href="/pacotes" className="btn-ghost">
              Ver pacotes e preços
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
