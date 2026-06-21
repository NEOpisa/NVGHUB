import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import HeroVisual from "@/components/HeroVisual";
import { WA } from "@/lib/constants";

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

      <div className="hero-center hero-enter">
        <div className="hero-stage" aria-hidden="true">
          <HeroVisual />
        </div>
        <span className="hero-eyebrow">Agência digital · atende o Brasil inteiro</span>
        <h1 className="hero-h1">
          Tudo o que seu negócio precisa no digital,{" "}
          <span className="text-gradient">conectado em um só lugar</span>
        </h1>
        <p className="hero-sub">
          Sites, sistemas, SEO e suporte — operados como um único ecossistema.
          Entrega em até 16 dias úteis, sem contrato mínimo.
        </p>
        <div className="hero-center-cta">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp">
            <WhatsAppIcon />
            Falar pelo WhatsApp
          </a>
          <Link href="/solucao" className="btn-ghost">
            Montar minha solução
          </Link>
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
