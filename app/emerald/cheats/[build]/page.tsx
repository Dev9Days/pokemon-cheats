import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { App } from "../../../../src/App";
import { getCheatStructure } from "../../../../src/data";
import { builds } from "../../../../src/data/builds";
import { seoDescription, seoTitle } from "../../../../src/seo";
import type { CheatBuildId } from "../../../../src/types/cheat";

type VersionPageProps = {
  params: Promise<{
    build: string;
  }>;
};

const fallbackMetadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export async function generateMetadata({ params }: VersionPageProps): Promise<Metadata> {
  const { build } = await params;
  const selectedBuild = builds.find((item) => item.id === build);

  if (!selectedBuild) {
    return fallbackMetadata;
  }

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: seoTitle,
      title: seoTitle,
      description: seoDescription,
      url: "/",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: seoTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: false,
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
