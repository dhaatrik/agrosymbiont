import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import InvestorsPage from './InvestorsPage';

// Mock framer-motion to simplify testing and avoid jsdom errors
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} data-testid="motion-div" {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
  useMotionValue: () => ({ get: () => 0, set: vi.fn(), on: vi.fn() }),
  useTransform: () => ({ get: () => 0, set: vi.fn(), on: vi.fn() }),
  useSpring: () => ({ get: () => 0, set: vi.fn(), on: vi.fn() }),
}));

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('InvestorsPage Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const renderInvestorsPage = () => {
    return render(
      <MemoryRouter>
        <InvestorsPage />
      </MemoryRouter>
    );
  };

  it('renders correctly', () => {
    renderInvestorsPage();

    // Check key headings and elements
    expect(screen.getByText(/Future of Agriculture/i)).toBeInTheDocument();
    expect(screen.getByText(/The Opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/Request Investor Materials/i)).toBeInTheDocument();

    // Check that form elements are present
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Firm \/ Company/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request Access/i })).toBeInTheDocument();
  });

  it('scrolls to form when "Request Pitch Deck" button is clicked', () => {
    renderInvestorsPage();

    const requestButton = screen.getByRole('button', { name: /Request Pitch Deck/i });
    fireEvent.click(requestButton);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('shows validation errors when submitting an empty form', () => {
    renderInvestorsPage();

    const submitButton = screen.getByRole('button', { name: /Request Access/i });
    fireEvent.click(submitButton);

    // Check for validation messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Company is required')).toBeInTheDocument();
  });

  it('shows validation error for invalid email format', async () => {
    renderInvestorsPage();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email/i);
    const companyInput = screen.getByLabelText(/Firm \/ Company/i);
    const submitButton = screen.getByRole('button', { name: /Request Access/i });

    // Fill required fields, but with invalid email
    // Note: React 16+ uses target.name, testing-library fireEvent.change needs this to match the actual element's name
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'invalidemail@domain' } });
    fireEvent.change(companyInput, { target: { name: 'company', value: 'Acme Corp' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Company is required')).not.toBeInTheDocument();
  });

  it('submits form successfully and shows success state', async () => {
    renderInvestorsPage();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email/i);
    const companyInput = screen.getByLabelText(/Firm \/ Company/i);
    const messageInput = screen.getByLabelText(/Message \(Optional\)/i);
    const submitButton = screen.getByRole('button', { name: /Request Access/i });

    // Fill all fields with valid data
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'jane@example.com' } });
    fireEvent.change(companyInput, { target: { name: 'company', value: 'Acme Corp' } });
    fireEvent.change(messageInput, { target: { name: 'message', value: 'We are interested.' } });

    // Clear validation errors (if any, as we test typing clears errors)
    // We didn't trigger errors yet, but testing the happy path
    fireEvent.click(submitButton);

    // Should show "Sending..." state
    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Fast-forward 1500ms for the simulated API call
    vi.advanceTimersByTime(1500);

    // Wait for the success state
    expect(await screen.findByText('Request Received')).toBeInTheDocument();
    expect(screen.getByText(/Our investor relations team will review your details/i)).toBeInTheDocument();

    // Ensure form fields are gone
    expect(screen.queryByLabelText(/Full Name/i)).not.toBeInTheDocument();
  });

  it('resets form when "Submit another inquiry" is clicked', async () => {
    renderInvestorsPage();

    // First complete a successful submission
    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email/i);
    const companyInput = screen.getByLabelText(/Firm \/ Company/i);
    const submitButton = screen.getByRole('button', { name: /Request Access/i });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(companyInput, { target: { value: 'Acme Corp' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Sending...')).toBeInTheDocument();

    vi.advanceTimersByTime(1500);

    expect(await screen.findByText('Request Received')).toBeInTheDocument();

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /Submit another inquiry/i });
    fireEvent.click(resetButton);

    // Verify form is back and empty
    expect(screen.queryByText('Request Received')).not.toBeInTheDocument();

    const newNameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    const newEmailInput = screen.getByLabelText(/Work Email/i) as HTMLInputElement;
    const newCompanyInput = screen.getByLabelText(/Firm \/ Company/i) as HTMLInputElement;

    expect(newNameInput.value).toBe('');
    expect(newEmailInput.value).toBe('');
    expect(newCompanyInput.value).toBe('');
  });

  it('clears validation error when typing in a field', () => {
    renderInvestorsPage();

    const submitButton = screen.getByRole('button', { name: /Request Access/i });
    fireEvent.click(submitButton);

    // Errors should be present
    expect(screen.getByText('Name is required')).toBeInTheDocument();

    // Type in the name field
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Jane' } });

    // Name error should disappear
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();

    // But other errors should remain
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Company is required')).toBeInTheDocument();
  });
});
