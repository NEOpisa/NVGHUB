import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import {
  JOAO_LINKEDIN,
  MIZAEL_LINKEDIN,
  REPO_URL,
  VERSAO,
} from "@/lib/constants";
import { fmt, getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

/** Objetivos, limitações e desenvolvimento do projeto. */
export default function About({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.about;
  const c = messages.common;
  return (
    <>
      <section className="hero" aria-label={t.hero.label}>
        <div className="hero-copy">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1 className="h-xl">{rich(t.hero.title)}</h1>
          <p className="lead">{t.hero.lead}</p>
        </div>
      </section>

      <section className="panel" aria-labelledby="porque">
        <div className="sec-head">
          <span className="eyebrow">{t.goal.eyebrow}</span>
          <h2 className="h-lg" id="porque">{rich(t.goal.title)}</h2>
        </div>
        <p className="lead">{t.goal.text1}</p>
        <p className="lead">{t.goal.text2}</p>
      </section>

      <section className="panel" aria-labelledby="quem-faz">
        <div className="sec-head">
          <span className="eyebrow">{t.team.eyebrow}</span>
          <h2 className="h-lg" id="quem-faz">{rich(t.team.title)}</h2>
        </div>
        <p className="lead">{t.team.text}</p>
        <div className="pill-row">
          <a className="pill pill--ghost" href={MIZAEL_LINKEDIN} target="_blank" rel="noopener noreferrer">
            Mizael Ribeiro
            <ArrowUpRight />
          </a>
          <a className="pill pill--ghost" href={JOAO_LINKEDIN} target="_blank" rel="noopener noreferrer">
            João Antônio Rodrigues
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="panel panel--accent" aria-labelledby="naoe">
        <div className="sec-head">
          <span className="eyebrow">{t.scope.eyebrow}</span>
          <h2 className="h-lg" id="naoe">{rich(t.scope.title)}</h2>
          <p className="lead">{t.scope.lead}</p>
        </div>
        <div className="cards">
          {t.scope.cards.map((card, index) => (
            <article className="card" key={card.title}>
              <span className="card-n">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="card-t">{card.title}</h3>
              <p className="card-d">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="como">
        <div className="sec-head">
          <span className="eyebrow">{t.development.eyebrow}</span>
          <h2 className="h-lg" id="como">{rich(t.development.title)}</h2>
        </div>
        <p className="lead">{t.development.text1}</p>
        <p className="lead">{t.development.text2}</p>
        <div className="pill-row">
          <a
            className="pill"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.development.source}
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="closer" aria-label={c.start}>
        <h2 className="h-xl">{fmt(t.closer.title, { version: VERSAO })}</h2>
        <div className="pill-row">
          <Link href={localePath(locale, "/baixar")} className="pill">
            {c.viewImages}
            <ArrowUpRight />
          </Link>
          <Link href={localePath(locale, "/recursos")} className="pill pill--ghost">
            {c.features}
          </Link>
        </div>
      </section>
    </>
  );
}
