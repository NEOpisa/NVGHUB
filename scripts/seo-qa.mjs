import assert from "node:assert/strict";
const base = process.env.QA_URL ?? "http://localhost:3100";
const canonicalBase = "https://neovanguard.com.br";
const xmlResponse = await fetch(base + "/sitemap.xml");
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1]);
assert(entries.length > 0, "Empty sitemap");
const locations = entries.map(entry => entry.match(/<loc>(.*?)<\/loc>/)[1]);
assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap URL");
assert(!locations.some(url => url.endsWith("/faq")), "FAQ is still indexed");
const attr = (tag, name) => tag.match(new RegExp(name + '="([^"]*)"'))?.[1];
for (const entry of entries) {
  const url = entry.match(/<loc>(.*?)<\/loc>/)[1];
  assert(url.startsWith(canonicalBase), "Wrong origin");
  const path = new URL(url).pathname;
  const response = await fetch(base + path, {redirect: "manual"});
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, path + " H1");
  assert(html.includes('lang="' + (path.startsWith("/en") ? "en" : "pt-BR") + '"'), path + " language");
  const links = html.match(/<link\b[^>]*>/g) ?? [];
  const canonical = links.find(tag => attr(tag, "rel") === "canonical");
  assert.equal(attr(canonical ?? "", "href"), url, path + " canonical");
  for (const lang of ["pt-BR", "en", "x-default"]) {
    const link = links.find(tag => attr(tag, "hrefLang") === lang || attr(tag, "hreflang") === lang);
    const target = attr(link ?? "", "href");
    assert(locations.includes(target), path + " alternate " + lang);
    assert(entry.includes('hreflang="' + lang + '"'), path + " sitemap alternate");
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert(schemas.some(s => s["@graph"]?.some(n => n["@type"] === "Organization")), path + " organization");
  assert(!schemas.some(s => s["@type"] === "FAQPage"), path + " obsolete FAQ schema");
  if (path !== "/" && path !== "/en") assert(schemas.some(s => s["@type"] === "BreadcrumbList"), path + " breadcrumbs");
  assert(/property="og:image"/.test(html), path + " OG image");
  assert(!/name="robots" content="[^"]*noindex/.test(html), path + " noindex");
}
const redirect = await fetch(base + "/faq", {redirect: "manual"});
assert.equal(redirect.status, 301);
assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/documentacao");
assert.equal((await fetch(base + "/en/missing-page")).status, 404);
const robots = await (await fetch(base + "/robots.txt")).text();
assert(robots.includes(canonicalBase + "/sitemap.xml"));
console.log("SEO OK: " + entries.length + " URLs, canonicals, languages, schemas, sitemap, robots and FAQ 301.");

