import type { CheatCodeValues } from "../../cheatDataBuilder";
import { mergeCheatCodeValues } from "../../cheatDataBuilder";
import { codeValuesKr20260613Required } from "./required";
import { codeValuesKr20260613Items } from "./items";
import { codeValuesKr20260613Pokemon } from "./pokemon";
import { codeValuesKr20260613Teleport } from "./teleport";
import { codeValuesKr20260613Remote } from "./remote";
import { codeValuesKr20260613System } from "./system";

export const cheatCodeValuesKr20260613: CheatCodeValues = mergeCheatCodeValues([
  codeValuesKr20260613Required,
  codeValuesKr20260613Items,
  codeValuesKr20260613Pokemon,
  codeValuesKr20260613Teleport,
  codeValuesKr20260613Remote,
  codeValuesKr20260613System,
]);
