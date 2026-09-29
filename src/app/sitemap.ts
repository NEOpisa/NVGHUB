import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/* Toda página indexável entra aqui. A prioridade segue o que alguém que não
   conhece a distro precisa achar: baixar vem logo depois da home, e a
   documentação de verdade mora no repositório, não aqui. */
const ROUTES = [
  { path: "/", priority: 1, lastModified: "2026-09-07" },
  { path: "/baixar", priority: 0.9, lastModified: "2026-09-05" },
  { path: "/recursos", priority: 0.8, lastModified: "2026-09-05" },
  { path: "/instalacao", priority: 0.8, lastModified: "2026-09-05" },
  { path: "/documentacao", priority: 0.7, lastModified: "2026-09-05" },
  { path: "/faq", priority: 0.7, lastModified: "2026-09-05" },
  { path: "/sobre", priority: 0.6, lastModified: "2026-09-29" },
  { path: "/privacidade", priority: 0.3, lastModified: "2026-09-05" },
  { path: "/termos", priority: 0.3, lastModified: "2026-09-29" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, lastModified }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(`${lastModified}T00:00:00-03:00`),
    changeFrequency: "monthly",
    priority,
  }));
}
