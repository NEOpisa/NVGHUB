import { DevelopmentNotes } from "@/components/seo/Editorial";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/novidades/1-2-1");

export default function Page() {
  return <DevelopmentNotes locale="pt" detail />;
}
