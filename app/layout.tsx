import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-source",
  weight: ["400", "500", "600"],
  display: "swap",
});

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading-source",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sleek Studio London",
  description: "Premium website design and development studio.",
  verification: {
    google: "QGk-WIOLZ7tiTMzGYGP3_Rpqg0H5OW-dB_A71aYnkEk",
  },
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
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
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
      </body>
    </html>
  );
}
