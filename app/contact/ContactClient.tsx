'use client';

import { useMemo, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { CONTACT_BUDGET_OPTIONS, PACKAGES, formatGBP, type PackageId } from "../../lib/pricing";

type ContactFormValues = {
  selectedPlanId: PackageId;
  name: string;
  email: string;
  phone: string;
  website: string;
  studio: string;
  projectType: string;
  timeline: string;
  budgetRange: string;
  preferredContact: string;
  brandAssets: string;
  copywriting: string;
  message: string;
  companyWebsite: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  selectedPlanId: "entry",
  name: "",
  email: "",
  phone: "",
  website: "",
  studio: "",
  projectType: "",
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

  if (!values.projectType) errors.projectType = "Please select a website type.";
  if (!values.timeline) errors.timeline = "Please select your preferred start window.";
  if (!values.budgetRange) errors.budgetRange = "Please select a project budget.";
  if (!values.selectedPlanId) errors.selectedPlanId = "Please choose a plan.";
  if (!values.preferredContact) errors.preferredContact = "Please select a preferred contact method.";

  if (!values.message.trim()) {
    errors.message = "Please share a brief project outline.";
  } else if (values.message.trim().length < 30) {
    errors.message = "Please add at least 30 characters for a useful review.";
  }

  return errors;
}

export default function ContactClient() {
  const [formValues, setFormValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
      studio: formValues.studio,
      projectType: formValues.projectType,
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
        setSubmitError(data?.error || "Unable to submit your enquiry right now.");
        return;
      }

      setSubmitted(true);
      setFormValues(initialValues);
      setErrors({});
    } catch {
      setSubmitError("Temporarily unavailable. Please email sleek.studiolondon@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-stack">
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
              return (
                <label
                  key={pkg.id}
                  className={`contact-plan-card ${isSelected ? "contact-plan-card-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="selectedPlanId"
                    value={pkg.id}
                    checked={isSelected}
                    onChange={handleChange}
                    onBlur={() => validateField("selectedPlanId")}
                  />
                  <p className="contact-plan-card-name">{pkg.name}</p>
                  <p className="contact-plan-card-price">{formatGBP(pkg.deposit)} initial deposit</p>
                  <p className="contact-plan-card-monthly">From {formatGBP(pkg.monthly)}/mo</p>
                  <p className="contact-plan-card-ideal-label">Ideal for</p>
                  <p className="contact-plan-card-ideal-copy">{pkg.intendedFor}</p>
                  <p className="contact-plan-card-description">{pkg.description}</p>
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
            <label htmlFor="projectType" className="form-label">
              Website Type
            </label>
            <select
              id="projectType"
              name="projectType"
              className={`form-field form-select ${errors.projectType ? "is-invalid" : ""}`}
              value={formValues.projectType}
              onChange={handleChange}
              onBlur={() => validateField("projectType")}
              aria-describedby={errors.projectType ? "project-type-error" : undefined}
            >
              <option value="">Select website type</option>
              <option value="Portfolio">Portfolio</option>
              <option value="Studio">Studio</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Multi-location">Multi-location</option>
            </select>
            {errors.projectType ? (
              <p id="project-type-error" className="form-error">
                {errors.projectType}
              </p>
            ) : null}
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
              <option value="This month">This month</option>
              <option value="Not sure">Not sure</option>
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
            Include priorities, must-have pages, and timeline context. Current characters: {detailsCharCount}
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
            Apply
          </Button>
          <Button type="button" variant="ghost" onClick={resetForm}>
            Clear form
          </Button>
        </div>

        <p className="contact-privacy">
          Privacy note: your details are used only to respond to this enquiry.
        </p>

        {submitted ? (
          <p className="contact-status contact-status-success" role="status">
            Enquiry received. We will reply within one business day with a recommended next step.
          </p>
        ) : null}

        {submitError ? (
          <p className="contact-status contact-status-error" role="alert">
            {submitError}
          </p>
        ) : null}
      </form>
    </div>
  );
}


