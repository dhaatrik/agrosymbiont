import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StepFarmSize } from './StepFarmSize';
import { OnboardingSelections } from './types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'onb_farmsize_title': 'What is your farm size?',
        'onb_farmsize_subtitle': 'Select the option that best describes your operation',
        'onb_fs_small': 'Small (1-5 acres)',
        'onb_fs_medium': 'Medium (6-20 acres)',
        'onb_fs_large': 'Large (21-50 acres)',
        'onb_fs_commercial': 'Commercial (50+ acres)',
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
    button: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
      const {
        initial, animate, exit, variants, transition, whileHover, whileTap,
        layoutId, layout,
        ...domProps
      } = props;
      return <button ref={ref} className={className} data-testid="motion-button" {...domProps}>{children}</button>;
    }),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Maximize: () => <span data-testid="maximize-icon" />,
}));

describe('StepFarmSize Component', () => {
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
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders title and subtitle', () => {
    render(
      <StepFarmSize
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('What is your farm size?')).toBeInTheDocument();
    expect(screen.getByText('Select the option that best describes your operation')).toBeInTheDocument();
    expect(screen.getByTestId('maximize-icon')).toBeInTheDocument();
  });

  it('renders all farm size options', () => {
    render(
      <StepFarmSize
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const buttons = screen.getAllByTestId('motion-button');
    expect(buttons).toHaveLength(4);

    expect(screen.getByText('Small (1-5 acres)')).toBeInTheDocument();
    expect(screen.getByText('Medium (6-20 acres)')).toBeInTheDocument();
    expect(screen.getByText('Large (21-50 acres)')).toBeInTheDocument();
    expect(screen.getByText('Commercial (50+ acres)')).toBeInTheDocument();

    expect(screen.getByText('🌱')).toBeInTheDocument();
    expect(screen.getByText('🌿')).toBeInTheDocument();
    expect(screen.getByText('🌾')).toBeInTheDocument();
    expect(screen.getByText('🏭')).toBeInTheDocument();
  });

  it('calls setSelections and handleNext after clicking an option', () => {
    render(
      <StepFarmSize
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const largeButton = screen.getByText('Large (21-50 acres)').closest('button');
    expect(largeButton).toBeInTheDocument();

    fireEvent.click(largeButton!);

    // Should update selections immediately
    expect(mockSetSelections).toHaveBeenCalledTimes(1);
    expect(mockSetSelections).toHaveBeenCalledWith({
      ...mockSelections,
      farmSize: 'large',
    });

    // Should not call handleNext immediately
    expect(mockHandleNext).not.toHaveBeenCalled();

    // Fast-forward 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Now handleNext should be called
    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  it('highlights the selected option', () => {
    render(
      <StepFarmSize
        selections={{ ...mockSelections, farmSize: 'medium' }}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const mediumButton = screen.getByText('Medium (6-20 acres)').closest('button');
    expect(mediumButton).toHaveClass('bg-green-50');
    expect(mediumButton).toHaveClass('border-green-500');

    const smallButton = screen.getByText('Small (1-5 acres)').closest('button');
    expect(smallButton).not.toHaveClass('bg-green-50');
    expect(smallButton).toHaveClass('bg-white');
  });
});
