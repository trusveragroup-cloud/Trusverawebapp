import type { Metadata } from "next";
import { DM_Serif_Display, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TrusVera Group | B2B Intent Data, BANT Leads and Account Profiling",
  description:
    "TrusVera Group helps B2B technology companies reach verified in-market buyers with intent data, BANT-qualified leads, account profiling, and whitepaper promotion. Build enterprise sales pipeline faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${playfair.variable} ${inter.variable}`}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>{children}</body>
    </html>
  );
}
