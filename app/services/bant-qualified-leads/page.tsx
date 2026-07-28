import { Metadata } from "next";
import BANTClient from "./BANTClient";

export const metadata: Metadata = {
  title: "BANT Qualified Leads for B2B Technology Sales | TrusVera Group",
  description: "Stop chasing unqualified pipeline. TrusVera Group delivers BANT-verified leads with confirmed Budget, Authority, Need, and Timeline so your sales team closes faster.",
  alternates: { canonical: "https://www.trusveragroup.com/services/bant-qualified-leads" },
  openGraph: {
    title: "BANT Qualified Leads for B2B Technology Sales | TrusVera Group",
    description: "Every lead TrusVera Group delivers is pre-verified across all four BANT criteria. No cold lists. No guesswork. Only decision-makers with active budget and confirmed need.",
    url: "https://www.trusveragroup.com/services/bant-qualified-leads",
    type: "website",
  },
};

export default function BANTPage() {
  return <BANTClient />;
}
