import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StepSoilType } from './StepSoilType';

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
    button: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
        const {
            initial, animate, exit, variants, transition, whileHover, whileTap,
            layoutId, layout,
            ...domProps
        } = props;
        return <button ref={ref} className={className} data-testid="motion-button" {...domProps}>{children}</button>;
    })
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Layers: () => <span data-testid="layers-icon" />,
}));

describe('StepSoilType Component', () => {
  const mockHandleNext = vi.fn();
  const mockSetSelections = vi.fn();
  const defaultSelections = {
    crop: '',
    challenge: '',
    farmSize: '',
    soilType: '',
    name: '',
    email: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('renders title, subtitle, and icons', () => {
    render(
      <StepSoilType
        selections={defaultSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('onb_soil_title')).toBeInTheDocument();
    expect(screen.getByText('onb_soil_subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('layers-icon')).toBeInTheDocument();
  });

  it('renders all soil type options', () => {
    render(
      <StepSoilType
        selections={defaultSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const expectedLabels = [
      'onb_soil_alluvial',
      'onb_soil_red',
      'onb_soil_black',
      'onb_soil_sandy',
      'onb_soil_clay',
      'onb_soil_unknown',
    ];

    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    const buttons = screen.getAllByTestId('motion-button');
    expect(buttons).toHaveLength(6);
  });

  it('calls setSelections and handleNext on click with correct soil type', () => {
    render(
      <StepSoilType
        selections={defaultSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    const alluvialButton = screen.getByText('onb_soil_alluvial').closest('button');
    expect(alluvialButton).toBeInTheDocument();

    fireEvent.click(alluvialButton!);

    // check setSelections called
    expect(mockSetSelections).toHaveBeenCalledTimes(1);
    expect(mockSetSelections).toHaveBeenCalledWith({
      ...defaultSelections,
      soilType: 'alluvial',
    });

    // check handleNext not called immediately
    expect(mockHandleNext).not.toHaveBeenCalled();

    // Fast-forward timer by 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  it('applies correct active styling when a soil type is selected', () => {
    const selectedSelections = { ...defaultSelections, soilType: 'black' };
    render(
      <StepSoilType
        selections={selectedSelections}
        setSelections={mockSetSelections}
        handleNext={mockHandleNext}
      />
    );

    // Get the selected button (black)
    const blackButton = screen.getByText('onb_soil_black').closest('button');
    expect(blackButton).toHaveClass('border-cerulean-blue');
    expect(blackButton).toHaveClass('shadow-lg');
    expect(blackButton).not.toHaveClass('hover:shadow-md');

    // Get an unselected button (red)
    const redButton = screen.getByText('onb_soil_red').closest('button');
    expect(redButton).not.toHaveClass('border-cerulean-blue');
    expect(redButton).not.toHaveClass('shadow-lg');
    expect(redButton).toHaveClass('hover:shadow-md');
  });
});
