import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { GUIDES, type Locale } from "@/lib/guides";
import { DOCS_URL, SITE_URL, MIZAEL_LINKEDIN, JOAO_LINKEDIN } from "@/lib/constants";

export function GuideIndex({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const base = en ? "/en/guides" : "/guias";
  return <section className="panel prose">
    <span className="eyebrow">Neovanguard OS</span>
    <h1>{en ? "Guides to local infrastructure" : "Guias de infraestrutura local"}</h1>
    <p>{en ? "Practical introductions to the documented development state. Public ISOs are not available yet; configuration and validation depend on the exact revision." : "Introduções práticas ao estado documentado do desenvolvimento. As ISOs ainda não estão disponíveis; configuração e validação dependem da revisão utilizada."}</p>
    <div className="doc-paths">{GUIDES.map(g => <Link className="doc-path" key={g.slug} href={base + "/" + g.slug}><strong>{g.title[locale]}</strong><span>{g.description[locale]}</span></Link>)}</div>
  </section>;
}

export function GuideArticle({ slug, locale }: { slug: string; locale: Locale }) {
  const guide = GUIDES.find(g => g.slug === slug)!;
  const en = locale === "en";
  const path = (en ? "/en/guides/" : "/guias/") + slug;
  const data = {
    "@context": "https://schema.org", "@type": "TechArticle",
    headline: guide.title[locale], description: guide.description[locale],
    inLanguage: en ? "en" : "pt-BR", datePublished: guide.updated, dateModified: guide.updated,
    mainEntityOfPage: SITE_URL + path,
    author: { "@type": "Organization", name: "Neovanguard", "@id": SITE_URL + "/#org" },
    publisher: { "@id": SITE_URL + "/#org" },
  };
  return <article className="panel prose">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    <span className="eyebrow">{en ? "Guide · reviewed September 30, 2026" : "Guia · revisado em 30 de setembro de 2026"}</span>
    <h1>{guide.title[locale]}</h1><p className="lead">{guide.description[locale]}</p>
    <p>{en ? "Development documentation, not a public ISO release or a hardware validation report." : "Documentação de desenvolvimento; não representa uma ISO pública nem validação em hardware."}</p>
    {guide.sections[locale].map((s, i) => <section key={s.title}><h2 id={"section-" + i}>{s.title}</h2><p>{s.text}</p></section>)}
    {guide.code && <section><h2>{en ? "Inspection commands" : "Comandos de consulta"}</h2><p>{en ? "Run on a compatible Neovanguard OS installation. Check the installed tool's help; these commands inspect state or list options." : "Execute em uma instalação compatível do Neovanguard OS. Confira a ajuda da ferramenta instalada; estes comandos consultam estado ou listam opções."}</p><CodeBlock english={en}>{guide.code}</CodeBlock></section>}
    <p>{en ? "Technical source (private repository; authorized access required): " : "Fonte técnica (repositório privado; exige acesso autorizado): "}<a href={DOCS_URL + "/" + guide.source}>{guide.source}</a>.</p>
    <nav aria-label={en ? "Continue reading" : "Continue lendo"}><Link href={en ? "/en/guides" : "/guias"}>{en ? "All guides" : "Todos os guias"}</Link> · <Link href={en ? "/en/download" : "/baixar"}>{en ? "Image availability" : "Disponibilidade das imagens"}</Link> · <Link href={en ? "/en/documentation" : "/documentacao"}>{en ? "Documentation" : "Documentação"}</Link></nav>
  </article>;
}

export function DevelopmentNotes({ locale, detail = false }: { locale: Locale; detail?: boolean }) {
  const en = locale === "en";
  if (!detail) return <section className="panel prose">
    <span className="eyebrow">Neovanguard OS</span>
    <h1>{en ? "Development notes" : "Novidades do desenvolvimento"}</h1>
    <p>{en ? "Follow documented changes and publication status. Public NVG Live and NVG Install ISOs are not available yet, and there is no confirmed publication date." : "Acompanhe as mudanças documentadas e o estado da publicação. As ISOs NVG Live e NVG Install ainda não estão disponíveis e não há data de publicação confirmada."}</p>
    <article><h2><Link href={en ? "/en/news/1-2-1" : "/novidades/1-2-1"}>{en ? "1.2.1 in preparation" : "1.2.1 em preparação"}</Link></h2><p>{en ? "Installer checks, networking corrections and packaging validation. Read the scope and limits of the recorded tests." : "Verificações do instalador, correções de rede e validação de empacotamento. Consulte o escopo e os limites dos testes registrados."}</p></article>
    <p>{en ? "Follow the cofounders: " : "Acompanhe os cofundadores: "}<a href={MIZAEL_LINKEDIN}>Mizael Ribeiro</a> · <a href={JOAO_LINKEDIN}>João Antônio Rodrigues</a>.</p>
  </section>;
  return <article className="panel prose">
    <span className="eyebrow">{en ? "Development · not a download announcement" : "Desenvolvimento · não é anúncio de download"}</span>
    <h1>{detail ? (en ? "Neovanguard OS 1.2.1 in preparation" : "Neovanguard OS 1.2.1 em preparação") : (en ? "Development notes" : "Novidades do desenvolvimento")}</h1>
    <p>{en ? "The source changelog records version 1.2.1 in preparation, authorized on September 12, 2026. Public Live and Install ISOs are not available. No publication date is confirmed." : "O changelog do código registra a versão 1.2.1 em preparação, autorizada em 12 de setembro de 2026. As ISOs Live e Install não estão disponíveis publicamente. Não há data de publicação confirmada."}</p>
    <h2>{en ? "What changed in the source" : "O que mudou no código"}</h2>
    <ul><li>{en ? "Installer validation before destructive commands." : "Validação do instalador antes de comandos destrutivos."}</li><li>{en ? "Firewall state, VPN DNS and endpoint checks, and Shamir set validation." : "Estado do firewall, verificações de DNS e endpoint de VPN e validação de conjuntos Shamir."}</li><li>{en ? "Packaging and build checks, with explicit failure reporting." : "Verificações de empacotamento e build, com relato explícito de falhas."}</li></ul>
    <h2>{en ? "Validation and publication are separate" : "Validação e publicação são etapas diferentes"}</h2>
    <p>{en ? "The version notes record local checks. They do not establish a completed release build, successful hardware boot, offline installation or an independent cryptographic review. Packages reach installed systems only after publication to the configured package repository." : "As notas registram verificações locais. Isso não comprova build completa de liberação, boot em hardware, instalação offline ou revisão criptográfica independente. Os pacotes só chegam a instalações depois de publicados no repositório de atualizações configurado."}</p>
    <p>{en ? "The documented CI keeps checksums temporarily and does not distribute ISOs. A checksum cannot be used as an image download." : "O CI documentado guarda checksums temporariamente e não distribui ISOs. Um checksum não é um download da imagem."}</p>
    <p>{en ? "Source (restricted access): " : "Fonte (acesso restrito): "}<a href={DOCS_URL + "/notas-de-versao/1.2.1.md"}>1.2.1</a>.</p>
    {!detail && <p><Link href={en ? "/en/news/1-2-1" : "/novidades/1-2-1"}>{en ? "Permanent link to the 1.2.1 notes" : "Link permanente das notas da 1.2.1"}</Link></p>}
    <p>{en ? "Follow the cofounders: " : "Acompanhe os cofundadores: "}<a href={MIZAEL_LINKEDIN}>Mizael Ribeiro</a> · <a href={JOAO_LINKEDIN}>João Antônio Rodrigues</a>.</p>
  </article>;
}
