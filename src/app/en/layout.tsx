import SiteLayout, { metadata as base } from "@/components/shell/SiteLayout";
export { viewport } from "@/components/shell/SiteLayout";
export const metadata = {
  ...base,
  title: { default: "Neovanguard OS · Linux for Bitcoin, Lightning and Nostr", template: "%s · Neovanguard OS" },
  description: "An Arch Linux distribution with KDE Plasma and tools for Bitcoin, Lightning and Nostr. Developed by Neovanguard.",
  openGraph: { ...base.openGraph, locale: "en_US" },
};
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout lang="en">{children}</SiteLayout>;
}
