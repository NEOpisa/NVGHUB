import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { HTML_LANG, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/routes";
import { TEAM, personId, personPath } from "@/lib/team";

const gap = { marginBottom: "1em" };
const list = { listStyle: "disc", paddingLeft: "1.25em", marginBottom: "1em" };

const T = {
  pt: { eyebrow: "Quem faz o Neovanguard OS", focus: "Áreas de atuação", links: "Perfis", others: "Também na Neovanguard", about: "Sobre o projeto", nav: "Continuar" },
  en: { eyebrow: "Who builds Neovanguard OS", focus: "Focus areas", links: "Profiles", others: "Also at Neovanguard", about: "About the project", nav: "Continue" },
};

/** Página de perfil de um fundador: `ProfilePage` cujo `mainEntity` é a
 * mesma `Person` declarada como `founder` no schema global. */
export default function PersonPage({ slug, locale }: { slug: string; locale: Locale }) {
  const p = TEAM.find(person => person.slug === slug)!;
  const t = T[locale];
  const url = SITE_URL + personPath(locale, slug);
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url + "#profile",
    url,
    name: p.title[locale],
    inLanguage: HTML_LANG[locale],
    dateModified: p.updated,
    mainEntity: {
      "@type": "Person",
      "@id": personId(SITE_URL, slug),
      name: p.name,
      givenName: p.givenName,
      familyName: p.familyName,
      jobTitle: p.jobTitle[locale],
      description: p.description[locale],
      url,
      image: SITE_URL + "/logo.png",
      worksFor: { "@id": SITE_URL + "/#org" },
      knowsAbout: p.knowsAbout,
      sameAs: p.links.map(l => l.url),
    },
  };
  const others = TEAM.filter(person => person.slug !== slug);
  return (
    <article className="panel prose">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <span className="eyebrow">{t.eyebrow}</span>
      <h1>{p.name}</h1>
      <p className="lead" style={gap}>{p.jobTitle[locale]}</p>
      {p.bio[locale].map(text => <p key={text} style={gap}>{text}</p>)}
      <h2 id="atuacao">{t.focus}</h2>
      <ul style={list}>{p.focus[locale].map(item => <li key={item}>{item}</li>)}</ul>
      <h2 id="perfis">{t.links}</h2>
      <ul style={list}>{p.links.map(l => <li key={l.url}><a href={l.url} rel="me noopener noreferrer" target="_blank">{l.label} · {p.name}</a></li>)}</ul>
      <h2 id="equipe">{t.others}</h2>
      <ul style={list}>{others.map(o => <li key={o.slug}><Link href={personPath(locale, o.slug)}>{o.name}</Link>, {o.jobTitle[locale]}</li>)}</ul>
      <nav aria-label={t.nav}><Link href={localePath(locale, "/sobre")}>{t.about}</Link> · <Link href={localePath(locale, "/")}>Neovanguard OS</Link></nav>
    </article>
  );
}
