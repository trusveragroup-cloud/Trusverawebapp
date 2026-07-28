import { Metadata } from "next";
import EmailMarketingClient from "./EmailMarketingClient";

export const metadata: Metadata = {
  title: "B2B Email Marketing Services for Technology Companies | TrusVera Group",
  description: "TrusVera Group designs and manages B2B email marketing campaigns that reach verified decision-makers, maintain inbox placement, and convert at every stage of the buyer journey.",
  alternates: { canonical: "https://www.trusveragroup.com/services/email-marketing" },
  openGraph: {
    title: "B2B Email Marketing Services for Technology Companies | TrusVera Group",
    description: "From outreach sequences to nurture programs, TrusVera Group manages the full email marketing engine for B2B technology companies.",
    url: "https://www.trusveragroup.com/services/email-marketing",
    type: "website",
  },
};

export default function EmailMarketingPage() {
  return <EmailMarketingClient />;
}
