const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const OUT  = path.join(__dirname, "out");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".txt":  "text/plain",
};

// Inline CSS into index.html at startup so no external CSS request is needed
function buildIndexHtml() {
  let html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
  const match = html.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
  if (match) {
    const cssFile = path.join(OUT, match[1]);
    if (fs.existsSync(cssFile)) {
      const css = fs.readFileSync(cssFile, "utf8");
      html = html.replace(
        new RegExp(`<link rel="stylesheet" [^>]*href="${match[1].replace(/\//g, '\\/')}"[^>]*/>`),
        `<style>${css}</style>`
      );
    }
  }
  return html;
}

const INDEX_HTML = buildIndexHtml();

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);

  // Serve inlined index.html for root and unknown routes
  if (url === "/" || url === "/index.html") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.end(INDEX_HTML);
    return;
  }

  let file = path.join(OUT, url);
  if (!fs.existsSync(file)) file = file + ".html";
  if (!fs.existsSync(file)) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 404;
    res.end(INDEX_HTML);
    return;
  }

  const ext  = path.extname(file);
  const mime = MIME[ext] || "application/octet-stream";

  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(500); res.end("Server error"); return; }
    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", ext === ".html" ? "no-cache" : "public,max-age=31536000,immutable");
    res.end(data);
  });
}).listen(PORT, () => console.log("NeoVanguard running on port " + PORT));
