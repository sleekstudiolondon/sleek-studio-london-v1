"use client";

import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { PACKAGE_MAP, type PackageId, formatGBP, getPackagePricing } from "../../lib/pricing";

type CurrencyCode = "GBP" | "USD" | "EUR" | "AUD" | "CAD";
type YesNo = "yes" | "no";
type Urgency = "As soon as possible" | "Within 2 weeks" | "Within 1 month" | "Flexible";
type Step = 1 | 2 | 3 | 4;
type Enhancement =
  | "Payment integration"
  | "Booking system"
  | "Working contact form"
  | "Basic automations"
  | "FAQ section"
  | "AI live chat";

type Values = {
  studioName: string;
  websitePurpose: string;
  hasExistingSite: YesNo | "";
  currentWebsite: string;
  improvementNotes: string;
  budgetAmount: string;
  selectedCurrency: CurrencyCode;
  pages: number;
  enhancements: Enhancement[];
  brandReady: YesNo | "";
  copyReady: YesNo | "";
  urgency: Urgency | "";
};

type Errors = Partial<Record<keyof Values, string>>;
type Result = {
  packageId: PackageId;
  estimatedDays: number;
  projectedDate: string;
  headline: string;
  explanation: string;
  budgetNote: string;
  nextStep: string;
  budgetGbp: number;
};

const INITIAL_VALUES: Values = {
  studioName: "",
  websitePurpose: "",
  hasExistingSite: "",
  currentWebsite: "",
  improvementNotes: "",
  budgetAmount: "",
  selectedCurrency: "GBP",
  pages: 3,
  enhancements: [],
  brandReady: "",
  copyReady: "",
  urgency: "",
};

const STEPS = [
  { id: 1 as Step, label: "The Brief", title: "Tell us what this launch needs to do." },
  { id: 2 as Step, label: "Scope & Features", title: "Shape the first release." },
  { id: 3 as Step, label: "Timing & Readiness", title: "Balance speed with what is already prepared." },
  { id: 4 as Step, label: "Launch Estimate", title: "Review your recommendation and launch path." },
];

const ENHANCEMENTS = [
  ["Payment integration", 4, 2, "Payments, checkout, or deposits."],
  ["Booking system", 3, 2, "Scheduling for calls or appointments."],
  ["Working contact form", 1, 1, "Reliable enquiry handling."],
  ["Basic automations", 2, 1, "Simple follow-ups and routing."],
  ["FAQ section", 1, 1, "Clearer conversion support."],
  ["AI live chat", 3, 2, "Always-on first-response support."],
] as const satisfies ReadonlyArray<readonly [Enhancement, number, number, string]>;

const CURRENCIES: ReadonlyArray<{
  code: CurrencyCode;
  rateToGbp: number;
  example: string;
}> = [
  { code: "GBP", rateToGbp: 1, example: "8500" },
  { code: "USD", rateToGbp: 0.79, example: "8000" },
  { code: "EUR", rateToGbp: 0.86, example: "7500" },
  { code: "AUD", rateToGbp: 0.52, example: "12000" },
  { code: "CAD", rateToGbp: 0.58, example: "11000" },
];
const MAX_BUDGET_GBP = 1_000_000;

const URGENCY_OPTIONS: Array<{ value: Urgency; detail: string }> = [
  { value: "As soon as possible", detail: "Priority pace with faster review cycles." },
  { value: "Within 2 weeks", detail: "Fast launch planning with tighter delivery pressure." },
  { value: "Within 1 month", detail: "A balanced window for a polished launch." },
  { value: "Flexible", detail: "More room to shape scope calmly." },
];

const READY_OPTIONS: Array<{ value: YesNo; label: string; detail: string }> = [
  { value: "yes", label: "Yes", detail: "Already close to production-ready." },
  { value: "no", label: "No", detail: "We should plan for support." },
];

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const enhancementWeight = (item: Enhancement) => ENHANCEMENTS.find(([value]) => value === item)![1];
const enhancementTime = (item: Enhancement) => ENHANCEMENTS.find(([value]) => value === item)![2];
const currencyConfig = (code: CurrencyCode) => CURRENCIES.find((item) => item.code === code)!;
const formatPageCountValue = (pages: number) => (pages >= 20 ? "20+" : String(pages));
const formatPageCountLabel = (pages: number) =>
  `${formatPageCountValue(pages)} page${pages === 1 ? "" : "s"}`;

