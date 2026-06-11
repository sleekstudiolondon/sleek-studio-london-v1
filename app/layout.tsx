import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Sleek Studio London | Luxury Web Design for Interior Designers",
  description: "Sleek Studio London designs refined, conversion-focused websites for interior designers and premium interiors studios with high-touch delivery and ongoing refinement.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sleek Studio London",
  url: "https://sleekstudiolondon.com",
  logo: "https://sleekstudiolondon.com/logo.png",
  sameAs: [
    "https://instagram.com/sleekstudiolondon",
    "https://tiktok.com/@sleekstudiolondon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <div className="site-background" aria-hidden="true">
          <div className="site-background-wash" />
          <div className="site-background-wash site-background-wash-alt" />
          <div className="site-background-noise" />
        </div>
        <div className="site-shell">
          <Navbar />
          <main className="site-main">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        {/* Speed Insights only collects data in production, not localhost */}
        <SpeedInsights />
      </body>
    </html>
  );
}
