import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OnboardingPage from './OnboardingPage';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === 'onb_success_desc' && options) {
        return `onb_success_desc ${options.crop} ${options.challenge}`;
      }
      return key;
    },
  }),
}));

// Mock Framer Motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual as object,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: React.forwardRef(({ children, className, whileHover, whileTap, initial, animate, exit, transition, ...props }: any, ref: any) => (
        <div ref={ref} className={className} data-testid="motion-div" {...props}>{children}</div>
      )),
      button: React.forwardRef(({ children, className, onClick, disabled, whileHover, whileTap, initial, animate, exit, transition, ...props }: any, ref: any) => (
        <button ref={ref} className={className} onClick={onClick} disabled={disabled} data-testid="motion-button" {...props}>{children}</button>
      )),
    },
    useReducedMotion: () => false,
  };
});

describe('OnboardingPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <OnboardingPage />
      </MemoryRouter>
    );
  };

  it('renders step 1 initially', () => {
    renderComponent();
    expect(screen.getByText('onb_crop_title')).toBeInTheDocument();
    expect(screen.getByText('onb_crop_cereals')).toBeInTheDocument();
  });

  it('progresses through steps and submits form', async () => {
    vi.useFakeTimers();
    renderComponent();

    // Step 1
    const wheatButton = screen.getByText('onb_crop_cereals');
    fireEvent.click(wheatButton);

    // Fast-forward setTimeout in handleNext
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Step 2
    expect(screen.getByText('onb_challenge_title')).toBeInTheDocument();
    const yieldButton = screen.getByText('onb_ch_yield');
    fireEvent.click(yieldButton);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Step 3
    expect(screen.getByText('onb_farmsize_title')).toBeInTheDocument();
    const smallFarmButton = screen.getByText('onb_fs_small');
    fireEvent.click(smallFarmButton);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Step 4
    expect(screen.getByText('onb_soil_title')).toBeInTheDocument();
    const redSoilButton = screen.getByText('onb_soil_red');
    fireEvent.click(redSoilButton);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Step 5
    expect(screen.getByText('onb_contact_title')).toBeInTheDocument();

    const nameInput = screen.getByLabelText('onb_name_label');
    const emailInput = screen.getByLabelText('onb_email_label');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const submitButton = screen.getByRole('button', { name: /onb_submit/i });
    fireEvent.click(submitButton);

    // Should show loading state
    expect(screen.getByText('onb_submitting')).toBeInTheDocument();

    // Fast-forward form submission delay
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    // Step 6 (Success)
    expect(screen.getByText('onb_success_title')).toBeInTheDocument();
    expect(screen.getByText('onb_success_desc wheat yield')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('allows navigation with back button', () => {
    vi.useFakeTimers();
    renderComponent();

    // Move to step 2
    const wheatButton = screen.getByText('onb_crop_cereals');
    fireEvent.click(wheatButton);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('onb_challenge_title')).toBeInTheDocument();

    // Go back to step 1
    const backButton = screen.getByLabelText('onb_back');
    fireEvent.click(backButton);

    expect(screen.getByText('onb_crop_title')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
