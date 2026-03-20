import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JobCard from './JobCard';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'car_apply_now': 'Apply Now',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock TiltCard
vi.mock('./TiltCard', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-tilt-card">{children}</div>,
}));

describe('JobCard', () => {
  const mockProps = {
    title: 'Senior Agronomist',
    location: 'Bangalore, India',
    type: 'Full-time',
    onApply: vi.fn(),
  };

  it('renders correctly with given props', () => {
    render(<JobCard {...mockProps} />);

    expect(screen.getByText('Senior Agronomist')).toBeInTheDocument();
    expect(screen.getByText(/Bangalore, India/)).toBeInTheDocument();
    expect(screen.getByText(/Full-time/)).toBeInTheDocument();
    expect(screen.getByText('Apply Now')).toBeInTheDocument();
  });

  it('has the correct aria-label on the apply button', () => {
    render(<JobCard {...mockProps} />);

    const applyButton = screen.getByRole('button', { name: /Apply Now Senior Agronomist/i });
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveAttribute('aria-label', 'Apply Now Senior Agronomist');
  });

  it('calls onApply when the apply button is clicked', () => {
    render(<JobCard {...mockProps} />);

    const applyButton = screen.getByRole('button', { name: /Apply Now Senior Agronomist/i });
    fireEvent.click(applyButton);

    expect(mockProps.onApply).toHaveBeenCalledTimes(1);
  });
});
