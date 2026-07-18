import { pageMetadata } from "@/lib/seo";
import ContatoSection from "@/components/ContatoSection";
import BlueprintStage from "@/components/BlueprintStage";

export const metadata = pageMetadata({
  title: "Contato — Neovanguard",
  description:
    "Fale com a Neovanguard pelo WhatsApp ou pelo formulário. Resposta rápida, sem burocracia.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <main id="main">
      <BlueprintStage accent="ice" />
      <ContatoSection />
    </main>
  );
}
