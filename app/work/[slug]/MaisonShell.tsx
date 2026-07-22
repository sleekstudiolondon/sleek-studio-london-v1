"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { maisonNav } from "@/lib/maisonForm";
import "./MaisonRoutes.module.css";

export default function MaisonShell({ current, children }: { current: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <article className="demo-site maison2-site">
      <header className="maison3-nav">
        <Link className="maison3-wordmark" href="/work/maison-form">Maison Form</Link>
        <div className="maison3-current" aria-live="polite"><span>Current</span><strong>{current}</strong></div>
        <div className={open ? "maison3-menu is-open" : "maison3-menu"} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <button type="button" className="maison3-menu-trigger" aria-expanded={open} aria-controls="maison-navigation-menu" onClick={() => setOpen((value) => !value)} onFocus={() => setOpen(true)}><span>Menu</span></button>
          <nav id="maison-navigation-menu" className="maison3-menu-panel" aria-label="Maison Form navigation" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
            {maisonNav.map((item) => <Link key={item.href} href={item.href} aria-current={item.label === current ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
            <Link href="/work" onClick={() => setOpen(false)}>Back to Sleek Studio</Link>
          </nav>
        </div>
      </header>
      <div className="maison4-concept-note"><span>Illustrative concept practice</span><Link href="/work">Concept website by Sleek Studio</Link></div>
      <main>{children}</main>
    </article>
  );
}
