import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ServicesPage from './ServicesPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en'
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      ...actual.motion,
      div: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
        const { whileInView, viewport, initial, animate, transition, whileHover, ...rest } = props;
        return <div ref={ref} className={className} data-testid="motion-div" {...rest}>{children}</div>;
      })
    }
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Check: () => <span data-testid="icon-check">Check</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  TrendingUp: () => <span data-testid="icon-trendingup">TrendingUp</span>,
  Shield: () => <span data-testid="icon-shield">Shield</span>,
  FlaskConical: () => <span data-testid="icon-flaskconical">FlaskConical</span>,
  FileText: () => <span data-testid="icon-filetext">FileText</span>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('ServicesPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders skeleton loading state initially', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    // Skeleton cards have the 'animate-pulse' class
    const skeletons = document.querySelectorAll('.animate-pulse');
    // 4 from the loop + 1 large one = 5
    expect(skeletons.length).toBeGreaterThan(0);

    // Translation keys should be present for non-loading text
    expect(screen.getByText('tech_expertise')).toBeInTheDocument();
    expect(screen.getByText('tech_title_1')).toBeInTheDocument();
  });

  it('renders loaded content after 1.5 seconds', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    // Fast-forward time to trigger setTimeout
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Skeleton should be gone
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(0);

    // Services should be visible (titles & descriptions & icons)
    expect(screen.getByText('tech_service_1_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_1_desc')).toBeInTheDocument();
    expect(screen.getByTestId('icon-sparkles')).toBeInTheDocument();

    expect(screen.getByText('tech_service_2_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_2_desc')).toBeInTheDocument();
    expect(screen.getByTestId('icon-trendingup')).toBeInTheDocument();

    expect(screen.getByText('tech_service_3_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_3_desc')).toBeInTheDocument();
    expect(screen.getByTestId('icon-shield')).toBeInTheDocument();

    expect(screen.getByText('tech_service_4_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_4_desc')).toBeInTheDocument();
    expect(screen.getByTestId('icon-flaskconical')).toBeInTheDocument();

    expect(screen.getByText('tech_service_5_title')).toBeInTheDocument();
    expect(screen.getByText('tech_service_5_desc')).toBeInTheDocument();
    expect(screen.getByTestId('icon-filetext')).toBeInTheDocument();
  });

  it('renders the Why Choose Us section', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('tech_why_title')).toBeInTheDocument();
    expect(screen.getByText('tech_why_1')).toBeInTheDocument();
    expect(screen.getByText('tech_why_2')).toBeInTheDocument();
    expect(screen.getByText('tech_why_3')).toBeInTheDocument();
    expect(screen.getByText('tech_why_4')).toBeInTheDocument();
    expect(screen.getByText('tech_why_5')).toBeInTheDocument();
    expect(screen.getByText('tech_why_6')).toBeInTheDocument();

    const checkIcons = screen.getAllByTestId('icon-check');
    expect(checkIcons.length).toBe(6);
  });

  it('renders the CTA section', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('tech_cta_text')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'tech_cta_btn' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });
});
