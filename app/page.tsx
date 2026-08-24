import type { Metadata } from "next";
import { CheatsPageContent } from "../src/components/CheatsPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <CheatsPageContent showRootIntro />;
}
