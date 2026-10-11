// ==========================================================================
// Zero-Dependency Local Static Server for Portfolio & AI Chatbot
// Runs on ANY machine with Node.js installed without running 'npm install'
// ==========================================================================

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf"
};

const server = http.createServer((req, res) => {
  // Normalize and sanitize request path
  let parsedUrl = req.url.split("?")[0];
  let filePath = path.join(ROOT_DIR, parsedUrl === "/" ? "index.html" : parsedUrl);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("403 Forbidden");
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // 404 handler
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end(`404 Not Found: ${parsedUrl}`);
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end(`500 Server Error: ${readErr.message}`);
      }

      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-cache"
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log("\n========================================================");
  console.log(`🚀 Portfolio & AI Chatbot is running at:`);
  console.log(`   👉 http://localhost:${PORT}`);
  console.log("========================================================");
  console.log(`Press Ctrl + C to stop the server\n`);
});
