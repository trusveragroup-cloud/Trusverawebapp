import { Metadata } from "next";
import WhitepaperClient from "./WhitepaperClient";

export const metadata: Metadata = {
  title: "B2B Whitepaper Promotion and Content Syndication | TrusVera Group",
  description: "TrusVera Group distributes your whitepapers and research reports to verified, intent-matched technology buyers and converts downloads into qualified leads with full contact data.",
  alternates: {
    canonical: "https://www.trusveragroup.com/services/whitepaper-promotion"
  },
  openGraph: {
    title: "B2B Whitepaper Promotion and Content Syndication | TrusVera Group",
    description: "Your whitepaper already exists. TrusVera Group puts it in front of the right buyers, captures verified leads from every download, and delivers a qualified contact list to your sales team.",
    url: "https://www.trusveragroup.com/services/whitepaper-promotion",
    type: "website",
  },
};

export default function WhitepaperPage() {
  return <WhitepaperClient />;
}
