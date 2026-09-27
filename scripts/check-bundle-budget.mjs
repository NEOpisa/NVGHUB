import { readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";

// Initial, uncompressed JS in the prerendered home. Excludes lazy-loaded
// chunks and legacy noModule scripts, which modern browsers do not execute.
const buildDir = resolve(".next");
const budgetBytes = 650 * 1024;

try {
  const html = readFileSync(resolve(buildDir, "server/app/index.html"), "utf8");
  const files = new Set();
  for (const [tag] of html.matchAll(/<script\b[^>]*>/gi)) {
    if (/\bnomodule\b/i.test(tag)) continue;
    const src = tag.match(/\bsrc="\/_next\/([^"?#]+\.js)(?:[?#][^"]*)?"/i)?.[1];
    if (src) files.add(src);
  }
  if (!files.size) throw new Error("Nenhum chunk JavaScript encontrado no HTML da home.");

  let bytes = 0;
  for (const file of files) {
    const path = resolve(buildDir, file);
    if (!path.startsWith(buildDir + sep)) throw new Error("Caminho inválido: " + file);
    bytes += statSync(path).size;
  }

  console.log("JavaScript inicial da home: " + (bytes / 1024).toFixed(1) + " KiB (" + files.size + " arquivos; limite: 650 KiB, sem compressão).");
  if (bytes > budgetBytes) throw new Error("O JavaScript inicial da home excede o limite de 650 KiB.");
} catch (error) {
  console.error("Falha na verificação do bundle: " + error.message);
  process.exitCode = 1;
}
