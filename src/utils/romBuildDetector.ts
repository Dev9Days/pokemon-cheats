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
  return SparkMD5.ArrayBuffer.hash(await file.arrayBuffer()).toLowerCase();
}

export async function detectRomBuild(file: File, builds: CheatBuild[]): Promise<RomBuildDetectionResult> {
  const md5 = await calculateFileMd5(file);
  const build = builds.find((item) => item.md5.toLowerCase() === md5);

  return build ? { build, matched: true, md5 } : { matched: false, md5 };
}
