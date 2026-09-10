import type { CheatBuildId, CheatGroup } from "../types/cheat";
import {
  applyCheatCodeValues,
  applyCheatMetadata,
  getCatalogVariantCodes,
  getEntryCodes,
  getVariantCodes,
} from "./cheatDataBuilder";
import type { CheatCodeValues } from "./cheatDataBuilder";

const cheatStructureLoader = () => import("./cheatStructure").then((module) => applyCheatMetadata(module.cheatStructure));

const cheatCodeValueLoaders = {
  en: () => import("./codeValues/en").then((module) => module.cheatCodeValuesEn),
  "kr-20240611": () =>
    import("./codeValues/kr-20240611").then((module) => module.cheatCodeValuesKr20240611),
  "kr-20240611-modern": () =>
    import("./codeValues/kr-20240611-modern").then((module) => module.cheatCodeValuesKr20240611Modern),
  "kr-20260613": () =>
    import("./codeValues/kr-20260613").then((module) => module.cheatCodeValuesKr20260613),
} satisfies Partial<Record<CheatBuildId, () => Promise<CheatCodeValues>>>;

const cheatCache = new Map<CheatBuildId, CheatGroup[]>();
const cheatPromiseCache = new Map<CheatBuildId, Promise<CheatGroup[]>>();
const codeValuePromiseCache = new Map<CheatBuildId, Promise<CheatCodeValues | null>>();
const codeValueCache = new Map<CheatBuildId, CheatCodeValues | null>();
let cheatStructurePromise: Promise<CheatGroup[]> | null = null;

export function preloadCheatStructure(): Promise<CheatGroup[]> {
  cheatStructurePromise ??= cheatStructureLoader().catch((error) => {
    cheatStructurePromise = null;
    throw error;
  });
  return cheatStructurePromise;
}

export async function getCheatsForBuild(buildId: CheatBuildId): Promise<CheatGroup[]> {
  const cached = cheatCache.get(buildId);
  if (cached) return cached;

  const cachedPromise = cheatPromiseCache.get(buildId);
  if (cachedPromise) return cachedPromise;

  const loadCodeValues = cheatCodeValueLoaders[buildId as keyof typeof cheatCodeValueLoaders];
  const cheatPromise = Promise.all([preloadCheatStructure(), loadCodeValues ? loadCodeValues() : null])
    .then(([cheatStructure, codeValues]) => {
      const groups = codeValues ? applyCheatCodeValues(cheatStructure, codeValues) : [];
      cheatCache.set(buildId, groups);
      return groups;
    })
    .catch((error) => {
      cheatPromiseCache.delete(buildId);
      throw error;
    });

  cheatPromiseCache.set(buildId, cheatPromise);
  return cheatPromise;
}

export function getCheatStructure(): Promise<CheatGroup[]> {
  return preloadCheatStructure();
}

export async function getCodeValuesForBuild(buildId: CheatBuildId): Promise<CheatCodeValues | null> {
  if (codeValueCache.has(buildId)) return codeValueCache.get(buildId) ?? null;

  const cachedPromise = codeValuePromiseCache.get(buildId);
  if (cachedPromise) return cachedPromise;

  const loadCodeValues = cheatCodeValueLoaders[buildId as keyof typeof cheatCodeValueLoaders];
  const promise = (loadCodeValues ? loadCodeValues() : Promise.resolve(null))
    .then((values) => {
      codeValueCache.set(buildId, values);
      return values;
    })
    .catch((error) => {
      codeValuePromiseCache.delete(buildId);
      throw error;
    });

  codeValuePromiseCache.set(buildId, promise);
  return promise;
}

export async function getEntryCodesForBuild(buildId: CheatBuildId, entryId: string): Promise<string[]> {
  const values = await getCodeValuesForBuild(buildId);
  return values ? getEntryCodes({ id: entryId }, values) : [];
}

export async function getVariantCodesForBuild(buildId: CheatBuildId, entryId: string, variantId: string): Promise<string[]> {
  const values = await getCodeValuesForBuild(buildId);
  if (!values) return [];

  const catalogSpec = values.catalogs?.[entryId];
  return catalogSpec ? getCatalogVariantCodes(variantId, catalogSpec) : getVariantCodes({ id: variantId }, values);
}
