"use client";
import NavBar from "@/components/sections/NavBar";
import EmailHero from "@/components/sections/EmailHero";
import WhatIsEmailMarketing from "@/components/sections/WhatIsEmailMarketing";
import EmailCampaignAnatomy from "@/components/sections/EmailCampaignAnatomy";
import EmailSequenceTypes from "@/components/sections/EmailSequenceTypes";
import EmailDeliverability from "@/components/sections/EmailDeliverability";
import EmailStatsBillboard from "@/components/sections/EmailStatsBillboard";
import EmailConnects from "@/components/sections/EmailConnects";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "B2B Email Marketing",
  provider: { "@type": "Organization", name: "TrusVera Group" },
  name: "B2B Email Marketing Services for Technology Companies",
  description:
    "Full-service B2B email marketing: outreach sequences, nurture programs, re-engagement campaigns, deliverability management, and performance reporting.",
  url: "https://www.trusveragroup.com/services/email-marketing",
};

export default function EmailMarketingClient() {
  return (
    <div
      className="em-page"
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
      <EmailHero />
      <WhatIsEmailMarketing />
      <EmailCampaignAnatomy />
      <EmailSequenceTypes />
      <EmailDeliverability />
      <EmailStatsBillboard />
      <EmailConnects />
      <ContactFormSection defaultService="Email Marketing" />
      <FooterSection />
    </div>
  );
}
