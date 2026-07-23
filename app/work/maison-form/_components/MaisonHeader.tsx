"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MaisonImage from "./MaisonImage";
import { menuLinks, primaryNavLinks } from "../_lib/content";
import { MF_BASE, maisonRoutes } from "../_lib/routes";

export default function MaisonHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === MF_BASE;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const focusableItems = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusableItems?.[0]?.focus();
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!menuOpen) return;

      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableItems = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusableItems.length === 0) return;

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstItem || !menuRef.current?.contains(activeElement))) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && (activeElement === lastItem || !menuRef.current?.contains(activeElement))) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const headerClass = [
    "mf-header",
    isHome ? "mf-header--home" : "mf-header--inner",
    scrolled ? "mf-header--scrolled" : "",
    menuOpen ? "mf-header--menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <Link className="mf-wordmark" href={maisonRoutes.home}>
          Maison Form
        </Link>
        <nav className="mf-primary-nav" aria-label="Maison Form primary navigation">
          {primaryNavLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mf-header-actions">
          <Link className="mf-private-link" href={maisonRoutes.contact}>
            Private enquiries
          </Link>
          <button
            ref={triggerRef}
            type="button"
            className="mf-menu-trigger"
            aria-expanded={menuOpen}
            aria-controls="mf-expanded-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="mf-menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
      <div
        ref={menuRef}
        id="mf-expanded-menu"
        className={`mf-menu-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        aria-modal="true"
        role="dialog"
        aria-label="Maison Form navigation"
      >
        <div className="mf-menu-art" aria-hidden="true">
          <MaisonImage asset="maison-library.webp" alt="" sizes="42vw" />
        </div>
        <div className="mf-menu-panel">
          <p className="mf-eyebrow">Explore the studio</p>
          <nav aria-label="Maison Form expanded navigation">
            {menuLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>{item.ordinal}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mf-menu-meta">
            <span>London · Paris</span>
            <Link href={maisonRoutes.contact} onClick={() => setMenuOpen(false)}>
              Begin a conversation ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
