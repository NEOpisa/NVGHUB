import type { MetadataRoute } from "next";
import { ROUTES, absoluteUrl, languageAlternates } from "@/lib/routes";

/** Cadastro compartilhado: páginas públicas, datas editoriais e traduções. */

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(route => [route.pt, route.en].map(path => ({
    url: absoluteUrl(path),
    lastModified: route.updated,
    alternates: { languages: languageAlternates(path) },
  })));
}
