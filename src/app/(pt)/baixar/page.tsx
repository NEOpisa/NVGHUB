import Download from "@/components/pages/Download";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/baixar");

export default function Page() {
  return <Download locale="pt" />;
}
