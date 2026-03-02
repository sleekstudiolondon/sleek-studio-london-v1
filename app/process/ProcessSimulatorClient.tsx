'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../../components/Reveal";
import Button from "../../components/ui/Button";
import { PACKAGE_MAP, type PackageId, formatGBP } from "../../lib/pricing";

type WebsiteType = "Portfolio" | "Studio" | "Ecommerce" | "Multi-location";
type YesNo = "yes" | "no";
type Urgency = "ASAP" | "Within 2 weeks" | "This month" | "Not sure";
type AddOn = "Blog" | "Booking" | "Multi-language";

type SimulatorValues = {
  studioName: string;
  budget: string;
  websiteType: WebsiteType | "";
  pages: number;
  addOns: AddOn[];
  brandReady: YesNo | "";
  copyReady: YesNo | "";
  urgency: Urgency | "";
};

type SimulatorErrors = Partial<Record<keyof SimulatorValues, string>>;

type ResultPhase = {
  title: string;
  startDay: number;
  endDay: number;
  dayRange: string;
  dateRange: string;
};

type SimulationResult = {
  packageId: PackageId;
  totalDays: number;
  launchDate: string;
  startDate: string;
  reasons: string[];
  budgetAlignmentNote: string;
  priorityNote: string;
  phases: ResultPhase[];
};

type TransitionDirection = "next" | "prev";
type TransitionPhase = "idle" | "out" | "in";

const STEP_CONTENT = [
  {
    label: "Brief",
    title: "What are we building for your studio?",
    support:
      "Set your baseline scope and investment so the recommendation can align package fit with delivery confidence.",
  },
  {
    label: "Scope",
    title: "How large does the site need to be?",
    support: "Define page count and launch-critical enhancements to shape complexity and production depth.",
  },
  {
    label: "Readiness",
    title: "How ready are your assets and content?",
    support: "Tell us what is prepared now so we can balance speed, support, and schedule realism.",
  },
  {
    label: "Recommendation",
    title: "Here's your delivery track.",
    support: "Review package fit, timeline, and phase plan generated from your answers.",
  },
] as const;

const WEBSITE_TYPE_OPTIONS: Array<{ value: WebsiteType; title: string; detail: string }> = [
  {
    value: "Portfolio",
    title: "Portfolio",
    detail: "A focused showcase for projects, capabilities, and enquiries.",
  },
  {
    value: "Studio",
    title: "Studio",
    detail: "A broader brand presence with service narratives and layered content.",
  },
  {
    value: "Ecommerce",
    title: "Ecommerce",
    detail: "A conversion-led build with catalogue and checkout flow complexity.",
  },
  {
    value: "Multi-location",
    title: "Multi-location",
    detail: "A structured platform for multiple sites, services, and local paths.",
  },
];

const URGENCY_OPTIONS: Urgency[] = ["ASAP", "Within 2 weeks", "This month", "Not sure"];
const PAGE_TURN_HALF_MS = 280;
const REDUCED_FADE_MS = 120;
const ADD_ONS: AddOn[] = ["Blog", "Booking", "Multi-language"];

const INITIAL_VALUES: SimulatorValues = {
  studioName: "",
  budget: "",
  websiteType: "",
  pages: 8,
  addOns: [],
  brandReady: "",
  copyReady: "",
  urgency: "",
};

function toStartOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const PACKAGE_ORDER: PackageId[] = ["entry", "mid", "top"];
const ADD_ON_COMPLEXITY: Record<AddOn, number> = {
  Blog: 1,
  Booking: 1,
  "Multi-language": 2,
};

type RecommendationSelection = {
  packageId: PackageId;
  complexityScore: number;
  budgetAlignmentNote: string;
};

function getWebsiteTypeScore(websiteType: SimulatorValues["websiteType"]) {
  if (websiteType === "Studio") return 1;
  if (websiteType === "Ecommerce" || websiteType === "Multi-location") return 3;
  return 0;
}

function getPagesScore(pages: number) {
  if (pages >= 31) return 3;
  if (pages >= 21) return 2;
  if (pages >= 11) return 1;
  return 0;
}

function getAddOnScore(addOns: AddOn[]) {
  return addOns.reduce((total, addOn) => total + ADD_ON_COMPLEXITY[addOn], 0);
}

