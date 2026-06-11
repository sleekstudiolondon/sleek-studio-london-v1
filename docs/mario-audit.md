# Mario Audit — Sleek Studio London

Audit/spec only. No implementation fixes were made.

## 1. Overall site verdict

The site already has a coherent luxury direction: warm neutrals, restrained language, editorial spacing, and package-aware example websites. It is not production-perfect. The highest-impact work for Luigi is to tighten navigation/discoverability, resolve package consistency for Maison Form, reduce visible unfinished/routing cues in example sites, and address build/runtime risks around Google font fetching and the enquiry API.

Overall impression: premium foundation, but a few rough edges make it feel less polished than a luxury studio site should.

## 2. Highest-priority issues

1. **Primary navigation hides the portfolio/work page.** `/work` exists, but `Navbar` and `Footer` do not link to it, which weakens conversion and makes the portfolio feel buried.
2. **Example-site “Back to Projects” links point to `/about#projects`, but the rendered About page does not include a matching projects section/id.** `AboutCaseStudiesSection` has `id="projects-showcase"`, while CSS references `#projects`; the About page currently does not render the case-study section at all.
3. **Maison Form claims White Glove / 20+ pages but currently defines only 8 pages.** The package copy says 20+ pages, concierge-level delivery, and bespoke depth; the implementation should either expand the visible architecture or clearly present additional page families without making dead links.
4. **Build failed in this environment due to `next/font/google` fetch failures.** This is probably an environment/network issue, but it is still a deployment risk if build environments cannot reach Google Fonts reliably.
5. **Contact API silently accepts submissions when `RESEND_API_KEY` is missing.** Good for dev, risky in staging/production because users can see success while no email is sent.
6. **Security audit could not complete because npm audit returned 403 from the registry endpoint.** No dependency vulnerability conclusion should be made until Luigi/Bowser rerun it in a working environment.

## 3. Page-by-page findings

### Homepage

- Visual direction is strong: restrained headline, minimal CTA row, editorial “Why it matters,” outcome cards, and a clear audience section.
- The homepage lacks a direct portfolio proof path. Add a restrained secondary CTA or section link to `/work` or to package examples so visitors can verify quality before applying.
- “Apply now” is clear but may feel slightly transactional for a luxury buyer. Consider “Start a private enquiry” or “Request a consultation” while keeping one consistent primary CTA.
- The page is copy-led and elegant, but a premium visual proof moment could improve conversion if added carefully. Do not redesign; add only a small proof/project pathway if needed.

### Portfolio / case studies (`/work` and `/work/[slug]`)

- `/work` exists and renders case-study cards, but it is not linked from main nav/footer.
- Case-study cards use credible structure: image, location/year/focus, challenge, strategy, impact.
- Current case studies are generic interiors projects, not clearly web-design case studies for interior studios. For a web studio, Luigi should clarify that the case studies are digital outcomes, not interior-design projects delivered by Sleek Studio.
- Metrics are strong but should be credible and consistently framed as examples/outcomes.
- Ensure all case-study detail pages have a clear next-step CTA and no orphaned navigation.

### Studio Alder / Studio Alter Interiors

- The code uses **Studio Alder Interiors**. The user mentions Studio Alder / Studio Alter; Luigi should confirm naming and avoid mixed branding.
- Alder aligns better than Maison Form with the package requirements: `packageId: "mid"`, 8 pages, and repeated “The House” language are present.
- Alder has exactly 8 page definitions: Home, About, Portfolio, Services, Projects, Process, Journal, Contact.
- The House proof points are visible: 8-page structure, 5 weekly changes, and 48h turnaround.
- Risk: the site may over-explain the package inside the example website. Keep package framing visible enough for sales, but the example should primarily feel like a finished interior studio website.

### Maison Form Interiors

- Stronger visual/language concept than Alder: more cinematic, high-end, and White Glove-coded.
- Major inconsistency: `packageId: "top"` and copy promise 20+ pages, but the page definitions show only 8 pages.
- White Glove should feel fully bespoke. Current repeated sections may communicate depth, but not enough visible architecture to substantiate 20+ pages.
- Luigi should add/substantiate page families or subpage architecture in a controlled way, not blindly create 20 empty pages. Better: add curated navigation groups/route examples such as residences, hospitality, process, procurement, press, journal, private client portal note, project detail pathways, etc., if supported by the existing data model.

### Packages / pricing (`/services`)

- Pricing data is mostly aligned with the requested package facts:
  - The House: 8 pages, 5 changes per week, 48-hour turnaround.
  - White Glove: 20+ pages, concierge launch support, 24-hour priority modifications.
- Services page headline/subtitle repeats “Choose...” twice. Tighten the hero copy.
- CTAs vary between “Book a consultation,” “Apply now,” “Request access,” and “Request White Glove consultation.” Standardise CTA language by intent.
- Package cards should link to relevant examples and contact with clearer labels: “View The House example,” “Request a private enquiry,” etc.

