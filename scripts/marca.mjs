#!/usr/bin/env node
/**
 * Rasteriza os PNGs da marca a partir dos masters em public/. Rode depois de
 * mexer em qualquer um deles:
 *
 *   node scripts/marca.mjs
 *
 * São TRÊS masters, não um, porque o mesmo desenho não serve aos três usos:
 *
 *   perfil.svg     campo escuro + V cromado. Foto de perfil das redes e logo
 *                  da organização — vive grande, pode ter material.
 *   icone-app.svg  campo azul + V oficial. Tela inicial do telefone e PWA,
 *                  de 60 a 192px: a farpa e o entalhe ainda aparecem.
 *   icone.svg      campo azul + V grosso de dois braços. Aba do navegador,
 *                  16 a 32px: o V oficial não sobrevive a esse tamanho.
 *
 * Precisa do rsvg-convert (pacote librsvg). Sem ele, nada é sobrescrito.
 */
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** [master, destino, lado em px, para que serve] */
const SAIDAS = [
  ["perfil.svg", "public/perfil.png", 1024, "foto de perfil das redes"],
  ["perfil.svg", "public/logo.png", 512, "logo da organização (JSON-LD)"],
  ["icone.svg", "src/app/icon.png", 32, "favicon da aba"],
  ["icone-app.svg", "src/app/apple-icon.png", 180, "ícone do iOS"],
  ["icone-app.svg", "public/icone-192.png", 192, "ícone do manifest (PWA)"],
  ["icone-app.svg", "public/icone-512.png", 512, "ícone grande do manifest"],
];

try {
  execFileSync("rsvg-convert", ["--version"], { stdio: "ignore" });
} catch {
  console.error("rsvg-convert não encontrado — instale librsvg e rode de novo.");
  process.exit(1);
}

for (const [master, rel, lado, uso] of SAIDAS) {
  execFileSync("rsvg-convert", [
    join(ROOT, "public", master),
    "-w", String(lado),
    "-h", String(lado),
    "-o", join(ROOT, rel),
  ]);
  console.log(`${rel} · ${lado}px ← ${master} — ${uso}`);
}
