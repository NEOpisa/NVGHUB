"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import { WhatsAppIcon } from "@/components/icons";
import { WA, HERO_HEADLINE } from "@/lib/constants";
import { nova, clamp01 } from "./novaState";

const NovaScene = dynamic(() => import("./NovaScene"), {
  ssr: false,
  loading: () => <div className="nv2-canvas nv2-canvas-loading" aria-hidden="true" />,
});

/* ════════════════════════════════════════════════════════════════════
   NOVA HOME — content-first (zero loader), um canvas, quatro capítulos.
   O texto é DOM real (SEO/a11y); o canvas fixo atrás carrega o show.
   Scroll NATIVO — sem sequestro de gesto; os reveals são por IO + CSS.
   ════════════════════════════════════════════════════════════════════ */

const MANIFESTO = [
  {
    n: "01",
    t: "Um só ecossistema",
    d: "Sites, sistemas, SEO e suporte não são serviços soltos — funcionam como um organismo único, do briefing à entrega.",
  },
  {
    n: "02",
    t: "Performance como fundação",
    d: "Design de alta performance, inteligência artificial e automação a serviço de uma coisa: resultado medível.",
  },
  {
    n: "03",
    t: "Ritmo de vanguarda",
    d: "Entrega em até 16 dias úteis, sem contrato mínimo, com suporte direto via WhatsApp.",
  },
];

const DOORS = [
  {
    tier: "ouro" as const,
    tag: "DIVISÃO OURO",
    title: "Presença digital sólida, entregue rápido.",
    desc: "Quatro produtos com escopo claro e produção sistematizada. O valor é apresentado na consulta.",
    cta: "Conhecer o Ouro",
    href: "/ouro",
  },
  {
    tier: "platina" as const,
    tag: "DIVISÃO PLATINA",
    title: "Um sistema de captação desenhado para o seu negócio.",
    desc: "Montamos — e operamos — a máquina completa: página, agendamento, tracking, automação e mídia.",
    cta: "Conhecer a Platina",
    href: "/platina",
  },
];

export default function NovaHome() {
  const wrap = useRef<HTMLDivElement>(null);
  const [gl, setGl] = useState(false);

  /* WebGL + reduced-motion decidem se a cena monta (sem ela o site é 100%
     legível: DOM puro sobre obsidian) */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(location.search).get("motion") === "off") return;
    try {
      const c = document.createElement("canvas");
      if (c.getContext("webgl2") || c.getContext("webgl")) setGl(true);
    } catch {
      /* segue estático */
    }
  }, []);

  /* driver de progresso (scroll nativo) */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      if (total > 0) nova.p = clamp01(-el.getBoundingClientRect().top / total);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* reveals: um IO para todos os [data-reveal] */
  useEffect(() => {
    const els = wrap.current?.querySelectorAll("[data-reveal]");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.25 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="nv2">
      {gl && <NovaScene />}

      {/* ── 01 · HERO ─────────────────────────────────────── */}
      <section className="nv2-sec nv2-hero" aria-label="Apresentação da Neovanguard">
        <div className="nv2-hero-copy">
          <span className="nv2-eyebrow" data-reveal>
            Neovanguard · agência digital — Brasil
          </span>
          <h1 className="nv2-h1" data-reveal>
            {HERO_HEADLINE.before}
            <em>{HERO_HEADLINE.accent}</em>
          </h1>
          <p className="nv2-sub" data-reveal>
            Integramos design de alta performance, inteligência artificial e
            automação para transformar sua presença online em uma{" "}
            <strong>máquina de resultados</strong>.
          </p>
          <div className="nv2-cta-row" data-reveal>
            <Magnetic>
              <Link href="/solucao" className="btn-primary">
                Quero escalar minha empresa
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp">
                <WhatsAppIcon />
                Falar pelo WhatsApp
              </a>
            </Magnetic>
          </div>
          <p className="nv2-trust" data-reveal>
            entrega em até 16 dias · sem contrato mínimo · suporte via WhatsApp
          </p>
        </div>
        <div className="nv2-scrollcue" aria-hidden="true">
          <span>role</span>
          <i />
        </div>
      </section>

      {/* ── 02 · MANIFESTO ────────────────────────────────── */}
      <section className="nv2-sec nv2-manifesto" aria-label="Como trabalhamos">
        <span className="nv2-ghost" aria-hidden="true">01</span>
        <div className="nv2-manifesto-grid">
          {MANIFESTO.map((m) => (
            <article key={m.n} className="nv2-card" data-reveal>
              <span className="nv2-card-n">{m.n}</span>
              <h2>{m.t}</h2>
              <p>{m.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 03 · DIVISÕES ─────────────────────────────────── */}
      <section className="nv2-sec nv2-doors" aria-label="As duas divisões">
        <span className="nv2-ghost" aria-hidden="true">02</span>
        <div className="nv2-doors-head" data-reveal>
          <span className="nv2-eyebrow">Duas divisões, um padrão</span>
          <h2 className="nv2-h2">Escolha a sua etapa.</h2>
        </div>
        <div className="nv2-doors-grid">
          {DOORS.map((d) => (
            <Link
              key={d.tier}
              href={d.href}
              className={`nv2-door nv2-door--${d.tier}`}
              data-reveal
            >
              <span className="nv2-door-tag">{d.tag}</span>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <span className="nv2-door-cta">
                {d.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 04 · CHAMADA ──────────────────────────────────── */}
      <section className="nv2-sec nv2-call" aria-label="Comece agora">
        <div className="nv2-call-box" data-reveal>
          <span className="nv2-eyebrow">Consulta rápida</span>
          <h2 className="nv2-h2">
            Três perguntas.<br />
            <em>Consulta marcada.</em>
          </h2>
          <p className="nv2-sub">
            Sem formulário gigante e sem compromisso — responda e receba o
            caminho ideal para o seu negócio.
          </p>
          <div className="nv2-cta-row">
            <Magnetic>
              <Link href="/solucao" className="btn-primary">
                Começar agora
              </Link>
            </Magnetic>
          </div>
        </div>
        <footer className="nv2-foot" aria-hidden="true">
          NVG · © {new Date().getFullYear()} neovanguard
        </footer>
      </section>
    </div>
  );
}
