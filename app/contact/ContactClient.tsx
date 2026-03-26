'use client';

import { useMemo, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { CONTACT_BUDGET_OPTIONS, PACKAGES, getPackagePricing, type PackageId } from "../../lib/pricing";

type ContactFormValues = {
  selectedPlanId: PackageId;
  name: string;
  email: string;
  phone: string;
  website: string;
  inspirationWebsite: string;
  studio: string;
  timeline: string;
  budgetRange: string;
  preferredContact: string;
  brandAssets: string;
  copywriting: string;
  message: string;
  companyWebsite: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

type SubmittedEnquirySnapshot = {
  selectedPlanName: string;
  name: string;
  email: string;
  preferredContact: string;
  timeline: string;
  budgetRange: string;
  studio: string;
  website: string;
  inspirationWebsite: string;
};

const initialValues: ContactFormValues = {
  selectedPlanId: "entry",
  name: "",
  email: "",
  phone: "",
  website: "",
  inspirationWebsite: "",
  studio: "",
  timeline: "",
  budgetRange: "",
  preferredContact: "",
  brandAssets: "",
  copywriting: "",
  message: "",
  companyWebsite: "",
};

function validateForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.timeline) errors.timeline = "Please select your preferred start window.";
  if (!values.budgetRange) errors.budgetRange = "Please select a project budget.";
  if (!values.selectedPlanId) errors.selectedPlanId = "Please choose a plan.";
  if (!values.preferredContact) errors.preferredContact = "Please select a preferred contact method.";

  if (!values.message.trim()) {
    errors.message = "Please share a brief project outline.";
  }

  return errors;
}

