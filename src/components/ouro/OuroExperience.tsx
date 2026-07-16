"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

// quiz pesado fora do chunk inicial da rota
const TierQuiz = dynamic(() => import("@/components/TierQuiz"));
// cenário 3D dourado (three fora do bundle inicial)
const OuroCanvas = dynamic(() => import("./OuroCanvas"), {
  ssr: false,
  loading: () => <div className="ou-canvas" aria-hidden="true" />,
});

const STATS = [
  { n: "16", u: "dias úteis", d: "do aceite ao ar" },
  { n: "20–30", u: "minutos", d: "de consulta objetiva" },
  { n: "3h", u: "de resposta", d: "no suporte WhatsApp" },
  { n: "0", u: "contrato mínimo", d: "fique porque funciona" },
];

const OFERTAS = [
  {
    num: "01",
    title: "Vitrine Digital",
    desc: "Página única de alta conversão para colocar seu negócio no mapa — rápida, bonita e encontrável.",
    tags: ["Landing", "SEO local", "WhatsApp"],
  },
  {
    num: "02",
    title: "Presença Web",
    desc: "Site institucional completo com blog e Google Meu Negócio configurado para dominar a busca local.",
    tags: ["Institucional", "GMN", "Blog"],
  },
  {
    num: "03",
    title: "Sistema Web",
    desc: "Agendamento online, cardápio digital ou catálogo com painel de controle — operação na sua mão.",
    tags: ["Agendamento", "Painel", "Automação"],
  },
  {
    num: "04",
    title: "E-commerce",
    desc: "Loja online integrada a pagamento e frete, pronta para vender desde o primeiro dia.",
    tags: ["Loja", "Pagamentos", "Checkout"],
  },
];

const PASSOS = [
  {
    num: "01",
    title: "Quiz de qualificação",
    desc: "Três minutos para entendermos o que você já tem e o que precisa.",
  },
  {
    num: "02",
    title: "Consulta objetiva",
    desc: "20–30 minutos: indicamos o produto certo e apresentamos o valor.",
  },
  {
    num: "03",
    title: "Proposta e entrega",
    desc: "Proposta enxuta, produção sistematizada e entrega em até 16 dias úteis.",
  },
];

const MARQUEE = [
  "SITE PROFISSIONAL",
  "SISTEMA WEB",
  "E-COMMERCE",
  "SEO LOCAL",
  "AUTOMAÇÃO",
  "ENTREGA EM 16 DIAS",
];

/**
 * EXPERIÊNCIA OURO — o chamariz da divisão: jornada própria em ouro sobre um
 * cenário 3D exclusivo (marca NV fundida em ouro + barras em deriva). Cada
 * seção revela ao entrar no viewport; o scroll dirige o 3D ao fundo.
 */
export default function OuroExperience() {
  const root = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLElement>(null);

  // fio de ouro no topo: o progresso da leitura (rAF-throttled, sem re-render)
  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(raf);
    };
  }, []);

  // reveal-on-scroll: uma classe, sem re-render
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(".ou-rv");
    if (!els?.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="ou">
      <OuroCanvas />

      {/* fio de ouro: progresso da página, sempre visível */}
      <div className="ou-progress" aria-hidden="true">
        <i ref={progRef} />
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="ou-hero" aria-label="Divisão Ouro">
        <div className="ou-hero-copy">
          <span className="ou-eyebrow ou-rv">
            DIVISÃO OURO · PRODUTO PRINCIPAL
          </span>
          <h1 className="ou-h1 ou-rv">
            Seu negócio no ar, <em>vendendo</em>, em até 16 dias.
          </h1>
          <p className="ou-sub ou-rv">
            Site, sistema ou loja com escopo fechado e produção sistematizada.
            Uma consulta objetiva define o caminho — e é nela que o valor é
            apresentado.
          </p>
          <div className="ou-cta-row ou-rv">
            <a href="#quiz" className="btn-primary ou-btn-gold">
              Começar pelo quiz
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
          </div>
          <p className="ou-trust ou-rv">
            sem contrato mínimo · suporte incluso · valor na consulta
          </p>
        </div>
        {/* coluna direita: a marca NV em ouro vive no canvas */}
        <div className="ou-hero-space" aria-hidden="true" />
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="ou-marquee" aria-hidden="true">
        <div className="ou-marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i}>
              {m}
              <i>◆</i>
            </span>
          ))}
        </div>
      </div>

      {/* ── NÚMEROS ──────────────────────────────────────── */}
      <section className="ou-sec" aria-label="Números da divisão Ouro">
        <div className="ou-stats">
          {STATS.map((s) => (
            <div key={s.u} className="ou-stat ou-rv">
              <b>{s.n}</b>
              <span className="ou-stat-u">{s.u}</span>
              <span className="ou-stat-d">{s.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUTOS ─────────────────────────────────────── */}
      <section className="ou-sec" aria-label="Produtos da divisão Ouro">
        <div className="ou-head ou-rv">
          <span className="ou-eyebrow">Os produtos</span>
          <h2 className="ou-h2">
            Quatro caminhos. <em>Um destino: vender.</em>
          </h2>
        </div>
        <div className="ou-cards">
          {OFERTAS.map((o, i) => (
            <article
              key={o.num}
              className="ou-card ou-rv"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="ou-card-num">{o.num}</span>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <ul className="ou-card-tags">
                {o.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ────────────────────────────────── */}
      <section className="ou-sec" aria-label="Como funciona a divisão Ouro">
        <div className="ou-head ou-rv">
          <span className="ou-eyebrow">Como funciona</span>
          <h2 className="ou-h2">
            Três passos. <em>Zero enrolação.</em>
          </h2>
        </div>
        <div className="ou-steps">
          {PASSOS.map((p, i) => (
            <article
              key={p.num}
              className="ou-step ou-rv"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="ou-step-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── QUIZ (a porta de entrada) ────────────────────── */}
      <section id="quiz" className="ou-sec" aria-label="Quiz de qualificação Ouro">
        <div className="ou-head ou-rv">
          <span className="ou-eyebrow">Comece aqui</span>
          <h2 className="ou-h2">
            Três perguntas. <em>Consulta marcada.</em>
          </h2>
        </div>
        <div className="ou-quiz ou-rv">
          <TierQuiz tier="ouro" />
        </div>
      </section>

      {/* ── PONTE PLATINA (discreta) ─────────────────────── */}
      <section className="ou-sec ou-sec--last" aria-label="Ascensão para a Platina">
        <div className="ou-bridge ou-rv">
          <p>
            Negócio validado e pronto para escalar? A{" "}
            <strong>Platina</strong> é a parceria completa — seletiva, por
            candidatura.
          </p>
          <Link href="/?tier=platina" className="ou-bridge-link">
            Candidatar-se à Platina
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA primário sticky (só mobile, via c2.css) */}
      <div className="tp-sticky-cta" aria-hidden="false">
        <a href="#quiz" className="btn-primary">
          Começar as 3 perguntas
        </a>
      </div>
    </div>
  );
}
