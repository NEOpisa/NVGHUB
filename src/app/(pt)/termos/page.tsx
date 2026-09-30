import Legal from "@/components/pages/Legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/termos");

export default function Page() {
  return <Legal locale="pt" page="terms" />;
}
