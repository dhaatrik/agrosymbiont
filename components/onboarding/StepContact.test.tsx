import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { StepContact } from './StepContact';
import { OnboardingSelections } from './types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'onb_contact_title': 'Contact Information',
        'onb_contact_subtitle': 'Please provide your contact details.',
        'onb_name_label': 'Full Name',
        'onb_name_placeholder': 'Enter your name',
        'onb_email_label': 'Email Address',
        'onb_email_placeholder': 'Enter your email',
        'onb_submitting': 'Submitting...',
        'onb_submit': 'Submit',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
      const {
        initial, animate, exit, variants, transition, whileHover, whileTap,
        layoutId, layout,
        ...domProps
      } = props;
      return <div ref={ref} className={className} data-testid="motion-div" {...domProps}>{children}</div>;
    }),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Loader2: () => <span data-testid="loader-icon" />,
  ArrowRight: () => <span data-testid="arrow-right-icon" />,
}));

describe('StepContact Component', () => {
  const mockSelections: OnboardingSelections = {
    crop: 'wheat',
    challenge: 'yield',
    farmSize: 'small',
    soilType: 'alluvial',
    name: '',
    email: '',
  };

  const mockSetSelections = vi.fn();
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with all labels and inputs', () => {
    render(
      <StepContact
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleSubmit={mockHandleSubmit}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Please provide your contact details.')).toBeInTheDocument();

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
  });

  it('calls setSelections when name input changes', async () => {
    const user = userEvent.setup();
    render(
      <StepContact
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleSubmit={mockHandleSubmit}
        isSubmitting={false}
      />
    );

    const nameInput = screen.getByLabelText('Full Name');
    await user.type(nameInput, 'J');

    expect(mockSetSelections).toHaveBeenCalledWith({
      ...mockSelections,
      name: 'J'
    });
  });

  it('calls setSelections when email input changes', async () => {
    const user = userEvent.setup();
    render(
      <StepContact
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleSubmit={mockHandleSubmit}
        isSubmitting={false}
      />
    );

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'j');

    expect(mockSetSelections).toHaveBeenCalledWith({
      ...mockSelections,
      email: 'j'
    });
  });

  it('calls handleSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    render(
      <StepContact
        selections={{ ...mockSelections, name: 'John Doe', email: 'john@example.com' }}
        setSelections={mockSetSelections}
        handleSubmit={mockHandleSubmit}
        isSubmitting={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows loading state and disables button when isSubmitting is true', () => {
    render(
      <StepContact
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleSubmit={mockHandleSubmit}
        isSubmitting={true}
      />
    );

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('arrow-right-icon')).not.toBeInTheDocument();
  });
});
