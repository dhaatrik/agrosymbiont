import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import InvestorContactForm from './InvestorContactForm';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, exit, layoutId, whileInView, viewport, transition, ...domProps } = props;
      return <div data-testid="motion-div" {...domProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('./AnimatedSection', () => ({
  default: ({ children }: { children: React.ReactNode }) => <section>{children}</section>
}));

describe('InvestorContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation errors within aria-live region when submitting an empty form', async () => {
    render(<InvestorContactForm />);

    const submitButton = screen.getByRole('button', { name: /Request Access/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText('Name is required');
      expect(nameError).toBeInTheDocument();
      // Ensure the error is wrapped in an aria-live region
      expect(nameError.closest('[aria-live="polite"]')).toBeInTheDocument();

      const emailError = screen.getByText('Email is required');
      expect(emailError).toBeInTheDocument();
      expect(emailError.closest('[aria-live="polite"]')).toBeInTheDocument();

      const companyError = screen.getByText('Company is required');
      expect(companyError).toBeInTheDocument();
      expect(companyError.closest('[aria-live="polite"]')).toBeInTheDocument();
    });
  });
});
