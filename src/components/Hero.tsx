import dynamic from "next/dynamic";
import { WhatsAppIcon, CheckIcon, InstagramIcon } from "@/components/icons";
import Magnetic from "@/components/Magnetic";
import { WA, IG } from "@/lib/constants";

const LogoScene = dynamic(() => import("@/components/LogoScene"));

export default function Hero() {
  return (
    <section id="hero" aria-label="Apresentação da NEOVANGUARD">
      <div className="hero-glow-veil" aria-hidden="true" />

      <div className="inner hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow-row hero-enter hero-enter-1">
            <span className="badge">
              <span className="badge-dot" aria-hidden="true" />Neovanguard Soluções Digitais</span>
          </div>

          <h1 className="hero-h1 hero-enter hero-enter-2">
            Tudo o que seu negócio precisa no digital,{" "}
            <span className="text-gradient">conectado em um só lugar</span>
          </h1>

          <p className="hero-sub hero-enter hero-enter-3">
            Sites, sistemas, SEO e suporte — operados como um único ecossistema. Entrega em até <strong>16 dias úteis</strong>,
            suporte real, sem contrato mínimo.
          </p>

          <div className="cta-row hero-enter hero-enter-4">
            <Magnetic>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon />
                Falar pelo WhatsApp
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="#precos" className="btn-ghost">
                Ver pacotes e preços
                <ArrowRightIcon />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={IG} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <InstagramIcon />
                Instagram
              </a>
            </Magnetic>
          </div>

          <div className="trust-signals hero-enter hero-enter-5">
            {[
              "Entrega em até 16 dias úteis",
              "Sem contrato mínimo",
              "Suporte via WhatsApp",
            ].map((t) => (
              <span key={t} className="trust-item">
                <CheckIcon />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual hero-enter hero-enter-3" aria-hidden="true">
          <LogoScene />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
