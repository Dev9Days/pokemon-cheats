import { App } from "../../../src/App";
import { getCheatStructure } from "../../../src/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "포켓몬스터 에메랄드 치트",
  alternateName: "Pokemon Emerald Cheats",
  url: "https://pokemon.9days.dev/emerald/cheats",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: "ko-KR",
  description:
    "포켓몬스터 에메랄드 치트 모음입니다. 영문판과 한글패치, 한글판 버전에 맞는 치트키를 검색하고 복사할 수 있습니다.",
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

export default async function CheatsPage() {
  const initialGroups = await getCheatStructure();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <App initialGroups={initialGroups} />
    </>
  );
}
