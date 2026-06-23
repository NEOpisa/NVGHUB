import Link from "next/link";
import { WhatsAppIcon, CheckIcon, InstagramIcon } from "@/components/icons";
import Magnetic from "@/components/Magnetic";
import HeroVisual from "@/components/HeroVisual";
import { WA, IG } from "@/lib/constants";

const AREAS = [
  { num: "01", label: "Sua solução", href: "/solucao" },
  { num: "02", label: "Pacotes", href: "/pacotes" },
  { num: "03", label: "Quem somos", href: "/sobre" },
  { num: "04", label: "Perguntas frequentes", href: "/faq" },
  { num: "05", label: "Contato", href: "/contato" },
];

export default function Hero() {
  return (
    <section id="hero" aria-label="Apresentação da NEOVANGUARD">
      <div className="hero-glow-veil" aria-hidden="true" />

      <nav className="hero-index" aria-label="Áreas do site">
        {AREAS.map((a) => (
          <Link key={a.href} href={a.href} className="hero-index-link">
            <span className="hero-index-num">{a.num}</span>
            <span className="hero-index-label">{a.label}</span>
          </Link>
        ))}
      </nav>

      <div className="inner hero-grid">
        <div className="hero-copy">
          <div className="hero-brand hero-enter hero-enter-1">
            <img src="/logo.png" alt="" aria-hidden="true" width={40} height={30} />
            <span className="hero-brand-name">
              NEO<b>VANGUARD</b>
            </span>
            <span className="hero-brand-sep" aria-hidden="true" />
            <span className="hero-brand-tag">Agência digital · Brasil</span>
          </div>

          <h1 className="hero-h1 hero-enter hero-enter-2">
            Tudo o que seu negócio precisa no digital,{" "}
            <span className="text-gradient">conectado em um só lugar</span>
          </h1>

          <p className="hero-sub hero-enter hero-enter-3">
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
                Ver tipos de solução
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

        <div className="hero-visual hero-enter hero-enter-3" aria-hidden="true">
          <HeroVisual />
        </div>
      </div>

      <div className="hero-bar">
        <span className="hero-scroll-hint">
          <span className="scroll-arrow" aria-hidden="true" />
          Role para explorar
        </span>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="hero-bar-chat">
          Fale com a gente
        </a>
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
