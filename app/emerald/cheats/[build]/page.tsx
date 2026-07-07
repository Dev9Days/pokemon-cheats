import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { App } from "../../../../src/App";
import { getCheatStructure } from "../../../../src/data";
import { builds } from "../../../../src/data/builds";
import type { CheatBuildId } from "../../../../src/types/cheat";

type VersionPageProps = {
  params: Promise<{
    build: string;
  }>;
};

export const metadata: Metadata = {
  alternates: {
    canonical: "/emerald/cheats",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export function generateStaticParams() {
  return builds.map((build) => ({ build: build.id }));
}

function getBuildId(buildId: string): CheatBuildId | null {
  return builds.some((build) => build.id === buildId) ? (buildId as CheatBuildId) : null;
}

export default async function VersionPage({ params }: VersionPageProps) {
  const { build } = await params;
  const initialBuild = getBuildId(build);
  if (!initialBuild) notFound();

  const initialGroups = await getCheatStructure();
  return <App initialBuild={initialBuild} initialGroups={initialGroups} />;
}
