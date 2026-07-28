import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact TrusVera Group | Start a Pipeline Conversation",
  description: "Reach TrusVera Group to discuss intent data, account profiling, BANT qualified leads, lead generation, or email marketing for your B2B technology company. We respond within one business day.",
  alternates: { canonical: "https://www.trusveragroup.com/contact" },
  openGraph: {
    title: "Contact TrusVera Group | Start a Pipeline Conversation",
    description: "Talk to TrusVera Group about building qualified pipeline for your B2B technology company. Offices in Pune, India.",
    url: "https://www.trusveragroup.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
