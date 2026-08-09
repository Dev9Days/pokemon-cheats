import type { Metadata, Viewport } from "next";
import "../src/styles.css";
import { seoDescription, seoTitle, siteUrl } from "../src/seo";
import { earlyBuildNavigationScript } from "../src/utils/earlyBuildNavigationScript";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seoTitle,
  description: seoDescription,
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
    canonical: "/",
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
