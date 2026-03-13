import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CropProblemSolver from './CropProblemSolver';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => {
        // Remove framer-motion specific props to avoid React warnings on DOM elements
        const { initial, animate, exit, layoutId, ...domProps } = props;
        return <div {...domProps}>{children}</div>;
      },
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => true,
  };
});

describe('CropProblemSolver Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<CropProblemSolver />);

    // Check title and subtitle
    expect(screen.getByText('solver_title')).toBeInTheDocument();
    expect(screen.getByText('solver_subtitle')).toBeInTheDocument();

    // Check step 1 label and initial options
    expect(screen.getByText('solver_step1')).toBeInTheDocument();
    expect(screen.getByText('solver_crop_cereals')).toBeInTheDocument();
    expect(screen.getByText('solver_crop_fruits')).toBeInTheDocument();
    expect(screen.getByText('solver_crop_cash')).toBeInTheDocument();
    expect(screen.getByText('solver_crop_vegetables')).toBeInTheDocument();

    // Placeholder should be visible
    expect(screen.getByText('solver_placeholder')).toBeInTheDocument();

    // Step 2 should not be visible yet
    expect(screen.queryByText('solver_step2')).not.toBeInTheDocument();
  });

  it('selects a crop and reveals symptoms', () => {
    render(<CropProblemSolver />);

    // Click on wheat
    const wheatBtn = screen.getByText('solver_crop_cereals');
    fireEvent.click(wheatBtn);

    // Step 2 should now be visible
    expect(screen.getByText('solver_step2')).toBeInTheDocument();

    // Symptoms for wheat should appear
    expect(screen.getByText('solver_sym_yellow_wheat')).toBeInTheDocument();
    expect(screen.getByText('solver_sym_low_wheat')).toBeInTheDocument();
    expect(screen.getByText('solver_sym_pest_wheat')).toBeInTheDocument();
  });

  it('selects a symptom and reveals analyze button', () => {
    render(<CropProblemSolver />);

    // Click on wheat
    fireEvent.click(screen.getByText('solver_crop_cereals'));

    // Click on yellow leaves symptom
    fireEvent.click(screen.getByText('solver_sym_yellow_wheat'));

    // Analyze button should appear
    expect(screen.getByText('solver_analyze')).toBeInTheDocument();
  });

  it('clicks analyze to show loading and then results', () => {
    render(<CropProblemSolver />);

    // Click on wheat
    fireEvent.click(screen.getByText('solver_crop_cereals'));

    // Click on yellow leaves symptom
    fireEvent.click(screen.getByText('solver_sym_yellow_wheat'));

    // Click analyze
    const analyzeBtn = screen.getByText('solver_analyze');
    fireEvent.click(analyzeBtn);

    // Loading state should appear
    expect(screen.getByText('solver_analyzing')).toBeInTheDocument();

    // Analyze button and placeholder should be gone
    expect(screen.queryByText('solver_analyze')).not.toBeInTheDocument();
    expect(screen.queryByText('solver_placeholder')).not.toBeInTheDocument();

    // Fast-forward timer by 1200ms
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Loading state should be gone
    expect(screen.queryByText('solver_analyzing')).not.toBeInTheDocument();

    // Result should appear
    expect(screen.getByText('solver_recommended')).toBeInTheDocument();
    expect(screen.getByText('solver_sol_yellow_name')).toBeInTheDocument();
    expect(screen.getByText('solver_sol_yellow_desc')).toBeInTheDocument();
    expect(screen.getByText('solver_view_product')).toBeInTheDocument();
  });

  it('changing crop resets the symptom and result', () => {
    render(<CropProblemSolver />);

    // Click on wheat, symptom, analyze
    fireEvent.click(screen.getByText('solver_crop_cereals'));
    fireEvent.click(screen.getByText('solver_sym_yellow_wheat'));
    fireEvent.click(screen.getByText('solver_analyze'));

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Verify result is shown
    expect(screen.getByText('solver_sol_yellow_name')).toBeInTheDocument();

    // Click a different crop
    fireEvent.click(screen.getByText('solver_crop_fruits'));

    // Step 2 is still visible but symptoms changed
    expect(screen.getByText('solver_sym_stunted_apple')).toBeInTheDocument();
    expect(screen.queryByText('solver_sym_yellow_wheat')).not.toBeInTheDocument();

    // Result should be cleared, placeholder back
    expect(screen.queryByText('solver_sol_yellow_name')).not.toBeInTheDocument();
    expect(screen.getByText('solver_placeholder')).toBeInTheDocument();

    // Analyze button should not be visible since symptom was cleared
    expect(screen.queryByText('solver_analyze')).not.toBeInTheDocument();
  });
});
