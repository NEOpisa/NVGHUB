import type { Metadata } from "next";
import TrackLink from "@/components/TrackLink";
import { WA } from "@/lib/constants";
import "./anuncio.css";

export const metadata: Metadata = {
  title: "Crie o site da sua clínica — Neovanguard",
  description:
    "Sites modernos e estratégicos para clínicas e consultórios. Atraia mais pacientes e lote a sua agenda. Investimento único, sem mensalidades.",
  robots: { index: false, follow: false },
};

// ─────────────────────────────────────────────────────────────
// Ajuste estes valores conforme sua oferta real.
const WA_CLINICA =
  `${WA}?text=` +
  encodeURIComponent("Olá! Quero um site para a minha clínica com a Neovanguard.");
const PRECO_DE = "887,00";   // âncora riscada — zere/ajuste conforme sua promo
const PRECO_POR = "497";     // preço em destaque
const PRECO_CENTAVOS = "00";
// ─────────────────────────────────────────────────────────────

const PILLS = [
  { icon: "layers", t1: "+50 MODELOS", t2: "DE CLÍNICAS" },
  { icon: "target", t1: "ADAPTADO À SUA", t2: "ESPECIALIDADE" },
  { icon: "shield", t1: "DESIGN 100%", t2: "PROFISSIONAL" },
];

// Mini-sites exibidos na tela do celular — baseados nos templates da NVGHUB.
const SLIDES = [
  { brand: "Clínica Lumen", tag: "Clínica médica", title: "Saúde com tecnologia", sub: "Agende sua consulta em segundos.", cta: "Agendar consulta", icon: "cross", ac: "#46c89c", bg: "linear-gradient(165deg,#0e2a24,#0a1614)" },
  { brand: "Studio Aura", tag: "Estética", title: "Beleza & autoestima", sub: "Tratamentos estéticos sob medida.", cta: "Quero agendar", icon: "sparkle", ac: "#c084fc", bg: "linear-gradient(165deg,#241828,#130b16)" },
  { brand: "OdontoCare", tag: "Odontologia", title: "Transforme seu sorriso", sub: "Atendimento humanizado e moderno.", cta: "Agendar avaliação", icon: "tooth", ac: "#6f9bf0", bg: "linear-gradient(165deg,#141d3a,#0a0f22)" },
  { brand: "Vita Fisio", tag: "Fisioterapia", title: "Movimento sem dor", sub: "Reabilitação e performance.", cta: "Marcar sessão", icon: "activity", ac: "#56b6e6", bg: "linear-gradient(165deg,#0e2230,#0a1622)" },
];

const FEATURES = [
  { icon: "calendar", t1: "AGENDAMENTO", t2: "ONLINE" },
  { icon: "device", t1: "100% RESPONSIVO", t2: "CELULAR E PC" },
  { icon: "search", t1: "SEO OTIMIZADO", t2: "PARA GOOGLE" },
  { icon: "headset", t1: "SUPORTE", t2: "ESPECIALIZADO" },
];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "layers": return <svg {...p}><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>;
    case "target": return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg>;
    case "shield": return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>;
    case "device": return <svg {...p}><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></svg>;
    case "headset": return <svg {...p}><path d="M4 13a8 8 0 0116 0M4 13v3a2 2 0 002 2h1v-5H6a2 2 0 00-2 0zm16 0v3a2 2 0 01-2 2h-1v-5h1a2 2 0 012 0z" /></svg>;
    case "tooth": return <svg {...p}><path d="M7 3c-2 0-3 1.6-3 4 0 2 .6 3.4 1.2 6C5.8 15 6 19 7.3 20.5c.6.7 1.4.4 1.6-.5l.7-3.2c.1-.6.6-1 1.2-1s1.1.4 1.2 1l.7 3.2c.2.9 1 1.2 1.6.5C16.6 19 17 15 17.6 13c.6-2.6 1.2-4 1.2-6 0-2.4-1-4-3-4-1.3 0-2 .6-3 .6S8.3 3 7 3z" /></svg>;
    case "activity": return <svg {...p}><path d="M3 12h4l2.5 7 5-14L17 12h4" /></svg>;
    case "sparkle": return <svg {...p}><path d="M12 3l1.8 4.9L18.7 10l-4.9 1.8L12 17l-1.8-5.2L5.3 10l4.9-2.1z" /></svg>;
    case "cross": return <svg {...p}><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></svg>;
    case "lock": return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>;
    default: return null;
  }
}

