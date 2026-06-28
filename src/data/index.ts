import type { CheatBuildId, CheatGroup } from "../types/cheat";
import { applyCheatCodeValues } from "./cheatDataBuilder";
import { cheatCodeValuesEn } from "./codeValues/en";
import { cheatCodeValuesKr20240611 } from "./codeValues/kr-20240611";
import { cheatCodeValuesKr20240611Modern } from "./codeValues/kr-20240611-modern";
import { cheatCodeValuesKr20260613 } from "./codeValues/kr-20260613";
import { cheatStructure } from "./cheatStructure";

const cheatCodeValuesByBuild = {
  en: cheatCodeValuesEn,
  "kr-20240611": cheatCodeValuesKr20240611,
  "kr-20240611-modern": cheatCodeValuesKr20240611Modern,
  "kr-20260613": cheatCodeValuesKr20260613,
} satisfies Partial<Record<CheatBuildId, unknown>>;

const cheatCache = new Map<CheatBuildId, CheatGroup[]>();

export function getCheatsForBuild(buildId: CheatBuildId): CheatGroup[] {
  const cached = cheatCache.get(buildId);
  if (cached) return cached;

  const codeValues = cheatCodeValuesByBuild[buildId as keyof typeof cheatCodeValuesByBuild];
  const groups = codeValues ? applyCheatCodeValues(cheatStructure, codeValues) : [];
  cheatCache.set(buildId, groups);
  return groups;
}

