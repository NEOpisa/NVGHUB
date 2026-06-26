"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesGallery from "@/components/services/ServicesGallery";
import EcossistemaSection from "@/components/EcossistemaSection";
import ExploreSection from "@/components/ExploreSection";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";
import { MQ } from "@/lib/motionConfig";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import SectionScene from "@/components/scene/SectionScene";

export default function Home() {
  const ctaCopyRef    = useRef<HTMLDivElement>(null);
  const ctaActionsRef = useRef<HTMLDivElement>(null);
  useReveal(ctaCopyRef);
  useReveal(ctaActionsRef, 150);

  // No mobile a página TERMINA nos serviços (sem seções abaixo nem footer).
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MQ.full);
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("home-end-services", isMobile);
    return () => document.body.classList.remove("home-end-services");
  }, [isMobile]);

  return (
    <main id="main" className="home">
      <Hero />
      <Marquee />

      {/* Ecossistema → (transição) → Soluções: um só bloco */}
      <EcossistemaSection />
      <div className="solucoes-bridge" aria-hidden="true">
        <span className="solucoes-bridge-line" />
        <span className="solucoes-bridge-label">As peças do ecossistema</span>
        <span className="solucoes-bridge-arrow">↓</span>
      </div>
      <ServicesGallery />

      {!isMobile && (
        <>
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
            <SectionScene variant="orb" className="section-scene-cta" />
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
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp">
                  <WhatsAppIcon />
                  Falar pelo WhatsApp
                </a>
                <Link href="/pacotes" className="btn-ghost">
                  Ver tipos de solução
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
