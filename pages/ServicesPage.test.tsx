import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServicesPage from './ServicesPage';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Check: () => <span data-testid="icon-check">Check</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  TrendingUp: () => <span data-testid="icon-trendingup">TrendingUp</span>,
  Shield: () => <span data-testid="icon-shield">Shield</span>,
  FlaskConical: () => <span data-testid="icon-flaskconical">FlaskConical</span>,
  FileText: () => <span data-testid="icon-filetext">FileText</span>,
}));

// Mock framer-motion AnimatePresence and layout elements if used by children
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion') as any;
    return {
      ...actual,
      AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

// Mock custom animated components to bypass intersection observer/framer motion logic
vi.mock('../components/AnimatedSection', () => ({
    default: ({ children, className }: any) => <div className={`animated-section-mock ${className || ''}`}>{children}</div>
}));

vi.mock('../components/TiltCard', () => ({
    default: ({ children, className }: any) => <div className={`tilt-card-mock ${className || ''}`}>{children}</div>
}));

describe('ServicesPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );
  };

  it('renders initial skeleton loading state', () => {
    const { container } = renderComponent();

    // Check that we have 5 skeleton items (4 from array + 1 standalone)
    // The skeletons have the 'animate-pulse' class
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(5);

    // Ensure actual content isn't rendered yet
    expect(screen.queryByText('tech_service_1_title')).not.toBeInTheDocument();
  });

  it('renders full content after loading timeout', () => {
    const { container } = renderComponent();

    // Fast-forward past the 1500ms timeout
    act(() => {
        vi.advanceTimersByTime(1500);
    });

    // Skeletons should be gone
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(0);

    // Headers and descriptive text
    expect(screen.getByText('tech_expertise')).toBeInTheDocument();
    expect(screen.getByText('tech_title_1')).toBeInTheDocument();
    expect(screen.getByText('tech_title_2')).toBeInTheDocument();
    expect(screen.getByText('tech_subtitle')).toBeInTheDocument();

    // Services cards
    expect(screen.getByText('tech_service_1_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_1_desc')).toBeInTheDocument();
    expect(screen.getByText('tech_service_2_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_3_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_4_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_5_title')).toBeInTheDocument();

    // Why Choose Us section
    expect(screen.getByText('tech_why_title')).toBeInTheDocument();
    expect(screen.getByText('tech_why_1')).toBeInTheDocument();
    expect(screen.getByText('tech_why_2')).toBeInTheDocument();
    expect(screen.getByText('tech_why_3')).toBeInTheDocument();
    expect(screen.getByText('tech_why_4')).toBeInTheDocument();
    expect(screen.getByText('tech_why_5')).toBeInTheDocument();
    expect(screen.getByText('tech_why_6')).toBeInTheDocument();

    // CTA Section
    expect(screen.getByText('tech_cta_text')).toBeInTheDocument();
    const ctaButton = screen.getByText('tech_cta_btn');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = renderComponent();

    // Unmount before timer finishes
    unmount();

    // Verify clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockRestore();
  });
});
