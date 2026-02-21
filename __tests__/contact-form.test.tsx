import { fireEvent, render, screen } from '@testing-library/react'
import ContactClient from '@/app/contact/ContactClient'

describe('Contact form validation', () => {
  it('shows inline errors for missing required fields and consent', () => {
    render(<ContactClient />)

    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }))

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument()
    expect(screen.getByText(/please select a project type/i)).toBeInTheDocument()
    expect(screen.getByText(/please select an estimated budget/i)).toBeInTheDocument()
    expect(screen.getByText(/consent is required so we can contact you/i)).toBeInTheDocument()
  })
})
