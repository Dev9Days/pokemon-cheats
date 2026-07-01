import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const routeIndexPath = path.join(distDir, "emerald", "cheats", "index.html");
const legacyIndexPath = path.join(distDir, "pokemon-emerald-cheats", "index.html");
const fallbackPath = path.join(distDir, "404.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html does not exist. Run vite build before prepare-pages.");
}

for (const targetPath of [routeIndexPath, legacyIndexPath, fallbackPath]) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(indexPath, targetPath);
}
