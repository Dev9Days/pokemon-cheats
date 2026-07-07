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

const fallbackMetadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateMetadata({ params }: VersionPageProps): Promise<Metadata> {
  const { build } = await params;
  const selectedBuild = builds.find((item) => item.id === build);

  if (!selectedBuild) {
    return fallbackMetadata;
  }

  const title = `${selectedBuild.label} 포켓몬스터 에메랄드 치트`;
  const description = `${selectedBuild.label} 포켓몬스터 에메랄드 치트 모음입니다. 해당 버전에 맞는 치트키와 치트 코드를 검색하고 복사할 수 있습니다.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/emerald/cheats/${selectedBuild.id}`,
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: "포켓몬스터 에메랄드 치트",
      title,
      description,
      url: `/emerald/cheats/${selectedBuild.id}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "포켓몬스터 에메랄드 치트",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
