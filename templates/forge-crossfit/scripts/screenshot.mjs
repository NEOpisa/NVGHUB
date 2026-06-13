#!/usr/bin/env node
/**
 * Screenshot the local dev server.
 * Usage: node scripts/screenshot.mjs [url] [output] [--mobile]
 * Defaults: http://localhost:3001 → screenshots/preview-desktop.png
 */
import puppeteer from 'puppeteer';
import path from 'path';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const isMobile = args.includes('--mobile');
const url = args.find(a => a.startsWith('http')) ?? 'http://localhost:3001';
const defaultOut = isMobile ? 'screenshots/preview-mobile.png' : 'screenshots/preview-desktop.png';
const output = args.find(a => a.endsWith('.png')) ?? defaultOut;
const outputPath = path.resolve(__dirname, '..', output);

mkdirSync(path.dirname(outputPath), { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();

if (isMobile) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
}

await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(async () => {
  // networkidle2 nunca assenta com HMR/imagens externas lentas; segue com o que carregou
  console.warn('networkidle2 timeout — continuando com a página carregada');
});
await new Promise(r => setTimeout(r, 2500)); // let animations and the 3D scene settle

await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved → ${outputPath}`);
