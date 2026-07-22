import { render, screen } from '@testing-library/react'
import WorkClient from '@/app/work/WorkClient'
import { maisonJournal, maisonNav, maisonProjects } from '@/lib/maisonForm'

describe('Work website navigation', () => {
  it('renders concept website cards as links to current slug pages', () => {
    render(<WorkClient />)

    const links = screen.getAllByRole('link', { name: /explore website/i })
    expect(links[0]).toHaveAttribute('href', '/work/john-doe')
    expect(links[1]).toHaveAttribute('href', '/work/studio-alter')
    expect(links[2]).toHaveAttribute('href', '/work/maison-form')
    expect(screen.getByRole('heading', { name: 'Studio Alter' })).toBeInTheDocument()
  })

  it('defines Maison Form as a routed White Glove concept', () => {
    expect(maisonNav.map((item) => item.href)).toEqual([
      '/work/maison-form',
      '/work/maison-form/about',
      '/work/maison-form/projects',
      '/work/maison-form/atelier',
      '/work/maison-form/journal',
      '/work/maison-form/press',
      '/work/maison-form/contact',
    ])
    expect(maisonProjects).toHaveLength(4)
    expect(new Set(maisonProjects.map((project) => project.slug)).size).toBe(4)
    expect(maisonJournal).toHaveLength(3)
    expect(new Set(maisonJournal.map((article) => article.slug)).size).toBe(3)
  })
})
