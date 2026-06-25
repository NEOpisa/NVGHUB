import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/sobre", priority: 0.8 },
  { path: "/metodologia", priority: 0.7 },
  { path: "/solucao", priority: 0.9 },
  { path: "/pacotes", priority: 0.9 },
  { path: "/faq", priority: 0.7 },
  { path: "/contato", priority: 0.8 },
  { path: "/exemplos", priority: 0.6 },
  { path: "/menu", priority: 0.3 },
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
