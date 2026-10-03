import { GUIDES } from "./guides";
import { TEAM } from "./team";
import { SITE_URL } from "./constants";
import { getMessages, HTML_LANG, type Locale, type Messages } from "./i18n";

export type PageKey = keyof Messages["meta"]["pages"];
type Route = { pt: string; en: string; updated: string; page?: PageKey; guide?: string; person?: string };

/** Cadastro único das páginas: par pt/en e data editorial. Alimenta hreflang,
 * sitemap, seletor de idioma e breadcrumbs. Atualize `updated` ao alterar
 * conteúdo significativo; o sitemap não inventa uma data a cada build. */
export const ROUTES: Route[] = [
  { page: "home", pt: "/", en: "/en", updated: "2026-09-30" },
  { page: "download", pt: "/baixar", en: "/en/download", updated: "2026-09-30" },
  { page: "features", pt: "/recursos", en: "/en/features", updated: "2026-09-30" },
  { page: "installation", pt: "/instalacao", en: "/en/installation", updated: "2026-09-30" },
  { page: "documentation", pt: "/documentacao", en: "/en/documentation", updated: "2026-09-30" },
  { page: "about", pt: "/sobre", en: "/en/about", updated: "2026-09-30" },
  ...TEAM.map(p => ({ person: p.slug, pt: "/sobre/" + p.slug, en: "/en/about/" + p.slug, updated: p.updated })),
  { page: "privacy", pt: "/privacidade", en: "/en/privacy", updated: "2026-09-30" },
  { page: "terms", pt: "/termos", en: "/en/terms", updated: "2026-09-30" },
  { page: "guides", pt: "/guias", en: "/en/guides", updated: "2026-09-30" },
  ...GUIDES.map(g => ({ guide: g.slug, pt: "/guias/" + g.slug, en: "/en/guides/" + g.slug, updated: g.updated })),
  { page: "news", pt: "/novidades", en: "/en/news", updated: "2026-09-30" },
  { page: "news121", pt: "/novidades/1-2-1", en: "/en/news/1-2-1", updated: "2026-09-30" },
];

export const absoluteUrl = (path: string) => SITE_URL + (path === "/" ? "" : path);
export const findRoute = (path: string) => ROUTES.find(r => r.pt === path || r.en === path);

export function languageAlternates(path: string) {
  const route = findRoute(path);
  return route ? { [HTML_LANG.pt]: absoluteUrl(route.pt), [HTML_LANG.en]: absoluteUrl(route.en), "x-default": absoluteUrl(route.pt) } : undefined;
}

/** Endereço, no idioma pedido, de uma rota escrita como na versão em
 * português (`/baixar`, `/documentacao#construir`). A âncora é preservada. */
export function localePath(locale: Locale, ptPath: string) {
  const [path, hash] = ptPath.split("#");
  const route = ROUTES.find(r => r.pt === path);
  if (!route) throw new Error("Rota sem cadastro: " + ptPath);
  return route[locale] + (hash ? "#" + hash : "");
}

export function routeTitle(route: Route, locale: Locale) {
  if (route.person) return TEAM.find(p => p.slug === route.person)!.title[locale];
  if (route.guide) return GUIDES.find(g => g.slug === route.guide)!.title[locale];
  return getMessages(locale).meta.pages[route.page!].title;
}

export function routeDescription(route: Route, locale: Locale) {
  if (route.person) return TEAM.find(p => p.slug === route.person)!.description[locale];
  if (route.guide) return GUIDES.find(g => g.slug === route.guide)!.description[locale];
  return getMessages(locale).meta.pages[route.page!].description;
}
