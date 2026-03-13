import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import TermsOfServicePage from './TermsOfServicePage';

// Mock framer-motion to avoid jsdom errors and simplify testing
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: React.forwardRef<HTMLDivElement, any>(({ children, className, ...props }, ref) => {
        // filter out framer-motion specific props to avoid React warnings on DOM elements
        const domProps = { ...props };
        delete domProps.whileInView;
        delete domProps.initial;
        delete domProps.viewport;
        delete domProps.transition;
        return (
          <div ref={ref} className={className} {...domProps}>{children}</div>
        );
      }),
    },
    useReducedMotion: () => false,
  };
});

// Mock intersection observer for framer-motion
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;

describe('TermsOfServicePage Component', () => {
  it('renders without crashing', () => {
    render(<TermsOfServicePage />);
  });

  it('displays the main heading', () => {
    render(<TermsOfServicePage />);
    const heading = screen.getByRole('heading', { level: 1, name: /Terms of Service/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the "Last updated:" date', () => {
    render(<TermsOfServicePage />);

    // Check if the current date format string is in the document
    const expectedDateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const lastUpdatedText = screen.getByText(new RegExp(`Last updated: ${expectedDateStr}`, 'i'));
    expect(lastUpdatedText).toBeInTheDocument();
  });

  it('displays the Introduction section', () => {
    render(<TermsOfServicePage />);

    const introHeading = screen.getByRole('heading', { level: 2, name: /1\. Introduction/i });
    expect(introHeading).toBeInTheDocument();

    const introText = screen.getByText(/These Terms of Service \("Terms"\) govern your use of the AgroSymbiont website/i);
    expect(introText).toBeInTheDocument();
  });

  it('displays other expected sections', () => {
    render(<TermsOfServicePage />);

    expect(screen.getByRole('heading', { level: 2, name: /2\. Use of Our Website/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /3\. Intellectual Property/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /4\. User Conduct/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /5\. Disclaimers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /6\. Limitation of Liability/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /7\. Governing Law/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /8\. Changes to These Terms/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /9\. Contact Us/i })).toBeInTheDocument();
  });
});
