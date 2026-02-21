import { render, screen } from '@testing-library/react'
import WorkClient from '@/app/work/WorkClient'

describe('Work case study navigation', () => {
  it('renders case study cards as links to slug pages', () => {
    render(<WorkClient />)

    const mayfairLink = screen.getByRole('link', { name: /read case study: mayfair townhouse/i })
    expect(mayfairLink).toHaveAttribute('href', '/work/mayfair-townhouse')
  })
})
