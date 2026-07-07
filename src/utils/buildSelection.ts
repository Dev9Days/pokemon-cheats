import { builds } from "../data/builds";
import type { CheatBuildId } from "../types/cheat";

const STORAGE_KEY = "emerald:selected-build";
const LEGACY_STORAGE_KEYS = ["pokemon-cheats:selected-build", "pokemon-emerald-cheats:selected-build"] as const;

export type HydrationAwareWindow = Window & {
  __pokemonEmeraldCheatsHydrated?: boolean;
};

export function getBuildRoute(buildId: CheatBuildId) {
  return `/emerald/cheats/${buildId}/`;
}

export function getInitialBuild(): CheatBuildId | null {
  if (typeof window === "undefined") return null;

  const requestedBuild = window.location.pathname.split("/").filter(Boolean).at(2) as CheatBuildId | undefined;
  const saved = requestedBuild ?? safeGetStoredBuild();
  return saved && builds.some((build) => build.id === saved) ? saved : null;
}

export function safeGetStoredBuild(): CheatBuildId | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as CheatBuildId | null;
    if (stored) return stored;

    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      const legacyStored = localStorage.getItem(legacyKey) as CheatBuildId | null;
      if (legacyStored) {
        safeSetStoredBuild(legacyStored);
        return legacyStored;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function safeSetStoredBuild(buildId: CheatBuildId) {
  try {
    localStorage.setItem(STORAGE_KEY, buildId);
    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(legacyKey);
    }
  } catch {
    // Storage can be unavailable in iOS Safari private mode. Build selection still works for this session.
  }
}

export function safeRemoveStoredBuild() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(legacyKey);
    }
  } catch {
    // Ignore unavailable storage; the visible app state is the source of truth.
  }
}