function getComplexityScore(values: SimulatorValues) {
  let score = 0;
  score += getWebsiteTypeScore(values.websiteType);
  score += getPagesScore(values.pages);

  if (values.brandReady === "no") score += 1;
  if (values.copyReady === "no") score += 1;

  score += getAddOnScore(values.addOns);
  return score;
}

function mapComplexityToTier(score: number): PackageId {
  if (score >= 6) return "top";
  if (score >= 3) return "mid";
  return "entry";
}

function applyBudgetSanityCheck(initialTier: PackageId, budget: number) {
  let tierIndex = PACKAGE_ORDER.indexOf(initialTier);

  while (tierIndex > 0 && PACKAGE_MAP[PACKAGE_ORDER[tierIndex]].minBudget > budget) {
    tierIndex -= 1;
  }

  const packageId = PACKAGE_ORDER[tierIndex];
  const budgetAlignmentNote =
    PACKAGE_MAP[packageId].minBudget > budget
      ? "Based on your budget, we'd propose a streamlined scope to stay aligned."
      : "";

  return { packageId, budgetAlignmentNote };
}

/*
Deterministic recommendation checks:
1) Portfolio, 8 pages, brand/copy ready, no add-ons, budget 12000 => entry.
2) Studio, 18 pages, brand not ready, copy ready, Blog, budget 20000 => mid.
3) Ecommerce, 32 pages, brand/copy not ready, Booking + Multi-language, budget 45000 => top.
4) Same as #3 with budget 12000 => entry + streamlined scope note.
*/
function getRecommendation(values: SimulatorValues): RecommendationSelection {
  const complexityScore = getComplexityScore(values);
  const mappedTier = mapComplexityToTier(complexityScore);
  const budget = Number(values.budget);
  const safeBudget = Number.isFinite(budget) ? budget : 0;
  const { packageId, budgetAlignmentNote } = applyBudgetSanityCheck(mappedTier, safeBudget);

  return {
    packageId,
    complexityScore,
    budgetAlignmentNote,
  };
}

function getTimelineDays(values: SimulatorValues, packageId: PackageId) {
  const baseByPackage: Record<PackageId, number> = {
    top: 4,
    mid: 7,
    entry: 8,
  };

  let totalDays = baseByPackage[packageId];

  if (values.websiteType === "Ecommerce") totalDays += 1;
  if (values.pages > 10) totalDays += 1;
  if (values.pages > 20) totalDays += 1;
  if (values.brandReady === "no") totalDays += 1;
  if (values.copyReady === "no") totalDays += 1;
  if (values.websiteType === "Multi-location") totalDays += 1;

  return clamp(totalDays, 4, 10);
}

function formatDayRange(startDay: number, endDay: number) {
  if (startDay === endDay) return `Day ${startDay}`;
  return `Days ${startDay}-${endDay}`;
}

