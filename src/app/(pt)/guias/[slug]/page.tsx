import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/seo/Editorial";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map(g => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }) {
  const {slug} = await params;
  const guide = GUIDES.find(g => g.slug === slug);
  if (!guide) notFound();
  return pageMetadata({ title: guide.title.pt, description: guide.description.pt, path: "/guias/" + slug });
}
export default async function Page({ params }: { params: Promise<{slug: string}> }) {
  const {slug} = await params;
  if (!GUIDES.some(g => g.slug === slug)) notFound();
  return <GuideArticle slug={slug} locale="pt" />;
}

