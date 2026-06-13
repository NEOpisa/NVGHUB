// Injeta um botão flutuante "Voltar aos exemplos" em cada template exportado
// em public/templates/<slug>/. Rode depois de reexportar os templates:
//   node scripts/inject-exit.mjs
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "templates");
const MARK = "nvg-exit-btn";
const SNIPPET = `<a href="/exemplos" id="nvg-exit-btn" aria-label="Voltar aos exemplos" style="position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:2147483647;display:inline-flex;align-items:center;gap:8px;background:#0d0d0d;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;font-weight:600;line-height:1;text-decoration:none;padding:11px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.2);box-shadow:0 10px 34px rgba(0,0,0,.5);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Voltar aos exemplos</a>`;

if (!existsSync(ROOT)) {
  console.error("public/templates não existe — exporte os templates primeiro.");
  process.exit(1);
}

let done = 0;
for (const slug of readdirSync(ROOT)) {
  for (const f of ["index.html", "404.html"]) {
    const p = join(ROOT, slug, f);
    if (!existsSync(p)) continue;
    let html = readFileSync(p, "utf8");
    if (html.includes(MARK) || !html.includes("</body>")) continue;
    writeFileSync(p, html.replace("</body>", SNIPPET + "</body>"));
    done++;
  }
}
console.log(`Botão "Voltar aos exemplos" injetado em ${done} arquivo(s).`);
