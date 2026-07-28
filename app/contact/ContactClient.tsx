"use client";

import NavBar from "@/components/sections/NavBar";
import ContactHeroSection from "@/components/sections/ContactHeroSection";
import WhatHappensNext from "@/components/sections/WhatHappensNext";
import OtherWaysToReach from "@/components/sections/OtherWaysToReach";
import OfficeLocations from "@/components/sections/OfficeLocations";
import ContactFAQ from "@/components/sections/ContactFAQ";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

export default function ContactClient() {
  return (
    <div
      className="ct-page"
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        color: C.textDark,
        background: C.cream100,
        overflowX: "hidden",
      }}
    >
      <NavBar />
      <ContactHeroSection />
      <WhatHappensNext />
      <OtherWaysToReach />
      <OfficeLocations />
      <ContactFAQ />
      <FooterSection />
    </div>
  );
}
