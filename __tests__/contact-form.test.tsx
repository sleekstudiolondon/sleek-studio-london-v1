import { fireEvent, render, screen } from '@testing-library/react'
import ContactClient from '@/app/contact/ContactClient'

describe('Contact form validation', () => {
  it('shows inline errors for missing required fields', () => {
    render(<ContactClient />)

    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument()
    expect(screen.getByText(/please select a website type/i)).toBeInTheDocument()
    expect(screen.getByText(/please select a project budget/i)).toBeInTheDocument()
    expect(screen.getByText(/please select a preferred contact method/i)).toBeInTheDocument()
    expect(screen.getByText(/please share a brief project outline/i)).toBeInTheDocument()
  })
})
