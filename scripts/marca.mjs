#!/usr/bin/env node
/**
 * Rasteriza os PNGs da marca a partir de public/perfil.svg — o mestre
 * quadrado. Rode depois de mexer no símbolo:
 *
 *   node scripts/marca.mjs
 *
 * Precisa do rsvg-convert (pacote librsvg). Sem ele, nada é sobrescrito.
 */
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public", "perfil.svg");

/** [destino, lado em px, para que serve] */
const SAIDAS = [
  ["public/perfil.png", 1024, "foto de perfil das redes"],
  ["public/logo.png", 512, "logo da organização (JSON-LD e manifest)"],
  ["src/app/icon.png", 256, "favicon"],
  ["src/app/apple-icon.png", 180, "ícone do iOS"],
];

try {
  execFileSync("rsvg-convert", ["--version"], { stdio: "ignore" });
} catch {
  console.error("rsvg-convert não encontrado — instale librsvg e rode de novo.");
  process.exit(1);
}

for (const [rel, lado, uso] of SAIDAS) {
  execFileSync("rsvg-convert", [
    SRC,
    "-w", String(lado),
    "-h", String(lado),
    "-o", join(ROOT, rel),
  ]);
  console.log(`${rel} · ${lado}px — ${uso}`);
}
