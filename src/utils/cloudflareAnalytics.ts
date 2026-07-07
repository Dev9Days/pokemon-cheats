const CLOUDFLARE_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";
const CLOUDFLARE_BEACON_SCRIPT_ID = "cloudflare-web-analytics";

export function installCloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

  if (process.env.NODE_ENV !== "production" || !token || document.getElementById(CLOUDFLARE_BEACON_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = CLOUDFLARE_BEACON_SCRIPT_ID;
  script.defer = true;
  script.src = CLOUDFLARE_BEACON_SRC;
  script.dataset.cfBeacon = JSON.stringify({ token });
  document.body.appendChild(script);
}
