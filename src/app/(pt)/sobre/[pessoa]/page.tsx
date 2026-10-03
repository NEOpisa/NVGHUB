import { notFound } from "next/navigation";
import PersonPage from "@/components/pages/Person";
import { pageMetadata } from "@/lib/seo";
import { TEAM } from "@/lib/team";

export const dynamicParams = false;
export function generateStaticParams() { return TEAM.map(p => ({ pessoa: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ pessoa: string }> }) {
  const { pessoa } = await params;
  return TEAM.some(p => p.slug === pessoa) ? pageMetadata("/sobre/" + pessoa) : {};
}
export default async function Page({ params }: { params: Promise<{ pessoa: string }> }) {
  const { pessoa } = await params;
  if (!TEAM.some(p => p.slug === pessoa)) notFound();
  return <PersonPage slug={pessoa} locale="pt" />;
}
