import { Metadata } from "next";
import MarketResearchClient from "./MarketResearchClient";

export const metadata: Metadata = {
  title: "B2B Market Research Services for Technology Companies | TrusVera Group",
  description: "TrusVera Group delivers market research that goes beyond reports. TAM sizing, ICP development, competitive mapping, and buyer persona research that feeds directly into pipeline execution.",
  alternates: { canonical: "https://www.trusveragroup.com/services/market-research" },
  openGraph: {
    title: "B2B Market Research Services for Technology Companies | TrusVera Group",
    description: "Market intelligence that does not end with a slide deck. TrusVera Group research feeds directly into intent data, lead generation, and account profiling execution.",
    url: "https://www.trusveragroup.com/services/market-research",
    type: "website",
  },
};

export default function MarketResearchPage() {
  return <MarketResearchClient />;
}
