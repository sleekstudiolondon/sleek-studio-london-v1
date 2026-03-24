import { render, screen } from '@testing-library/react'
import WorkClient from '@/app/work/WorkClient'

describe('Work case study navigation', () => {
  it('renders case study cards as links to slug pages', () => {
    render(<WorkClient />)

    const mayfairLink = screen.getAllByRole('link', { name: /view case study/i })[0]
    expect(mayfairLink).toHaveAttribute('href', '/work/mayfair-townhouse')
  })
})