function formatMoney(value: number, currency: CurrencyCode) {
  return new Intl.NumberFormat(currency === "GBP" ? "en-GB" : "en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function getBudgetSnapshot(values: Pick<Values, "budgetAmount" | "selectedCurrency">) {
  const enteredAmount = Number(values.budgetAmount);
  const hasAmount = values.budgetAmount.trim() !== "" && Number.isFinite(enteredAmount) && enteredAmount > 0;

  if (!hasAmount) {
    return {
      enteredAmount: null,
      convertedGbp: null,
      enteredLabel: "Not entered",
      planningLabel: "Planning range appears after you enter a budget",
    };
  }

  const convertedGbp = Math.min(
    Math.round((enteredAmount * currencyConfig(values.selectedCurrency).rateToGbp) / 50) * 50,
    MAX_BUDGET_GBP
  );

  return {
    enteredAmount,
    convertedGbp,
    enteredLabel: `${formatMoney(enteredAmount, values.selectedCurrency)} ${values.selectedCurrency}`,
    planningLabel: `${formatGBP(convertedGbp)} GBP`,
  };
}

function getMaxBudgetForCurrency(currency: CurrencyCode) {
  return Math.floor(MAX_BUDGET_GBP / currencyConfig(currency).rateToGbp);
}

function sanitizeBudgetAmount(rawValue: string, currency: CurrencyCode) {
  if (!rawValue.trim()) {
    return { value: "", capped: false };
  }

  const numericValue = Number(rawValue);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return { value: rawValue, capped: false };
  }

  const clampedValue = Math.min(numericValue, getMaxBudgetForCurrency(currency));
  return {
    value: String(clampedValue),
    capped: clampedValue !== numericValue,
  };
}

function purposeScore(copy: string) {
  const text = copy.toLowerCase();
  let score = 0;
  if (/(shop|store|sell|checkout|payment|ecommerce)/.test(text)) score += 5;
  if (/(book|booking|appointment|consultation|calendar)/.test(text)) score += 4;
  if (/(portal|login|member|dashboard)/.test(text)) score += 4;
  if (/(multi|location|locations|branch|migration|redesign|rebuild)/.test(text)) score += 3;
  if (text.trim().split(/\s+/).filter(Boolean).length >= 18) score += 1;
  return score;
}

function urgencyScore(urgency: Values["urgency"]) {
  if (urgency === "As soon as possible") return 3;
  if (urgency === "Within 2 weeks") return 2;
  if (urgency === "Within 1 month") return 1;
  return 0;
}

function pageTier(pages: number): PackageId {
  if (pages <= PACKAGE_MAP.entry.pageCount) return "entry";
  if (pages <= PACKAGE_MAP.mid.pageCount) return "mid";
  return "top";
}

