import type { CheatCodeValues } from "../../cheatDataBuilder";
import { mergeCheatCodeValues } from "../../cheatDataBuilder";
import { codeValuesKr20240611Required } from "./required";
import { codeValuesKr20240611Items } from "./items";
import { codeValuesKr20240611Pokemon } from "./pokemon";
import { codeValuesKr20240611Teleport } from "./teleport";
import { codeValuesKr20240611Remote } from "./remote";
import { codeValuesKr20240611System } from "./system";

export const cheatCodeValuesKr20240611: CheatCodeValues = mergeCheatCodeValues([
  codeValuesKr20240611Required,
  codeValuesKr20240611Items,
  codeValuesKr20240611Pokemon,
  codeValuesKr20240611Teleport,
  codeValuesKr20240611Remote,
  codeValuesKr20240611System,
]);
