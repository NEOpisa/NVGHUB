"use client";

import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

const PAGE_NAMES: Record<string, string> = {
  "/baixar": "Baixar",
  "/recursos": "Recursos",
  "/instalacao": "Instalação",
  "/documentacao": "Documentação",
  "/faq": "Perguntas frequentes",
  "/sobre": "Sobre",
  "/privacidade": "Privacidade",
  "/termos": "Termos de uso",
};

/** Breadcrumbs das páginas internas para buscadores. A navegação visual do
 * site continua no cabeçalho e no sumário lateral. */
export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const pageName = PAGE_NAMES[pathname];

  if (!pageName) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${SITE_URL}${pathname}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
