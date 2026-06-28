import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);

require.extensions[".ts"] = function loadTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  module._compile(output, filename);
};

const { builds } = require("../src/data/builds.ts");
const { getCheatsForBuild } = require("../src/data/index.ts");

function flattenGroups(groups) {
  const groupIds = [];
  const entries = [];
  const variants = [];

  function walkGroup(group) {
    groupIds.push(group.id);

    for (const entry of group.cheats ?? []) {
      entries.push(entry);

      for (const variant of entry.variants ?? []) {
        variants.push({ ...variant, entryId: entry.id });
      }
    }

    for (const child of group.children ?? []) {
      walkGroup(child);
    }
  }

  for (const group of groups) {
    walkGroup(group);
  }

  return { entries, groupIds, variants };
}

function getDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

let hasError = false;
const countBaseline = new Map();

for (const build of builds) {
  const groups = getCheatsForBuild(build.id);

  if (build.id === "kr-20260613" && groups.length === 0) {
    console.log(`${build.id}: skipped, no cheat data yet`);
    continue;
  }

  const { entries, groupIds, variants } = flattenGroups(groups);
  const emptyEntries = entries.filter((entry) => !entry.variants && entry.codes.length === 0);
  const emptyVariants = variants.filter((variant) => variant.codes.length === 0);
  const duplicateGroups = getDuplicates(groupIds);
  const duplicateEntries = getDuplicates(entries.map((entry) => entry.id));
  const duplicateVariants = getDuplicates(variants.map((variant) => variant.id));
  const countKey = `${entries.length}:${variants.length}`;

  countBaseline.set(countKey, (countBaseline.get(countKey) ?? []).concat(build.id));

  console.log(
    `${build.id}: groups ${groupIds.length}, entries ${entries.length}, variants ${variants.length}, empty entries ${emptyEntries.length}, empty variants ${emptyVariants.length}`,
  );

  if (
    emptyEntries.length > 0 ||
    emptyVariants.length > 0 ||
    duplicateGroups.length > 0 ||
    duplicateEntries.length > 0 ||
    duplicateVariants.length > 0
  ) {
    hasError = true;
    console.error(`${build.id}: data validation failed`);
    if (emptyEntries[0]) console.error(`  first empty entry: ${emptyEntries[0].id}`);
    if (emptyVariants[0]) console.error(`  first empty variant: ${emptyVariants[0].entryId} -> ${emptyVariants[0].id}`);
    if (duplicateGroups[0]) console.error(`  duplicate group id: ${duplicateGroups[0]}`);
    if (duplicateEntries[0]) console.error(`  duplicate entry id: ${duplicateEntries[0]}`);
    if (duplicateVariants[0]) console.error(`  duplicate variant id: ${duplicateVariants[0]}`);
  }
}

if (countBaseline.size > 1) {
  hasError = true;
  console.error("Builds with cheat data have different entry/variant counts:");
  for (const [countKey, buildIds] of countBaseline) {
    console.error(`  ${countKey}: ${buildIds.join(", ")}`);
  }
}

if (hasError) {
  process.exitCode = 1;
}