export default function Anuncio() {
  return (
    <main className="ad">
      <div className="ad-circuit" aria-hidden="true" />
      <div className="ad-glow" aria-hidden="true" />

      <div className="ad-inner">
        <span className="ad-eyebrow">SITES PARA CLÍNICAS E CONSULTÓRIOS</span>

        <h1 className="ad-headline">
          <span className="ad-h-white">CRIE O SITE DA</span>
          <span className="ad-h-grad">SUA CLÍNICA</span>
        </h1>

        <p className="ad-sub">
          Sites modernos e estratégicos para clínicas.
          <strong> Atraia mais pacientes e lote a sua agenda.</strong>
        </p>

        <div className="ad-pills">
          {PILLS.map((p) => (
            <div className="ad-pill" key={p.t1}>
              <span className="ad-pill-icon"><Icon name={p.icon} size={17} /></span>
              <span className="ad-pill-text"><b>{p.t1}</b>{p.t2}</span>
            </div>
          ))}
        </div>

        <div className="ad-visual">
          <div className="ad-phone-scene">
            <div className="ad-phone3d">
              <span className="ad-phone-btn ad-phone-btn--silence" />
              <span className="ad-phone-btn ad-phone-btn--vol1" />
              <span className="ad-phone-btn ad-phone-btn--vol2" />
              <span className="ad-phone-btn ad-phone-btn--power" />
              <div className="ad-phone3d-screen">
                <div className="ad-island" />
                <div className="ad-slides">
                  {SLIDES.map((s, i) => (
                    <div className="ms" key={s.brand} style={{ background: s.bg, animationDelay: `${i * 3.5}s` }}>
                      <div className="ms-top">
                        <span className="ms-logo" style={{ background: s.ac }} />
                        <span className="ms-brand">{s.brand}</span>
                        <span className="ms-burger"><i /><i /><i /></span>
                      </div>
                      <div className="ms-hero">
                        <span className="ms-tag" style={{ color: s.ac, borderColor: s.ac }}>{s.tag}</span>
                        <span className="ms-hero-icon" style={{ color: s.ac }}><Icon name={s.icon} size={26} /></span>
                        <div className="ms-title">{s.title}</div>
                        <div className="ms-sub">{s.sub}</div>
                        <div className="ms-cta" style={{ background: s.ac }}>{s.cta}</div>
                      </div>
                      <div className="ms-cards"><span /><span /><span /></div>
                    </div>
                  ))}
                </div>
                <div className="ad-glare" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="ad-features">
            {FEATURES.map((f) => (
              <div className="ad-feature" key={f.t1}>
                <span className="ad-feature-icon"><Icon name={f.icon} size={18} /></span>
                <span className="ad-feature-text"><b>{f.t1}</b>{f.t2}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ad-price">
          <div className="ad-price-de">DE <s>R${PRECO_DE}</s></div>
          <div className="ad-price-main">
            <span className="ad-price-label">PAGUE APENAS</span>
            <span className="ad-price-value">
              <span className="ad-cifrao">R$</span>{PRECO_POR}<sup>,{PRECO_CENTAVOS}</sup>
            </span>
            <span className="ad-price-acesso"><Icon name="lock" size={11} /> ACESSO IMEDIATO</span>
          </div>
          <div className="ad-price-sub">INVESTIMENTO ÚNICO · SEM MENSALIDADES · SEU SITE PARA SEMPRE</div>
        </div>

        <TrackLink href="/pacotes" className="ad-cta-main" event="Lead">
          QUERO O SITE DA MINHA CLÍNICA
        </TrackLink>

        <TrackLink href={WA_CLINICA} className="ad-cta-wa" target="_blank" rel="noopener noreferrer" event="Contact">
          <span className="ad-wa-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.5 0 12.066 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.566-5.338 11.903-11.893 11.903a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-.927z" />
            </svg>
          </span>
          Estamos no WhatsApp
        </TrackLink>

        <div className="ad-brand">NEOVANGUARD · SOLUÇÕES DIGITAIS</div>
      </div>
    </main>
  );
}
