import Link from "next/link";
import NVMark3D from "@/components/brand/NVMark3D";
import Showcase from "@/components/blocos/Showcase";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS } from "@/lib/constants";
import { fmt, getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

export default function Home({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.home;
  const c = messages.common;
  const link = (path: string) => localePath(locale, path);
  return (
    <>
      <section className="hero hero--home" aria-label={t.hero.label}>
        <div className="hero-copy">
          <span className="eyebrow">{fmt(t.hero.eyebrow, { version: VERSAO })}</span>
          <h1 className="h-xl">
            <span className="hero-line"><span>{t.hero.line1}</span></span>
            {" "}
            <span className="hero-line"><span>{t.hero.line2}</span></span>
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="pill-row">
            <Link href={link("/documentacao#construir")} className="pill">
              {t.hero.build}
              <ArrowUpRight />
            </Link>
            <Link href={link("/instalacao")} className="pill pill--ghost">
              {c.installGuide}
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <svg className="hero-mark-filter" width="0" height="0" aria-hidden="true" focusable="false">
            <defs>
              <filter id="hero-mark-tone" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values=".08 .16 .03 0 0 .14 .28 .05 0 0 .24 .48 .08 0 0 0 0 0 1 0" />
              </filter>
            </defs>
          </svg>
          <NVMark3D />
        </div>
        <p className="hero-note">
          {t.hero.notes.map(note => <span key={note}>{note}</span>)}
        </p>
        <a className="scroll-cue" href="#pilares" aria-label={t.hero.cueLabel}><span aria-hidden="true">↓</span> {t.hero.cue}</a>
      </section>

      <section className="panel pillars" aria-labelledby="pilares">
        <div className="sec-head">
          <span className="eyebrow">{t.pillars.eyebrow}</span>
          <h2 className="h-lg" id="pilares">{rich(t.pillars.title)}</h2>
        </div>
        <div className="cards bento">
          {t.pillars.cards.map((card, index) => {
            const n = String(index + 1).padStart(2, "0");
            return (
              <article className={`card pillar-${n}`} key={n}>
                <span className="card-n">{n}</span>
                <h3 className="card-t">{card.title}</h3>
                <p className="card-d">{card.text}</p>
                {n === "01" && <span className="key-signature" aria-hidden="true"><svg viewBox="0 0 180 50"><circle cx="25" cy="25" r="18" /><path d="M43 25H170M125 25v17M151 25v11" /></svg>{t.pillars.signature}</span>}
                {n === "02" && <svg className="stack-diagram" viewBox="0 0 300 280" role="img" aria-label={t.pillars.diagramLabel}><path d="M150 55L55 205H245ZM150 55V145M55 205L150 145L245 205" /><circle cx="150" cy="55" r="22" /><circle cx="55" cy="205" r="22" /><circle cx="245" cy="205" r="22" /><text x="150" y="60">₿</text><text x="55" y="210">↯</text><text x="245" y="210">N</text><text className="node-label" x="150" y="18">BITCOIN</text><text className="node-label" x="55" y="252">LIGHTNING</text><text className="node-label" x="245" y="252">{t.pillars.diagramRelay}</text><text className="node-label" x="150" y="142">{t.pillars.diagramLocal}</text></svg>}
                {n === "03" && <div className="terminal-detail"><span>{t.pillars.logs}</span><code className="log-trace">$ journalctl -b</code></div>}
                {n === "04" && <div className="terminal-detail"><span>{t.pillars.packages}</span><code>$ pacman -Q</code></div>}
              </article>
            );
          })}
        </div>
      </section>

      <Showcase locale={locale} />

      <section className="panel" aria-labelledby="imagens">
        <div className="sec-head">
          <span className="eyebrow">{t.images.eyebrow}</span>
          <h2 className="h-lg" id="imagens">{rich(t.images.title)}</h2>
          <p className="lead">{t.images.lead}</p>
        </div>
        <div className="image-split">
          {IMAGENS.map((im) => {
            const image = messages.images[im.id];
            return (
              <article className={`image-option image-option--${im.id}`} key={im.id} aria-labelledby={`image-${im.id}`}>
                <span className="eyebrow">{image.purpose}</span>
                <h3 id={`image-${im.id}`}>{im.nome}</h3>
                <p>{image.description}</p>
                <dl className="image-specs"><div><dt>{t.images.specImage}</dt><dd>{image.size}</dd></div><div><dt>{t.images.specBoot}</dt><dd>{image.boot}</dd></div><div><dt>{t.images.specNetwork}</dt><dd>{image.network}</dd></div></dl>
                <Link href={link("/baixar")} className="pill pill--ghost">{fmt(t.images.details, { name: im.nome })}<ArrowUpRight /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="closer" aria-label={c.start}>
        <span className="eyebrow">{t.closer.eyebrow}</span>
        <h2 className="h-xl">{rich(t.closer.title)}</h2>
        <div className="pill-row">
          <Link href={link("/baixar")} className="pill">
            {c.viewImages}
            <ArrowUpRight />
          </Link>
          <Link href={link("/instalacao")} className="pill pill--ghost">
            {c.installGuide}
          </Link>
        </div>
      </section>
    </>
  );
}
