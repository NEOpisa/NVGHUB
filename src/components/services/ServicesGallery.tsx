"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ServicesGalleryCanvas = dynamic(
  () => import("@/components/services/ServicesGalleryCanvas"),
  { ssr: false }
);

export type Service = {
  kind: "site" | "system" | "seo" | "support" | "saas";
  code: string;
  title: string;
  metric: string;
  date: string;
  desc: string;
};

export const SERVICES: Service[] = [
  { kind: "site", code: "SRV_CD_01", title: "Site Profissional", metric: "ENTREGA · 16d", date: "© 2026", desc: "Landing ou site institucional responsivo, otimizado para SEO local e carregamento rápido. Feito para converter visitante em cliente." },
  { kind: "system", code: "SRV_CD_02", title: "Sistema para Negócio", metric: "PAINEL · INCLUSO", date: "© 2026", desc: "Cardápio digital, agendamento online ou catálogo interativo com painel de controle." },
  { kind: "seo", code: "SRV_CD_03", title: "SEO & Presença Digital", metric: "RESULTADO · 30–60d", date: "© 2026", desc: "Apareça no Google local com Google Meu Negócio configurado e palavras-chave do seu segmento." },
  { kind: "support", code: "SRV_CD_04", title: "Manutenção & Suporte", metric: "RESPOSTA · 3h", date: "© 2026", desc: "Suporte real via WhatsApp, atualizações e monitoramento. Você chama, a gente resolve." },
  { kind: "saas", code: "SRV_CD_05", title: "SaaS para seu segmento", metric: "STATUS · EM BREVE", date: "© 2026", desc: "Plataforma pronta para clínicas e restaurantes — sem desenvolvimento customizado." },
];

export default function ServicesGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Scroll "pinned" (sticky): mapeia o progresso da seção no índice do serviço.
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([e]) => setRunning(e.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    io.observe(section);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;
        const p = Math.min(Math.max(-rect.top / scrollable, 0), 0.9999);
        setActive(Math.floor(p * SERVICES.length));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Fallback acessível (reduced-motion): lista estática dos serviços.
  if (reduced) {
    return (
      <section id="servicos" aria-label="Nossos serviços" className="services-fallback">
        <div className="inner">
          <span className="section-eyebrow">Serviços</span>
          <h2 className="services-fill"><span>Soluções digitais que entregam de verdade.</span></h2>
          <ul className="services-fallback-list">
            {SERVICES.map((s) => (
              <li key={s.kind}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span>{s.metric}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const svc = SERVICES[active];

  return (
    <section
      id="servicos"
      aria-label="Nossos serviços"
      ref={sectionRef}
      className="services-gl"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      {/* Conteúdo indexável (SEO/leitores de tela) */}
      <ul className="sr-only">
        {SERVICES.map((s) => (
          <li key={s.kind}><h3>{s.title}</h3><p>{s.desc}</p></li>
        ))}
      </ul>

      <div className="services-gl-stage">
        <ServicesGalleryCanvas active={active} running={running} />

        {/* HUD técnico (blueprint) — DOM por cima do canvas */}
        <div className="services-hud" aria-hidden="true">
          <span className="services-eyebrow">Serviços</span>

          <div className="hud-tl">
            <span className="hud-code">{svc.code}</span>
            <span className="hud-title">{svc.title}</span>
          </div>

          <div className="hud-tr">
            <span className="hud-metric">{svc.metric}</span>
          </div>

          <div className="hud-bl">
            <span className="hud-date">{svc.date}</span>
            <span className="hud-explore">EXPLORAR ↓</span>
          </div>

          <p className="hud-desc">{svc.desc}</p>

          <div className="services-progress">
            {SERVICES.map((s, i) => (
              <span key={s.kind} className={`services-progress-dot${i === active ? " is-active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
