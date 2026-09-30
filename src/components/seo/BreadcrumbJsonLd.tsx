"use client";

import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

/** Dados estruturados da página atual: `WebPage` com o idioma certo e, nas
 * páginas internas, o breadcrumb. A navegação visual do site continua no
 * cabeçalho e no sumário lateral. `names` traz só os títulos deste idioma. */
export default function BreadcrumbJsonLd({ names, home, lang }: { names: Record<string, string>; home: string; lang: string }) {
  const pathname = usePathname();
  const pageName = names[pathname];
  if (!pageName) return null;

  const url = (path: string) => SITE_URL + (path === "/" ? "" : path);
  const website = `${url(home)}${home === "/" ? "/" : ""}#website`;
  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": `${url(pathname)}#webpage`,
      url: url(pathname),
      name: pageName,
      inLanguage: lang,
      isPartOf: { "@id": website },
    },
  ];
  if (pathname !== home) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: names[home], item: url(home) },
        { "@type": "ListItem", position: 2, name: pageName, item: url(pathname) },
      ],
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
