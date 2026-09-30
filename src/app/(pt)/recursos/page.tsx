import Features from "@/components/pages/Features";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/recursos");

export default function Page() {
  return <Features locale="pt" />;
}
