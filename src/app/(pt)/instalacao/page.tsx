import Installation from "@/components/pages/Installation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/instalacao");

export default function Page() {
  return <Installation locale="pt" />;
}
