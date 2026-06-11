import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="site-background" aria-hidden="true">
        <div className="site-background-wash" />
        <div className="site-background-wash site-background-wash-alt" />
        <div className="site-background-noise" />
      </div>
      <div className="site-shell">
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
