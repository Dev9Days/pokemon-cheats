import type { CheatEntry, CheatGroup, CheatVariant } from "../types/cheat";
import { itemCatalog, moveCatalog, natureCatalog, pokemonSpeciesCatalog, teleportLocationCatalog } from "./catalogs";

type AddressCatalogKind = "item" | "move" | "pokemonSpecies" | "teleport";

export type CatalogCodeValue =
  | {
      kind: AddressCatalogKind;
      address: string;
    }
  | {
      kind: "nature";
      baseCode: string;
    }
  | {
      kind: "starterPokemon";
      slotCode: string;
    };

export type CheatCodeValues = {
  entries: Record<string, string[]>;
  variants: Record<string, string[]>;
  catalogs?: Record<string, CatalogCodeValue>;
};

const cloneCodes = (codes: string[]) => [...codes];

export function mergeCheatCodeValues(parts: CheatCodeValues[]): CheatCodeValues {
  return parts.reduce<CheatCodeValues>(
    (merged, part) => ({
      entries: { ...merged.entries, ...part.entries },
      variants: { ...merged.variants, ...part.variants },
      catalogs:
        merged.catalogs || part.catalogs ? { ...(merged.catalogs ?? {}), ...(part.catalogs ?? {}) } : undefined,
    }),
    { entries: {}, variants: {} },
  );
}

const itemValueById = new Map<string, string>(itemCatalog.map((item) => [item.id, item.value]));
const moveValueById = new Map<string, string>(moveCatalog.map((move) => [move.id, move.value]));
const natureCodeById = new Map<string, string>(natureCatalog.map((nature) => [nature.id, nature.code]));
const pokemonById = new Map<string, (typeof pokemonSpeciesCatalog)[number]>(
  pokemonSpeciesCatalog.map((pokemon) => [pokemon.id, pokemon]),
);
const pokemonBySlug = new Map<string, (typeof pokemonSpeciesCatalog)[number]>(
  pokemonSpeciesCatalog.map((pokemon) => [pokemon.slug, pokemon]),
);
const teleportValueById = new Map<string, string>(
  teleportLocationCatalog.map((location) => [location.id, location.value]),
);

function applyVariantCodes(variant: CheatVariant, values: CheatCodeValues): CheatVariant {
  return {
    ...variant,
    codes: cloneCodes(values.variants[variant.id] ?? []),
  };
}

function getIdSuffix(variantId: string) {
  return variantId.split(".").at(-1) ?? variantId;
}

function getCatalogValue(spec: CatalogCodeValue, variantId: string) {
  const suffix = getIdSuffix(variantId);

  if (spec.kind === "item") {
    return itemValueById.get(suffix);
  }

  if (spec.kind === "move") {
    return moveValueById.get(suffix);
  }

  if (spec.kind === "pokemonSpecies") {
    return pokemonById.get(suffix)?.value;
  }

  if (spec.kind === "teleport") {
    return teleportValueById.get(suffix);
  }

  return undefined;
}

function applyCatalogVariantCodes(variant: CheatVariant, spec: CatalogCodeValue): CheatVariant {
  if (spec.kind === "nature") {
    const natureCode = natureCodeById.get(getIdSuffix(variant.id));
    return {
      ...variant,
      codes: natureCode ? [spec.baseCode, natureCode] : [],
    };
  }

  if (spec.kind === "starterPokemon") {
    const pokemon = pokemonBySlug.get(getIdSuffix(variant.id));
    return {
      ...variant,
      codes: pokemon ? [spec.slotCode, pokemon.starterCode] : [],
    };
  }

  const value = getCatalogValue(spec, variant.id);
  return {
    ...variant,
    codes: value ? [`${spec.address} ${value}`] : [],
  };
}

function applyEntryCodes(entry: CheatEntry, values: CheatCodeValues): CheatEntry {
  const catalogSpec = values.catalogs?.[entry.id];

  return {
    ...entry,
    codes: cloneCodes(values.entries[entry.id] ?? []),
    variants: entry.variants?.map((variant) =>
      catalogSpec ? applyCatalogVariantCodes(variant, catalogSpec) : applyVariantCodes(variant, values),
    ),
  };
}

function applyGroupCodes(group: CheatGroup, values: CheatCodeValues): CheatGroup {
  return {
    ...group,
    cheats: group.cheats?.map((entry) => applyEntryCodes(entry, values)),
    children: group.children?.map((child) => applyGroupCodes(child, values)),
  };
}

export function applyCheatCodeValues(structure: CheatGroup[], values: CheatCodeValues): CheatGroup[] {
  return structure.map((group) => applyGroupCodes(group, values));
}
