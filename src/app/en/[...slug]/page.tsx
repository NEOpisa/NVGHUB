import { notFound } from "next/navigation";
import { PAGES } from "@/lib/pages";
import { GUIDES } from "@/lib/guides";
import { ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import EnglishPage from "@/components/seo/EnglishPage";
import { GuideIndex, GuideArticle, DevelopmentNotes } from "@/components/seo/Editorial";
export const dynamicParams = false;
export function generateStaticParams() { return ROUTES.filter(r => r.en !== "/en").map(r => ({slug: r.en.slice(4).split("/")})); }
export async function generateMetadata({params}: {params: Promise<{slug: string[]}>}) {
  const {slug} = await params;
  const path = "/en/" + slug.join("/");
  const route = ROUTES.find(r => r.en === path);
  if (!route) notFound();
  const page = PAGES.find(p => p.en === path);
  const guide = slug[0] === "guides" ? GUIDES.find(g => g.slug === slug[1]) : undefined;
  return pageMetadata({title: route.english, description: page?.description ?? guide?.description.en ?? "Neovanguard OS guides, development notes and current availability.", path});
}
export default async function Page({params}: {params: Promise<{slug: string[]}>}) {
  const {slug} = await params;
  const path = "/en/" + slug.join("/");
  if (!ROUTES.some(r => r.en === path)) notFound();
  if (slug[0] === "guides") return slug[1] ? <GuideArticle slug={slug[1]} locale="en" /> : <GuideIndex locale="en" />;
  if (slug[0] === "news") return <DevelopmentNotes locale="en" detail={!!slug[1]} />;
  return <EnglishPage path={path} />;
}

