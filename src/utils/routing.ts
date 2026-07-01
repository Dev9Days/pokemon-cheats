export const CANONICAL_APP_PATH = "/emerald/cheats";

const LEGACY_APP_PATHS = new Set(["/", "/pokemon-emerald-cheats", "/pokemon-emerald-cheats/", "/emerald/cheats/"]);

export function normalizeAppRoute() {
  const { hash, pathname, search } = window.location;

  if (!LEGACY_APP_PATHS.has(pathname)) return;

  window.history.replaceState(null, "", `${CANONICAL_APP_PATH}${search}${hash}`);
}
