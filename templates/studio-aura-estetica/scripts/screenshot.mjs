/* ============================================================
   Screenshots do site via CDP, sem dependências de npm.
   Usa o chrome-headless-shell do cache do puppeteer (ou o binário
   apontado por CHROME_BIN).

   Uso:
     node scripts/screenshot.mjs                       # desktop, página toda em fatias
     node scripts/screenshot.mjs --mobile              # 390x844 @2x
     node scripts/screenshot.mjs --url=http://localhost:3000 --out=shots/aura
     node scripts/screenshot.mjs --single --scroll=2400  # 1 print no offset

   Saída: <out>-NN.png (fatias) ou <out>.png (--single).
   ============================================================ */
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const url = args.url ?? "http://localhost:3000";
const out = args.out ?? "/tmp/aura-shot";
const mobile = Boolean(args.mobile);
const W = mobile ? 390 : 1440;
const H = mobile ? 844 : 900;
const DPR = mobile ? 2 : 1;

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const base = join(homedir(), ".cache/puppeteer/chrome-headless-shell");
  if (existsSync(base)) {
    const versions = readdirSync(base).sort().reverse();
    for (const v of versions) {
      const bin = join(base, v, "chrome-headless-shell-linux64/chrome-headless-shell");
      if (existsSync(bin)) return bin;
    }
  }
  for (const bin of ["/usr/bin/chromium", "/usr/bin/google-chrome"]) {
    if (existsSync(bin)) return bin;
  }
  throw new Error(
    "Chrome não encontrado. Defina CHROME_BIN ou instale: npx puppeteer browsers install chrome-headless-shell"
  );
}

const port = 9377;
const chrome = spawn(findChrome(), [
  `--remote-debugging-port=${port}`,
  "--headless",
  "--no-sandbox",
  "--hide-scrollbars",
  "--mute-audio",
  "--use-gl=swiftshader",
  "--enable-unsafe-swiftshader",
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const page = (await res.json()).find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("chrome não subiu");
}

const ws = new WebSocket(await getTarget());
await new Promise((r, j) => ((ws.onopen = r), (ws.onerror = j)));

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
  }
};
const cmd = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id;
    pending.set(i, { res, rej });
    ws.send(JSON.stringify({ id: i, method, params }));
  });

mkdirSync(dirname(out), { recursive: true });
await cmd("Page.enable");
await cmd("Runtime.enable");
await cmd("Emulation.setDeviceMetricsOverride", {
  width: W,
  height: H,
  deviceScaleFactor: DPR,
  mobile,
});
await cmd("Page.navigate", { url });
await sleep(5500); // fontes, imagens, failsafe dos reveals e shader

const scrollTo = async (y) => {
  await cmd("Runtime.evaluate", {
    expression: `window.scrollTo({top:${y},behavior:'instant'})`,
  });
  await sleep(1900);
};
const shoot = async (file) => {
  const shot = await cmd("Page.captureScreenshot", { format: "png" });
  writeFileSync(file, Buffer.from(shot.data, "base64"));
  console.log("ok", file);
};

if (args.single) {
  if (args.scroll) await scrollTo(+args.scroll);
  await shoot(`${out}.png`);
} else {
  const { result } = await cmd("Runtime.evaluate", {
    expression: "document.documentElement.scrollHeight",
    returnByValue: true,
  });
  const step = Math.round(H * 0.92);
  let n = 0;
  for (let y = 0; y < result.value - 40; y += step) {
    await scrollTo(y);
    await shoot(`${out}-${String(n++).padStart(2, "0")}.png`);
  }
}

chrome.kill();
process.exit(0);
