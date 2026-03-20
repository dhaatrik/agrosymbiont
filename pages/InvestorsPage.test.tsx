import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import InvestorsPage from './InvestorsPage';

// Mock framer-motion to simplify testing and avoid jsdom errors
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} data-testid="motion-div" {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
  useMotionValue: () => ({ get: () => 0, set: vi.fn(), on: vi.fn() }),
  useTransform: () => ({ get: () => 0, set: vi.fn(), on: vi.fn() }),
  useSpring: () => ({ get: () => 0, set: vi.fn(), on: vi.fn() }),
}));

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('InvestorsPage Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const renderInvestorsPage = () => {
    return render(
      <MemoryRouter>
        <InvestorsPage />
      </MemoryRouter>
    );
  };

  it('renders correctly', () => {
    renderInvestorsPage();

    // Check key headings and elements
    expect(screen.getByText(/Future of Agriculture/i)).toBeInTheDocument();
    expect(screen.getByText(/The Opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/Request Investor Materials/i)).toBeInTheDocument();

    // Check that form elements are present
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Firm \/ Company/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request Access/i })).toBeInTheDocument();
  });

  it('scrolls to form when "Request Pitch Deck" button is clicked', () => {
    renderInvestorsPage();

    const requestButton = screen.getByRole('button', { name: /Request Pitch Deck/i });
    fireEvent.click(requestButton);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
