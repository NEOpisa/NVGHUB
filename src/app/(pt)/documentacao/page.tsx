import Documentation from "@/components/pages/Documentation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/documentacao");

export default function Page() {
  return <Documentation locale="pt" />;
}
