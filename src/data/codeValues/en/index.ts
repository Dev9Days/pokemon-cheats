import type { CheatCodeValues } from "../../cheatDataBuilder";
import { mergeCheatCodeValues } from "../../cheatDataBuilder";
import { codeValuesEnRequired } from "./required";
import { codeValuesEnItems } from "./items";
import { codeValuesEnPokemon } from "./pokemon";
import { codeValuesEnTeleport } from "./teleport";
import { codeValuesEnRemote } from "./remote";
import { codeValuesEnSystem } from "./system";

export const cheatCodeValuesEn: CheatCodeValues = mergeCheatCodeValues([
  codeValuesEnRequired,
  codeValuesEnItems,
  codeValuesEnPokemon,
  codeValuesEnTeleport,
  codeValuesEnRemote,
  codeValuesEnSystem,
]);
