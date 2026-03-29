import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StepChallenge } from './StepChallenge';
import { OnboardingSelections } from './types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
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
  Sprout: () => <span data-testid="sprout-icon" />,
  Droplet: () => <span data-testid="droplet-icon" />,
  Bug: () => <span data-testid="bug-icon" />,
  ThermometerSun: () => <span data-testid="thermometersun-icon" />,
}));

describe('StepChallenge Component', () => {
  const mockSelections: OnboardingSelections = {
    crop: 'wheat',
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
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders title and subtitle correctly', () => {
    render(
      <StepChallenge
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('onb_challenge_title')).toBeInTheDocument();
    expect(screen.getByText('onb_challenge_subtitle')).toBeInTheDocument();
  });

  it('renders all four challenge options with their icons', () => {
    render(
      <StepChallenge
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('onb_ch_yield')).toBeInTheDocument();
    expect(screen.getByTestId('sprout-icon')).toBeInTheDocument();

    expect(screen.getByText('onb_ch_soil')).toBeInTheDocument();
    expect(screen.getByTestId('droplet-icon')).toBeInTheDocument();

    expect(screen.getByText('onb_ch_pest')).toBeInTheDocument();
    expect(screen.getByTestId('bug-icon')).toBeInTheDocument();

    expect(screen.getByText('onb_ch_climate')).toBeInTheDocument();
    expect(screen.getByTestId('thermometersun-icon')).toBeInTheDocument();
  });

  it('calls setSelections with the correct challenge id when an option is clicked', () => {
    render(
      <StepChallenge
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const yieldButton = screen.getByText('onb_ch_yield').closest('button');
    expect(yieldButton).not.toBeNull();

    if (yieldButton) {
      fireEvent.click(yieldButton);
      expect(mockSetSelections).toHaveBeenCalledWith({
        ...mockSelections,
        challenge: 'yield',
      });
    }
  });

  it('calls handleNext after 300ms delay when an option is clicked', () => {
    render(
      <StepChallenge
        selections={mockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const pestButton = screen.getByText('onb_ch_pest').closest('button');
    expect(pestButton).not.toBeNull();

    if (pestButton) {
      fireEvent.click(pestButton);

      expect(mockHandleNext).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);

      expect(mockHandleNext).toHaveBeenCalledTimes(1);
    }
  });

  it('applies the correct CSS classes when a challenge is selected', () => {
    const selectedMockSelections = { ...mockSelections, challenge: 'soil' };

    render(
      <StepChallenge
        selections={selectedMockSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const soilButton = screen.getByText('onb_ch_soil').closest('button');
    expect(soilButton).not.toBeNull();

    if (soilButton) {
      expect(soilButton.className).toContain('bg-orange-50');
      expect(soilButton.className).toContain('border-burnt-orange');
      expect(soilButton.className).toContain('text-burnt-orange');
    }

    const yieldButton = screen.getByText('onb_ch_yield').closest('button');
    expect(yieldButton).not.toBeNull();

    if (yieldButton) {
      expect(yieldButton.className).toContain('bg-white');
      expect(yieldButton.className).toContain('text-gray-700');
    }
  });
});
