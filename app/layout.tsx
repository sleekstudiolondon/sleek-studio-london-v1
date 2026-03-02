import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
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
      </body>
    </html>
  );
}
