import { LOGO_B64 } from "@/lib/logo";
import EcosystemGraphic from "@/components/EcosystemGraphic";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";
const IG = "https://www.instagram.com/neo_vanguard?utm_source=qr&igsh=MWx5Ym1nZ2J0NW5kMw==";

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
              Ver planos e preços
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

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
} 

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6-.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
