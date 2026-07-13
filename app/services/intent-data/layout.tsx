import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Intent Data Services | TrusVera Group",
  description:
    "Identify in-market technology buyers before your competitors do. TrusVera Group tracks real buying signals across 150M+ technology buyer profiles to fuel qualified pipeline.",
  alternates: { canonical: "https://www.trusveragroup.com/services/intent-data" },
  openGraph: {
    title: "B2B Intent Data Services | TrusVera Group",
    description:
      "Track real buying signals across 150M+ technology buyer profiles and identify accounts that are actively in-market.",
    url: "https://www.trusveragroup.com/services/intent-data",
    type: "website",
  },
};

export default function IntentDataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
