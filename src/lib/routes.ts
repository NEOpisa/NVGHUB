import { PAGES } from "./pages";
import { GUIDES } from "./guides";
import { SITE_URL } from "./constants";
export const ROUTES = [
  ...PAGES.map(p => ({ pt: p.pt as string, en: p.en as string, label: p.label as string, english: p.title as string, updated: p.updated as string })),
  { pt: "/guias", en: "/en/guides", label: "Guias", english: "Guides", updated: "2026-09-30" },
  ...GUIDES.map(g => ({ pt: "/guias/" + g.slug, en: "/en/guides/" + g.slug, label: g.title.pt, english: g.title.en, updated: g.updated })),
  { pt: "/novidades", en: "/en/news", label: "Novidades", english: "Development notes", updated: "2026-09-30" },
  { pt: "/novidades/1-2-1", en: "/en/news/1-2-1", label: "1.2.1 em preparação", english: "1.2.1 in preparation", updated: "2026-09-30" },
];
export const absoluteUrl = (path: string) => SITE_URL + (path === "/" ? "" : path);
export function languageAlternates(path: string) {
  const route = ROUTES.find(r => r.pt === path || r.en === path);
  return route ? { "pt-BR": absoluteUrl(route.pt), en: absoluteUrl(route.en), "x-default": absoluteUrl(route.pt) } : undefined;
}

