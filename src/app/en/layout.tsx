import SiteLayout, { siteMetadata } from "@/components/shell/SiteLayout";
export { viewport } from "@/components/shell/SiteLayout";
export const metadata = siteMetadata("en");
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
