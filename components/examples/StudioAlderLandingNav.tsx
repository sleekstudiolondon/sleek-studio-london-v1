"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type StudioAlderLandingNavItem = {
  active: boolean;
  href: string;
  label: string;
};

type StudioAlderLandingNavProps = {
  ariaLabel: string;
  items: StudioAlderLandingNavItem[];
  title: string;
};

export default function StudioAlderLandingNav({ ariaLabel, items, title }: StudioAlderLandingNavProps) {
  const pathname = usePathname();
  const frameRef = useRef<number | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [navPhase, setNavPhase] = useState<"closed" | "open" | "closing">("closed");
  const isOpen = navPhase === "open";
  const isVisible = navPhase !== "closed";
  const visibleItems = items.filter((item) => !(item.label === "Home" && item.href === pathname));

  const cancelCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openNav = () => {
    cancelCloseTimer();
    setNavPhase("open");
  };

  const closeNav = () => {
    cancelCloseTimer();
    setNavPhase("closing");
    closeTimerRef.current = window.setTimeout(() => {
      setNavPhase("closed");
      closeTimerRef.current = null;
    }, 420);
  };

  const applyProximity = (clientX: number, clientY: number) => {
    linkRefs.current.forEach((link) => {
      if (!link) {
        return;
      }

      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(clientX - centerX, (clientY - centerY) * 1.15);
      const proximity = Math.max(0, 1 - distance / 170);

      link.style.setProperty("--alder-proximity", proximity.toFixed(3));
    });
  };

  const resetProximity = () => {
    linkRefs.current.forEach((link) => {
      link?.style.setProperty("--alder-proximity", "0");
    });
  };

  useEffect(() => {
    return () => {
      cancelCloseTimer();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`alder-landing-stack ${isVisible ? "alder-landing-stack-open" : ""} ${navPhase === "closing" ? "alder-landing-stack-closing" : ""}`.trim()}
      tabIndex={0}
      aria-label="Reveal Studio Alder navigation"
      onPointerEnter={() => {
        openNav();
      }}
      onPointerLeave={() => {
        closeNav();
        resetProximity();
      }}
      onFocusCapture={() => {
        openNav();
      }}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;

        if (nextTarget instanceof Node && containerRef.current?.contains(nextTarget)) {
          return;
        }

        closeNav();
        resetProximity();
      }}
    >
      <div className="alder-landing-column">
        <div className="alder-landing-title-wrap">
          <h1 className="alder-landing-title">{title}</h1>
        </div>

        <nav
          className="alder-landing-nav"
          aria-label={ariaLabel}
          onPointerMove={(event) => {
            if (!isOpen) {
              return;
            }

            if (frameRef.current !== null) {
              cancelAnimationFrame(frameRef.current);
            }

            const { clientX, clientY } = event;

            frameRef.current = requestAnimationFrame(() => {
              frameRef.current = null;
              applyProximity(clientX, clientY);
            });
          }}
          onPointerLeave={() => {
            if (frameRef.current !== null) {
              cancelAnimationFrame(frameRef.current);
              frameRef.current = null;
            }

            resetProximity();
          }}
        >
          {visibleItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
              className={`alder-landing-link ${item.active ? "alder-landing-link-active" : ""}`.trim()}
              aria-current={item.active ? "page" : undefined}
              style={
                {
                  ["--alder-link-delay" as keyof CSSProperties]: `${140 + index * 92}ms`,
                  ["--alder-link-exit-delay" as keyof CSSProperties]: `${(visibleItems.length - 1 - index) * 42}ms`,
                } as CSSProperties
              }
            >
              <span className="alder-landing-link-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