### Navigation

- Main site nav: Home, Services, Process, About, Contact. Missing Work/Portfolio.
- Footer repeats the same omission. Add Work/Portfolio to both.
- Example-site nav can be very wide, especially Maison; check wrapping and horizontal overflow on mobile.
- The homepage hides Home from nav, which is acceptable, but ensure this does not create odd spacing or reduced orientation.

### Footer

- Footer is minimal and clean but too bare for a premium/conversion site.
- Add Work/Portfolio and perhaps a discreet email/social/contact line if it does not clutter.
- Copyright uses `(c)` instead of `©`; small polish fix.

### Contact / CTA sections

- Contact form success state is strong and reassures the user.
- External URLs in the success summary use `target="_blank"` with `rel="noreferrer"`; add `noopener` explicitly for best practice.
- The API returns success without sending if `RESEND_API_KEY` is missing. Keep dev convenience only if gated by `NODE_ENV !== "production"`.
- CTAs should be calmer and more consistent: “Start a private enquiry,” “Request consultation,” or “Discuss your website” instead of too many labels.

## 4. Studio Alder/Alter recommendations

1. Decide final name: **Studio Alder Interiors** or **Studio Alter Interiors**. Update every visible label and alt text consistently if the intended brand is Alter.
2. Keep it aligned to **The House**:
   - 8 pages.
   - 5 changes per week.
   - 48h turnaround.
   - Premium interior studio website.
3. Do not expand Alder beyond 8 pages. The page count is the proof.
4. Keep the package metrics visible in the example, but reduce any language that makes the site feel like a sales explainer rather than a live interiors website.
5. Check Alder mobile nav and home hero spacing manually at ~375px, 768px, and desktop.

## 5. Maison Form recommendations

1. Preserve the White Glove tone: cinematic restraint, rare materials, discretion, private-client experience.
2. Resolve the 20+ page mismatch. Options:
   - Best: add visible page architecture showing 20+ possible pages through grouped navigation/sections and selected route examples.
   - Acceptable: keep 8 live demo pages but add a clear “20+ architecture map” section that itemises the deeper bespoke pages without making dead links.
   - Avoid: simply duplicating low-value pages to reach 20.
3. Emphasise concierge delivery and 24h turnaround in the sales wrapper, but let the Maison example itself feel like a real high-end studio site.
4. Add richer project pathways for White Glove: project detail, sector, location, press/journal, process/procurement, and private enquiry.
5. Check mobile: Maison nav is likely the highest risk for wrapping/overflow because it has a luxury header plus many links.

## 6. Package alignment fixes

- `lib/pricing.ts` is aligned to requested package facts and should remain the source of truth.
- `lib/packageExamples.ts` needs consistency work:
  - Alder: keep exactly 8 pages and The House copy.
  - Maison: current 8 pages conflict with 20+ White Glove positioning.
- `components/examples/ExampleWebsite.tsx` package presentation copy is aligned, but the page architecture behind Maison does not fully support the White Glove claim.
- Ensure Services package cards use the same terminology as example-site package ribbons.

## 7. Mobile/responsive fixes

Prioritise manual checks over broad redesign.

1. Main nav mobile overlay: verify focus order, menu close behaviour, and no page scroll trap issues.
2. Pricing cards: check CTA stack width on mobile; buttons should not feel cramped.
3. Work cards: image/card/list content can become tall; check spacing and CTA visibility.
4. Alder home: check hero media + metrics stacking at 375px and 768px.
5. Maison: check header/nav wrapping and hero overlay/panel spacing at 375px and tablet.
6. Footer: ensure links wrap elegantly after Work/Portfolio is added.

## 8. Copy/CTA fixes

- Standardise primary CTA labels across the main site. Recommended set:
  - Primary: “Start a private enquiry” or “Request a consultation.”
  - Secondary: “View pricing” / “View work.”
  - White Glove: “Request White Glove consultation.”
- Services hero subtitle repeats “Choose”; rewrite once.
- Portfolio copy should clarify Sleek Studio creates websites for interior studios, not interior design schemes.
- Replace `(c)` with `©` in the footer.
- Keep luxury tone restrained; avoid adding hype or loud conversion language.

## 9. Technical risks

- `npm run build` failed because `next/font/google` could not fetch Google font CSS for Manrope, Bodoni Moda, Cormorant Garamond, and DM Serif Display. If this happens in CI/Vercel, production builds fail.
- `next.config.js` sets `images.unoptimized: true`, so Next image optimization is bypassed. This may be intentional for static hosting, but for a premium image-heavy site it can affect performance.
- `next.config.js` uses both `domains` and `remotePatterns`; `domains` is older style. Not urgent, but Luigi can simplify later.
- No lint script exists. Luigi should add/run a lint check only if project conventions allow; do not introduce a broad lint migration during this pass unless requested.
- `tsconfig.tsbuildinfo` is present in the repo file list. If tracked, consider removing from git and adding to `.gitignore` in a separate cleanup.

