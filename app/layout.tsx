import type { Metadata, Viewport } from "next";
import "../src/styles.css";
import { earlyBuildNavigationScript } from "../src/utils/earlyBuildNavigationScript";

const siteUrl = "https://pokemon.9days.dev";
const title = "포켓몬스터 에메랄드 치트";
const description =
  "포켓몬스터 에메랄드 치트 모음입니다. 영문판과 한글패치, 한글판 버전에 맞는 치트키를 검색하고 복사할 수 있습니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "에메랄드 치트",
    "에메랄드 치트키",
    "에메랄드 치트 코드",
    "에메랄드 한글판 치트",
    "에메랄드 한글판 치트키",
    "에메랄드 한글판 치트 코드",
    "에메랄드 한글패치 치트",
    "에메랄드 한글패치 치트키",
    "에메랄드 한글패치 치트 코드",
    "포켓몬 에메랄드 치트",
    "포켓몬 에메랄드 치트키",
    "포켓몬 에메랄드 치트 코드",
    "포켓몬 에메랄드 한글판 치트",
    "포켓몬 에메랄드 한글판 치트키",
    "포켓몬 에메랄드 한글판 치트 코드",
    "포켓몬 에메랄드 한글패치 치트",
    "포켓몬 에메랄드 한글패치 치트키",
    "포켓몬 에메랄드 한글패치 치트 코드",
    "포켓몬스터 에메랄드 치트",
    "포켓몬스터 에메랄드 치트키",
    "포켓몬스터 에메랄드 치트 코드",
    "포켓몬스터 에메랄드 한글판 치트",
    "포켓몬스터 에메랄드 한글판 치트키",
    "포켓몬스터 에메랄드 한글판 치트 코드",
    "포켓몬스터 에메랄드 한글패치 치트",
    "포켓몬스터 에메랄드 한글패치 치트키",
    "포켓몬스터 에메랄드 한글패치 치트 코드",
    "Pokemon Emerald cheats",
  ],
  authors: [{ name: "Dev9Days" }],
  alternates: {
    canonical: "/emerald/cheats",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "포켓몬스터 에메랄드 치트",
    title,
    description,
    url: "/emerald/cheats",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1f7a4d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <script dangerouslySetInnerHTML={{ __html: earlyBuildNavigationScript }} />
        {children}
      </body>
    </html>
  );
}
