import type { CheatCodeValues } from "../../cheatDataBuilder";
import { mergeCheatCodeValues } from "../../cheatDataBuilder";
import { codeValuesKr20240611ModernRequired } from "./required";
import { codeValuesKr20240611ModernItems } from "./items";
import { codeValuesKr20240611ModernPokemon } from "./pokemon";
import { codeValuesKr20240611ModernTeleport } from "./teleport";
import { codeValuesKr20240611ModernRemote } from "./remote";
import { codeValuesKr20240611ModernSystem } from "./system";

export const cheatCodeValuesKr20240611Modern: CheatCodeValues = mergeCheatCodeValues([
  codeValuesKr20240611ModernRequired,
  codeValuesKr20240611ModernItems,
  codeValuesKr20240611ModernPokemon,
  codeValuesKr20240611ModernTeleport,
  codeValuesKr20240611ModernRemote,
  codeValuesKr20240611ModernSystem,
]);
