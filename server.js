const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const OUT = path.join(__dirname, "out");

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

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  if (url === "/") url = "/index.html";

  let file = path.join(OUT, url);

  if (!fs.existsSync(file)) file = file + ".html";
  if (!fs.existsSync(file)) {
    file = path.join(OUT, "404.html");
    res.statusCode = 404;
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
