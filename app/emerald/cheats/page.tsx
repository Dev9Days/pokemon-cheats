import type { Metadata } from "next";
import { LegacyRootRedirect } from "../../../src/components/LegacyRootRedirect";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheatsPage() {
  return <LegacyRootRedirect />;
}
