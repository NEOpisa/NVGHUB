"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MQ } from "@/lib/motionConfig";
import IconCanvas from "@/components/services/IconCanvas";

gsap.registerPlugin(ScrollTrigger);

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
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  // `lite`: mobile/coarse-pointer/reduced-motion → carrossel com setas.
  const [lite, setLite] = useState(true);

  useEffect(() => {
    setLite(!window.matchMedia(MQ.full).matches);
  }, []);

  // Desktop: scroll "pinned" mapeia o progresso no índice do serviço +
  // animação de transição "entrando os ícones" ao chegar do ecossistema.
  useEffect(() => {
    if (lite) return;
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

    // Transição de entrada: o palco dos ícones surge (escala + fade) conforme a
    // seção entra — é o "vir os ícones" logo após o ecossistema.
    let tween: gsap.core.Tween | undefined;
    if (stageRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tween = gsap.fromTo(
        stageRef.current,
        { autoAlpha: 0, scale: 0.82, y: 40 },
        {
          autoAlpha: 1, scale: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 78%", end: "top 22%", scrub: true },
        }
      );
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [lite]);

  // ---- Mobile: carrossel com setas (sem scroll de 500vh) ----
  if (lite) {
    const svc = SERVICES[active];
    const go = (dir: number) =>
      setActive((i) => (i + dir + SERVICES.length) % SERVICES.length);
    return (
      <section id="servicos" aria-label="Nossas soluções" className="services-mobile">
        {/* indexável p/ SEO/leitores de tela */}
        <ul className="sr-only">
          {SERVICES.map((s) => (
            <li key={s.kind}><h3>{s.title}</h3><p>{s.desc}</p></li>
          ))}
        </ul>
        <div className="inner">
          <span className="section-eyebrow">Soluções</span>
          <h2 className="services-mobile-title">As peças que a gente entrega.</h2>

          <div className="svc-carousel">
            <button className="svc-arrow" onClick={() => go(-1)} aria-label="Solução anterior">
              <Chevron dir="left" />
            </button>
            <div className="svc-stage">
              <IconCanvas variant="service" kind={svc.kind} className="svc-mobile-icon" />
            </div>
            <button className="svc-arrow" onClick={() => go(1)} aria-label="Próxima solução">
              <Chevron dir="right" />
            </button>
          </div>

          <div className="svc-card">
            <span className="svc-code">{svc.code}</span>
            <h3 className="svc-title">{svc.title}</h3>
            <span className="svc-metric">{svc.metric}</span>
            <p className="svc-desc">{svc.desc}</p>
          </div>

          <div className="svc-dots" role="tablist" aria-label="Soluções">
            {SERVICES.map((s, i) => (
              <button
                key={s.kind}
                className={`svc-dot${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={s.title}
                aria-selected={i === active}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ---- Desktop: galeria de ícones 3D em scroll "pinned" ----
  const svc = SERVICES[active];
  return (
    <section
      id="servicos"
      aria-label="Nossas soluções"
      ref={sectionRef}
      className="services-gl"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      <ul className="sr-only">
        {SERVICES.map((s) => (
          <li key={s.kind}><h3>{s.title}</h3><p>{s.desc}</p></li>
        ))}
      </ul>

      <div className="services-gl-stage" ref={stageRef}>
        <ServicesGalleryCanvas active={active} running={running} />

        <div className="services-hud" aria-hidden="true">
          <span className="services-eyebrow">Soluções</span>

          <div className="hud-tl">
            <span className="hud-code">{svc.code}</span>
            <span className="hud-title">{svc.title}</span>
          </div>

          <div className="hud-tr">
            <span className="hud-metric">{svc.metric}</span>
          </div>

          <div className="hud-bl">
            <span className="hud-date">{svc.date}</span>
            <span className="hud-explore">ROLE PARA TROCAR ↓</span>
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

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}
