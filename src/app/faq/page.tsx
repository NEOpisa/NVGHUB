import FaqSection from "@/components/FaqSection";
import BlueprintStage from "@/components/BlueprintStage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Perguntas frequentes — Neovanguard",
  description:
    "Tire suas dúvidas sobre prazos, suporte e como a Neovanguard trabalha: ferramentas sob medida, 100% remoto, atendendo o Brasil inteiro.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main id="main">
      <BlueprintStage />
      <FaqSection />
    </main>
  );
}
