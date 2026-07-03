import { pageMetadata } from "@/lib/seo";
import NoxzSection from "@/components/NoxzSection";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = pageMetadata({
  title: "Metodologia — Plano Noxz",
  description:
    "O Plano Noxz é a metodologia da Neovanguard: um processo claro, do briefing à entrega, que coloca sites e sistemas no ar com prazo definido e suporte real.",
  path: "/metodologia",
});

export default function MetodologiaPage() {
  return (
    <main id="main">
      <BlueprintStage code="plano noxz" index="05" />
      <NoxzSection />
    </main>
  );
}
