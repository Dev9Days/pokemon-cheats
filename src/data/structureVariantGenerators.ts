import type { CheatVariant } from "../types/cheat";
import { itemCatalog, moveCatalog, natureCatalog, pokemonSpeciesCatalog, teleportLocationCatalog } from "./catalogs";

export function createItemStructureVariants(prefix: string): CheatVariant[] {
  return itemCatalog.map((item) => ({
    id: `${prefix}.${item.id}`,
    title: item.title,
    subtitle: item.label,
    codes: [],
  }));
}

export function createStarterPokemonStructureVariants(slot: string): CheatVariant[] {
  return pokemonSpeciesCatalog.map((pokemon) => ({
    id: `starter-change.${slot}.${pokemon.slug}`,
    title: pokemon.title,
    subtitle: pokemon.label,
    codes: [],
  }));
}

export function createWildPokemonStructureVariants(): CheatVariant[] {
  return pokemonSpeciesCatalog.map((pokemon) => ({
    id: `wild-species.${pokemon.id}`,
    title: pokemon.title,
    subtitle: pokemon.label,
    codes: [],
  }));
}

export function createTeleportStructureVariants(): CheatVariant[] {
  return teleportLocationCatalog.map((location) => ({
    id: `teleport.${location.id}`,
    title: location.title,
    subtitle: location.label,
    codes: [],
  }));
}

export function createMoveStructureVariants(): CheatVariant[] {
  return moveCatalog.map((move) => ({
    id: `move.${move.id}`,
    title: move.title,
    subtitle: move.label,
    codes: [],
  }));
}

export function createNatureStructureVariants(): CheatVariant[] {
  return natureCatalog.map((nature) => ({
    id: `nature.${nature.id}`,
    title: nature.title,
    codes: [],
  }));
}
