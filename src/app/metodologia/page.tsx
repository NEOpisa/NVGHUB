import { pageMetadata } from "@/lib/seo";
import NoxzSection from "@/components/NoxzSection";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = pageMetadata({
  title: "Metodologia — Plano Noxz",
  description:
    "O Plano Noxz é a metodologia da Neovanguard: um processo claro, do briefing à entrega, que coloca sites e sistemas no ar com prazo definido e suporte real.",
  path: "/metodologia",
});

// #026 · JSON-LD Service (sem Offer/preço — modelo consultivo, valor na consulta)
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Plano Noxz — metodologia Neovanguard",
  serviceType: "Desenvolvimento de sites e sistemas",
  description:
    "Processo claro do briefing à entrega: sites e sistemas no ar com prazo definido e suporte real.",
  provider: { "@type": "Organization", name: "Neovanguard" },
  areaServed: "BR",
};

export default function MetodologiaPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <BlueprintStage accent="gold" />
      <NoxzSection />
    </main>
  );
}
