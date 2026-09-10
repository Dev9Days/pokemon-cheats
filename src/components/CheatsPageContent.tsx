import { App } from "../App";
import { getCheatStructure } from "../data";
import { seoDescription, seoTitle, siteUrl } from "../seo";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: seoTitle,
  alternateName: "Pokemon Emerald Cheats",
  url: `${siteUrl}/`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: "ko-KR",
  description: seoDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  featureList: [
    "포켓몬스터 에메랄드 치트",
    "치트명, 비고 검색",
    "치트 코드 복사",
    "ROM MD5 버전 감지",
  ],
};

export async function CheatsPageContent({ showRootIntro = false }: { showRootIntro?: boolean }) {
  const initialGroups = await getCheatStructure();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <App
        initialBuild={showRootIntro ? "kr-20260613" : null}
        initialGroups={initialGroups}
        showRootIntro={showRootIntro}
      />
    </>
  );
}
