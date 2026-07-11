"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import { WhatsAppIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";
import { getLenisInstance } from "@/lib/lenis";
import { journey, rangeN, CH } from "./journeyState";

/* callouts estilo igloo: crosshair + linha-guia + poucas palavras.
   Cada um aponta uma camada orbital do organismo 3D. */
const ECO_CALLOUTS = [
  {
    num: "01",
    tag: "BASE",
    txt: "site que captura e converte",
    pos: "jy-orb--1",
  },
  {
    num: "02",
    tag: "CONEXÃO",
    txt: "CRM + WhatsApp · nenhum lead se perde",
    pos: "jy-orb--2",
  },
  {
    num: "03",
    tag: "INTELIGÊNCIA",
    txt: "IA e automação agindo sozinhas",
    pos: "jy-orb--3",
  },
];

const SERVICES = [
  {
    code: "SRV_01",
    title: "Site Profissional",
    metric: "ENTREGA · 16d",
    desc: "Feito para transformar visitante em cliente.",
  },
  {
    code: "SRV_02",
    title: "Sistema para Negócio",
    metric: "PAINEL · INCLUSO",
    desc: "Cardápio, agendamento ou catálogo — com painel.",
  },
  {
    code: "SRV_03",
    title: "SEO & Presença Digital",
    metric: "RESULTADO · 30–60d",
    desc: "Apareça nas buscas locais do Google.",
  },
  {
    code: "SRV_04",
    title: "Manutenção & Suporte",
    metric: "RESPOSTA · 3h",
    desc: "Você chama no WhatsApp, nós resolvemos.",
  },
  {
    code: "SRV_05",
    title: "SaaS para seu segmento",
    metric: "NO AR · 5d",
    desc: "Plataforma por assinatura, pronta em dias.",
  },
];

const DOORS = [
  {
    tier: "ouro" as const,
    href: "/ouro",
    tag: "DIV_01 · PRODUTO CONSULTIVO",
    title: "OURO",
    desc: "Presença sólida, escopo claro, entrega rápida — o caminho sai de uma consulta objetiva.",
    specs: ["Escopo fechado", "Entrega 7–35 dias", "Consulta 20–30 min", "Suporte incluso"],
    cta: "Entrar no Ouro",
  },
  {
    tier: "platina" as const,
    href: "/platina",
    tag: "DIV_02 · PARCERIA SOB MEDIDA",
    title: "PLATINA",
    desc: "A máquina completa, sob medida — diagnóstico profundo e otimização contínua.",
    specs: ["100% sob medida", "Resultado assumido", "Otimização mensal", "Vagas limitadas"],
    cta: "Entrar na Platina",
  },
];

