"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Magnetic from "@/components/Magnetic";
import { WhatsAppIcon } from "@/components/icons";
import { WA, HERO_HEADLINE } from "@/lib/constants";
import { track } from "@vercel/analytics";
import { getLenisInstance } from "@/lib/lenis";
import { journey, rangeN, CH } from "./journeyState";
import EcoNodes from "./EcoNodes";

/* OURO é o produto principal (a porta larga); PLATINA é seletiva — a porta
   dela é um CADASTRO de candidatura, não uma vitrine */
const OURO_STATS = [
  ["16d", "entrega"],
  ["20–30min", "consulta"],
  ["3h", "suporte"],
] as const;
const OURO_LEVA = [
  "Sistema, automação ou loja no ar",
  "Escopo fechado antes de começar",
  "Suporte incluso via WhatsApp",
];

const RAIL = [
  { label: "Início", p: 0.02 },
  { label: "Ecossistema", p: 0.35 },
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
  const expRef = useRef<HTMLElement>(null);
  // #013 · live region: anuncia o capítulo ativo a leitores de tela
  const liveRef = useRef<HTMLSpanElement>(null);

  /* candidatura PLATINA: o formulário abre o WhatsApp com a ficha pronta */
  const applyPlatina = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") ?? "").trim();
    const empresa = String(fd.get("empresa") ?? "").trim();
    const zap = String(fd.get("whatsapp") ?? "").trim();
    track("platina_apply");
    const msg = encodeURIComponent(
      `Candidatura PLATINA\nNome: ${nome}\nEmpresa: ${empresa}\nWhatsApp: ${zap}`,
    );
    window.open(`${WA}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (staticMode) return;
    const els = {
      hero: heroRef.current,
      eco: ecoRef.current,
      exp: expRef.current,
      root: root.current,
    };
    if (!els.root) return;
    const ecoCards = Array.from(
      els.root.querySelectorAll<HTMLElement>(".eco-node"),
    );
    const railItems = Array.from(
      els.root.querySelectorAll<HTMLElement>(".jy-rail-item"),
    );
    const railEl = els.root.querySelector<HTMLElement>(".jy-rail");
    const hint = els.root.querySelector<HTMLElement>(".jy-hint");

    let lastPast = false;
    let lastChapter = -1;
    let maxChapter = -1; // #045 · profundidade máxima já reportada

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
      // espinha do trilho: o fio de progresso acompanha a viagem
      if (railEl) railEl.style.setProperty("--jyp", p.toFixed(4));

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
        c.classList.toggle("is-on", eco.l > 0.06 + i * 0.02),
      );

      // EXPLORE: capítulo final — entra e FICA
      const expL = rangeN(p, CH.explore.start, CH.explore.end);
      setSec(els.exp, rangeN(expL, 0, 0.4), (1 - expL) * 30);

      // rail: capítulo ativo — atualiza SÓ na troca (#013: também menos
      // trabalho por frame) + aria-current e anúncio polite ao leitor de tela
      const chapter = p < 0.18 ? 0 : p < 0.68 ? 1 : 2;
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
        // #045 · scroll-depth por capítulo (só o mais fundo, uma vez cada)
        if (chapter > maxChapter) {
          maxChapter = chapter;
          track("journey_depth", { chapter });
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
            <span className="jy-brand-tag">Ferramentas para negócios · Brasil</span>
          </div>

          {/* #041/#073 · headline versionável (constants/env) + texto real no
              DOM = fallback SEO garantido mesmo sem o 3D */}
          <h1 className="jy-h1 jy-enter jy-d2">
            {HERO_HEADLINE.before}
            <span className="text-gradient">{HERO_HEADLINE.accent}</span>
          </h1>

          <p className="jy-sub jy-enter jy-d3">
            Sistemas, automações e IA sob medida. Entendemos a dor, desenhamos
            a solução e entregamos a ferramenta —{" "}
            <strong>funcionando</strong>.
          </p>

          <div className="jy-cta-row jy-enter jy-d4">
            <Magnetic>
              <Link href="/solucao" className="btn-primary">
                Quero resolver um problema
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
        {/* título central no topo — as rodas flanqueiam, nada se cobre */}
        <div className="jy-eco-min">
          <span className="section-eyebrow">Ecossistema</span>
          <h2 className="jy-h2 jy-eco-h2">
            Vinte ferramentas.{" "}
            <span className="text-accent-nvg">Um organismo.</span>
          </h2>
          <p className="jy-eco-sub">
            Gire as rodas e explore tudo que construímos — cada ferramenta
            alimenta a próxima.
          </p>
        </div>

        {/* sistema planetário interativo: rótulos colados nos planetas 3D */}
        <EcoNodes staticMode={staticMode} />
      </section>

      {/* ── Capítulo final · A ESCOLHA (bifurcação Ouro | Platina) ── */}
      <section
        ref={expRef}
        className="jy-sec jy-explore"
        aria-label="A escolha: Ouro ou Platina"
      >
        <div className="jy-exp-inner">
          <div className="jy-exp-head">
            <span className="section-eyebrow">A escolha</span>
            <h2 className="jy-h2 jy-h2-xl">
              Duas divisões. <span className="text-accent-nvg">Um DNA.</span>
            </h2>
            <p className="jy-sub-sm">
              O <strong>Ouro</strong> é a porta de entrada — objetivo, rápido
              e para todos. A <strong>Platina</strong> é seletiva: poucas
              operações por vez, escolhidas por diagnóstico.
            </p>
          </div>
          {/* bifurcação: OURO é produto (navega, travessia dourada);
              PLATINA é candidatura (formulário, sem vitrine) */}
          <div className="jy-fork-grid vy-fork-grid">
            <Link
              href="/ouro"
              className="vy-door vy-door--ouro card-1"
              onClick={() => track("door_cross", { tier: "ouro" })}
            >
              <span className="vy-door-bar" aria-hidden="true" />
              <span className="vy-door-sheen" aria-hidden="true" />
              <span className="vy-door-flag">RECOMENDADO · COMECE AQUI</span>
              <span className="vy-door-tag">PRODUTO PRINCIPAL</span>
              <h3 className="vy-door-title">OURO</h3>
              <p className="vy-door-desc">
                O caminho direto: a ferramenta que seu negócio precisa, com
                escopo fechado e entrega rápida. Uma consulta objetiva define
                seu plano.
              </p>
              <div className="vy-door-stats" aria-hidden="true">
                {OURO_STATS.map(([n, l]) => (
                  <span key={l}>
                    <b>{n}</b>
                    {l}
                  </span>
                ))}
              </div>
              <ul className="vy-door-list">
                {OURO_LEVA.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <span className="vy-door-cta">
                Entrar no Ouro
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="vy-door-note">
                entrega em até 16 dias · sem contrato mínimo
              </span>
            </Link>

            <div
              className="vy-door vy-door--platina card-1"
              style={{ transitionDelay: "90ms" }}
            >
              <span className="vy-door-bar" aria-hidden="true" />
              <span className="vy-door-flag">VAGAS LIMITADAS</span>
              <span className="vy-door-tag">ACESSO SELETIVO</span>
              <h3 className="vy-door-title">PLATINA</h3>
              <p className="vy-door-desc">
                Parceria completa e sob medida, para poucas operações por vez.
                Candidate-se — nós analisamos e retornamos.
              </p>
              <form className="vy-apply" onSubmit={applyPlatina}>
                <label className="vy-apply-field">
                  <span>Nome</span>
                  <input
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Seu nome"
                  />
                </label>
                <label className="vy-apply-field">
                  <span>Empresa</span>
                  <input
                    name="empresa"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Nome do negócio"
                  />
                </label>
                <label className="vy-apply-field">
                  <span>WhatsApp</span>
                  <input
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(19) 9 9999-9999"
                  />
                </label>
                <button type="submit" className="vy-apply-send">
                  Enviar candidatura
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="vy-apply-note">
                  resposta em até 48h · seus dados ficam só com a gente
                </span>
              </form>
            </div>
          </div>

        </div>

        {/* mini-footer integrado: consulta rápida + links num bloco só */}
        <div className="jy-cta-foot">
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
          <nav className="jy-cta-foot-links" aria-label="Links do rodapé">
            <Link href="/exemplos">Exemplos</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/sobre">Quem somos</Link>
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
            {/* a dica fala a língua do dispositivo (CSS troca por pointer) */}
            <span className="jy-hint-txt--pointer">Role para explorar</span>
            <span className="jy-hint-txt--touch">Deslize para explorar</span>
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
