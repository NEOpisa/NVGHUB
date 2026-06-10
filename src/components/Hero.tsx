import EcosystemGraphic from "@/components/EcosystemGraphic";
import { WhatsAppIcon, CheckIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" aria-label="Apresentação da NEOVANGUARD">
      <div className="hero-glow-veil" aria-hidden="true" />

      <div className="inner hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow-row">
            <span className="badge">
              <span className="badge-dot" aria-hidden="true" />Neovanguard Soluções Digitais</span>
          </div>

          <h1 className="hero-h1">
            Tudo o que seu negócio precisa no digital,{" "}
            <span className="text-gradient">conectado em um só lugar</span>
          </h1>

          <p className="hero-sub">
            Sites, sistemas, SEO e suporte — operados como um único ecossistema. Entrega em até <strong>16 dias úteis</strong>,
            suporte real, sem contrato mínimo.
          </p>

          <div className="cta-row">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
            <a href="#precos" className="btn-ghost">
              Ver pacotes e preços
              <ArrowRightIcon />
            </a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <InstagramIcon />
              Instagram
            </a>
          </div>

          <div className="trust-signals">
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

        <div className="hero-visual" aria-hidden="true">
          <EcosystemGraphic />
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
