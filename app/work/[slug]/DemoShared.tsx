"use client";

import { useEffect, useMemo, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";

export type DemoTab = CaseStudy["nav"][number] & { key: string };

export function tabKeyFromHref(href: string) {
  return href.replace(/^#/, "") || "home";
}

export function useDemoNavigation(site: CaseStudy) {
  const tabs = useMemo(
    () => site.nav.map((item) => ({ ...item, key: tabKeyFromHref(item.href) })),
    [site.nav],
  );
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (tabs.some((tab) => tab.key === hash)) setActiveTab(hash);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [tabs]);

  const selectTab = (key: string) => {
    setActiveTab(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  return { tabs, activeTab, selectTab };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
