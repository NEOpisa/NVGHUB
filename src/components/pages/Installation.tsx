import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO } from "@/lib/constants";
import { fmt, getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

const number = (index: number) => String(index + 1).padStart(2, "0");

/** Preparação da mídia e etapas do instalador NVG Install. */
export default function Installation({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.installation;
  const c = messages.common;
  const link = (path: string) => localePath(locale, path);
  return (
    <>
      <section className="hero" aria-label={t.hero.label}>
        <div className="hero-copy">
          <span className="eyebrow">{fmt(t.hero.eyebrow, { version: VERSAO })}</span>
          <h1 className="h-xl">{t.hero.title}</h1>
          <p className="lead">{t.hero.lead}</p>
        </div>
      </section>

      <section className="panel" aria-labelledby="preparar">
        <div className="sec-head"><span className="eyebrow">{t.prepare.eyebrow}</span><h2 className="h-lg" id="preparar">{t.prepare.title}</h2></div>
        <p className="lead">{rich(t.prepare.lead, { download: link("/baixar") })}</p>
      </section>
      <section className="panel" aria-labelledby="gravar">
        <div className="sec-head">
          <span className="eyebrow">{t.media.eyebrow}</span>
          <h2 className="h-lg" id="gravar">{rich(t.media.title)}</h2>
        </div>
        <div className="cards">
          {t.media.cards.map((card, index) => (
            <article className="card" key={card.title}>
              <span className="card-n">{number(index)}</span>
              <h3 className="card-t">{card.title}</h3>
              <p className="card-d">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="iniciar">
        <div className="sec-head"><span className="eyebrow">{t.launch.eyebrow}</span><h2 className="h-lg" id="iniciar">{t.launch.title}</h2></div>
        <CodeBlock t={messages.code}>{"nvginstall"}</CodeBlock>
        <p className="step-desc">{t.launch.result}</p>
      </section>
      <section className="panel" aria-labelledby="mbn">
        <div className="sec-head">
          <span className="eyebrow">{t.flow.eyebrow}</span>
          <h2 className="h-lg" id="mbn">{rich(t.flow.title)}</h2>
          <p className="lead">{t.flow.lead}</p>
        </div>
        <ol className="steps">
          {t.flow.steps.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-code">{number(index)}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{step.title}</h3>
                </div>
                <p className="step-desc">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--accent" aria-labelledby="cuidados">
        <div className="sec-head">
          <span className="eyebrow">{t.care.eyebrow}</span>
          <h2 className="h-lg" id="cuidados">{t.care.title}</h2>
        </div>
        <div className="cards">
          {t.care.cards.map((card, index) => (
            <article className="card" key={card.title}>
              <span className="card-n">{number(index)}</span>
              <h3 className="card-t">{card.title}</h3>
              <p className="card-d">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closer" aria-label={c.nextStep}>
        <h2 className="h-xl">{t.closer.title}</h2>
        <div className="pill-row">
          <Link href={link("/documentacao#primeiros-passos")} className="pill">
            {t.closer.cta}
            <ArrowUpRight />
          </Link>
          <Link href={link("/guias")} className="pill pill--ghost">
            {c.systemGuides}
          </Link>
        </div>
      </section>
    </>
  );
}
