import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/* Toda página indexável entra aqui. /obrigado fica de fora porque se
   declara noindex — é destino de formulário, não de busca. */
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/parceria", priority: 0.9 },
  { path: "/sobre", priority: 0.8 },
  { path: "/metodologia", priority: 0.7 },
  { path: "/solucao", priority: 0.9 },
  { path: "/faq", priority: 0.7 },
  { path: "/contato", priority: 0.8 },
  { path: "/exemplos", priority: 0.6 },
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
