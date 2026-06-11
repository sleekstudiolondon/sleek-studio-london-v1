"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type AlderSiteMenuItem = {
  active: boolean;
  href: string;
  label: string;
};

type AlderSiteMenuProps = {
  ariaLabel: string;
  items: AlderSiteMenuItem[];
};

export default function AlderSiteMenu({ ariaLabel, items }: AlderSiteMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const visibleItems = items.filter((item) => !(item.label === "Home" && item.href === pathname));

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="alder-site-menu-button-shell">
        <button
          type="button"
          className={`alder-site-menu-button ${isOpen ? "alder-site-menu-button-open" : ""}`.trim()}
          aria-expanded={isOpen}
          aria-controls="alder-site-menu-overlay"
          aria-label={isOpen ? "Close Studio Alder navigation" : "Open Studio Alder navigation"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="alder-site-menu-overlay"
        className={`alder-site-menu-overlay ${isOpen ? "alder-site-menu-overlay-open" : ""}`.trim()}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      >
        <div className="alder-site-menu-inner">
          <nav
            className="alder-site-menu-nav"
            aria-label={ariaLabel}
            onClick={(event) => event.stopPropagation()}
          >
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`alder-site-menu-link ${item.active ? "alder-site-menu-link-active" : ""}`.trim()}
                aria-current={item.active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
