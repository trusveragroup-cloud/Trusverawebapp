import { Metadata } from "next";
import LeadGenerationClient from "./LeadGenerationClient";

export const metadata: Metadata = {
  title: "B2B Lead Generation Services for Technology Companies | TrusVera Group",
  description: "TrusVera Group runs multi-channel B2B lead generation programs that deliver verified, sales-ready contacts across email, LinkedIn, phone, and content syndication.",
  alternates: { canonical: "https://www.trusveragroup.com/services/lead-generation" },
  openGraph: {
    title: "B2B Lead Generation Services for Technology Companies | TrusVera Group",
    description: "Stop building lists. Start building pipeline. TrusVera Group's multi-channel lead generation programs put verified, in-market contacts directly into your sales team's hands.",
    url: "https://www.trusveragroup.com/services/lead-generation",
    type: "website",
  },
};

export default function LeadGenerationPage() {
  return <LeadGenerationClient />;
}
