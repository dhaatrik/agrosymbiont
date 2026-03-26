import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import BlogNewsletterForm from './BlogNewsletterForm';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blog_stay_ahead': 'Stay Ahead',
        'blog_stay_ahead_desc': 'Stay ahead description',
        'blog_email_placeholder': 'Enter email',
        'blog_email_required': 'Email is required',
        'blog_email_invalid': 'Invalid email',
        'blog_notify': 'Notify Me',
        'blog_submitting': 'Submitting...',
        'blog_welcome': 'Welcome',
        'blog_welcome_desc': 'Welcome description',
        'blog_privacy': 'Privacy policy',
      };
      return translations[key] || key;
    }
  }),
}));

describe('BlogNewsletterForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('shows validation errors for empty and invalid emails', async () => {
    render(<BlogNewsletterForm />);

    const emailInput = screen.getByPlaceholderText('Enter email');
    const submitBtn = screen.getByRole('button', { name: /Notify Me/i });

    fireEvent.click(submitBtn);
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });

  it('submits successfully with a valid email', async () => {
    render(<BlogNewsletterForm />);

    const emailInput = screen.getByPlaceholderText('Enter email');
    const submitBtn = screen.getByRole('button', { name: /Notify Me/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitBtn);

    expect(screen.getByRole('button', { name: /Submitting\.\.\./i })).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    await waitFor(() => {
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByText('Welcome description')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Enter email')).not.toBeInTheDocument();
    });
  });
});
