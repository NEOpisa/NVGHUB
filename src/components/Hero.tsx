import Link from "next/link";
import { WhatsAppIcon, CheckIcon, InstagramIcon } from "@/components/icons";
import Magnetic from "@/components/Magnetic";
import HeroVisual from "@/components/HeroVisual";
import { WA, IG } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" aria-label="Apresentação da NEOVANGUARD">
      <div className="hero-glow-veil" aria-hidden="true" />

      <div className="hero-center">
        <div className="hero-visual hero-enter hero-enter-1" aria-hidden="true">
          <HeroVisual />
        </div>

        <div className="hero-brand hero-enter hero-enter-2">
          <img src="/logo.png" alt="" aria-hidden="true" />
          <span className="hero-brand-name">
            NEO<b>VANGUARD</b>
          </span>
          <span className="hero-brand-sep" aria-hidden="true" />
          <span className="hero-brand-tag">Agência digital · Brasil</span>
        </div>

        <h1 className="hero-h1 hero-enter hero-enter-3">
          Tudo o que seu negócio precisa no digital,{" "}
          <span className="text-gradient">conectado em um só lugar</span>
        </h1>

        <p className="hero-sub hero-enter hero-enter-4">
          Sites, sistemas, SEO e suporte — operados como um único ecossistema.
          Entrega em até <strong>16 dias úteis</strong>, suporte real, sem
          contrato mínimo.
        </p>

        <div className="cta-row hero-enter hero-enter-4">
          <Magnetic>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link href="/pacotes" className="btn-ghost">
              Ver pacotes e preços
              <ArrowRightIcon />
            </Link>
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
