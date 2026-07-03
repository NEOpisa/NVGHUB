import { pageMetadata } from "@/lib/seo";
import SolucaoQuiz from "@/components/SolucaoQuiz";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = pageMetadata({
  title: "Sua solução sob medida — Neovanguard",
  description:
    "Responda 3 perguntas rápidas e a gente monta a solução ideal pro seu negócio. Sem formulário gigante, sem compromisso — fale com a equipe na hora.",
  path: "/solucao",
});

export default function SolucaoPage() {
  return (
    <main id="main">
      <BlueprintStage code="diagnóstico" index="03" />
      <section className="comprar-area" aria-label="Sua solução sob medida">
        <SolucaoQuiz />
      </section>
    </main>
  );
}