function formatDateRange(startDate: Date, startDay: number, endDay: number) {
  const start = addDays(startDate, startDay - 1);
  const end = addDays(startDate, endDay - 1);
  if (startDay === endDay) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function buildPhases(totalDays: number, startDate: Date): ResultPhase[] {
  const discoveryEnd = 1;
  const designEnd = Math.max(2, Math.round(totalDays * 0.4));
  const buildEnd = Math.max(designEnd + 1, Math.round(totalDays * 0.75));
  const qaStart = Math.min(totalDays, buildEnd + 1);
  const qaEnd = Math.max(qaStart, totalDays - 1);

  const plan = [
    { title: "Discovery", startDay: 1, endDay: discoveryEnd },
    { title: "Design", startDay: 2, endDay: designEnd },
    { title: "Build", startDay: designEnd + 1, endDay: buildEnd },
    { title: "QA", startDay: qaStart, endDay: qaEnd },
    { title: "Launch", startDay: totalDays, endDay: totalDays },
  ];

  return plan.map((phase) => ({
    title: phase.title,
    startDay: phase.startDay,
    endDay: phase.endDay,
    dayRange: formatDayRange(phase.startDay, phase.endDay),
    dateRange: formatDateRange(startDate, phase.startDay, phase.endDay),
  }));
}

function buildWhyPackage(values: SimulatorValues, packageId: PackageId, complexityScore: number) {
  const reasons: string[] = [];

  reasons.push(`Scope planning covers ${values.pages} pages.`);

  if (values.websiteType === "Ecommerce") {
    reasons.push("Commerce complexity is included for catalogue, checkout, and conversion flow handling.");
  } else if (values.websiteType === "Multi-location") {
    reasons.push("Multi-location structure adds routing and operational complexity across locations.");
  }

  if (values.brandReady === "no") {
    reasons.push("Identity support is included because brand assets are not ready yet.");
  }

  if (values.copyReady === "no") {
    reasons.push("Content structuring is included because editorial copy is still in preparation.");
  }

  if (values.pages >= 21) {
    reasons.push("Higher page volume requires deeper information architecture and navigation planning.");
  }

  if (values.addOns.length > 0) {
    reasons.push(`Selected additions: ${values.addOns.join(", ")}.`);
  }

  if (packageId === "top") {
    reasons.push(`Complexity score ${complexityScore} maps to the top delivery tier.`);
  } else if (packageId === "mid") {
    reasons.push(`Complexity score ${complexityScore} maps to the mid delivery tier.`);
  } else {
    reasons.push(`Complexity score ${complexityScore} maps to the entry delivery tier.`);
  }

  if (reasons.length === 2) {
    reasons.push("Inputs indicate a focused scope with strong readiness, suited to a streamlined delivery track.");
  }

  return reasons;
}

function validateStep(step: number, values: SimulatorValues): SimulatorErrors {
  const errors: SimulatorErrors = {};

  if (step === 1) {
    if (!values.studioName.trim()) {
      errors.studioName = "Please enter your studio name.";
    }

    if (!values.budget.trim()) {
      errors.budget = "Please provide your budget in GBP.";
    } else {
      const budget = Number(values.budget);
      if (Number.isNaN(budget) || budget < 2000) {
        errors.budget = "Budget should be at least GBP 2,000.";
      }
    }

    if (!values.websiteType) {
      errors.websiteType = "Please select a website type.";
    }
  }

  if (step === 3) {
    if (!values.brandReady) {
      errors.brandReady = "Please confirm brand readiness.";
    }
    if (!values.copyReady) {
      errors.copyReady = "Please confirm copy readiness.";
    }
    if (!values.urgency) {
      errors.urgency = "Please select your preferred start urgency.";
    }
  }

  return errors;
}

function buildResult(values: SimulatorValues): SimulationResult {
  const recommendation = getRecommendation(values);
  const packageId = recommendation.packageId;
  const totalDays = getTimelineDays(values, packageId);
  const startDate = toStartOfDay();
  const launchDate = addDays(startDate, totalDays);

  return {
    packageId,
    totalDays,
    startDate: formatDate(startDate),
    launchDate: formatDate(launchDate),
    reasons: buildWhyPackage(values, packageId, recommendation.complexityScore),
    budgetAlignmentNote: recommendation.budgetAlignmentNote,
    priorityNote:
      values.urgency === "ASAP"
        ? "Priority scheduling can accelerate approvals and review cadence. Timeline remains clamped to the 4-day minimum."
        : "",
    phases: buildPhases(totalDays, startDate),
  };
}

export default function ProcessSimulatorClient() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<SimulatorValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<SimulatorErrors>({});
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [direction, setDirection] = useState<TransitionDirection>("next");
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const transitionTimeoutsRef = useRef<number[]>([]);
  const isTransitioning = transitionPhase !== "idle";

  const currentStepMeta = STEP_CONTENT[step - 1];

  const clearTransitionTimers = () => {
    transitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    transitionTimeoutsRef.current = [];
  };

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTransitionTimers();
    };
  }, []);

  const packagePreview = useMemo(() => {
    if (!result) return null;
    return PACKAGE_MAP[result.packageId];
  }, [result]);

  const parsedBudget = Number(values.budget);
  const budgetLabel =
    values.budget.trim() && !Number.isNaN(parsedBudget) && parsedBudget > 0
      ? formatGBP(parsedBudget)
      : "Not set";

  const progressPercent = Math.round((step / STEP_CONTENT.length) * 100);

  const previewPackage = useMemo(() => {
    if (!values.websiteType || !values.budget.trim()) return null;
    if (Number.isNaN(parsedBudget) || parsedBudget <= 0) return null;

    const preview = getRecommendation(values);
    return PACKAGE_MAP[preview.packageId];
  }, [parsedBudget, values]);

  const livePackage = packagePreview ?? previewPackage;
  const liveTimelineDays = useMemo(() => {
    if (!livePackage) return null;
    return getTimelineDays(values, livePackage.id);
  }, [livePackage, values]);

  const liveSummary = [
    { label: "Website type", value: values.websiteType || "Not selected" },
    { label: "Pages", value: `${values.pages}` },
    {
      label: "Readiness",
      value: `${values.brandReady === "yes" ? "Brand ready" : values.brandReady === "no" ? "Brand support needed" : "Brand pending"} | ${
        values.copyReady === "yes" ? "Copy ready" : values.copyReady === "no" ? "Copy structuring needed" : "Copy pending"
      }`,
    },
    {
      label: "Add-ons",
      value: values.addOns.length > 0 ? values.addOns.join(", ") : "None selected",
    },
    { label: "Budget", value: budgetLabel },
    {
      label: "Package",
      value: livePackage ? `${livePackage.name} - ${livePackage.nickname}` : "Pending inputs",
    },
  ];

  const updateValue = <K extends keyof SimulatorValues>(field: K, value: SimulatorValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleAddOn = (addOn: AddOn) => {
    setValues((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addOn)
        ? prev.addOns.filter((item) => item !== addOn)
        : [...prev.addOns, addOn],
    }));
  };

  const updatePages = (nextPages: number) => {
    updateValue("pages", clamp(nextPages, 1, 40));
  };

  const transitionToStep = (
    nextStep: number,
    beforeStepChange?: () => void,
    nextDirection: TransitionDirection = nextStep > step ? "next" : "prev"
  ) => {
    if (nextStep < 1 || nextStep > STEP_CONTENT.length || nextStep === step || isTransitioning) {
      return;
    }

    const halfDuration = prefersReducedMotion ? REDUCED_FADE_MS : PAGE_TURN_HALF_MS;
    clearTransitionTimers();
    setDirection(nextDirection);
    setTransitionPhase("out");

    const outTimeout = window.setTimeout(() => {
      beforeStepChange?.();
      setStep(nextStep);
      setTransitionPhase("in");

      const inTimeout = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, halfDuration);

      transitionTimeoutsRef.current.push(inTimeout);
    }, halfDuration);

    transitionTimeoutsRef.current.push(outTimeout);
  };

  const goBack = () => {
    if (step === 1 || isTransitioning) return;
    transitionToStep(step - 1, undefined, "prev");
  };

  const goNext = () => {
    if (step >= 4 || isTransitioning) return;

    const stepErrors = validateStep(step, values);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    if (Object.keys(stepErrors).length > 0) return;

    if (step === 3) {
      const computedResult = buildResult(values);
      transitionToStep(4, () => {
        setResult(computedResult);
      }, "next");
      return;
    }

    transitionToStep(step + 1, undefined, "next");
  };

  const reset = () => {
    clearTransitionTimers();
    setDirection("next");
    setTransitionPhase("idle");
    setStep(1);
    setValues(INITIAL_VALUES);
    setErrors({});
    setResult(null);
  };

  const stepTransitionClass =
    transitionPhase === "out"
      ? direction === "next"
        ? "simulator-page-out-next"
        : "simulator-page-out-prev"
      : transitionPhase === "in"
        ? direction === "next"
          ? "simulator-page-in-next"
          : "simulator-page-in-prev"
        : "simulator-page-idle";

  return (
    <section className="simulator-shell simulator-shell-premium" aria-labelledby="timeline-simulator-title">
      <Reveal>
        <div className="simulator-top">
          <header className="simulator-header simulator-hero">
            <p className="simulator-kicker">Project Timeline</p>
            <h1 id="timeline-simulator-title" className="simulator-title">
              Plan a premium delivery track in minutes.
            </h1>
            <p className="simulator-hero-subline">
              Shape scope, readiness, and pacing into a clear recommendation and launch window.
            </p>
          </header>
          <div className="simulator-progress" aria-label="Progress indicator">
            <div className="simulator-progress-meta">
              <span>Step {step} of {STEP_CONTENT.length}</span>
              <span>{progressPercent}% complete</span>
            </div>
            <div className="simulator-progress-track" role="presentation">
              <div className="simulator-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="simulator-subtitle">
              <span className="simulator-subtitle-strong">{currentStepMeta.label}</span>
              <span aria-hidden="true"> / </span>
              <span>{currentStepMeta.title}</span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal stagger={80}>
        <ol className="simulator-stepper" aria-label="Simulator steps">
          {STEP_CONTENT.map((stepMeta, index) => {
            const current = index + 1;
            return (
              <li
                key={stepMeta.label}
                className={`simulator-step ${step === current ? "simulator-step-active" : ""} ${step > current ? "simulator-step-complete" : ""}`}
                aria-current={step === current ? "step" : undefined}
              >
                <span className="simulator-step-index" aria-hidden="true">
                  {current}
                </span>
                <span className="simulator-step-label">{stepMeta.label}</span>
              </li>
            );
          })}
        </ol>
      </Reveal>

      <div className="simulator-workbench">
        <div className="simulator-stage">
          <div className="simulator-page-turn-frame">
            <div key={step} className={`simulator-step-content ${stepTransitionClass}`}>
              <div className="simulator-question-block">
                <p className="simulator-question-label">{step === 4 ? "Recommendation" : `Question ${step}`}</p>
                <h2 className="simulator-question-title">{currentStepMeta.title}</h2>
                <p className="simulator-question-support">{currentStepMeta.support}</p>
              </div>
              <div className="simulator-section-separator" aria-hidden="true" />

            {step === 1 ? (
              <div className="simulator-form-grid simulator-form-grid-split">
                <div>
                  <label htmlFor="sim-studio-name" className="form-label">
                    Studio or practice name
                  </label>
                  <input
                    id="sim-studio-name"
                    className={`form-field simulator-field-lg ${errors.studioName ? "is-invalid" : ""}`}
                    placeholder="Aster Interiors"
                    value={values.studioName}
                    onChange={(event) => updateValue("studioName", event.target.value)}
                    aria-describedby={errors.studioName ? "sim-studio-error" : "sim-studio-helper"}
                  />
                  <p id="sim-studio-helper" className="simulator-hint">
                    Used for your final recommendation summary.
                  </p>
                  {errors.studioName ? (
                    <p id="sim-studio-error" className="simulator-hint simulator-hint-error">
                      {errors.studioName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="sim-budget" className="form-label">
                    Working budget
                  </label>
                  <div className={`currency-field simulator-field-lg ${errors.budget ? "is-invalid" : ""}`}>
                    <span aria-hidden="true">GBP</span>
                    <input
                      id="sim-budget"
                      className="currency-field-input"
                      type="number"
                      min={2000}
                      step={100}
                      placeholder="12000"
                      value={values.budget}
                      onChange={(event) => updateValue("budget", event.target.value)}
                      aria-describedby={errors.budget ? "sim-budget-error" : "sim-budget-helper"}
                    />
                  </div>
                  <p id="sim-budget-helper" className="simulator-hint">
                    Numeric values only. This calibrates package fit.
                  </p>
                  {errors.budget ? (
                    <p id="sim-budget-error" className="simulator-hint simulator-hint-error">
                      {errors.budget}
                    </p>
                  ) : null}
                </div>

                <div className="simulator-form-span">
                  <p className="form-label">
                    Website format
                  </p>
                  <div
                    className="simulator-choice-grid"
                    role="group"
                    aria-label="Website format"
                    aria-describedby={errors.websiteType ? "sim-type-error" : "sim-type-helper"}
                  >
                    {WEBSITE_TYPE_OPTIONS.map((option) => {
                      const selected = values.websiteType === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`simulator-choice-card ${selected ? "simulator-choice-card-active" : ""}`}
                          onClick={() => updateValue("websiteType", option.value)}
                          aria-pressed={selected}
                        >
                          <span className="simulator-choice-title">{option.title}</span>
                          <span className="simulator-choice-copy">{option.detail}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p id="sim-type-helper" className="simulator-hint">
                    Select the closest format. You can refine scope in the brief.
                  </p>
                  {errors.websiteType ? (
                    <p id="sim-type-error" className="simulator-hint simulator-hint-error">
                      {errors.websiteType}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="simulator-form-grid">
                <div className="simulator-pages-shell">
                  <p className="form-label">Page count</p>
                  <p className="simulator-pages-value">
                    <span>{values.pages}</span> pages
                  </p>
                  <div className="simulator-pages-controls">
                    <button
                      type="button"
                      className="simulator-stepper-button"
                      onClick={() => updatePages(values.pages - 1)}
                      aria-label="Decrease page count"
                      disabled={values.pages <= 1}
                    >
                      -
                    </button>
                    <input
                      type="range"
                      className="simulator-slider"
                      min={1}
                      max={40}
                      value={values.pages}
                      onChange={(event) => updatePages(Number(event.target.value))}
                      aria-label="Number of pages"
                    />
                    <button
                      type="button"
                      className="simulator-stepper-button"
                      onClick={() => updatePages(values.pages + 1)}
                      aria-label="Increase page count"
                      disabled={values.pages >= 40}
                    >
                      +
                    </button>
                  </div>
                  <p className="simulator-hint">Use the slider or stepper to model between 1 and 40 pages.</p>
                </div>

                <div>
                  <p className="form-label">Enhancements</p>
                  <div className="simulator-pill-grid" role="group" aria-label="Enhancements">
                    {ADD_ONS.map((addOn) => {
                      const checked = values.addOns.includes(addOn);
                      return (
                        <button
                          key={addOn}
                          type="button"
                          className={`simulator-pill ${checked ? "simulator-pill-active" : ""}`}
                          onClick={() => toggleAddOn(addOn)}
                          aria-pressed={checked}
                        >
                          {addOn}
                        </button>
                      );
                    })}
                  </div>
                  <p className="simulator-hint">Select only features that must launch in this first phase.</p>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="simulator-form-grid simulator-form-grid-split">
                <div>
                  <p className="form-label">
                    Brand assets prepared
                  </p>
                  <div
                    className={`simulator-toggle-grid ${errors.brandReady ? "simulator-toggle-grid-invalid" : ""}`}
                    role="group"
                    aria-label="Brand assets prepared"
                    aria-describedby={errors.brandReady ? "sim-assets-error" : "sim-assets-helper"}
                  >
                    <button
                      type="button"
                      className={`simulator-toggle-card ${values.brandReady === "yes" ? "simulator-toggle-card-active" : ""}`}
                      onClick={() => updateValue("brandReady", "yes")}
                      aria-pressed={values.brandReady === "yes"}
                    >
                      <span className="simulator-toggle-title">Yes</span>
                      <span className="simulator-toggle-copy">Brand assets are production-ready.</span>
                    </button>
                    <button
                      type="button"
                      className={`simulator-toggle-card ${values.brandReady === "no" ? "simulator-toggle-card-active" : ""}`}
                      onClick={() => updateValue("brandReady", "no")}
                      aria-pressed={values.brandReady === "no"}
                    >
                      <span className="simulator-toggle-title">No</span>
                      <span className="simulator-toggle-copy">Identity support should be included.</span>
                    </button>
                  </div>
                  <p id="sim-assets-helper" className="simulator-hint">
                    If not ready, identity support is added into scope.
                  </p>
                  {errors.brandReady ? (
                    <p id="sim-assets-error" className="simulator-hint simulator-hint-error">
                      {errors.brandReady}
                    </p>
                  ) : null}
                </div>

                <div>
                  <p className="form-label">
                    Editorial copy prepared
                  </p>
                  <div
                    className={`simulator-toggle-grid ${errors.copyReady ? "simulator-toggle-grid-invalid" : ""}`}
                    role="group"
                    aria-label="Editorial copy prepared"
                    aria-describedby={errors.copyReady ? "sim-copy-error" : "sim-copy-helper"}
                  >
                    <button
                      type="button"
                      className={`simulator-toggle-card ${values.copyReady === "yes" ? "simulator-toggle-card-active" : ""}`}
                      onClick={() => updateValue("copyReady", "yes")}
                      aria-pressed={values.copyReady === "yes"}
                    >
                      <span className="simulator-toggle-title">Yes</span>
                      <span className="simulator-toggle-copy">Copy is structured and ready for page builds.</span>
                    </button>
                    <button
                      type="button"
                      className={`simulator-toggle-card ${values.copyReady === "no" ? "simulator-toggle-card-active" : ""}`}
                      onClick={() => updateValue("copyReady", "no")}
                      aria-pressed={values.copyReady === "no"}
                    >
                      <span className="simulator-toggle-title">No</span>
                      <span className="simulator-toggle-copy">Content support should be included in delivery.</span>
                    </button>
                  </div>
                  <p id="sim-copy-helper" className="simulator-hint">
                    Copy readiness affects launch rhythm and review cycles.
                  </p>
                  {errors.copyReady ? (
                    <p id="sim-copy-error" className="simulator-hint simulator-hint-error">
                      {errors.copyReady}
                    </p>
                  ) : null}
                </div>

                <div className="simulator-form-span">
                  <p className="form-label">
                    Desired start pace
                  </p>
                  <div
                    className={`simulator-pill-grid simulator-pill-grid-wide ${errors.urgency ? "simulator-pill-grid-invalid" : ""}`}
                    role="group"
                    aria-label="Desired start pace"
                    aria-describedby={errors.urgency ? "sim-urgency-error" : "sim-urgency-helper"}
                  >
                    {URGENCY_OPTIONS.map((urgency) => {
                      const selected = values.urgency === urgency;
                      return (
                        <button
                          key={urgency}
                          type="button"
                          className={`simulator-pill ${selected ? "simulator-pill-active" : ""}`}
                          onClick={() => updateValue("urgency", urgency)}
                          aria-pressed={selected}
                        >
                          {urgency}
                        </button>
                      );
                    })}
                  </div>
                  <p id="sim-urgency-helper" className="simulator-hint">
                    Pace helps prioritize scheduling without changing recommendation tier logic.
                  </p>
                  {errors.urgency ? (
                    <p id="sim-urgency-error" className="simulator-hint simulator-hint-error">
                      {errors.urgency}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === 4 && result && packagePreview ? (
              <div className="simulator-result" aria-live="polite">
                <div className="simulator-summary simulator-decision-card">
                  <p className="simulator-decision-kicker">Decision card</p>
                  <p className="simulator-package-title">{packagePreview.name} - {packagePreview.nickname}</p>
                  <p className="simulator-note">
                    {formatGBP(packagePreview.deposit)} deposit + {formatGBP(packagePreview.monthly)}/mo
                  </p>
                  {result.budgetAlignmentNote ? <p className="simulator-note">{result.budgetAlignmentNote}</p> : null}
                  <ul className="list-soft">
                    {result.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="simulator-summary">
                  <p className="simulator-duration">Estimated production window: {result.totalDays} days</p>
                  <p className="simulator-note">
                    Projected start: {result.startDate} <br />
                    Projected launch: {result.launchDate}
                  </p>
                  {result.priorityNote ? <p className="simulator-rush">{result.priorityNote}</p> : null}
                </div>

                <div className="simulator-timeline">
                  <div className="simulator-timeline-head">
                    <span>{`Day 1 -> Day ${result.totalDays}`}</span>
                    <span>Launch {result.launchDate}</span>
                  </div>
                  <div className="simulator-timeline-bar" role="presentation">
                    {result.phases.map((phase) => (
                      <div
                        key={`${phase.title}-segment`}
                        className="simulator-timeline-segment"
                        style={{ flexGrow: Math.max(1, phase.endDay - phase.startDay + 1) }}
                      >
                        <span>{phase.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ol className="simulator-phase-list">
                  {result.phases.map((phase) => (
                    <li key={phase.title} className="simulator-phase-item">
                      <div className="simulator-phase-head">
                        <p className="simulator-phase-title">{phase.title}</p>
                        <span className="simulator-phase-date">{phase.dayRange}</span>
                      </div>
                      <p className="simulator-note">{phase.dateRange}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            </div>
          </div>
        </div>

        <aside className="simulator-live-summary" aria-label="Live summary">
          <p className="simulator-live-kicker">Live summary</p>
          <h2 className="simulator-live-title">Scope snapshot</h2>
          <p className="simulator-live-caption">Updated in real time as each answer changes.</p>
          {values.studioName.trim() ? <p className="simulator-live-studio">{values.studioName.trim()}</p> : null}
          <dl className="simulator-live-list">
            {liveSummary.map((item) => (
              <div key={item.label} className="simulator-live-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          {livePackage ? (
            <div className="simulator-live-highlight">
              <p className="simulator-live-price">
                {formatGBP(livePackage.deposit)} deposit + {formatGBP(livePackage.monthly)}/mo
              </p>
              {liveTimelineDays ? <p className="simulator-live-meta">Estimated production window: {liveTimelineDays} days</p> : null}
            </div>
          ) : (
            <p className="simulator-live-meta">Complete the first question to preview package fit.</p>
          )}
        </aside>
      </div>

      <div className={`simulator-actions ${step === 4 ? "simulator-actions-split" : ""}`}>
        {step > 1 ? (
          <Button type="button" variant="secondary" onClick={goBack} disabled={isTransitioning}>
            Previous
          </Button>
        ) : null}
        {step < 4 ? (
          <Button type="button" onClick={goNext} disabled={isTransitioning}>
            {step === 3 ? "View recommendation" : "Continue"}
          </Button>
        ) : (
          <Button type="button" variant="ghost" onClick={reset}>
            Start over
          </Button>
        )}
      </div>
    </section>
  );
}

