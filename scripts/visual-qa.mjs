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

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".qa-shots";

const ROUTES = [
  "/", "/ouro", "/solucao", "/sobre", "/obrigado",
  "/metodologia", "/exemplos", "/faq", "/contato", "/privacidade", "/termos",
];
const BREAKPOINTS = [
  ["desktop", 1440, 900],
  ["tablet", 820, 1180],
  ["mobile", 390, 844],
];

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