function recommend(values: Values, budgetSnapshot: ReturnType<typeof getBudgetSnapshot>): Result | null {
  const budget = budgetSnapshot.convertedGbp ?? 0;
  if (!values.websitePurpose.trim() || !values.budgetAmount.trim() || !values.urgency || !budgetSnapshot.convertedGbp) {
    return null;
  }

  const enhancementScore = values.enhancements.reduce((total, item) => total + enhancementWeight(item), 0);
  const complexityScore =
    purposeScore(values.websitePurpose) +
    enhancementScore +
    urgencyScore(values.urgency) +
    (values.hasExistingSite === "yes" ? 2 : 0) +
    (values.currentWebsite.trim() ? 1 : 0) +
    (values.improvementNotes.trim() ? 1 : 0) +
    (values.brandReady === "no" ? 1 : 0) +
    (values.copyReady === "no" ? 1 : 0);

  let packageId = pageTier(values.pages);
  if (packageId !== "top" && (complexityScore >= 10 || enhancementScore >= 6)) packageId = "top";
  else if (packageId === "entry" && (complexityScore >= 4 || values.pages >= 4)) packageId = "mid";
  if (budget >= 20000 && packageId === "entry" && (values.pages > 3 || enhancementScore > 0)) packageId = "mid";
  if (budget >= 30000 && packageId !== "top" && (values.pages > 8 || complexityScore >= 8)) packageId = "top";

  let estimatedDays = { entry: 5, mid: 8, top: 13 }[packageId];
  if (values.pages > 3) estimatedDays += 1;
  if (values.pages > 8) estimatedDays += 2;
  estimatedDays += values.enhancements.reduce((total, item) => total + enhancementTime(item), 0);
  if (values.hasExistingSite === "yes") estimatedDays += 2;
  if (values.currentWebsite.trim()) estimatedDays += 1;
  if (values.improvementNotes.trim()) estimatedDays += 1;
  if (values.brandReady === "no") estimatedDays += 1;
  if (values.copyReady === "no") estimatedDays += 1;
  if (values.urgency === "As soon as possible" || values.urgency === "Within 2 weeks") estimatedDays += 1;
  estimatedDays = clamp(estimatedDays, 4, 28);

  const item = PACKAGE_MAP[packageId];
  const pricing = getPackagePricing(item);
  const budgetNote =
    budget > 0 && budget < item.minBudget
      ? packageId === "top"
        ? "Your brief points toward Top, though we may need to phase the rollout if you want to stay close to the current budget."
        : "Your brief points upward, though we may need to trim scope or phase the rollout to stay aligned with budget."
      : "";

  return {
    packageId,
    estimatedDays,
    projectedDate: formatDate(addDays(new Date(), estimatedDays)),
    headline: `Your website could be live in ${estimatedDays} days if you apply today`,
    explanation:
      packageId === "top"
        ? `Your brief points to a more demanding launch path with ${formatPageCountLabel(values.pages)}, ${values.enhancements.length} selected enhancement${values.enhancements.length === 1 ? "" : "s"}, and a higher-support delivery route. ${pricing.primary} keeps pricing private until scope is confirmed.`
        : packageId === "mid"
          ? `Your brief points to a stronger business build with ${formatPageCountLabel(values.pages)}, ${values.enhancements.length} selected enhancement${values.enhancements.length === 1 ? "" : "s"}, and more room for support after launch. It starts at ${pricing.primary} and ${pricing.secondary}.`
          : `Your brief still fits a focused first release with ${formatPageCountLabel(values.pages)} and ${values.enhancements.length} selected enhancement${values.enhancements.length === 1 ? "" : "s"}, keeping the launch lean without overbuilding phase one. It starts at ${pricing.primary} and ${pricing.secondary}.`,
    budgetNote,
    nextStep:
      values.hasExistingSite === "yes"
        ? "Apply with your current site details so we can map the cleanest rebuild or migration path."
        : "Apply now and we will come back with the clearest route to launch, scope, and next step.",
    budgetGbp: budget,
  };
}

function validateStep(step: Step, values: Values) {
  const errors: Errors = {};
  if (step === 1) {
    if (!values.studioName.trim()) errors.studioName = "Please enter your studio or business name.";
    if (!values.websitePurpose.trim()) errors.websitePurpose = "Please describe what the website is for.";
    if (!values.hasExistingSite) errors.hasExistingSite = "Please tell us if you already have a website.";
    if (values.hasExistingSite === "yes" && !values.currentWebsite.trim() && !values.improvementNotes.trim()) {
      errors.currentWebsite = "Add a link or a short note so we know what is changing.";
    }
  }
  if (step === 2) {
    const budgetSnapshot = getBudgetSnapshot(values);
    if (!values.budgetAmount.trim()) errors.budgetAmount = "Please enter your working budget.";
    else if (!budgetSnapshot.convertedGbp || budgetSnapshot.convertedGbp < 1500) {
      errors.budgetAmount = "Budget should convert to at least GBP 1,500 for planning.";
    } else if (budgetSnapshot.convertedGbp > MAX_BUDGET_GBP) {
      errors.budgetAmount = "For planning, the maximum supported budget is GBP 1,000,000 equivalent.";
    }
  }
  if (step === 3 && !values.urgency) errors.urgency = "Please choose when you want the site live.";
  return errors;
}

