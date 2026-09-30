import { GuideIndex } from "@/components/seo/Editorial";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/guias");

export default function Page() {
  return <GuideIndex locale="pt" />;
}
