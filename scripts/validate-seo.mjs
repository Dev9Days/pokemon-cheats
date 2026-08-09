import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const siteOrigin = "https://pokemon.9days.dev";
const sitemapPath = join("out", "sitemap.xml");
const legacyRoutingPath = join("src", "utils", "routing.ts");

function fail(message) {
  throw new Error(`SEO validation failed: ${message}`);
}

if (existsSync(legacyRoutingPath)) {
  fail("client-side URL rewriting can retain alias noindex metadata");
}

function readOutput(pathname) {
  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = join("out", relativePath, "index.html");

  if (!existsSync(filePath)) fail(`missing ${filePath}`);
  return { filePath, html: readFileSync(filePath, "utf8") };
}

function getTagValue(html, pattern, label, filePath) {
  const value = html.match(pattern)?.[1];
  if (!value) fail(`missing ${label} in ${filePath}`);
  return value;
}

function assertIndexable(pathname, expectedCanonical) {
  const { filePath, html } = readOutput(pathname);
  const robots = getTagValue(html, /<meta name="robots" content="([^"]+)"/, "robots metadata", filePath)
    .split(",")
    .map((value) => value.trim());
  const canonical = getTagValue(
    html,
    /<link rel="canonical" href="([^"]+)"/,
    "canonical URL",
    filePath,
  );

  if (!robots.includes("index") || !robots.includes("follow") || robots.includes("noindex")) {
    fail(`${filePath} must be index, follow (received: ${robots.join(", ")})`);
  }
  if (canonical !== expectedCanonical) {
    fail(`${filePath} canonical must be ${expectedCanonical} (received: ${canonical})`);
  }
}

function assertAliasIsNoindex(pathname) {
  const { filePath, html } = readOutput(pathname);
  const robots = getTagValue(html, /<meta name="robots" content="([^"]+)"/, "robots metadata", filePath);
  const canonical = getTagValue(
    html,
    /<link rel="canonical" href="([^"]+)"/,
    "canonical URL",
    filePath,
  );

  if (!robots.split(",").map((value) => value.trim()).includes("noindex")) {
    fail(`${filePath} alias must remain noindex`);
  }
  if (canonical !== `${siteOrigin}/`) {
    fail(`${filePath} alias canonical must point to the primary cheats page`);
  }
}

if (!existsSync(sitemapPath)) fail(`missing ${sitemapPath}; run npm run build first`);

const sitemap = readFileSync(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (sitemapUrls.length !== 1 || sitemapUrls[0] !== `${siteOrigin}/`) {
  fail("sitemap must contain only the primary cheats URL");
}

for (const sitemapUrl of sitemapUrls) {
  const url = new URL(sitemapUrl);
  if (url.origin !== siteOrigin) fail(`unexpected sitemap origin: ${url.origin}`);
  assertIndexable(url.pathname, sitemapUrl);
}

const versionOutputDirectory = join("out", "emerald", "cheats");
const generatedVersionUrls = readdirSync(versionOutputDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(versionOutputDirectory, entry.name, "index.html")))
  .map((entry) => `${siteOrigin}/emerald/cheats/${entry.name}/`);

for (const generatedUrl of generatedVersionUrls) {
  assertAliasIsNoindex(new URL(generatedUrl).pathname);
}

assertAliasIsNoindex("/emerald/cheats/");
assertAliasIsNoindex("/pokemon-cheats/");

console.log(`SEO validation passed for ${sitemapUrls.length} indexable URL.`);
