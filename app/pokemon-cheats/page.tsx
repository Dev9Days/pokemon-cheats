import type { Metadata } from "next";
import { CheatsPageContent } from "../../src/components/CheatsPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PokemonCheatsAliasPage() {
  return <CheatsPageContent />;
}
