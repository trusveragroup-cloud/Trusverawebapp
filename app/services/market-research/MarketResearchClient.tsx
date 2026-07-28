"use client";

import NavBar from "@/components/sections/NavBar";
import MarketResearchHero from "@/components/sections/MarketResearchHero";
import TheSixQuestions from "@/components/sections/TheSixQuestions";
import ResearchDeliverablesSection from "@/components/sections/ResearchDeliverablesSection";
import HowResearchConnects from "@/components/sections/HowResearchConnects";
import WhoThisIsFor from "@/components/sections/WhoThisIsFor";
import ResearchProcess from "@/components/sections/ResearchProcess";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "B2B Market Research",
  provider: { "@type": "Organization", name: "TrusVera Group" },
  name: "B2B Market Research Services for Technology Companies",
  description:
    "TAM sizing, ICP development, competitive landscape mapping, buyer persona research, technology adoption research, and win/loss analysis for B2B technology companies.",
  url: "https://www.trusveragroup.com/services/market-research",
};

export default function MarketResearchClient() {
  return (
    <div
      className="mr-page"
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        color: C.textDark,
        background: C.cream100,
        overflowX: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />
      <NavBar />
      <MarketResearchHero />
      <TheSixQuestions />
      <ResearchDeliverablesSection />
      <HowResearchConnects />
      <WhoThisIsFor />
      <ResearchProcess />
      <ContactFormSection defaultService="Market Research" />
      <FooterSection />
    </div>
  );
}