const RAIL = [
  { label: "Início", p: 0.02 },
  { label: "Ecossistema", p: 0.32 },
  { label: "Soluções", p: 0.62 },
  { label: "A Escolha", p: 0.985 },
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
  const passRef = useRef<HTMLDivElement>(null);
  // #013 · live region: anuncia o capítulo ativo a leitores de tela
  const liveRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  /* A PASSAGEM — o mundo tinge na temperatura da divisão antes de navegar */
  const cross = (href: string, tier: "ouro" | "platina") => {
    const pass = passRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pass || reduce) {
      router.push(href);
      return;
    }
    pass.dataset.tier = tier;
    pass.classList.add("is-crossing");
    window.setTimeout(() => router.push(href), 560);
  };

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
      els.root.querySelectorAll<HTMLElement>(".jy-orb"),
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
    let lastChapter = -1;

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
    // #037 · easing ÚNICO dos reveals scroll-linked: entrada/saída deixam de
    // ser lineares e compartilham a mesma curva (out-cubic) em todos os
    // capítulos — mais snap no início, assentamento suave no fim.
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const band = (p: number, start: number, end: number) => {
      const l = rangeN(p, start, end);
      const op = Math.min(
        easeOut(rangeN(l, 0, 0.12)),
        1 - easeOut(rangeN(l, 0.86, 1)),
      );
      return { l, op, ty: (0.5 - l) * 40 };
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const p = journey.progress;

      // HERO: visível desde o load, só sai de cena (mesma curva dos capítulos)
      setSec(
        els.hero,
        1 - easeOut(rangeN(p, 0.09, 0.155)),
        rangeN(p, 0.04, 0.15) * -60,
      );
      if (hint) hint.style.opacity = String(1 - easeOut(rangeN(p, 0.02, 0.06)));

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

      // rail: capítulo ativo — atualiza SÓ na troca (#013: também menos
      // trabalho por frame) + aria-current e anúncio polite ao leitor de tela
      const chapter = p < 0.18 ? 0 : p < 0.47 ? 1 : p < 0.77 ? 2 : 3;
      if (chapter !== lastChapter) {
        lastChapter = chapter;
        railItems.forEach((r, i) => {
          const on = i === chapter;
          r.classList.toggle("is-on", on);
          if (on) r.setAttribute("aria-current", "true");
          else r.removeAttribute("aria-current");
          // #019 · o tab-stop do grupo acompanha o capítulo ativo (roving) —
          // exceto se o foco está dentro do rail (não roubar o stop do usuário)
          if (!els.root!.querySelector(".jy-rail:focus-within"))
            r.tabIndex = on ? 0 : -1;
        });
        if (liveRef.current) {
          const label = railItems[chapter]?.textContent?.trim() ?? "";
          liveRef.current.textContent = label ? `Capítulo: ${label}` : "";
        }
      }

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
            {/* #029 · candidato a LCP do hero: prioridade alta na busca */}
            <img src="/logo.png" alt="" aria-hidden="true" width={40} height={30} fetchPriority="high" />
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
              <Link href="/solucao" className="btn-primary">
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

          <p className="jy-trust-line jy-enter jy-d5">
            entrega em até 16 dias · sem contrato mínimo · suporte via WhatsApp
          </p>
          </div>
          {/* coluna direita: a marca NV 3D vive aqui (dentro do canvas) */}
          <div className="jy-hero-space" aria-hidden="true" />
        </div>
      </section>

      {/* ── Capítulo 2 · ECOSSISTEMA ─────────────────────── */}
      <section ref={ecoRef} className="jy-sec jy-eco" aria-label="O ecossistema Neovanguard">
        <span className="jy-ghost" aria-hidden="true">01</span>

        {/* título mínimo — o organismo 3D é o protagonista */}
        <div className="jy-eco-min">
          <span className="section-eyebrow">Ecossistema</span>
          <h2 className="jy-h2 jy-eco-h2">
            Não vendemos site.
            <br />
            <span className="text-accent-nvg">Construímos um organismo.</span>
          </h2>
        </div>

        {/* callouts orbitais: crosshair + linha-guia + mono */}
        <div className="jy-orbs" aria-hidden="false">
          {ECO_CALLOUTS.map((c) => (
            <div key={c.num} className={`jy-orb ${c.pos}`}>
              <span className="jy-orb-cross" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="jy-orb-leader" aria-hidden="true" />
              <div className="jy-orb-body">
                <span className="jy-orb-tag">
                  {`CAMADA ${c.num}`} <em>·</em> {c.tag}
                </span>
                <span className="jy-orb-txt">{c.txt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* assinatura da tese, uma linha só */}
        <p className="jy-eco-thesis">
          Três camadas, um sistema — cada peça alimenta a próxima.
        </p>
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

      {/* ── Capítulo final · A ESCOLHA (bifurcação Ouro | Platina) ── */}
      <section
        ref={expRef}
        className="jy-sec jy-explore"
        aria-label="A escolha: Ouro ou Platina"
      >
        <span className="jy-ghost" aria-hidden="true">03</span>
        <div className="jy-exp-inner">
          <div className="jy-exp-head">
            <span className="section-eyebrow">A escolha</span>
            <h2 className="jy-h2 jy-h2-xl">
              Duas divisões. <span className="text-accent-nvg">Um DNA.</span>
            </h2>
            <p className="jy-sub-sm">
              Ambas consultivas — o valor é apresentado na consulta. A
              diferença é a profundidade.
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
          {/* bifurcação: duas portas DOM (Ouro esquenta · Platina esfria) */}
          <div className="jy-fork-grid vy-fork-grid">
            {DOORS.map((d, i) => (
              <article
                key={d.tier}
                className={`vy-door vy-door--${d.tier} card-1`}
                style={{ transitionDelay: `${i * 90}ms` }}
                onClick={() => cross(d.href, d.tier)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  // #019 · Enter/Space ativam; setas movem entre as portas
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    cross(d.href, d.tier);
                    return;
                  }
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const doors = Array.from(
                      e.currentTarget.parentElement?.querySelectorAll<HTMLElement>(
                        ".vy-door",
                      ) ?? [],
                    );
                    const idx = doors.indexOf(e.currentTarget as HTMLElement);
                    const to =
                      e.key === "ArrowRight"
                        ? Math.min(doors.length - 1, idx + 1)
                        : Math.max(0, idx - 1);
                    if (to !== idx) {
                      e.preventDefault();
                      doors[to].focus();
                    }
                  }
                }}
              >
                <span className="vy-door-bar" aria-hidden="true" />
                <span className="vy-door-sheen" aria-hidden="true" />
                <span className="vy-door-tag">{d.tag}</span>
                <h3 className="vy-door-title">{d.title}</h3>
                <p className="vy-door-desc">{d.desc}</p>
                <ul className="vy-door-list">
                  {d.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="vy-door-cta">
                  {d.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </article>
            ))}
          </div>

          {/* terceira via: consulta rápida (o antigo "Sua solução") */}
          <div className="jy-quick">
            <span className="jy-quick-tag" aria-hidden="true">
              CONSULTA RÁPIDA
            </span>
            <p className="jy-quick-txt">
              Não sabe por qual porta entrar? Três perguntas e nós direcionamos
              você.
            </p>
            <Magnetic strength={0.2}>
              <Link href="/solucao" className="btn-ghost jy-quick-cta">
                Fazer a consulta rápida
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Magnetic>
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
              NVG · © {new Date().getFullYear()} neovanguard
            </span>
          </div>
          {/* #013 · anúncio do capítulo ativo (visualmente oculto) */}
          <span ref={liveRef} className="sr-only" role="status" aria-live="polite" />
          {/* #019 · roving tabindex: UM tab-stop no grupo; setas/Home/End movem */}
          <nav
            className="jy-rail"
            aria-label="Capítulos da página"
            onKeyDown={(e) => {
              const items = Array.from(
                e.currentTarget.querySelectorAll<HTMLButtonElement>(
                  ".jy-rail-item",
                ),
              );
              const idx = items.indexOf(
                document.activeElement as HTMLButtonElement,
              );
              if (idx < 0) return;
              let to = -1;
              if (e.key === "ArrowDown" || e.key === "ArrowRight")
                to = Math.min(items.length - 1, idx + 1);
              else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                to = Math.max(0, idx - 1);
              else if (e.key === "Home") to = 0;
              else if (e.key === "End") to = items.length - 1;
              if (to < 0 || to === idx) return;
              e.preventDefault();
              items.forEach((it, i) => (it.tabIndex = i === to ? 0 : -1));
              items[to].focus();
            }}
          >
            {RAIL.map((r, i) => (
              <button
                key={r.label}
                type="button"
                className={`jy-rail-item${i === 0 ? " is-on" : ""}`}
                tabIndex={i === 0 ? 0 : -1}
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

      {/* A PASSAGEM — a travessia QUEBRA a tela em cacos que convergem
          na temperatura da divisão antes de navegar */}
      <div ref={passRef} className="vy-passagem" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ "--si": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
