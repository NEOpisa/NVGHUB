import { pageMetadata } from "@/lib/seo";
import SobreSection from "@/components/SobreSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import InstitucionalSection from "@/components/InstitucionalSection";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = pageMetadata({
  title: "Quem somos — Neovanguard",
  description:
    "A Neovanguard é um estúdio de tecnologia 100% remoto que atende o Brasil inteiro: resolvemos problemas de negócio criando a ferramenta certa — sistemas, automações e IA como um só ecossistema.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <main id="main">
      <BlueprintStage />
      <SobreSection />
      <InstitucionalSection />
      <DiferenciaisSection />
    </main>
  );
}
