export type CaseStudy = {
  slug: string
  title: string
  location: string
  focus: string
  year: string
  summary: string
  challenge: string
  strategy: string
  impact: string
  businessImpact: string
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mayfair-townhouse',
    title: 'Mayfair Townhouse',
    location: 'London',
    focus: 'Residential',
    year: '2025',
    summary: 'A layered, warm-neutral narrative with bespoke walnut joinery.',
    challenge: 'Reposition a heritage studio for a younger, design-forward clientele.',
    strategy: 'Premium positioning with editorial storytelling and conversion-focused messaging.',
    impact: '38% increase in private enquiries within 6 months.',
    businessImpact: 'Shortlisted by two new international developers.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=75&fm=webp'
  },
  {
    slug: 'riverside-penthouse',
    title: 'Riverside Penthouse',
    location: 'Chelsea',
    focus: 'Residential',
    year: '2024',
    summary: 'Muted teal accents and sculptural lighting across open-plan living.',
    challenge: 'Increase qualified leads while maintaining a private, low-volume brand feel.',
    strategy: 'Website conversion uplift supported by authority-focused content.',
    impact: '2.1x website engagement after launch.',
    businessImpact: 'Improved enquiry-to-consultation ratio by 30%.',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=75&fm=webp'
  },
  {
    slug: 'atelier-south',
    title: 'Atelier South',
    location: 'Soho',
    focus: 'Studio',
    year: '2025',
    summary: 'A creative studio reimagined in deep navy, brass, and pale stone.',
    challenge: 'Clarify positioning and improve lead qualification.',
    strategy: 'Positioning upgrade with a streamlined qualification journey.',
    impact: 'High-fit enquiries grew by 42% in 4 months.',
    businessImpact: 'Raised average project value by 18%.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=75&fm=webp'
  },
  {
    slug: 'linden-park-suite',
    title: 'Linden Park Suite',
    location: 'Kensington',
    focus: 'Hospitality',
    year: '2024',
    summary: 'Soft gold tones and layered textures for an intimate boutique suite.',
    challenge: 'Expand inbound visibility beyond referrals.',
    strategy: 'SEO foundation paired with editorial content planning.',
    impact: 'Qualified leads increased by 31% in 6 months.',
    businessImpact: 'Secured a multi-property contract within 8 months.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=75&fm=webp'
  }
]
