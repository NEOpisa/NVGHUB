import PricingSection from "@/components/PricingSection";
import { pageMetadata } from "@/lib/seo";
import { PACOTES } from "@/lib/pacotes";
import { SITE_URL } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Tipos de solução — Neovanguard",
  description:
    "Veja os tipos de solução que a gente entrega: da vitrine digital à loja virtual completa. A gente monta o seu sob medida no atendimento.",
  path: "/pacotes",
});

const offerCatalogLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Soluções Neovanguard",
  url: `${SITE_URL}/pacotes`,
  itemListElement: PACOTES.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.tagline,
    category: "Desenvolvimento de sites",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Neovanguard" },
  })),
};

export default function PacotesPage() {
  return (
    <main id="main" className="route-pacotes">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }}
      />
      <section className="comprar-area" aria-label="Tipos de solução">
        <PricingSection />
      </section>
    </main>
  );
}
