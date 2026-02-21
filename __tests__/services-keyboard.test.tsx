import { fireEvent, render, screen } from '@testing-library/react'
import ServicesClient from '@/app/services/ServicesClient'

describe('Service planner keyboard support', () => {
  it('updates timeframe with arrow keys and toggles a service with keyboard', () => {
    render(<ServicesClient />)

    const slider = screen.getByRole('slider', { name: /target timeframe in months/i })
    fireEvent.keyDown(slider, { key: 'ArrowRight' })
    expect(screen.getByText(/target timeframe: 7 months/i)).toBeInTheDocument()

    const seoPill = screen.getByRole('button', { name: /select seo & local visibility/i })
    fireEvent.keyDown(seoPill, { key: 'Enter' })
    expect(screen.getByRole('button', { name: /deselect seo & local visibility/i })).toHaveAttribute('aria-pressed', 'true')
  })
})
