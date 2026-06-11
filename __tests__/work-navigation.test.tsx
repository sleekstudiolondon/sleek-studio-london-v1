import { render, screen } from '@testing-library/react'
import WorkClient from '@/app/work/WorkClient'

describe('Work website navigation', () => {
  it('renders concept website cards as links to current slug pages', () => {
    render(<WorkClient />)

    const links = screen.getAllByRole('link', { name: /explore website/i })
    expect(links[0]).toHaveAttribute('href', '/work/john-doe')
    expect(links[1]).toHaveAttribute('href', '/work/studio-alter')
    expect(links[2]).toHaveAttribute('href', '/work/maison-form')
    expect(screen.getByRole('heading', { name: 'Studio Alter' })).toBeInTheDocument()
  })
})
