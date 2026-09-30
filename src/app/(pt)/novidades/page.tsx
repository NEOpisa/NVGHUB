import { DevelopmentNotes } from "@/components/seo/Editorial";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/novidades");

export default function Page() {
  return <DevelopmentNotes locale="pt" />;
}
