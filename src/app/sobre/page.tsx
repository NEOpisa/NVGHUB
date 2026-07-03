import { pageMetadata } from "@/lib/seo";
import SobreSection from "@/components/SobreSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import InstitucionalSection from "@/components/InstitucionalSection";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = pageMetadata({
  title: "Quem somos — Neovanguard",
  description:
    "A Neovanguard é uma agência digital 100% remota que atende o Brasil inteiro, operando sites, sistemas, SEO e suporte como um só ecossistema.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <main id="main">
      <BlueprintStage code="quem somos" index="01" />
      <SobreSection />
      <InstitucionalSection />
      <DiferenciaisSection />
    </main>
  );
}
