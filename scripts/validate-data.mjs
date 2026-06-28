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
const { cheatStructure } = require("../src/data/cheatStructure.ts");
const { getCheatsForBuild } = require("../src/data/index.ts");
const { cheatCodeValuesEn } = require("../src/data/codeValues/en/index.ts");
const { cheatCodeValuesKr20240611 } = require("../src/data/codeValues/kr-20240611/index.ts");
const { cheatCodeValuesKr20240611Modern } = require("../src/data/codeValues/kr-20240611-modern/index.ts");
const { cheatCodeValuesKr20260613 } = require("../src/data/codeValues/kr-20260613/index.ts");

const codeValuesByBuild = {
  en: cheatCodeValuesEn,
  "kr-20240611": cheatCodeValuesKr20240611,
  "kr-20240611-modern": cheatCodeValuesKr20240611Modern,
  "kr-20260613": cheatCodeValuesKr20260613,
};

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

function getRequiredCodeValueKeys(groups) {
  const entries = [];
  const variants = [];
  const catalogs = [];

  function walkGroup(group) {
    for (const entry of group.cheats ?? []) {
      if (entry.variants) {
        if (entry.variants.length > 0) {
          variants.push(...entry.variants.map((variant) => ({ entryId: entry.id, variantId: variant.id })));
          catalogs.push(entry.id);
        }
      } else {
        entries.push(entry.id);
      }
    }

    for (const child of group.children ?? []) {
      walkGroup(child);
    }
  }

  for (const group of groups) {
    walkGroup(group);
  }

  return { catalogs, entries, variants };
}

function getMissingCodeValues(requiredKeys, values) {
  const catalogIds = new Set(Object.keys(values.catalogs ?? {}));
  const entries = requiredKeys.entries.filter((entryId) => !values.entries[entryId]);
  const catalogEntries = requiredKeys.catalogs.filter((entryId) => catalogIds.has(entryId));
  const catalogEntryIds = new Set(catalogEntries);
  const variants = requiredKeys.variants.filter(
    ({ entryId, variantId }) => !catalogEntryIds.has(entryId) && !values.variants[variantId],
  );
  const catalogs = requiredKeys.catalogs.filter((entryId) => {
    const entryVariants = requiredKeys.variants.filter((variant) => variant.entryId === entryId);
    const hasExplicitVariants = entryVariants.every((variant) => values.variants[variant.variantId]);
    return !catalogIds.has(entryId) && !hasExplicitVariants;
  });

  return { catalogs, entries, variants };
}

let hasError = false;
const countBaseline = new Map();
const requiredCodeValueKeys = getRequiredCodeValueKeys(cheatStructure);

for (const build of builds) {
  const groups = getCheatsForBuild(build.id);
  const codeValues = codeValuesByBuild[build.id];
  const missingCodeValues = codeValues ? getMissingCodeValues(requiredCodeValueKeys, codeValues) : null;

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
    duplicateVariants.length > 0 ||
    !missingCodeValues ||
    missingCodeValues.entries.length > 0 ||
    missingCodeValues.variants.length > 0 ||
    missingCodeValues.catalogs.length > 0
  ) {
    hasError = true;
    console.error(`${build.id}: data validation failed`);
    if (emptyEntries[0]) console.error(`  first empty entry: ${emptyEntries[0].id}`);
    if (emptyVariants[0]) console.error(`  first empty variant: ${emptyVariants[0].entryId} -> ${emptyVariants[0].id}`);
    if (duplicateGroups[0]) console.error(`  duplicate group id: ${duplicateGroups[0]}`);
    if (duplicateEntries[0]) console.error(`  duplicate entry id: ${duplicateEntries[0]}`);
    if (duplicateVariants[0]) console.error(`  duplicate variant id: ${duplicateVariants[0]}`);
    if (!missingCodeValues) {
      console.error(`  missing code values for build: ${build.id}`);
    } else {
      if (missingCodeValues.entries[0]) console.error(`  missing entry code value: ${missingCodeValues.entries[0]}`);
      if (missingCodeValues.variants[0]) {
        console.error(
          `  missing variant code value: ${missingCodeValues.variants[0].entryId} -> ${missingCodeValues.variants[0].variantId}`,
        );
      }
      if (missingCodeValues.catalogs[0]) console.error(`  missing catalog or variant values: ${missingCodeValues.catalogs[0]}`);
    }
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
