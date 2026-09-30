import About from "@/components/pages/About";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/sobre");

export default function Page() {
  return <About locale="pt" />;
}
