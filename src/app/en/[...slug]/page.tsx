import { notFound } from "next/navigation";
import About from "@/components/pages/About";
import Documentation from "@/components/pages/Documentation";
import Download from "@/components/pages/Download";
import Features from "@/components/pages/Features";
import Installation from "@/components/pages/Installation";
import Legal from "@/components/pages/Legal";
import PersonPage from "@/components/pages/Person";
import { GuideIndex, GuideArticle, DevelopmentNotes } from "@/components/seo/Editorial";
import { ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

/** As páginas em inglês renderizam os mesmos componentes das páginas em
 * português, com `locale="en"`. Nenhuma página é escrita à parte.
 * Endereços desconhecidos chegam até aqui para que o 404 saia em inglês. */
export function generateStaticParams() { return ROUTES.filter(r => r.en !== "/en").map(r => ({ slug: r.en.slice(4).split("/") })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = "/en/" + slug.join("/");
  return ROUTES.some(r => r.en === path) ? pageMetadata(path) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const route = ROUTES.find(r => r.en === "/en/" + slug.join("/"));
  if (!route) notFound();
  if (route.guide) return <GuideArticle slug={route.guide} locale="en" />;
  if (route.person) return <PersonPage slug={route.person} locale="en" />;
  switch (route.page) {
    case "download": return <Download locale="en" />;
    case "features": return <Features locale="en" />;
    case "installation": return <Installation locale="en" />;
    case "documentation": return <Documentation locale="en" />;
    case "about": return <About locale="en" />;
    case "privacy": return <Legal locale="en" page="privacy" />;
    case "terms": return <Legal locale="en" page="terms" />;
    case "guides": return <GuideIndex locale="en" />;
    case "news": return <DevelopmentNotes locale="en" />;
    case "news121": return <DevelopmentNotes locale="en" detail />;
    default: notFound();
  }
}
