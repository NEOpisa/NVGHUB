import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { fmt, getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

/** Recursos incluídos e resumo dos comandos disponíveis no sistema. */
export default function Features({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.features;
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

      {t.layers.map((layer, index) => {
        const n = String(index + 1).padStart(2, "0");
        return (
          <section className="panel" key={n} aria-labelledby={`c${n}`}>
            <div className="sec-head">
              <span className="eyebrow">{fmt(t.layerEyebrow, { n })}</span>
              <h2 className="h-lg" id={`c${n}`}>
                {layer.title}
              </h2>
            </div>
            <p className="lead">{layer.text}</p>
            <div className="card-tags">
              {layer.items.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        );
      })}

      <section className="panel panel--accent" aria-labelledby="comandos">
        <div className="sec-head">
          <span className="eyebrow">{t.commands.eyebrow}</span>
          <h2 className="h-lg" id="comandos">{rich(t.commands.title)}</h2>
          <p className="lead">{rich(t.commands.lead)}</p>
        </div>
        <div className="scan">
          <div className="scan-nota">
            <strong>neo-*</strong>
            <span>{t.commands.note}</span>
          </div>
          {/* Um recorte: o sistema tem mais comandos do que os listados. */}
          <ul className="scan-lista">
            {Object.entries(t.commands.list).map(([command, description]) => (
              <li key={command}>
                <code>{command}</code>: {description}
              </li>
            ))}
          </ul>
        </div>
        <p className="grid-note">{t.commands.more}</p>
      </section>

      <section className="panel" aria-labelledby="ambiente">
        <div className="sec-head">
          <span className="eyebrow">{t.desktop.eyebrow}</span>
          <h2 className="h-lg" id="ambiente">{rich(t.desktop.title)}</h2>
        </div>
        <p className="lead">{t.desktop.text1}</p>
        <p className="lead">{rich(t.desktop.text2)}</p>
      </section>

      <section className="closer" aria-label={c.nextStep}>
        <h2 className="h-xl">{t.closer.title}</h2>
        <div className="pill-row">
          <Link href={localePath(locale, "/baixar")} className="pill">
            {c.viewImages}
            <ArrowUpRight />
          </Link>
          <Link href={localePath(locale, "/instalacao")} className="pill pill--ghost">
            {c.installGuide}
          </Link>
        </div>
      </section>
    </>
  );
}