export default function ProcessSimulatorClient() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const budgetSnapshot = useMemo(
    () => getBudgetSnapshot(values),
    [values.budgetAmount, values.selectedCurrency]
  );
  const result = useMemo(() => recommend(values, budgetSnapshot), [values, budgetSnapshot]);
  const packageItem = result ? PACKAGE_MAP[result.packageId] : null;

  const updateValue = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBudgetAmountChange = (rawValue: string, currency: CurrencyCode) => {
    const sanitized = sanitizeBudgetAmount(rawValue, currency);
    setValues((prev) => ({ ...prev, budgetAmount: sanitized.value }));
    setErrors((prev) => ({
      ...prev,
      budgetAmount: sanitized.capped
        ? "For planning, the maximum supported budget is GBP 1,000,000 equivalent."
        : "",
    }));
  };

  const toggleEnhancement = (item: Enhancement) => {
    setValues((prev) => ({
      ...prev,
      enhancements: prev.enhancements.includes(item)
        ? prev.enhancements.filter((entry) => entry !== item)
        : [...prev.enhancements, item],
    }));
  };

  const goNext = () => {
    if (step === 4) return;
    const nextErrors = validateStep(step, values);
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    if (Object.keys(nextErrors).length > 0) return;
    setDirection("next");
    setStep((prev) => (prev + 1) as Step);
  };

  const goBack = () => {
    if (step === 1) return;
    setDirection("prev");
    setStep((prev) => (prev - 1) as Step);
  };

  const summary = {
    packageLabel: packageItem?.name ?? "Pending",
    timelineLabel: result ? `${result.estimatedDays} days` : "Add basics to preview",
    pagesLabel: formatPageCountLabel(values.pages),
    enhancementLabel: values.enhancements.length > 0 ? values.enhancements.join(", ") : "None selected",
    budgetLabel: budgetSnapshot.enteredLabel,
    planningBudgetLabel: budgetSnapshot.convertedGbp ? `Planning range used: ~${budgetSnapshot.planningLabel}` : budgetSnapshot.planningLabel,
    nextStep: result ? result.nextStep : "Enter your goal, budget, and timing to unlock your launch estimate.",
  };

  const pageTurnClass = direction === "next" ? "simulator-page-in-next" : "simulator-page-in-prev";

  return (
    <section className="launch-estimator" aria-labelledby="launch-estimator-title">
      <div className="launch-estimator-hero">
        <div className="launch-estimator-intro">
          <h1 id="launch-estimator-title" className="launch-estimator-title">Map out your launch before you apply with our projection simulator.</h1>
          <p className="launch-estimator-copy">This estimator is designed to feel like the first draft of your launch plan, not a long generic form.</p>
        </div>
        <div className="launch-estimator-hero-panel">
          <span className="launch-estimator-panel-label">What this gives you</span>
          <p>A clearer package fit, a realistic time-to-launch estimate, and the next step we would recommend today.</p>
        </div>
      </div>

      <div className="launch-estimator-layout">
        <div className="launch-estimator-main">
          <ol className="simulator-stepper launch-stepper" aria-label="Estimator steps">
            {STEPS.map((item) => (
              <li key={item.id} className={`simulator-step ${step === item.id ? "simulator-step-active" : ""} ${step > item.id ? "simulator-step-complete" : ""}`} aria-current={step === item.id ? "step" : undefined}>
                <span className="simulator-step-index" aria-hidden="true">{item.id}</span>
                <span className="simulator-step-label">{item.label}</span>
              </li>
            ))}
          </ol>

          <div className="simulator-page-turn-frame">
            <div key={step} className={`simulator-step-content ${pageTurnClass}`}>
              {step === 1 ? (
                <section className="launch-section">
                  <div className="launch-section-head"><p className="launch-section-kicker">01. The brief</p><h2 className="launch-section-title">{STEPS[0].title}</h2></div>
                  <div className="launch-field-grid">
                    <div>
                      <label htmlFor="estimator-studio" className="form-label">Studio or business name</label>
                      <input id="estimator-studio" className={`form-field ${errors.studioName ? "is-invalid" : ""}`} value={values.studioName} onChange={(e) => updateValue("studioName", e.target.value)} placeholder="e.g. John Doe Studio" />
                      {errors.studioName ? <p className="form-error">{errors.studioName}</p> : null}
                    </div>
                    <div className="launch-field-span">
                      <label htmlFor="estimator-purpose" className="form-label">What is this website for?</label>
                      <textarea id="estimator-purpose" className={`form-field form-textarea launch-purpose-field ${errors.websitePurpose ? "is-invalid" : ""}`} value={values.websitePurpose} onChange={(e) => updateValue("websitePurpose", e.target.value)} placeholder="Describe the goal of the site, what it needs to help your business do, and what a successful launch would feel like." />
                      {errors.websitePurpose ? <p className="form-error">{errors.websitePurpose}</p> : null}
                    </div>
                    <div className="launch-field-span">
                      <p className="form-label">Do you already have a current or previous website?</p>
                      <div className={`launch-toggle-row ${errors.hasExistingSite ? "launch-toggle-row-invalid" : ""}`}>
                        {READY_OPTIONS.map((option) => {
                          const selected = values.hasExistingSite === option.value;
                          return (
                            <button key={option.value} type="button" className={`launch-toggle-card ${selected ? "launch-toggle-card-active" : ""}`} onClick={() => updateValue("hasExistingSite", option.value)} aria-pressed={selected}>
                              <span className="launch-toggle-title">{option.label}</span>
                              <span className="launch-toggle-copy">{option.value === "yes" ? "We can factor migration and improvements into the plan." : "We can plan for a cleaner first-time launch."}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.hasExistingSite ? <p className="form-error">{errors.hasExistingSite}</p> : null}
                    </div>
                    {values.hasExistingSite === "yes" ? (
                      <>
                        <div>
                          <label htmlFor="estimator-current-site" className="form-label">Current website link</label>
                          <input id="estimator-current-site" className={`form-field ${errors.currentWebsite ? "is-invalid" : ""}`} value={values.currentWebsite} onChange={(e) => updateValue("currentWebsite", e.target.value)} placeholder="https://yourcurrentwebsite.com" />
                        </div>
                        <div>
                          <label htmlFor="estimator-improvements" className="form-label">What do you want improved?</label>
                          <textarea id="estimator-improvements" className={`form-field launch-notes-field ${errors.currentWebsite ? "is-invalid" : ""}`} value={values.improvementNotes} onChange={(e) => updateValue("improvementNotes", e.target.value)} placeholder="A short note about what needs to improve." />
                        </div>
                        {errors.currentWebsite ? <p className="form-error launch-field-span">{errors.currentWebsite}</p> : null}
                      </>
                    ) : null}
                  </div>
                </section>
              ) : null}

              {step === 2 ? (
                <section className="launch-section">
                  <div className="launch-section-head"><p className="launch-section-kicker">02. Scope & Features</p><h2 className="launch-section-title">{STEPS[1].title}</h2></div>
                  <div className="launch-scope-grid">
                    <div className="launch-pages-card">
                      <p className="form-label">Pages needed at launch</p>
                      <p className="launch-pages-value"><span>{formatPageCountValue(values.pages)}</span> page{values.pages === 1 ? "" : "s"}</p>
                      <input type="range" className="simulator-slider" min={1} max={20} value={values.pages} onChange={(e) => updateValue("pages", Number(e.target.value))} aria-label="Pages needed at launch" />
                      <div className="launch-pages-guides" aria-hidden="true"><span>3 pages</span><span>8 pages</span><span>20+ pages</span></div>
                      <p className="launch-pages-note">Entry is structured for 3 pages, Mid for 8 pages, and Top for 20+ pages.</p>
                    </div>
                    <div className="launch-budget-card">
                      <div className="launch-budget-toolbar">
                        <label htmlFor="estimator-budget" className="form-label">Working budget</label>
                        <div className="launch-budget-currency">
                          <label htmlFor="estimator-currency" className="form-label">Select currency</label>
                          <select
                            id="estimator-currency"
                            className="form-field form-select launch-currency-select"
                            value={values.selectedCurrency}
                            onChange={(e) => {
                              const nextCurrency = e.target.value as CurrencyCode;
                              const sanitized = sanitizeBudgetAmount(values.budgetAmount, nextCurrency);
                              setValues((prev) => ({
                                ...prev,
                                selectedCurrency: nextCurrency,
                                budgetAmount: sanitized.value,
                              }));
                              setErrors((prev) => ({
                                ...prev,
                                selectedCurrency: "",
                                budgetAmount: sanitized.capped
                                  ? "For planning, the maximum supported budget is GBP 1,000,000 equivalent."
                                  : "",
                              }));
                            }}
                          >
                            {CURRENCIES.map((item) => (
                              <option key={item.code} value={item.code}>{item.code}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className={`currency-field ${errors.budgetAmount ? "is-invalid" : ""}`}>
                        <span aria-hidden="true">{values.selectedCurrency}</span>
                        <input
                          id="estimator-budget"
                          className="currency-field-input"
                          type="number"
                          min={0}
                          step={100}
                          max={getMaxBudgetForCurrency(values.selectedCurrency)}
                          placeholder={currencyConfig(values.selectedCurrency).example}
                          value={values.budgetAmount}
                          onChange={(e) => handleBudgetAmountChange(e.target.value, values.selectedCurrency)}
                        />
                      </div>
                      {errors.budgetAmount ? <p className="form-error">{errors.budgetAmount}</p> : null}
                      <p className="launch-budget-note">We&apos;ll convert this to our GBP planning range behind the scenes.</p>
                      {budgetSnapshot.convertedGbp ? (
                        <p className="launch-budget-converted">Planning range used: ~{budgetSnapshot.planningLabel}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="launch-enhancement-grid">
                    {ENHANCEMENTS.map(([item, , , detail]) => {
                      const selected = values.enhancements.includes(item);
                      return (
                        <button key={item} type="button" className={`launch-enhancement-card ${selected ? "launch-enhancement-card-active" : ""}`} onClick={() => toggleEnhancement(item)} aria-pressed={selected}>
                          <span className="launch-enhancement-title">{item}</span>
                          <span className="launch-enhancement-copy">{detail}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {step === 3 ? (
                <section className="launch-section">
                  <div className="launch-section-head"><p className="launch-section-kicker">03. Timing & Readiness</p><h2 className="launch-section-title">{STEPS[2].title}</h2></div>
                  <div className="launch-field-grid">
                    <div className="launch-field-span">
                      <p className="form-label">When do you want the site live?</p>
                      <div className={`launch-urgency-grid ${errors.urgency ? "launch-toggle-row-invalid" : ""}`}>
                        {URGENCY_OPTIONS.map((option) => {
                          const selected = values.urgency === option.value;
                          return (
                            <button key={option.value} type="button" className={`launch-urgency-card ${selected ? "launch-urgency-card-active" : ""}`} onClick={() => updateValue("urgency", option.value)} aria-pressed={selected}>
                              <span className="launch-toggle-title">{option.value}</span>
                              <span className="launch-toggle-copy">{option.detail}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.urgency ? <p className="form-error">{errors.urgency}</p> : null}
                    </div>
                    <div>
                      <p className="form-label">Brand assets ready?</p>
                      <div className="launch-toggle-row">
                        {READY_OPTIONS.map((option) => {
                          const selected = values.brandReady === option.value;
                          return (
                            <button key={`brand-${option.value}`} type="button" className={`launch-toggle-card ${selected ? "launch-toggle-card-active" : ""}`} onClick={() => updateValue("brandReady", option.value)} aria-pressed={selected}>
                              <span className="launch-toggle-title">{option.label}</span>
                              <span className="launch-toggle-copy">{option.detail}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="form-label">Copy ready?</p>
                      <div className="launch-toggle-row">
                        {READY_OPTIONS.map((option) => {
                          const selected = values.copyReady === option.value;
                          return (
                            <button key={`copy-${option.value}`} type="button" className={`launch-toggle-card ${selected ? "launch-toggle-card-active" : ""}`} onClick={() => updateValue("copyReady", option.value)} aria-pressed={selected}>
                              <span className="launch-toggle-title">{option.label}</span>
                              <span className="launch-toggle-copy">{option.detail}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              {step === 4 ? (
                <section className="launch-result-shell" aria-live="polite">
                  {result && packageItem ? (
                    <>
                      <div className="launch-result-hero">
                        <p className="launch-result-kicker">Live estimate</p>
                        <h2 className="launch-result-headline">{result.headline}</h2>
                        <p className="launch-result-copy">Projected live date if you apply now: <strong>{result.projectedDate}</strong></p>
                      </div>
                      <div className="launch-result-grid">
                        <div className="launch-result-card">
                          <p className="launch-result-label">Recommendation</p>
                          <p className="launch-result-recommendation">
                            Based on your choices, we recommend <span>{packageItem.name}</span>.
                          </p>
                          <p className="launch-result-price">{getPackagePricing(packageItem).primary}</p>
                          {getPackagePricing(packageItem).secondary ? <p className="launch-result-meta">{getPackagePricing(packageItem).secondary}</p> : null}
                          <p className="launch-result-meta">Typical package timeline: {packageItem.timeline}</p>
                          <p className="launch-result-copy">{result.explanation}</p>
                          {result.budgetNote ? <p className="launch-result-budget-note">{result.budgetNote}</p> : null}
                          <ul className="launch-result-list">{packageItem.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                        <div className="launch-result-card">
                          <p className="launch-result-label">Why this fits</p>
                          <ul className="launch-result-list">
                            <li>{formatPageCountLabel(values.pages)} are currently planned for launch.</li>
                            <li>{values.enhancements.length > 0 ? `${values.enhancements.length} enhancement${values.enhancements.length === 1 ? "" : "s"} add build depth.` : "No extra enhancements are selected yet."}</li>
                            <li>{values.hasExistingSite === "yes" ? "Migration and improvement work add complexity." : "A fresh launch path keeps migration complexity lower."}</li>
                            <li>We are planning around ~{formatGBP(result.budgetGbp)} GBP behind the scenes.</li>
                          </ul>
                          <p className="launch-result-next-step">{result.nextStep}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="launch-result-placeholder">
                      <p className="launch-result-kicker">Live estimate</p>
                      <h2 className="launch-result-headline">Add your website goal, budget, and timing to unlock your launch estimate.</h2>
                      <p className="launch-result-copy">Once those basics are in place, we will show the package fit, time-to-launch estimate, and the clearest next step.</p>
                    </div>
                  )}
                </section>
              ) : null}
            </div>
          </div>

          <div className="launch-step-actions">
            {step > 1 ? <Button type="button" variant="secondary" onClick={goBack}>Previous</Button> : <span />}
            {step < 4 ? <Button type="button" onClick={goNext}>Continue</Button> : <Button href="/contact">Start your application</Button>}
          </div>
        </div>

        <aside className="launch-summary" aria-label="Live summary">
          <p className="launch-summary-kicker">Live summary</p>
          <div className="launch-summary-stack">
            <div className="launch-summary-item"><span>Package</span><strong>{summary.packageLabel}</strong></div>
            <div className="launch-summary-item"><span>Estimated time to launch</span><strong>{summary.timelineLabel}</strong></div>
            <div className="launch-summary-item"><span>Pages</span><strong>{summary.pagesLabel}</strong></div>
            <div className="launch-summary-item"><span>Key enhancements</span><strong>{summary.enhancementLabel}</strong></div>
            <div className="launch-summary-item"><span>Budget entered</span><strong>{summary.budgetLabel}</strong><small className="launch-summary-note">{summary.planningBudgetLabel}</small></div>
            <div className="launch-summary-item"><span>Next step</span><strong>{summary.nextStep}</strong></div>
          </div>
          {packageItem ? (
            <article className="launch-summary-package">
              <p className="launch-summary-package-name">{packageItem.name}</p>
              <p className="launch-summary-package-price">{getPackagePricing(packageItem).primary}</p>
              {getPackagePricing(packageItem).secondary ? <p className="launch-summary-package-meta">{getPackagePricing(packageItem).secondary}</p> : null}
            </article>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
