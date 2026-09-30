import SiteLayout, { siteMetadata } from "@/components/shell/SiteLayout";
export { viewport } from "@/components/shell/SiteLayout";
export const metadata = siteMetadata("pt");
export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="pt">{children}</SiteLayout>;
}
