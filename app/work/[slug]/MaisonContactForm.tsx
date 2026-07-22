"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MaisonContactForm() {
  const router = useRouter();
  const [dossier, setDossier] = useState({ propertyType: "Private residence", location: "London", focus: "Residence planning", privacy: "Principal-led and discreet", appointment: "Private studio appointment", areas: "Arrival, dining, principal suite", notes: "" });
  const update = (key: keyof typeof dossier, value: string) => setDossier((current) => ({ ...current, [key]: value }));

  return (
    <>
      <div className="maison2-dossier-builder maison4-reveal" aria-label="Private commission dossier builder">
        <div className="maison2-builder-head"><p className="maison2-kicker">Private dossier builder</p><h2>Prepare the shape of a confidential appointment.</h2><p>This interactive concept stays local to the preview and prepares a sample summary only.</p></div>
        <div className="maison2-builder-grid">
          <label><span>Property type</span><select value={dossier.propertyType} onChange={(event) => update("propertyType", event.target.value)}><option>Private residence</option><option>International residence</option><option>Hospitality suite</option><option>Atelier procurement</option></select></label>
          <label><span>Location</span><select value={dossier.location} onChange={(event) => update("location", event.target.value)}><option>London</option><option>Paris</option><option>Geneva</option><option>New York</option><option>Private estate</option></select></label>
          <label><span>Project focus</span><select value={dossier.focus} onChange={(event) => update("focus", event.target.value)}><option>Residence planning</option><option>Hospitality atmosphere</option><option>Atelier procurement</option><option>Installation stewardship</option></select></label>
          <label><span>Privacy level</span><select value={dossier.privacy} onChange={(event) => update("privacy", event.target.value)}><option>Principal-led and discreet</option><option>Private office coordination</option><option>Family office introduction</option><option>Representative-led appointment</option></select></label>
          <label><span>Appointment type</span><select value={dossier.appointment} onChange={(event) => update("appointment", event.target.value)}><option>Private studio appointment</option><option>Site visit</option><option>Private office call</option><option>Atelier review</option></select></label>
          <label><span>Key rooms / areas</span><input value={dossier.areas} onChange={(event) => update("areas", event.target.value)} /></label>
          <label className="maison3-builder-notes"><span>Notes for the principal or private office</span><textarea value={dossier.notes} onChange={(event) => update("notes", event.target.value)} rows={5} placeholder="Share privacy considerations, decision-makers, or rooms that require particular attention." /></label>
        </div>
        <div className="maison2-builder-summary"><span>Sample dossier prepared</span><p>Recommended next step: private appointment.</p><p>Focus areas: {dossier.focus.toLowerCase()}, {dossier.propertyType.toLowerCase()}, {dossier.areas.toLowerCase()}.</p></div>
      </div>
      <form className="maison2-dossier maison4-reveal" onSubmit={(event) => { event.preventDefault(); router.push("/work/maison-form/contact/confirmation"); }}>
        <fieldset><legend>Representative</legend><label><span>Representative / assistant contact</span><input name="representative" type="text" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label></fieldset>
        <fieldset><legend>Property</legend><label><span>Preferred appointment location</span><input name="location" type="text" placeholder="London, Paris, Geneva, New York, private estate…" required /></label><label><span>Property type</span><select name="propertyType" defaultValue="" required><option value="" disabled>Select one</option><option>Private residence</option><option>International residence</option><option>Hospitality suite</option><option>Atelier procurement</option></select></label></fieldset>
        <fieldset><legend>Appointment</legend><label><span>Appointment preference</span><input name="appointment" type="text" placeholder="Principal introduction, private office call, atelier appointment, or site visit" required /></label></fieldset>
        <fieldset className="maison2-confidential"><legend>Confidential note</legend><label><span>Confidential project note</span><textarea name="message" rows={9} placeholder="Share property context, decision-makers, privacy considerations, and desired appointment cadence." required /></label></fieldset>
        <button type="submit">Preview private appointment request</button>
        <p className="maison2-note">Concept interaction only — no information is transmitted or delivered to Maison Form.</p>
      </form>
    </>
  );
}
