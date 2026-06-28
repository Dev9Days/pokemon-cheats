import type { CheatGroup } from "../types/cheat";
import { itemsGroup } from "./structure/items";
import { pokemonGroup } from "./structure/pokemon";
import { remoteGroup } from "./structure/remote";
import { requiredGroup } from "./structure/required";
import { systemGroup } from "./structure/system";
import { teleportGroup } from "./structure/teleport";

export const cheatStructure: CheatGroup[] = [
  requiredGroup,
  itemsGroup,
  pokemonGroup,
  teleportGroup,
  remoteGroup,
  systemGroup,
];
