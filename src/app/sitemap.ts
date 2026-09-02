import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/* Toda página indexável entra aqui. A prioridade segue o que alguém que não
   conhece a distro precisa achar: baixar vem logo depois da home, e a
   documentação de verdade mora no repositório, não aqui. */
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/baixar", priority: 0.9 },
  { path: "/recursos", priority: 0.8 },
  { path: "/instalacao", priority: 0.8 },
  { path: "/documentacao", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/sobre", priority: 0.6 },
  { path: "/privacidade", priority: 0.3 },
  { path: "/termos", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
