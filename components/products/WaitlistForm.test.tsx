import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import WaitlistForm from './WaitlistForm';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock framer-motion to simplify testing animations and AnimatePresence
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Check: () => <div data-testid="icon-check" />,
  Loader2: () => <div data-testid="icon-loader" className="animate-spin" />,
  Sprout: () => <div data-testid="icon-sprout" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
}));

describe('WaitlistForm Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderForm = () => {
    return render(
      <MemoryRouter>
        <WaitlistForm />
      </MemoryRouter>
    );
  };

  it('renders initial form state correctly', () => {
    renderForm();
    expect(screen.getByText('prod_early_access')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('prod_email_placeholder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'prod_notify' })).toBeInTheDocument();
  });

  it('shows error message on empty email submission', () => {
    renderForm();
    const submitButton = screen.getByRole('button', { name: 'prod_notify' });

    fireEvent.click(submitButton);

    expect(screen.getByText('prod_email_required')).toBeInTheDocument();
  });

  it('shows error message on invalid email submission', () => {
    renderForm();
    const input = screen.getByPlaceholderText('prod_email_placeholder');
    const submitButton = screen.getByRole('button', { name: 'prod_notify' });

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('prod_email_invalid')).toBeInTheDocument();
  });

  it('clears error message when a valid email is typed', () => {
    renderForm();
    const input = screen.getByPlaceholderText('prod_email_placeholder');
    const submitButton = screen.getByRole('button', { name: 'prod_notify' });

    // Trigger error
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('prod_email_invalid')).toBeInTheDocument();

    // Fix error
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(screen.queryByText('prod_email_invalid')).not.toBeInTheDocument();
  });

  it('handles successful submission flow', async () => {
    renderForm();
    const input = screen.getByPlaceholderText('prod_email_placeholder');
    const submitButton = screen.getByRole('button', { name: 'prod_notify' });

    fireEvent.change(input, { target: { value: 'test@example.com' } });

    // Use act for asynchronous state updates triggered by click
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Should show particles/success check (showParticles state)
    expect(screen.getByTestId('icon-check')).toBeInTheDocument();

    // Advance timers for particle animation (1000ms)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Should show final success message
    expect(screen.getByText('prod_success_title')).toBeInTheDocument();
    expect(screen.getByText('prod_success_desc')).toBeInTheDocument();
    expect(screen.getByText('prod_share_x')).toBeInTheDocument();
    expect(screen.getByText('prod_read_nano')).toBeInTheDocument();
  });
});
