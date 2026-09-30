import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { GUIDES } from "@/lib/guides";
import { DOCS_URL, SITE_URL, MIZAEL_LINKEDIN, JOAO_LINKEDIN } from "@/lib/constants";
import { fmt, getMessages, HTML_LANG, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/routes";

export function GuideIndex({ locale }: { locale: Locale }) {
  const t = getMessages(locale).guides;
  return <section className="panel prose">
    <span className="eyebrow">Neovanguard OS</span>
    <h1>{t.indexTitle}</h1>
    <p>{t.indexLead}</p>
    <div className="doc-paths">{GUIDES.map(g => <Link className="doc-path" key={g.slug} href={localePath(locale, "/guias/" + g.slug)}><strong>{g.title[locale]}</strong><span>{g.description[locale]}</span></Link>)}</div>
  </section>;
}

export function GuideArticle({ slug, locale }: { slug: string; locale: Locale }) {
  const guide = GUIDES.find(g => g.slug === slug)!;
  const messages = getMessages(locale);
  const t = messages.guides;
  const reviewed = new Intl.DateTimeFormat(HTML_LANG[locale], { dateStyle: "long", timeZone: "UTC" }).format(new Date(guide.updated));
  const data = {
    "@context": "https://schema.org", "@type": "TechArticle",
    headline: guide.title[locale], description: guide.description[locale],
    inLanguage: HTML_LANG[locale], datePublished: guide.updated, dateModified: guide.updated,
    mainEntityOfPage: SITE_URL + localePath(locale, "/guias/" + slug),
    author: { "@type": "Organization", name: "Neovanguard", "@id": SITE_URL + "/#org" },
    publisher: { "@id": SITE_URL + "/#org" },
  };
  return <article className="panel prose">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    <span className="eyebrow">{fmt(t.eyebrow, { date: reviewed })}</span>
    <h1>{guide.title[locale]}</h1><p className="lead">{guide.description[locale]}</p>
    <p>{t.disclaimer}</p>
    {guide.sections[locale].map((s, i) => <section key={s.title}><h2 id={"section-" + i}>{s.title}</h2><p>{s.text}</p></section>)}
    {guide.code && <section><h2>{t.commandsTitle}</h2><p>{t.commandsText}</p><CodeBlock t={messages.code}>{guide.code}</CodeBlock></section>}
    <p>{t.source}<a href={DOCS_URL + "/" + guide.source}>{guide.source}</a>.</p>
    <nav aria-label={t.continueLabel}><Link href={localePath(locale, "/guias")}>{t.all}</Link> · <Link href={localePath(locale, "/baixar")}>{t.availability}</Link> · <Link href={localePath(locale, "/documentacao")}>{t.documentation}</Link></nav>
  </article>;
}

export function DevelopmentNotes({ locale, detail = false }: { locale: Locale; detail?: boolean }) {
  const t = getMessages(locale).news;
  const follow = <p>{t.follow}<a href={MIZAEL_LINKEDIN}>Mizael Ribeiro</a> · <a href={JOAO_LINKEDIN}>João Antônio Rodrigues</a>.</p>;
  if (!detail) return <section className="panel prose">
    <span className="eyebrow">Neovanguard OS</span>
    <h1>{t.title}</h1>
    <p>{t.lead}</p>
    <article><h2><Link href={localePath(locale, "/novidades/1-2-1")}>{t.entryTitle}</Link></h2><p>{t.entryText}</p></article>
    {follow}
  </section>;
  const d = t.detail;
  return <article className="panel prose">
    <span className="eyebrow">{d.eyebrow}</span>
    <h1>{d.title}</h1>
    <p>{d.intro}</p>
    <h2>{d.changedTitle}</h2>
    <ul>{d.changed.map(item => <li key={item}>{item}</li>)}</ul>
    <h2>{d.validationTitle}</h2>
    <p>{d.validation1}</p>
    <p>{d.validation2}</p>
    <p>{d.source}<a href={DOCS_URL + "/notas-de-versao/1.2.1.md"}>1.2.1</a>.</p>
    {follow}
  </article>;
}
