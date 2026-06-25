"use client";

import { useRef } from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesSection from "@/components/ServicesSection";
import ExploreSection from "@/components/ExploreSection";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";
import Button3D from "@/components/Button3D";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  const ctaCopyRef    = useRef<HTMLDivElement>(null);
  const ctaActionsRef = useRef<HTMLDivElement>(null);
  useReveal(ctaCopyRef);
  useReveal(ctaActionsRef, 150);

  return (
    <main id="main">
      <Hero />
      <Marquee />
      <ServicesSection />
      <Marquee
        reverse
        items={[
          "Entrega em 16 dias úteis",
          "Sem contrato mínimo",
          "Suporte real",
          "100% remoto",
          "Atende o Brasil inteiro",
          "Preço sob medida",
        ]}
      />
      <ExploreSection />
      <Marquee
        items={[
          "Vamos conversar",
          "Diagnóstico em 1 minuto",
          "Solução sob medida",
          "Sem compromisso",
          "Fale no WhatsApp",
        ]}
      />

      <section className="home-cta" aria-label="Vamos começar">
        <div className="inner home-cta-inner">
          <div className="home-cta-copy" ref={ctaCopyRef}>
            <h2 className="section-heading">
              Pronto para tirar a ideia <span className="text-accent-nvg">do papel?</span>
            </h2>
            <p className="section-sub">
              Sem contrato mínimo, sem letra miúda. Conte o que você precisa e a
              gente monta uma solução sob medida pro seu negócio.
            </p>
          </div>
          <div className="home-cta-actions" ref={ctaActionsRef} data-parallax="0.1">
            <Button3D href={WA} external tone="whats" className="btn-primary btn-whatsapp">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </Button3D>
            <Button3D href="/pacotes" tone="ghost" className="btn-ghost">
              Ver tipos de solução
            </Button3D>
          </div>
        </div>
      </section>
    </main>
  );
}
