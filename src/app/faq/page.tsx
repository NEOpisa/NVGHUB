import FaqSection from "@/components/FaqSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Perguntas frequentes — Neovanguard",
  description:
    "Tire suas dúvidas sobre prazos, suporte e como a Neovanguard trabalha: agência digital 100% remota que atende o Brasil inteiro.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main id="main">
      <FaqSection />
    </main>
  );
}
