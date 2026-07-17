import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo";
import BlueprintStage from "@/components/BlueprintStage";

// #006 · quiz pesado fora do chunk inicial da rota (carrega após hidratar)
const SolucaoQuiz = dynamic(() => import("@/components/SolucaoQuiz"));

export const metadata = pageMetadata({
  title: "Consulta rápida — sua solução em 3 perguntas",
  description:
    "Responda 3 perguntas rápidas e montamos a solução ideal para o seu negócio. Sem formulário gigante, sem compromisso — fale com a equipe na hora.",
  path: "/solucao",
});

// #026 · JSON-LD Service (sem Offer/preço — modelo consultivo, valor na consulta)
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Consulta rápida Neovanguard",
  serviceType: "Diagnóstico digital e proposta de solução",
  description:
    "Três perguntas rápidas e a equipe monta a solução ideal para o negócio — sem formulário gigante e sem compromisso.",
  provider: { "@type": "Organization", name: "Neovanguard" },
  areaServed: "BR",
};

export default function SolucaoPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <BlueprintStage />
      <section className="comprar-area" aria-label="Sua solução sob medida">
        <SolucaoQuiz />
      </section>
    </main>
  );
}
