import PricingSection from "@/components/PricingSection";
import { pageMetadata } from "@/lib/seo";
import { PACOTES } from "@/lib/pacotes";
import { SITE_URL } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Pacotes e preços — Neovanguard",
  description:
    "Escolha um pacote pronto com preço fechado: Vitrine, Presença e mais. Transparente, sem letra miúda e sem contrato mínimo.",
  path: "/pacotes",
});

const offerCatalogLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Pacotes Neovanguard",
  url: `${SITE_URL}/pacotes`,
  itemListElement: PACOTES.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.tagline,
    category: "Desenvolvimento de sites",
    ...(p.priceNumber != null
      ? {
          price: p.priceNumber,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        }
      : { availability: "https://schema.org/PreOrder" }),
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
      <section className="comprar-area" aria-label="Pacotes e preços">
        <PricingSection />
      </section>
    </main>
  );
}
