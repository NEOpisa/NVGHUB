#!/usr/bin/env node
/**
 * #095 · QA visual — screenshots de todas as rotas × 3 breakpoints usando o
 * Chromium do cache do Playwright em modo one-shot (sem dependências npm).
 *
 * Uso:  node scripts/visual-qa.mjs [baseURL]   (padrão http://localhost:3000)
 * Saída: .qa-shots/<rota>-<bp>.png  (a pasta está no .gitignore)
 *
 * Nota: a home usa WebGL; no headless a marca 3D pode sair no fallback em
 * vetor. Para as internas a captura é fiel.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".qa-shots";

const ROUTES = [
  "/", "/baixar", "/recursos", "/instalacao", "/documentacao",
  "/sobre", "/faq", "/privacidade", "/termos",
];
const BREAKPOINTS = [
  ["desktop", 1440, 900],
  ["tablet", 820, 1180],
  ["mobile", 390, 844],
];

// Opcional: reutiliza uma sessão Playwright instalada pelo ambiente de QA.
// Evita abrir 27 processos Chromium avulsos; não adiciona dependência ao site.
// PLAYWRIGHT_PATH=/caminho/node_modules/playwright node scripts/visual-qa.mjs
if (process.env.PLAYWRIGHT_PATH) {
  const require = createRequire(import.meta.url);
  const { chromium } = require(process.env.PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  mkdirSync(OUT, { recursive: true });
  let failures = 0;
  try {
    for (const route of ROUTES) {
      for (const [bp, width, height] of BREAKPOINTS) {
        const slug = route === "/" ? "home" : route.slice(1);
        const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
        try {
          const response = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
          if (!response.ok()) throw new Error(`HTTP ${response.status()}`);
          await page.screenshot({ path: join(OUT, `${slug}-${bp}.png`), fullPage: true });
          console.log(`ok   ${slug}-${bp}`);
        } catch (error) {
          console.error(`FAIL ${slug}-${bp}: ${error.message}`);
          failures++;
        } finally { await page.close(); }
      }
    }
  } finally { await browser.close(); }
  console.log(failures ? `${failures} capturas falharam` : "todas as capturas ok");
  process.exit(failures ? 1 : 0);
}

// localiza o chromium do playwright (qualquer versão instalada)
const mpRoot = join(homedir(), ".cache", "ms-playwright");
const chromiumDir = existsSync(mpRoot)
  ? readdirSync(mpRoot).filter((d) => /^chromium-\d+$/.test(d)).sort().pop()
  : null;
const CHROME = chromiumDir
  ? join(mpRoot, chromiumDir, "chrome-linux64", "chrome")
  : null;
if (!CHROME || !existsSync(CHROME)) {
  console.error("chromium não encontrado — rode: npx playwright install chromium");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
let fail = 0;
for (const route of ROUTES) {
  for (const [bp, w, h] of BREAKPOINTS) {
    const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
    const file = join(OUT, `${slug}-${bp}.png`);
    try {
      execFileSync(
        CHROME,
        [
          "--headless=new", "--no-sandbox", "--disable-gpu-sandbox",
          "--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader",
          // Capturas determinísticas; WebGL e movimento têm QA separado.
          "--force-prefers-reduced-motion", "--disable-webgl",
          "--hide-scrollbars", "--force-device-scale-factor=1",
          `--window-size=${w},${h}`, "--virtual-time-budget=8000",
          `--screenshot=${file}`, `${BASE}${route}`,
        ],
        { stdio: "pipe", timeout: 60000 },
      );
      console.log(`ok   ${slug}-${bp}`);
    } catch {
      console.error(`FAIL ${slug}-${bp}`);
      fail++;
    }
  }
}
console.log(fail ? `\n${fail} capturas falharam` : "\ntodas as capturas ok");
process.exit(fail ? 1 : 0);
