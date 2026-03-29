import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StepCrop } from './StepCrop';
import { OnboardingSelections } from './types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'onb_crop_title': 'Select Crop',
        'onb_crop_subtitle': 'Choose your primary crop',
        'onb_crop_cereals': 'Wheat & Cereals',
        'onb_crop_fruits': 'Fruits & Orchard',
        'onb_crop_cash': 'Coffee & Cash Crops',
        'onb_crop_vegetables': 'Vegetables',
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
  Wheat: () => <span data-testid="wheat-icon" />,
  Apple: () => <span data-testid="apple-icon" />,
  Coffee: () => <span data-testid="coffee-icon" />,
  Sprout: () => <span data-testid="sprout-icon" />,
}));

// Mock TiltCard
vi.mock('../TiltCard', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="tilt-card">{children}</div>,
}));

describe('StepCrop Component', () => {
  const mockSelections: OnboardingSelections = {
    crop: '',
    challenge: '',
    farmSize: '',
    soilType: '',
    name: '',
    email: '',
  };
  const mockSetSelections = vi.fn();
  const mockHandleNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders title and subtitle', () => {
    render(
      <StepCrop
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('Select Crop')).toBeInTheDocument();
    expect(screen.getByText('Choose your primary crop')).toBeInTheDocument();
  });

  it('renders all crop options with correct labels and icons', () => {
    render(
      <StepCrop
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('Wheat & Cereals')).toBeInTheDocument();
    expect(screen.getByTestId('wheat-icon')).toBeInTheDocument();

    expect(screen.getByText('Fruits & Orchard')).toBeInTheDocument();
    expect(screen.getByTestId('apple-icon')).toBeInTheDocument();

    expect(screen.getByText('Coffee & Cash Crops')).toBeInTheDocument();
    expect(screen.getByTestId('coffee-icon')).toBeInTheDocument();

    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByTestId('sprout-icon')).toBeInTheDocument();
  });

  it('calls setSelections and handleNext with 300ms timeout on click', () => {
    render(
      <StepCrop
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const wheatButton = screen.getByText('Wheat & Cereals').closest('button');
    expect(wheatButton).toBeInTheDocument();

    if (wheatButton) {
      fireEvent.click(wheatButton);
    }

    expect(mockSetSelections).toHaveBeenCalledWith({ ...mockSelections, crop: 'wheat' });
    expect(mockHandleNext).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockHandleNext).toHaveBeenCalled();
  });

  it('applies active styles to the selected crop', () => {
    const selectedSelections = { ...mockSelections, crop: 'apple' };
    render(
      <StepCrop
        selections={selectedSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const appleButton = screen.getByText('Fruits & Orchard').closest('button');
    expect(appleButton).toHaveClass('bg-blue-50');
    expect(appleButton).toHaveClass('border-cerulean-blue');

    const wheatButton = screen.getByText('Wheat & Cereals').closest('button');
    expect(wheatButton).not.toHaveClass('bg-blue-50');
    expect(wheatButton).not.toHaveClass('border-cerulean-blue');
  });
});