export default function ContactClient() {
  const [formValues, setFormValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<SubmittedEnquirySnapshot | null>(null);
  const [expandedPlans, setExpandedPlans] = useState<Partial<Record<PackageId, boolean>>>({});
  const lastSubmitAtRef = useRef(0);

  const detailsCharCount = useMemo(() => formValues.message.trim().length, [formValues.message]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "selectedPlanId") {
      const selectedPlanId = value as PackageId;
      setFormValues((prev) => ({ ...prev, selectedPlanId }));
      setErrors((prev) => ({ ...prev, selectedPlanId: "" }));
      return;
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (field: keyof ContactFormValues) => {
    const validationErrors = validateForm(formValues);
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] ?? "" }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
    setSubmittedSnapshot(null);
    setExpandedPlans({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
    setSubmitError("");
    setSubmitted(false);

    if (Object.keys(validationErrors).length > 0) return;

    const now = Date.now();
    if (now - lastSubmitAtRef.current < 8000) {
      setSubmitError("Please wait a few seconds before sending another enquiry.");
      return;
    }

    lastSubmitAtRef.current = now;
    setIsSubmitting(true);
    const selectedPlan = PACKAGES.find((pkg) => pkg.id === formValues.selectedPlanId);

    const payload = {
      selectedPlanId: formValues.selectedPlanId,
      selectedPlanName: selectedPlan?.name ?? formValues.selectedPlanId,
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      website: formValues.website,
      inspirationWebsite: formValues.inspirationWebsite,
      studio: formValues.studio,
      timeline: formValues.timeline,
      budgetRange: formValues.budgetRange,
      preferredContact: formValues.preferredContact,
      brandAssets: formValues.brandAssets,
      copywriting: formValues.copywriting,
      message: formValues.message,
      companyWebsite: formValues.companyWebsite,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data: { ok?: boolean; error?: string } | null = null;

      try {
        data = text ? (JSON.parse(text) as { ok?: boolean; error?: string }) : null;
      } catch {
        data = null;
      }

      if (!response.ok || !data?.ok) {
        setSubmitError("Something went wrong. Please try again.");
        return;
      }

      setSubmittedSnapshot({
        selectedPlanName: payload.selectedPlanName,
        name: payload.name.trim(),
        email: payload.email.trim(),
        preferredContact: payload.preferredContact,
        timeline: payload.timeline,
        budgetRange: payload.budgetRange,
        studio: payload.studio.trim(),
        website: payload.website.trim(),
        inspirationWebsite: payload.inspirationWebsite.trim(),
      });
      setSubmitted(true);
      setSubmitError("");
      setFormValues(initialValues);
      setErrors({});
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submittedSummaryItems = submittedSnapshot
    ? [
        { label: "Selected package", value: submittedSnapshot.selectedPlanName },
        { label: "Name", value: submittedSnapshot.name },
        { label: "Email", value: submittedSnapshot.email },
        { label: "Preferred contact", value: submittedSnapshot.preferredContact },
        { label: "Timeline", value: submittedSnapshot.timeline },
        { label: "Budget", value: submittedSnapshot.budgetRange },
        submittedSnapshot.studio ? { label: "Studio name", value: submittedSnapshot.studio } : null,
        submittedSnapshot.website ? { label: "Website", value: submittedSnapshot.website } : null,
        submittedSnapshot.inspirationWebsite
          ? { label: "Inspiration website", value: submittedSnapshot.inspirationWebsite }
          : null,
      ].filter((item): item is { label: string; value: string } => Boolean(item))
    : [];

  const successProcessItems = [
    {
      title: "Initial review",
      copy: "Scope, budget, and preferred timing are reviewed together so the right route is clear from the outset.",
    },
    {
      title: "Project handling",
      copy: "Each enquiry is assessed with the same level of care used for active studio work and launch planning.",
    },
    {
      title: "Response window",
      copy: "A considered reply follows within one business day with the most appropriate next step.",
    },
  ];

  return (
    <div className="contact-form-stack">
      {submitted && submittedSnapshot ? (
        <div className="contact-success-layout" role="status" aria-live="polite">
          <section className="contact-success-panel">
            <p className="contact-success-kicker">Enquiry submitted</p>
            <h3 className="contact-success-title">Enquiry received</h3>
            <p className="contact-success-copy">
              A confirmation email has been sent. Your enquiry is now under review.
            </p>
            <div className="contact-success-summary">
              {submittedSummaryItems.map((item) => (
                <div key={item.label} className="contact-success-summary-item">
                  <p className="contact-success-summary-label">{item.label}</p>
                  {item.label === "Website" || item.label === "Inspiration website" ? (
                    <a
                      className="contact-success-summary-value contact-success-summary-link"
                      href={item.value}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact-success-summary-value">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
            <p className="contact-success-copy contact-success-copy-muted contact-success-closing">
              A response will follow within one business day.
            </p>
          </section>

          <section className="contact-success-process">
            <p className="contact-success-process-label">What happens next</p>
            <div className="contact-success-process-list">
              {successProcessItems.map((item) => (
                <div key={item.title} className="contact-success-process-item">
                  <p className="contact-success-process-title">{item.title}</p>
                  <p className="contact-success-process-copy">{item.copy}</p>
                </div>
              ))}
            </div>
            <p className="contact-success-process-note">
              Intake remains intentionally limited so each project can be handled with focus, care, and executional clarity.
            </p>
          </section>
        </div>
      ) : null}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <section className="contact-plan-step" aria-labelledby="contact-plan-heading">
            <div>
              <p className="form-label contact-plan-heading">Step 1</p>
              <h3 id="contact-plan-heading" className="contact-plan-title">
                Choose your plan
              </h3>
              <p className="contact-helper">
                Select the package that best fits your current scope. You can refine details in the project brief below.
              </p>
            </div>

            <div className="contact-plan-grid" role="radiogroup" aria-label="Choose your plan">
              {PACKAGES.map((pkg) => {
                const isSelected = formValues.selectedPlanId === pkg.id;
                const pricing = getPackagePricing(pkg);
                const isExpanded = Boolean(expandedPlans[pkg.id]);
                const detailsId = `contact-plan-details-${pkg.id}`;

                return (
                  <label
                    key={pkg.id}
                    className={`contact-plan-card ${isSelected ? "contact-plan-card-active" : ""}`}
                  >
                    <div className="contact-plan-card-summary">
                      <input
                        type="radio"
                        name="selectedPlanId"
                        value={pkg.id}
                        checked={isSelected}
                        onChange={handleChange}
                        onBlur={() => validateField("selectedPlanId")}
                      />
                      <div className="contact-plan-card-head">
                        <p className="contact-plan-card-name">{pkg.name}</p>
                      </div>
                      <div className="contact-plan-card-pricing">
                        {pricing.primary ? <p className="contact-plan-card-price">{pricing.primary}</p> : null}
                        {pricing.secondary ? <p className="contact-plan-card-monthly">{pricing.secondary}</p> : null}
                      </div>
                      <div className="contact-plan-card-cta">
                        <button
                          type="button"
                          className="contact-plan-toggle"
                          aria-expanded={isExpanded}
                          aria-controls={detailsId}
                          onClick={(event) => {
                            event.preventDefault();
                            setExpandedPlans((prev) => ({ ...prev, [pkg.id]: !prev[pkg.id] }));
                          }}
                        >
                          {isExpanded ? "See less" : "See more"}
                        </button>
                      </div>
                    </div>
                    <div
                      className={`contact-plan-card-detail-shell ${
                        isExpanded ? "contact-plan-card-detail-shell-expanded" : ""
                      }`}
                      aria-hidden={!isExpanded}
                    >
                      <div id={detailsId} className="contact-plan-card-details">
                        <p className="contact-plan-card-description">{pkg.description}</p>
                        <p className="contact-plan-card-details-label">Included</p>
                        <ul className="contact-plan-card-perks">
                          {pkg.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {errors.selectedPlanId ? <p className="form-error">{errors.selectedPlanId}</p> : null}
          </section>

        <div className="contact-form-grid">
          <div>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              className={`form-field ${errors.name ? "is-invalid" : ""}`}
              value={formValues.name}
              onChange={handleChange}
              onBlur={() => validateField("name")}
              placeholder="Full name"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <p id="name-error" className="form-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              className={`form-field ${errors.email ? "is-invalid" : ""}`}
              type="email"
              value={formValues.email}
              onChange={handleChange}
              onBlur={() => validateField("email")}
              placeholder="you@studio.com"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p id="email-error" className="form-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              className="form-field"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="+44..."
            />
          </div>

          <div>
            <label htmlFor="preferredContact" className="form-label">
              Preferred contact method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              className={`form-field form-select ${errors.preferredContact ? "is-invalid" : ""}`}
              value={formValues.preferredContact}
              onChange={handleChange}
              onBlur={() => validateField("preferredContact")}
              aria-describedby={errors.preferredContact ? "preferred-contact-error" : undefined}
            >
              <option value="">Select contact method</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
            {errors.preferredContact ? (
              <p id="preferred-contact-error" className="form-error">
                {errors.preferredContact}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="studio" className="form-label">
              Studio Name (optional)
            </label>
            <input
              id="studio"
              name="studio"
              className="form-field"
              value={formValues.studio}
              onChange={handleChange}
              placeholder="Studio or practice name"
            />
          </div>

          <div>
            <label htmlFor="website" className="form-label">
              Current Website (optional)
            </label>
            <input
              id="website"
              name="website"
              className="form-field"
              value={formValues.website}
              onChange={handleChange}
              placeholder="https://yourstudio.com"
            />
          </div>

          <div>
            <label htmlFor="inspirationWebsite" className="form-label">
              Do you have a website you&apos;d like your new site to be inspired by? (optional)
            </label>
            <input
              id="inspirationWebsite"
              name="inspirationWebsite"
              className="form-field"
              value={formValues.inspirationWebsite}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="timeline" className="form-label">
              Preferred Start
            </label>
            <select
              id="timeline"
              name="timeline"
              className={`form-field form-select ${errors.timeline ? "is-invalid" : ""}`}
              value={formValues.timeline}
              onChange={handleChange}
              onBlur={() => validateField("timeline")}
              aria-describedby={errors.timeline ? "timeline-error" : undefined}
            >
              <option value="">Select start window</option>
              <option value="ASAP">ASAP</option>
              <option value="Within 2 weeks">Within 2 weeks</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="Flexible">Flexible</option>
            </select>
            {errors.timeline ? (
              <p id="timeline-error" className="form-error">
                {errors.timeline}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="budgetRange" className="form-label">
              Project Budget
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              className={`form-field form-select ${errors.budgetRange ? "is-invalid" : ""}`}
              value={formValues.budgetRange}
              onChange={handleChange}
              onBlur={() => validateField("budgetRange")}
              aria-describedby={errors.budgetRange ? "budget-error" : undefined}
            >
              <option value="">Select budget range</option>
              {CONTACT_BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.budgetRange ? (
              <p id="budget-error" className="form-error">
                {errors.budgetRange}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="brandAssets" className="form-label">
              Brand Assets Ready? (optional)
            </label>
            <select
              id="brandAssets"
              name="brandAssets"
              className="form-field form-select"
              value={formValues.brandAssets}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="copywriting" className="form-label">
              Copy/Content Ready? (optional)
            </label>
            <select
              id="copywriting"
              name="copywriting"
              className="form-field form-select"
              value={formValues.copywriting}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="form-label">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-field form-textarea ${errors.message ? "is-invalid" : ""}`}
            value={formValues.message}
            onChange={handleChange}
            onBlur={() => validateField("message")}
            placeholder="Project scope, goals, target launch window, and any constraints we should account for."
            aria-describedby={errors.message ? "message-error" : "message-hint"}
          />
          <p id="message-hint" className="contact-helper">
            Include priorities, must-have pages, launch timing, and anything we should account for. Current characters: {detailsCharCount}
          </p>
          {errors.message ? (
            <p id="message-error" className="form-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="companyWebsite">Company website</label>
          <input
            id="companyWebsite"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            value={formValues.companyWebsite}
            onChange={handleChange}
          />
        </div>

        <div className="contact-submit-row">
          <Button className="form-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Apply"}
          </Button>
          <Button type="button" variant="ghost" onClick={resetForm} disabled={isSubmitting}>
            Clear form
          </Button>
        </div>

        <p className="contact-privacy">
          Privacy note: your details are used only to respond to this enquiry.
        </p>

        {submitError ? (
          <p className="contact-status contact-status-error" role="alert">
            {submitError}
          </p>
        ) : null}
        </form>
      ) : null}
    </div>
  );
}


