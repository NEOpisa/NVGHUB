"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Magnetic from "@/components/Magnetic";
import { WhatsAppIcon, CheckIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";
import { getLenisInstance } from "@/lib/lenis";
import { journey, rangeN, CH } from "./journeyState";

const ECO_LAYERS = [
  {
    num: "01",
    tier: "Base",
    title: "Arquitetura de Conversão",
    desc: "A fundação. Infraestrutura web rápida, segura e encontrável — feita para transformar visita em cliente.",
    tags: ["Velocidade", "SEO técnico", "Cloud"],
  },
  {
    num: "02",
    tier: "Conexão",
    title: "Integrações & Atendimento",
    desc: "O sistema nervoso. Conecta site, CRM e WhatsApp para que nenhum lead se perca no caminho.",
    tags: ["CRM", "WhatsApp", "APIs"],
  },
  {
    num: "03",
    tier: "Inteligência",
    title: "Dados, IA & Automação",
    desc: "A camada que aprende e age sozinha. Tira o trabalho repetitivo da sua mão.",
    tags: ["IA aplicada", "Analytics", "Automação"],
  },
];

const SERVICES = [
  {
    code: "SRV_01",
    title: "Site Profissional",
    metric: "ENTREGA · 16d",
    desc: "Landing ou site institucional responsivo, otimizado para SEO local e carregamento rápido. Feito para converter visitante em cliente.",
  },
  {
    code: "SRV_02",
    title: "Sistema para Negócio",
    metric: "PAINEL · INCLUSO",
    desc: "Cardápio digital, agendamento online ou catálogo interativo com painel de controle.",
  },
  {
    code: "SRV_03",
    title: "SEO & Presença Digital",
    metric: "RESULTADO · 30–60d",
    desc: "Apareça no Google local com Google Meu Negócio configurado e palavras-chave do seu segmento.",
  },
  {
    code: "SRV_04",
    title: "Manutenção & Suporte",
    metric: "RESPOSTA · 3h",
    desc: "Suporte real via WhatsApp, atualizações e monitoramento. Você chama, a gente resolve.",
  },
  {
    code: "SRV_05",
    title: "SaaS para seu segmento",
    metric: "NO AR · 5d",
    desc: "Plataforma pronta para clínicas e restaurantes, por assinatura — sem desenvolvimento customizado.",
  },
];

const AREAS = [
  { num: "01", label: "Sua solução", href: "/solucao", desc: "Responda 3 perguntas e a gente monta o seu sob medida." },
  { num: "02", label: "Quem somos", href: "/sobre", desc: "Quem somos, nossos números e a metodologia." },
  { num: "03", label: "Perguntas frequentes", href: "/faq", desc: "Prazos, suporte e como a gente trabalha." },
  { num: "04", label: "Contato", href: "/contato", desc: "Fale pelo WhatsApp ou formulário." },
];

const RAIL = [
  { label: "Início", p: 0.02 },
  { label: "Ecossistema", p: 0.32 },
  { label: "Soluções", p: 0.62 },
  { label: "Explorar", p: 0.985 },
];

function scrollToProgress(pc: number) {
  const wrap = document.querySelector<HTMLElement>(".jy-wrap");
  if (!wrap) return;
  const y =
    wrap.offsetTop + pc * (wrap.offsetHeight - window.innerHeight);
  const lenis = getLenisInstance();
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Conteúdo DOM da jornada. No modo GL, cada seção é fixa e aparece/some
 * conforme sua faixa de scroll (driver rAF direto no style — zero re-render).
 * No modo estático (sem WebGL / reduced-motion), as seções empilham normalmente.
 */
export default function JourneyOverlay({ staticMode }: { staticMode: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ecoRef = useRef<HTMLElement>(null);
  const svcRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (staticMode) return;
    const els = {
      hero: heroRef.current,
      eco: ecoRef.current,
      svc: svcRef.current,
      exp: expRef.current,
      root: root.current,
    };
    if (!els.root) return;
    const ecoCards = Array.from(
      els.root.querySelectorAll<HTMLElement>(".jy-eco-card"),
    );
    const svcCards = Array.from(
      els.root.querySelectorAll<HTMLElement>(".jy-svc"),
    );
    const svcDots = Array.from(
      els.root.querySelectorAll<HTMLElement>(".jy-svc-dot"),
    );
    const railItems = Array.from(
      els.root.querySelectorAll<HTMLElement>(".jy-rail-item"),
    );
    const hint = els.root.querySelector<HTMLElement>(".jy-hint");

    let lastActive = -1;
    let lastPast = false;

    const setSec = (
      el: HTMLElement | null,
      op: number,
      ty: number,
    ) => {
      if (!el) return;
      el.style.opacity = op.toFixed(3);
      el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0)`;
      el.style.visibility = op <= 0.002 ? "hidden" : "visible";
      el.style.pointerEvents = op > 0.35 ? "auto" : "none";
      el.classList.toggle("is-live", op > 0.05);
    };
    const band = (p: number, start: number, end: number) => {
      const l = rangeN(p, start, end);
      const op = Math.min(rangeN(l, 0, 0.12), 1 - rangeN(l, 0.86, 1));
      return { l, op, ty: (0.5 - l) * 40 };
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const p = journey.progress;

      // HERO: visível desde o load, só sai de cena
      setSec(els.hero, 1 - rangeN(p, 0.09, 0.155), rangeN(p, 0.04, 0.15) * -60);
      if (hint) hint.style.opacity = String(1 - rangeN(p, 0.02, 0.06));

      // marca volta ao header quando o visitante SAI do hero (o #hero é um
      // overlay fixo — o IntersectionObserver do Header não serve aqui)
      const past = p > 0.12;
      if (past !== lastPast) {
        lastPast = past;
        document.body.classList.toggle("jy-past-hero", past);
      }

      const eco = band(p, CH.eco.start, CH.eco.end);
      setSec(els.eco, eco.op, eco.ty);
      ecoCards.forEach((c, i) =>
        c.classList.toggle("is-on", eco.l > 0.16 + i * 0.22),
      );

      const svc = band(p, CH.services.start, CH.services.end);
      setSec(els.svc, svc.op, svc.ty);
      const active = Math.min(
        4,
        Math.floor(rangeN(p, CH.services.start, 0.72) * 5),
      );
      if (active !== lastActive) {
        lastActive = active;
        svcCards.forEach((c, i) => c.classList.toggle("is-on", i === active));
        svcDots.forEach((d, i) => d.classList.toggle("is-on", i === active));
        if (counterRef.current)
          counterRef.current.textContent = `0${active + 1}`;
      }

      // EXPLORE: capítulo final — entra e FICA
      const expL = rangeN(p, CH.explore.start, CH.explore.end);
      setSec(els.exp, rangeN(expL, 0, 0.4), (1 - expL) * 30);

      // rail: capítulo ativo
      const chapter = p < 0.18 ? 0 : p < 0.47 ? 1 : p < 0.77 ? 2 : 3;
      railItems.forEach((r, i) => r.classList.toggle("is-on", i === chapter));

      // capítulo final: o mini-footer já assina © — some a marca d'água
      els.root!.classList.toggle("jy-at-end", p > 0.86);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("jy-past-hero");
    };
  }, [staticMode]);

  return (
    <div
      ref={root}
      className={`jy-overlay${staticMode ? " jy-static" : ""}`}
    >
      {/* ── Capítulo 1 · HERO ─────────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="jy-sec jy-hero"
        aria-label="Apresentação da NEOVANGUARD"
      >
        <div className="jy-hero-grid">
          <div className="jy-hero-copy">
          <div className="jy-brand jy-enter jy-d1">
            <img src="/logo.png" alt="" aria-hidden="true" width={40} height={30} />
            <span className="jy-brand-name">
              NEO<b>VANGUARD</b>
            </span>
            <span className="jy-brand-sep" aria-hidden="true" />
            <span className="jy-brand-tag">Agência digital · Brasil</span>
          </div>

          <h1 className="jy-h1 jy-enter jy-d2">
            Ecossistemas digitais que impulsionam o{" "}
            <span className="text-gradient">crescimento da sua empresa</span>
          </h1>

          <p className="jy-sub jy-enter jy-d3">
            Integramos design de alta performance, inteligência artificial e
            automação para transformar sua presença online em uma{" "}
            <strong>máquina de resultados</strong>.
          </p>

          <div className="jy-cta-row jy-enter jy-d4">
            <Magnetic>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-whatsapp"
              >
                <WhatsAppIcon />
                Falar pelo WhatsApp
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/solucao" className="btn-ghost">
                Quero escalar minha empresa
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/exemplos" className="btn-ghost">
                Exemplos de sites
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={IG} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <InstagramIcon />
                Instagram
              </a>
            </Magnetic>
          </div>

          <div className="jy-trust jy-enter jy-d5">
            {["Entrega em até 16 dias úteis", "Sem contrato mínimo", "Suporte via WhatsApp"].map(
              (t) => (
                <span key={t} className="jy-trust-item">
                  <CheckIcon />
                  {t}
                </span>
              ),
            )}
          </div>
          </div>
          {/* coluna direita: a marca NV 3D vive aqui (dentro do canvas) */}
          <div className="jy-hero-space" aria-hidden="true" />
        </div>
      </section>

      {/* ── Capítulo 2 · ECOSSISTEMA ─────────────────────── */}
      <section ref={ecoRef} className="jy-sec jy-eco" aria-label="O ecossistema Neovanguard">
        <span className="jy-ghost" aria-hidden="true">01</span>
        <div className="jy-eco-inner">
          <div className="jy-eco-head">
            <span className="section-eyebrow">Ecossistema</span>
            <h2 className="jy-h2">
              Não vendemos site. Construímos{" "}
              <span className="text-accent-nvg">capilares de crescimento.</span>
            </h2>
            <p className="jy-sub-sm">
              Cada peça conversa com a próxima. O site é só o ponto de entrada —
              por baixo corre uma estrutura que captura, conecta e converte.
            </p>
          </div>
          <div className="jy-eco-cards">
            {ECO_LAYERS.map((l) => (
              <div key={l.num} className="jy-eco-card">
                <span className="jy-eco-num">{l.num}</span>
                <div>
                  <span className="jy-eco-tier">{l.tier}</span>
                  <h3 className="jy-eco-title">{l.title}</h3>
                  <p className="jy-eco-desc">{l.desc}</p>
                  <ul className="jy-tags">
                    {l.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capítulo 3 · SOLUÇÕES ────────────────────────── */}
      <section ref={svcRef} className="jy-sec jy-services" aria-label="Soluções da Neovanguard">
        <span className="jy-ghost jy-ghost-top" aria-hidden="true">02</span>
        <div className="jy-svc-inner">
          <div className="jy-svc-head">
            <span className="section-eyebrow">Soluções</span>
            <span className="jy-svc-counter" aria-hidden="true">
              <span ref={counterRef}>01</span>
              <em>/05</em>
            </span>
          </div>
          <div className="jy-svc-stack">
            {SERVICES.map((s, i) => (
              <article key={s.code} className={`jy-svc${i === 0 ? " is-on" : ""}`}>
                <span className="jy-svc-code">{s.code}</span>
                <h3 className="jy-svc-title">{s.title}</h3>
                <span className="jy-svc-metric">{s.metric}</span>
                <p className="jy-svc-desc">{s.desc}</p>
              </article>
            ))}
          </div>
          <div className="jy-svc-dots" aria-hidden="true">
            {SERVICES.map((s, i) => (
              <span key={s.code} className={`jy-svc-dot${i === 0 ? " is-on" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Capítulo final · EXPLORE (a jornada continua) ── */}
      <section ref={expRef} className="jy-sec jy-explore" aria-label="Navegue pelo site">
        <span className="jy-ghost" aria-hidden="true">03</span>
        <div className="jy-exp-inner">
          <div className="jy-exp-head">
            <span className="section-eyebrow">Destino final</span>
            <h2 className="jy-h2 jy-h2-xl">
              A jornada <span className="text-accent-nvg">continua.</span>
            </h2>
            <p className="jy-sub-sm">
              Cada área é uma estação própria — escolha o seu destino, ou fale
              direto com a gente.
            </p>
            <div className="jy-cta-row">
              <Magnetic>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-whatsapp"
                >
                  <WhatsAppIcon />
                  Falar pelo WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>
          {/* painel de EMBARQUE: linhas mono + hairlines, zero caixas */}
          <div className="jy-exp-list">
            <div className="jy-exp-cols" aria-hidden="true">
              <span>rota</span>
              <span>destino</span>
              <span>status</span>
            </div>
            {AREAS.map((a, i) => (
              <Link
                key={a.href}
                href={a.href}
                className={`jy-exp-link${a.href === "/solucao" ? " is-holo" : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="jy-exp-num" aria-hidden="true">
                  RT_{a.num}
                </span>
                <span className="jy-exp-body">
                  <span className="jy-exp-label">{a.label}</span>
                  <span className="jy-exp-desc">{a.desc}</span>
                </span>
                <span className="jy-exp-go" aria-hidden="true">
                  <span className="jy-exp-go-idle">
                    <i className="jy-exp-dot" />
                    pronto
                  </span>
                  <span className="jy-exp-go-hover">embarcar ›</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* mini-footer integrado ao fim da jornada */}
        <div className="jy-cta-foot">
          <nav className="jy-cta-foot-links" aria-label="Links do rodapé">
            <Link href="/exemplos">Exemplos</Link>
            <Link href="/contato">Contato</Link>
            <a href={IG} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </nav>
          <span className="jy-cta-copy">
            © {new Date().getFullYear()} Neovanguard · Todos os direitos
            reservados
          </span>
        </div>
      </section>

      {/* trilho de capítulos + dica de scroll (só no modo GL) */}
      {!staticMode && (
        <>
          {/* moldura HUD fina (estética kprverse) — só a assinatura da
              esquerda inferior; some no capítulo final (o mini-footer assina) */}
          <div className="jy-frame" aria-hidden="true">
            <span className="jy-frame-label jy-frame-bl">
              NVG <i>{"//"}</i> © {new Date().getFullYear()} neovanguard
            </span>
          </div>
          <nav className="jy-rail" aria-label="Capítulos da página">
            {RAIL.map((r, i) => (
              <button
                key={r.label}
                type="button"
                className={`jy-rail-item${i === 0 ? " is-on" : ""}`}
                onClick={() => scrollToProgress(r.p)}
              >
                <span className="jy-rail-dot" aria-hidden="true" />
                <span className="jy-rail-label">{r.label}</span>
              </button>
            ))}
          </nav>
          <div className="jy-hint" aria-hidden="true">
            <span>Role para explorar</span>
            <span className="jy-hint-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v16M5 13l7 7 7-7" />
              </svg>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
