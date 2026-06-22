import { chromium } from "playwright";

const slugs = ["pousada-vista-serra", "motriz-auto-center"];
const base = "http://localhost:5057/templates";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 861 },
  deviceScaleFactor: 2,
});

for (const slug of slugs) {
  await page.goto(`${base}/${slug}/index.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/${slug}.png` });
  console.log("shot", slug);
}

await browser.close();
