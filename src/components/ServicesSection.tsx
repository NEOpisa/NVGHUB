"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useRef } from "react";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";
function waLink(msg: string) {
  return `${WA}?text=${encodeURIComponent(msg)}`;
}

const SERVICES = [
  {
    icon: <MonitorIcon />,
    title: "Site Profissional",
    desc: "Landing page ou site institucional com design responsivo, otimizado para SEO local e carregamento rápido. Feito para converter visitante em cliente.",
    outcome: "No ar em até 16 dias úteis",
    wa: "Olá! Tenho interesse no serviço de Site Profissional da NeoVanguard. Pode me dar mais informações?",
  },
  {
    icon: <LayersIcon />,
    title: "Sistema para Negócio",
    desc: "Cardápio digital, agendamento online ou catálogo interativo. Automatiza o que toma tempo da sua equipe e melhora a experiência do cliente.",
    outcome: "Painel de controle incluso",
    wa: "Olá! Tenho interesse em Sistema para Negócios da NeoVanguard. Pode me dar mais informações?",
  },
  {
    icon: <SearchIcon />,
    title: "SEO & Presença Digital",
    desc: "Otimização para aparecer no Google local, Google Meu Negócio configurado e estratégia de palavras-chave para o seu segmento.",
    outcome: "Resultado em 30–60 dias",
    wa: "Olá! Tenho interesse em SEO e Presença Digital da NeoVanguard. Pode me dar mais informações?",
  },
  {
    icon: <ShieldIcon />,
    title: "Manutenção & Suporte",
    desc: "Suporte real via WhatsApp, atualizações de conteúdo, monitoramento de uptime e correções sem burocracia. Você chama, a gente responde.",
    outcome: "Resposta em até 3h úteis",
    wa: "Olá! Tenho interesse em Manutenção e Suporte da NeoVanguard. Pode me dar mais informações?",
  },
];

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="servicos" aria-label="Nossos serviços">
      <div className="inner">
        <header className="services-header" ref={headerRef}>
          <span className="section-eyebrow">Serviços</span>
          <h2 className="section-heading">
            O que a gente <span className="text-accent-nvg">faz</span>
          </h2>
          <p className="section-sub">
            Soluções digitais práticas, sem papo de agência grande. Do site ao sistema, a gente entrega.
          </p>
        </header>

        <div className="services-grid" ref={gridRef}>
          {SERVICES.map((svc) => (
            <article key={svc.title} className="service-card">
              <div className="service-icon" aria-hidden="true">
                {svc.icon}
              </div>
              <div className="service-title">{svc.title}</div>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-outcome">
                <CheckIcon />
                {svc.outcome}
              </div>
              <a
                href={waLink(svc.wa)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: "auto", fontSize: "13px", padding: "9px 16px" }}
              >
                <SmallWaIcon />
                Solicitar
              </a>
            </article>
          ))}

          {/* SaaS card */}
          <article className="service-card">
            <div className="service-icon" aria-hidden="true">
              <ScreenIcon />
            </div>
            <div className="service-title">
              SaaS{" "}
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 400 }}>
                (em breve)
              </span>
            </div>
            <p className="service-desc">
              Plataforma pronta para clínicas e restaurantes. Sem desenvolvimento customizado — ative, configure e use no mesmo dia.
            </p>
            <div className="service-outcome" style={{ borderTop: "none", paddingTop: 0, marginTop: "4px" }}>
              <WaitlistForm />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (status === "ok") {
    return <p className="saas-waitlist-msg show">✓ Você entrou na lista!</p>;
  }

  return (
    <form className="saas-waitlist" onSubmit={handleSubmit} noValidate>
      <div className="saas-waitlist-label">Entre na lista de espera</div>
      <div className="saas-waitlist-row">
        <input
          className="saas-waitlist-input"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="saas-waitlist-btn"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function MonitorIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
}
function LayersIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
}
function SearchIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
}
function ShieldIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function ScreenIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
}
function CheckIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>;
}
function SmallWaIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
}
