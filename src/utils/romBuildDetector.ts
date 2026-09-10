import SparkMD5 from "spark-md5";
import type { CheatBuild } from "../types/cheat";

export type RomBuildDetectionResult =
  | {
      build: CheatBuild;
      md5: string;
      matched: true;
    }
  | {
      md5: string;
      matched: false;
    };

export async function calculateFileMd5(file: File): Promise<string> {
  const hash = new SparkMD5.ArrayBuffer();
  const chunkSize = 2 * 1024 * 1024;
  try {
    // Yield between chunks so the checking indicator stays responsive.
    for (let offset = 0; offset < file.size; offset += chunkSize) {
      hash.append(await file.slice(offset, offset + chunkSize).arrayBuffer());
    }
    return hash.end().toLowerCase();
  } finally {
    hash.destroy();
  }
}

export async function detectRomBuild(file: File, builds: CheatBuild[]): Promise<RomBuildDetectionResult> {
  const md5 = await calculateFileMd5(file);
  const build = builds.find((item) => item.md5.toLowerCase() === md5);

  return build ? { build, matched: true, md5 } : { matched: false, md5 };
}
