import { pageMetadata } from "@/lib/seo";
import OrcamentoSection from "@/components/OrcamentoSection";

export const metadata = pageMetadata({
  title: "Orçamento sob medida — Neovanguard",
  description:
    "Monte o seu orçamento sob medida: adicione serviços um a um e veja o preço atualizar na hora. Transparente, sem letra miúda.",
  path: "/orcamento",
});

export default function OrcamentoPage() {
  return (
    <main id="main">
      <section className="comprar-area" aria-label="Monte seu orçamento">
        <OrcamentoSection />
      </section>
    </main>
  );
}
