"use client";

import NavBar from "@/components/sections/NavBar";
import IntentDataHero from "@/components/sections/IntentDataHero";
import WhatIsIntentData from "@/components/sections/WhatIsIntentData";
import SignalsWeTrack from "@/components/sections/SignalsWeTrack";
import FirstPartyVsThirdParty from "@/components/sections/FirstPartyVsThirdParty";
import TheIntentEngine from "@/components/sections/TheIntentEngine";
import WhyItMattersForB2B from "@/components/sections/WhyItMattersForB2B";
import HowItConnects from "@/components/sections/HowItConnects";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";

export default function IntentDataClient() {
  return (
    <>
      <NavBar />
      <IntentDataHero />
      <WhatIsIntentData />
      <SignalsWeTrack />
      <FirstPartyVsThirdParty />
      <TheIntentEngine />
      <WhyItMattersForB2B />
      <HowItConnects />
      <ContactFormSection defaultService="Intent Data" />
      <FooterSection />
    </>
  );
}
