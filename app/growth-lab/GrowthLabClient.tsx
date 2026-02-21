'use client'

import { useMemo, useState } from 'react'

const maturityOptions = [
  { id: 'new', label: 'New studio', multiplier: 0.9 },
  { id: 'growing', label: 'Growing studio', multiplier: 1.0 },
  { id: 'established', label: 'Established studio', multiplier: 1.12 }
]

const timeframeOptions = [3, 6, 12]

const serviceOptions = [
  {
    id: 'social',
    label: 'Social Media',
    detail: 'Editorial content cadence and community growth.',
    impact: { visibility: 1.22, enquiries: 1.1, positioning: 1.05 }
  },
  {
    id: 'website',
    label: 'Website',
    detail: 'Conversion-led experience with refined lead capture.',
    impact: { visibility: 1.18, enquiries: 1.35, positioning: 1.12 }
  },
  {
    id: 'branding',
    label: 'Branding',
    detail: 'Luxury positioning and elevated studio narrative.',
    impact: { visibility: 1.12, enquiries: 1.18, positioning: 1.35 }
  },
  {
    id: 'seo',
    label: 'SEO',
    detail: 'High-intent visibility for London-based clients.',
    impact: { visibility: 1.3, enquiries: 1.25, positioning: 1.08 }
  }
]