## 10. Security/configuration concerns

- No committed `.env` file was found besides `.env.example`.
- `npm run secrets:scan` passed.
- `RESEND_API_KEY` is server-side only; no bad `NEXT_PUBLIC` usage was found in the inspected files.
- Contact API uses a honeypot and validates required fields/email, but it does not rate-limit submissions.
- Contact API logs full payload when `RESEND_API_KEY` is missing. Keep this dev-only and avoid logging personal data in production.
- External links with `target="_blank"` use `rel="noreferrer"`; add `noopener` explicitly.
- `npm audit --audit-level=moderate` could not complete due to npm registry 403; dependency risk remains unknown.

## 11. Exact files Luigi will likely need to edit

- `components/Navbar.tsx` — add Work/Portfolio link and verify mobile menu behaviour.
- `components/Footer.tsx` — add Work/Portfolio link, polish copyright, possibly add restrained contact/social link.
- `app/(site)/page.tsx` — optional homepage proof/portfolio CTA and CTA label consistency.
- `app/(site)/services/page.tsx` — fix repeated hero copy and CTA labels.
- `lib/pricing.ts` — only if package wording needs source-of-truth copy adjustments; facts are currently aligned.
- `lib/packageExamples.ts` — Alder/Alter naming decision; Maison 20+ architecture alignment; package copy tightening.
- `components/examples/ExampleWebsite.tsx` — fix `/about#projects` links, package/example wrapper copy, Maison navigation behaviour if needed.
- `components/marketing/AboutCaseStudiesSection.tsx` — either render it on About or align ids/anchors if used elsewhere.
- `app/(site)/about/page.tsx` — if the project/example section should live on About; fix social rel attributes.
- `app/contact/ContactClient.tsx` — add `noopener`, CTA/success copy tweaks if needed.
- `app/api/enquiry/route.ts` — production-safe missing `RESEND_API_KEY` handling, reduce PII logging, consider rate limiting.
- `app/layout.tsx` — consider self-hosted/local fonts or build-safe font fallback strategy.
- `next.config.js` — review `images.unoptimized` and image config after performance decision.
- `.gitignore` — if `tsconfig.tsbuildinfo` is tracked or should be ignored.

## 12. Step-by-step implementation plan for Luigi

1. **Navigation polish**
   - Add Work/Portfolio to `Navbar` and `Footer`.
   - Verify active state for `/work` and `/work/[slug]`.
2. **Fix broken/back anchors**
   - Replace `/about#projects` links with the correct destination, likely `/services#projects-showcase` if examples are on services, or render `AboutCaseStudiesSection` on About with a stable `id="projects"`.
   - Keep one canonical project-example anchor.
3. **Package consistency**
   - Confirm Studio Alder vs Studio Alter naming.
   - Keep Alder exactly 8 pages and The House language.
   - Resolve Maison’s 20+ White Glove mismatch through architecture map or additional high-value pages.
4. **Copy/CTA pass**
   - Standardise CTA labels.
   - Rewrite services hero subtitle.
   - Clarify portfolio/case-study language as web-design outcomes for interior studios.
5. **Mobile pass**
   - Manually inspect homepage, services, work, contact, Alder, and Maison at mobile/tablet/desktop.
   - Fix only clear spacing/wrapping issues.
6. **Technical hardening**
   - Make missing `RESEND_API_KEY` fail safely in production.
   - Add `noopener` to external links.
   - Decide whether font fetching should remain `next/font/google` or move to a more reliable local/self-hosted approach.
7. **Checks**
   - Run tests and build.
   - Rerun secrets scan and audit in an environment where npm audit can access the registry.

## 13. What Luigi should not touch

- Do not redesign the visual identity from scratch.
- Do not replace the whole design system or Tailwind setup.
- Do not change package prices unless explicitly requested.
- Do not remove the luxury/minimal/editorial tone.
- Do not create fake 20 pages of thin Maison content just to satisfy the count.
- Do not add new heavy dependencies unless necessary.
- Do not trigger production deployment, merge to main, or push production changes.
- Do not alter analytics unless there is a separate privacy/analytics task.

## 14. Checks Luigi should run after implementation

- `npm test -- --runInBand`
- `npm run build`
- `npm run secrets:scan`
- `npm audit --audit-level=moderate` or the project’s approved dependency audit command
- Manual route checks:
  - `/`
  - `/services`
  - `/work`
  - `/work/mayfair-townhouse`
  - `/contact`
  - `/projects/studio-alder-interiors`
  - `/projects/studio-alder-interiors/contact`
  - `/projects/maison-form-interiors`
  - `/projects/maison-form-interiors/contact`
- Manual responsive checks at ~375px, 768px, 1024px, and desktop.
- Submit a test contact form in a safe non-production environment with a configured test Resend key.
