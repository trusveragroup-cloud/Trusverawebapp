import { Metadata } from "next";
import AccountProfilingClient from "./AccountProfilingClient";

export const metadata: Metadata = {
  title: "B2B Account Profiling Services | TrusVera Group",
  description: "Build deep intelligence on every target account before your first outreach. TrusVera Group delivers firmographic, technographic, and buying-committee profiles across 150M+ technology buyer records.",
  alternates: { canonical: "https://www.trusveragroup.com/services/account-profiling" },
  openGraph: {
    title: "B2B Account Profiling Services | TrusVera Group",
    description: "Know your target accounts inside out. Firmographic data, technographic signals, decision-maker mapping, and budget cycle intelligence in one profile.",
    url: "https://www.trusveragroup.com/services/account-profiling",
    type: "website",
  },
};

export default function AccountProfilingPage() {
  return <AccountProfilingClient />;
}