const formatNumber = (value: number) => value.toLocaleString()

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function GlossaryTerm({ term, plain }: { term: string, plain: string }) {
  const [open, setOpen] = useState(false)
  const tooltipId = `term-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <span className="term-help">
      <button
        type="button"
        className="term-trigger"
        aria-describedby={tooltipId}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {term}
      </button>
      <span id={tooltipId} role="tooltip" className={`term-tooltip ${open ? 'is-open' : ''}`}>
        {plain}
      </span>
    </span>
  )
}

export default function GrowthLabPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [maturity, setMaturity] = useState('growing')
  const [monthlyEnquiries, setMonthlyEnquiries] = useState(6)
  const [budget, setBudget] = useState(9500)
  const [timeframe, setTimeframe] = useState(6)
  const [services, setServices] = useState({ social: true, website: true, branding: false, seo: false })

  const toggleService = (serviceId: keyof typeof services) => {
    setServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }))
  }

  const handleButtonKeys = (event: React.KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const handleRangeKeys = (
    event: React.KeyboardEvent<HTMLInputElement>,
    min: number,
    max: number,
    step: number,
    setValue: (value: number) => void,
    current: number
  ) => {
    let next = current
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(max, current + step)
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(min, current - step)
    if (event.key === 'Home') next = min
    if (event.key === 'End') next = max
    if (next !== current) {
      event.preventDefault()
      setValue(next)
    }
  }

  const selectedMaturity = maturityOptions.find(item => item.id === maturity) ?? maturityOptions[1]

  const projections = useMemo(() => {
    const budgetFactor = clamp(budget / 9000, 0.7, 1.6)
    const maturityFactor = selectedMaturity.multiplier

    const serviceFactor = serviceOptions.reduce(
      (acc, item) => {
        if (!services[item.id as keyof typeof services]) return acc
        return {
          visibility: acc.visibility * item.impact.visibility,
          enquiries: acc.enquiries * item.impact.enquiries,
          positioning: acc.positioning * item.impact.positioning
        }
      },
      { visibility: 1, enquiries: 1, positioning: 1 }
    )

    const monthlyVisibilityRate = 0.035 * budgetFactor * serviceFactor.visibility * (maturityFactor + 0.08)
    const monthlyEnquiryRate = 0.03 * budgetFactor * serviceFactor.enquiries * (maturityFactor + 0.05)

    const projectMetric = (start: number, rate: number, months: number) =>
      Math.round(start * Math.pow(1 + rate, months))

    const timelinePoints = timeframeOptions.map(months => {
      const enquiries = projectMetric(monthlyEnquiries, monthlyEnquiryRate, months)
      const visibilityIndex = projectMetric(100, monthlyVisibilityRate, months)
      const positioningScore = Math.round(
        clamp(58 * serviceFactor.positioning * maturityFactor + budgetFactor * 12 + months, 45, 96)
      )

      return {
        months,
        enquiries,
        visibilityIndex,
        positioningScore,
        visibilityLift: Math.round(((visibilityIndex - 100) / 100) * 100)
      }
    })

    const activeTimeline = timelinePoints.find(point => point.months === timeframe) ?? timelinePoints[1]

    const serviceCount = Object.values(services).filter(Boolean).length
    const positioningScore = activeTimeline.positioningScore

    const closeRate = 0.12 + (services.branding ? 0.03 : 0) + (services.website ? 0.02 : 0) + (maturity === 'established' ? 0.02 : 0)
    const avgProjectValue = Math.round(14000 * (services.branding ? 1.22 : 1) * (services.website ? 1.12 : 1))

    const annualLeads = Math.max(24, activeTimeline.enquiries * 12)
    const annualProjects = Math.max(3, Math.round(annualLeads * closeRate))

    const potentialRevenue = annualProjects * avgProjectValue
    const revenueRange = {
      min: Math.round(potentialRevenue * 0.85),
      max: Math.round(potentialRevenue * 1.2)
    }

    const costPerLead = Math.round(budget / Math.max(1, annualLeads))
    const costPerLeadRange = {
      min: Math.round(costPerLead * 0.82),
      max: Math.round(costPerLead * 1.18)
    }

    const fitScore = clamp(
      Math.round(positioningScore * 0.6 + budgetFactor * 18 + serviceCount * 6 + (monthlyEnquiries >= 8 ? 4 : 0)),
      50,
      96
    )

    const qualification = fitScore >= 82
      ? 'Ideal Fit'
      : fitScore >= 70
        ? 'Strong Growth Potential'
        : 'Foundational Stage'

    const qualificationMessage = qualification === 'Ideal Fit'
      ? 'Your studio has the budget and positioning depth to unlock premium growth quickly.'
      : qualification === 'Strong Growth Potential'
        ? 'A focused plan will build momentum while strengthening brand authority.'
        : 'A measured foundation phase will set the stage for sustainable growth.'

    const strategyNotes = [
      services.website ? 'Prioritise the conversion-led site experience to capture higher-intent enquiries.' : 'A refined website experience is the fastest way to raise enquiry quality.',
      services.branding ? 'Leverage the brand narrative to support premium pricing conversations.' : 'Brand positioning will elevate perceived value and improve close rates.',
      services.seo ? 'Sustain visibility gains with local search optimisation and editorial content.' : 'SEO will stabilise inbound visibility beyond paid or social channels.',
      services.social ? 'Maintain a calm, editorial social cadence to reinforce authority.' : 'Strategic social storytelling will keep the studio top of mind.'
    ]

    const strategicFocus = serviceCount >= 3
      ? 'Integrated visibility, conversion, and brand authority.'
      : serviceCount === 2
        ? 'Balanced improvement across two strategic levers.'
        : 'Focused refinement in a single priority area.'

    const whyThisWorks = services.website && services.branding
      ? 'Aligned brand clarity and conversion design lift both enquiry quality and close rates.'
      : services.seo && services.social
        ? 'Visibility compounds when organic search and editorial social storytelling reinforce one another.'
        : 'A targeted improvement creates momentum without diluting strategic focus.'

    const shortTermImpact = timeframe <= 3
      ? 'Expect measurable clarity and early visibility lift within the first quarter.'
      : timeframe <= 6
        ? 'Momentum builds with steady enquiry lift and stronger positioning signals.'
        : 'Compounding visibility and brand authority support sustained growth.'

    const longTermAdvantage = services.branding
      ? 'Positioning confidence supports premium pricing and higher-fit projects.'
      : 'A refined digital footprint builds a resilient, referral-ready reputation.'

    const growthLeverage = services.website
      ? 'Conversion-focused design turns elevated visibility into qualified enquiries.'
      : services.seo
        ? 'Compounded visibility raises inbound demand without diluting brand tone.'
        : 'Focused refinement keeps the strategy lean while building credibility.'

    const confidenceNote = fitScore >= 82
      ? 'Strong alignment between investment, service mix, and positioning maturity.'
      : fitScore >= 70
        ? 'Solid fundamentals with room to strengthen visibility and conversion.'
        : 'Foundational work will create the stability needed for scale.'

    return {
      timelinePoints,
      activeTimeline,
      positioningScore,
      annualLeads,
      annualProjects,
      revenueRange,
      costPerLeadRange,
      qualification,
      qualificationMessage,
      fitScore,
      strategicFocus,
      whyThisWorks,
      growthLeverage,
      shortTermImpact,
      longTermAdvantage,
      confidenceNote,
      positioningTier: positioningScore >= 85
        ? 'Elevated Positioning'
        : positioningScore >= 70
          ? 'Refined Positioning'
          : 'Foundational Positioning',
      strategyNotes,
      serviceCount
    }
  }, [budget, maturity, monthlyEnquiries, selectedMaturity.multiplier, services, timeframe])

  const selectedServiceLabels = serviceOptions
    .filter(item => services[item.id as keyof typeof services])
    .map(item => item.label)

  const primaryGrowthLever = selectedServiceLabels[0] ?? 'Foundational clarity'
  const estimatedPriority = selectedServiceLabels.length >= 3
    ? 'Integrated visibility and conversion lift'
    : selectedServiceLabels.length === 2
      ? 'Balanced lift across two levers'
      : 'Focused strategic refinement'

  const growthArchitecture = [
    {
      title: 'Core Visibility Engine',
      detail: services.seo || services.social
        ? 'Calibrated visibility across search-led discovery and curated studio presence.'
        : 'Baseline visibility foundation to stabilise inbound awareness.'
    },
    {
      title: 'Conversion Foundation',
      detail: services.website
        ? 'Conversion-led experience that qualifies and converts premium enquiries.'
        : 'Conversion hygiene improvements to support higher-fit leads.'
    },
    {
      title: 'Authority Signal Layer',
      detail: services.branding
        ? 'Luxury positioning signals that justify premium pricing and trust.'
        : 'Positioning calibration to strengthen authority cues.'
    },
    {
      title: 'Momentum Accelerator',
      detail: selectedServiceLabels.length >= 3
        ? 'Sequenced rollouts that compound visibility and enquiry velocity.'
        : 'Focused sequencing to build momentum without dilution.'
    }
  ]

  const getContactHref = (months: number) => {
    const packageLabel = selectedServiceLabels.length >= 3
      ? 'Comprehensive'
      : selectedServiceLabels.length === 2
        ? 'Balanced'
        : 'Focused'
    const params = new URLSearchParams({
      budget: String(budget),
      timeframe: String(months),
      package: packageLabel,
      maturity: selectedMaturity.label,
      enquiries: String(monthlyEnquiries),
      services: selectedServiceLabels.join(', '),
      fit: projections.qualification,
      strategy: selectedServiceLabels.length ? selectedServiceLabels.join(', ') : 'Focused foundation'
    })
    return `/contact?${params.toString()}`
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28">
      <section className="growth-intro mt-12">
        <p className="eyebrow">Growth Lab</p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">A private strategic consultation for refined growth.</h1>
        <p className="text-neutral-600 max-w-2xl">
          Use this guided session to explore how positioning, visibility, and lead strategy could evolve for your studio
          over the next year.
        </p>
      </section>

      <section className="growth-session mt-16">
        <div className="growth-step-grid">
          <div className={`growth-step ${activeStep === 1 ? 'is-active' : ''}`}>
            <button
              type="button"
              className="growth-step-header"
              onClick={() => setActiveStep(1)}
            >
              <div>
                <p className="growth-step-label">Step 1</p>
                <h2 className="font-serif text-2xl">Studio profile</h2>
                <p className="text-sm text-neutral-500">Establish the current baseline for strategic planning.</p>
              </div>
              <span className="growth-step-badge">Profile</span>
            </button>
            {activeStep === 1 && (
              <div className="growth-step-body">
                <label className="sim-label">
                  <span>
                    <GlossaryTerm term="Maturity" plain="Current stage of your business, from new to established." />
                  </span>
                  <div className="growth-timeframe">
                    {maturityOptions.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        className={`growth-chip ${maturity === option.id ? 'is-active' : ''}`}
                        onClick={() => setMaturity(option.id)}
                        onKeyDown={event => handleButtonKeys(event, () => setMaturity(option.id))}
                        role="button"
                        aria-pressed={maturity === option.id}
                        aria-label={`Select maturity level: ${option.label}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="sim-label">
                  Current monthly enquiries
                  <input
                    className="sim-range lux-range"
                    type="range"
                    min={2}
                    max={24}
                    step={1}
                    value={monthlyEnquiries}
                    onChange={event => setMonthlyEnquiries(Number(event.target.value))}
                    onKeyDown={event => handleRangeKeys(event, 2, 24, 1, setMonthlyEnquiries, monthlyEnquiries)}
                    aria-label="Current monthly enquiries"
                  />
                  <div className="sim-budget">
                    <span>{monthlyEnquiries} enquiries / month</span>
                    <span className="text-neutral-500">Private, design-led studios typically target 8-14</span>
                  </div>
                </label>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveStep(2)}
                >
                  Continue to investment
                </button>
              </div>
            )}
          </div>

          <div className={`growth-step ${activeStep === 2 ? 'is-active' : ''} ${activeStep < 2 ? 'is-muted' : ''}`}>
            <button
              type="button"
              className="growth-step-header"
              onClick={() => setActiveStep(2)}
              disabled={activeStep < 2}
            >
              <div>
                <p className="growth-step-label">Step 2</p>
                <h2 className="font-serif text-2xl">Investment level</h2>
                <p className="text-sm text-neutral-500">Align the budget with the depth of transformation.</p>
              </div>
              <span className="growth-step-badge">Investment</span>
            </button>
            {activeStep === 2 && (
              <div className="growth-step-body">
                <label className="sim-label">
                  Monthly investment
                  <input
                    className="sim-range sim-range-primary lux-range lux-range-primary"
                    type="range"
                    min={3500}
                    max={15000}
                    step={250}
                    value={budget}
                    onChange={event => setBudget(Number(event.target.value))}
                    onKeyDown={event => handleRangeKeys(event, 3500, 15000, 250, setBudget, budget)}
                    aria-label="Monthly investment"
                  />
                  <div className="sim-budget">
                    <span>£{formatNumber(budget)}</span>
                    <span className="text-neutral-500">Ideal range: £6.5k - £15k</span>
                  </div>
                </label>
                <label className="sim-label">
                  Timeframe focus
                  <div className="growth-timeframe">
                    {timeframeOptions.map(months => (
                      <button
                        key={months}
                        type="button"
                        className={`growth-chip ${timeframe === months ? 'is-active' : ''}`}
                        onClick={() => setTimeframe(months)}
                        onKeyDown={event => handleButtonKeys(event, () => setTimeframe(months))}
                        role="button"
                        aria-pressed={timeframe === months}
                        aria-label={`Select timeframe: ${months} months`}
                      >
                        {months} months
                      </button>
                    ))}
                  </div>
                </label>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveStep(3)}
                >
                  Continue to service focus
                </button>
              </div>
            )}
          </div>

          <div className={`growth-step ${activeStep === 3 ? 'is-active' : ''} ${activeStep < 3 ? 'is-muted' : ''}`}>
            <button
              type="button"
              className="growth-step-header"
              onClick={() => setActiveStep(3)}
              disabled={activeStep < 3}
            >
              <div>
                <p className="growth-step-label">Step 3</p>
                <h2 className="font-serif text-2xl">Service focus</h2>
                <p className="text-sm text-neutral-500">Select the strategic levers to prioritise.</p>
              </div>
              <span className="growth-step-badge">Focus</span>
            </button>
            {activeStep === 3 && (
              <div className="growth-step-body">
                <div className="sim-toggle-grid">
                  {serviceOptions.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      className={`sim-toggle ${services[item.id as keyof typeof services] ? 'is-active' : ''}`}
                      onClick={() => toggleService(item.id as keyof typeof services)}
                      onKeyDown={event => handleButtonKeys(event, () => toggleService(item.id as keyof typeof services))}
                      role="button"
                      aria-pressed={services[item.id as keyof typeof services]}
                      aria-label={`${services[item.id as keyof typeof services] ? 'Deselect' : 'Select'} ${item.label}`}
                    >
                      <span className="sim-toggle-label">{item.label}</span>
                      <span className="sim-toggle-desc">{item.detail}</span>
                      <span className="sim-toggle-indicator" />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-neutral-500">
                  Select multiple modules to layer visibility, conversion, and brand authority.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {activeStep >= 3 && (
        <section className="growth-results mt-20">
          <div className="growth-results-grid">
            <div className="sim-card growth-snapshot">
              <div className="sim-card-head">
                <div>
                  <p className="eyebrow">Selected strategy snapshot</p>
                  <h3 className="font-serif text-2xl">Live strategic summary</h3>
                </div>
                <span className="simulator-pill">Live</span>
              </div>
              <div className="snapshot-sections">
                <div className="snapshot-section">
                  <p className="sim-metric-title">Studio profile</p>
                  <div className="snapshot-field">
                    <span><GlossaryTerm term="Maturity" plain="Current stage of your business." /></span>
                    <strong>{selectedMaturity.label}</strong>
                  </div>
                  <div className="snapshot-field">
                    <span>Current enquiries</span>
                    <strong>{monthlyEnquiries} / month</strong>
                  </div>
                </div>
                <div className="snapshot-section">
                  <p className="sim-metric-title">Investment focus</p>
                  <div className="snapshot-field">
                    <span>Timeframe</span>
                    <strong>{timeframe} months</strong>
                  </div>
                  <div className="snapshot-field">
                    <span>Budget</span>
                    <strong>£{formatNumber(budget)} / month</strong>
                  </div>
                </div>
                <div className="snapshot-section">
                  <p className="sim-metric-title">Strategic identity</p>
                  <div className="snapshot-field">
                    <span><GlossaryTerm term="Positioning tier" plain="How clearly your brand communicates premium value." /></span>
                    <strong>{projections.positioningTier}</strong>
                  </div>
                  <div className="snapshot-field">
                    <span>Primary growth lever</span>
                    <strong>{primaryGrowthLever}</strong>
                  </div>
                  <div className="snapshot-field">
                    <span><GlossaryTerm term="Package" plain="The level of service mix you selected for this plan." /></span>
                    <strong>{estimatedPriority}</strong>
                  </div>
                </div>
              </div>
              <div className="snapshot-services">
                <p className="sim-metric-title">Growth Architecture</p>
                <div className="architecture-grid">
                  {growthArchitecture.map(item => (
                    <div key={item.title} className="architecture-card">
                      <p className="architecture-title">{item.title}</p>
                      <p className="text-sm text-neutral-600">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sim-card sim-card-hero">
              <div className="sim-card-head">
                <div>
                  <p className="eyebrow">Growth timeline</p>
                  <h3 className="font-serif text-2xl">Strategic roadmap</h3>
                </div>
                <span className="simulator-pill">Live</span>
              </div>
              <div className="segment-toggle">
                {timeframeOptions.map(months => (
                  <button
                    key={months}
                    type="button"
                    className={`segment-chip ${timeframe === months ? 'is-active' : ''}`}
                    onClick={() => setTimeframe(months)}
                  >
                    {months} Months
                  </button>
                ))}
              </div>
              <div className="sim-timeline roadmap">
                <div className="sim-timeline-card">
                  <div className="sim-timeline-header">
                    <span className="sim-milestone-label">{timeframe} month outlook</span>
                    <span className="sim-timeline-em">Selected</span>
                  </div>
                  <div className="roadmap-list">
                    <div className="roadmap-item">
                      <span className="roadmap-dot" />
                      <div>
                        <p className="roadmap-title">Monthly enquiries</p>
                        <p className="roadmap-value">{formatNumber(projections.activeTimeline.enquiries)}</p>
                        <div className="sim-progress-track">
                          <span style={{ width: `${clamp((projections.activeTimeline.enquiries / 24) * 100, 20, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="roadmap-item">
                      <span className="roadmap-dot" />
                      <div>
                        <p className="roadmap-title">Visibility lift</p>
                        <p className="roadmap-value">{projections.activeTimeline.visibilityLift}%</p>
                        <div className="sim-progress-track">
                          <span style={{ width: `${clamp(projections.activeTimeline.visibilityLift, 12, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="roadmap-item">
                      <span className="roadmap-dot" />
                      <div>
                        <p className="roadmap-title">Positioning score</p>
                        <p className="roadmap-value">{projections.activeTimeline.positioningScore}</p>
                        <div className="sim-progress-track">
                          <span style={{ width: `${clamp(projections.activeTimeline.positioningScore, 30, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sim-timeline-cta">
                    <p className="text-sm text-neutral-600">
                      Continue with the {timeframe}-month roadmap shaped by your current inputs.
                    </p>
                    <a className="btn-secondary" href={getContactHref(timeframe)}>
                      Continue With This Strategy
                    </a>
                  </div>
                </div>
              </div>
              <div className="sim-focus">
                <div>
                  <p className="sim-metric-title">Focus horizon ({timeframe} months)</p>
                  <p className="sim-focus-value">{formatNumber(projections.activeTimeline.enquiries)} enquiries / month</p>
                </div>
                <div>
                  <p className="sim-metric-title">Visibility lift</p>
                  <p className="sim-focus-value">{projections.activeTimeline.visibilityLift}% projected</p>
                </div>
              </div>
            </div>

            <div className="sim-card">
              <div className="sim-card-head">
                <div>
                  <p className="eyebrow">Strategy recommendation</p>
                  <h3 className="font-serif text-2xl">Strategic Priorities Roadmap</h3>
                </div>
              </div>
              <div className="sim-section">
                <div className="priority-header">
                  <span className="priority-dot" />
                  <p className="sim-metric-title">Priority I — Immediate Positioning Edge</p>
                </div>
                <p className="text-sm text-neutral-600">
                  {projections.shortTermImpact} Immediate changes focus on clarifying your studio narrative,
                  tightening the enquiry journey, and ensuring every touchpoint feels premium.
                  This matters commercially because higher-fit prospects convert faster when positioning is unambiguous.
                </p>
              </div>
              <div className="sim-section">
                <div className="priority-header">
                  <span className="priority-dot" />
                  <p className="sim-metric-title">Priority II — Compounding Visibility</p>
                </div>
                <p className="text-sm text-neutral-600">
                  {projections.growthLeverage} Momentum builds as visibility signals reinforce one another,
                  creating steady, compounding demand rather than spikes. This approach protects brand equity while
                  improving enquiry volume at a measured pace.
                </p>
              </div>
              <div className="sim-section">
                <div className="priority-header">
                  <span className="priority-dot" />
                  <p className="sim-metric-title">Priority III — Authority & Premium Leverage</p>
                </div>
                <p className="text-sm text-neutral-600">
                  {projections.longTermAdvantage} Over time, authority signals strengthen market perception,
                  supporting premium pricing and selective client fit. This long-term leverage protects margins
                  and keeps the studio positioned above price-driven competitors.
                </p>
              </div>
              <div className="sim-highlight">
                <div>
                  <p className="sim-metric-title">Estimated cost per lead</p>
                  <p className="sim-metric-value">£{formatNumber(projections.costPerLeadRange.min)} - £{formatNumber(projections.costPerLeadRange.max)}</p>
                </div>
                <div>
                  <p className="sim-metric-title">Potential revenue unlocked</p>
                  <p className="sim-metric-value">£{formatNumber(projections.revenueRange.min)} - £{formatNumber(projections.revenueRange.max)}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Ranges are directional, based on enquiry velocity, positioning strength, and typical close rates for luxury studios.
              </p>
            </div>

          </div>

          <div className="sim-card qualification-card">
              <div className="sim-card-head">
                <div>
                  <p className="eyebrow"><GlossaryTerm term="Fit" plain="How well your current inputs align with likely growth outcomes." /></p>
                  <h3 className="font-serif text-2xl">{projections.qualification}</h3>
                </div>
                <span className="simulator-pill">{projections.fitScore}% readiness</span>
              </div>
              <p className="text-sm text-neutral-600 mt-3">{projections.qualificationMessage}</p>
              <div className="sim-section">
                <p className="sim-metric-title">Confidence indicator</p>
                <p className="text-sm text-neutral-600">{projections.confidenceNote}</p>
              </div>
              <div className="growth-confidence">
                <p className="sim-metric-title">Strategic positioning score</p>
                <div className="growth-confidence-bar">
                  <span style={{ width: `${projections.positioningScore}%` }} />
                </div>
                <p className="text-sm text-neutral-500">Based on maturity, investment level, and service mix.</p>
              </div>
            </div>
        </section>
      )}
    </main>
  )
}
