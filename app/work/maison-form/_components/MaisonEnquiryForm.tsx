"use client";

import { FormEvent, useState } from "react";

export default function MaisonEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mf-enquiry-success" role="status">
        <p className="mf-eyebrow">Enquiry noted</p>
        <h2>Thank you.</h2>
        <p>
          This is a demonstration form, so nothing has been transmitted. A live White Glove site would connect this
          moment to the studio&apos;s preferred enquiry workflow.
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          Return to form
        </button>
      </div>
    );
  }

  return (
    <form className="mf-enquiry-form" onSubmit={handleSubmit}>
      <label>
        <span>Your name *</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>Email address *</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Project location</span>
        <input name="location" autoComplete="country-name" />
      </label>
      <label>
        <span>Nature of enquiry *</span>
        <select name="enquiry" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Residential interior</option>
          <option>Hospitality project</option>
          <option>Furniture & objects</option>
          <option>Press or collaboration</option>
        </select>
      </label>
      <label className="mf-field-full">
        <span>Tell us about the place *</span>
        <textarea name="message" rows={5} required />
      </label>
      <label className="mf-consent mf-field-full">
        <input name="consent" type="checkbox" required />
        <span>I understand this is a fictional demonstration and no enquiry will be sent.</span>
      </label>
      <button className="mf-submit" type="submit">
        Submit private enquiry ↗
      </button>
    </form>
  );
}
