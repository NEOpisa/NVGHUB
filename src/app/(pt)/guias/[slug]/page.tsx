import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/seo/Editorial";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return GUIDES.map(g => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return GUIDES.some(g => g.slug === slug) ? pageMetadata("/guias/" + slug) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!GUIDES.some(g => g.slug === slug)) notFound();
  return <GuideArticle slug={slug} locale="pt" />;
}
