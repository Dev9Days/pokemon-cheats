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

function getSeoTags(html, filePath) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  if (!head) fail(`missing head in ${filePath}`);
  const tags = [...head.matchAll(/<(meta|link)\b([^>]+)>/gi)].map((match) => ({
    tag: match[1].toLowerCase(),
    attributes: Object.fromEntries(
      [...match[2].matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)]
        .map((attribute) => [attribute[1].toLowerCase(), attribute[2]]),
    ),
  }));
  const canonicals = tags.filter(({ tag, attributes }) =>
    tag === "link" && attributes.rel?.toLowerCase() === "canonical",
  );
  if (canonicals.length !== 1 || canonicals[0].attributes.href !== `${siteOrigin}/`) {
    fail(`${filePath} must have exactly one canonical pointing to ${siteOrigin}/`);
  }
  return tags;
}

function assertIndexable(pathname, expectedCanonical) {
  const { filePath, html } = readOutput(pathname);
  const tags = getSeoTags(html, filePath);
  for (const { tag, attributes } of tags) {
    if (tag !== "meta") continue;
    if (["robots", "googlebot"].includes(attributes.name?.toLowerCase())) {
      const directives = (attributes.content ?? "").toLowerCase().split(/[\s,]+/);
      if (directives.some((value) => ["noindex", "none", "nofollow"].includes(value))) {
        fail(`${filePath} contains conflicting ${attributes.name} directives`);
      }
    }
    if (attributes["http-equiv"]?.toLowerCase() === "refresh") {
      fail(`${filePath} must not redirect new visitors away from the indexable root`);
    }
  }
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

  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  if (!markup.includes('class="browser-shell" aria-hidden="false" aria-label="6차 한글패치 20260613 치트 목록"')) {
    fail(`${filePath} must render the latest Korean cheat list without hiding it`);
  }
  if (!markup.includes('class="cheat-card"') || !markup.includes("DMA 필수 코드")) {
    fail(`${filePath} must include actual cheat cards in the initial HTML`);
  }
  if (markup.includes('class="build-selection-dialog"') || markup.includes('class="browser-shell browser-shell--prewarm"')) {
    fail(`${filePath} must decide first-visit selection only after hydration`);
  }
}

function assertAliasIsNoindex(pathname) {
  const { filePath, html } = readOutput(pathname);
  getSeoTags(html, filePath);
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

const robotsPath = join("out", "robots.txt");
if (!existsSync(robotsPath)) fail(`missing ${robotsPath}`);
const robotsText = readFileSync(robotsPath, "utf8").replace(/#.*$/gm, "");
if (/^[ \t]*Disallow:[ \t]*\S[^\r\n]*$/im.test(robotsText)) {
  fail("robots.txt must allow crawling pages and rendering assets, including noindex routes");
}
if (!robotsText.split(/\r?\n/).some((line) => line.trim() === `Sitemap: ${siteOrigin}/sitemap.xml`)) {
  fail("robots.txt must advertise the canonical sitemap");
}

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

for (const pathname of ["/emerald/cheats/", "/pokemon-cheats/"]) {
  assertAliasIsNoindex(pathname);
  const { filePath, html } = readOutput(pathname);
  const tags = getSeoTags(html, filePath);
  if (!tags.some(({ tag, attributes }) => tag === "meta"
    && attributes["http-equiv"]?.toLowerCase() === "refresh"
    && attributes.content === "0;url=/")) {
    fail(`${filePath} must redirect immediately to the root`);
  }
  if (html.includes('class="build-selector"') || html.includes('class="browser-shell')) {
    fail(`${filePath} must not render the old entry screen`);
  }
  if (!html.includes('<a href="/">')) fail(`${filePath} must provide a fallback root link`);
}

console.log(`SEO validation passed for ${sitemapUrls.length} indexable URL.`);
