"use client";

import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";


/** Breadcrumbs das páginas internas para buscadores. A navegação visual do
 * site continua no cabeçalho e no sumário lateral. */
export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const route = ROUTES.find(r => r.pt === pathname || r.en === pathname);
  const english = pathname.startsWith("/en");
  const pageName = english ? route?.english : route?.label;

  if (!pageName || pathname === "/" || pathname === "/en") return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: english ? "Home" : "Início",
        item: SITE_URL + (english ? "/en" : ""),
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
