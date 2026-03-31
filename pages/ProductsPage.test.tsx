import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'prod_coming_soon': 'Coming Soon',
        'prod_title': 'Our Products',
        'prod_subtitle': 'Discover the future of farming.',
        'prod_roi_title': 'ROI Calculator',
        'prod_roi_desc': 'Estimate your returns.',
        'prod_farm_size': 'Farm Size',
        'prod_acres': 'Acres',
        'prod_yield_increase': 'Estimated Yield Increase',
        'prod_tons': 'Tons',
        'prod_revenue_boost': 'Estimated Revenue Boost',
        'prod_nutrients': 'Smart Nutrients',
        'prod_soil_enhancers': 'Soil Enhancers',
        'prod_early_access': 'Get Early Access',
        'prod_early_desc': 'Sign up to be notified.',
        'prod_email_placeholder': 'Enter your email',
        'prod_email_required': 'Email is required',
        'prod_email_invalid': 'Please enter a valid email address',
        'prod_notify': 'Notify Me',
        'prod_wait': 'Please wait...',
        'prod_success_title': 'You are on the list!',
        'prod_success_desc': 'We will notify you when we launch.',
        'prod_share_x': 'Share on X',
        'prod_read_nano': 'Read about Nanotechnology',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock framer-motion explicitly
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, className, style, ...props }: any) => <div className={className} style={style} data-testid="motion-div" {...props}>{children}</div>,
      h1: ({ children, className, style, ...props }: any) => <h1 className={className} style={style} {...props}>{children}</h1>,
      p: ({ children, className, style, ...props }: any) => <p className={className} style={style} {...props}>{children}</p>,
      section: ({ children, className, style, ...props }: any) => <section className={className} style={style} {...props}>{children}</section>,
      span: ({ children, className, style, ...props }: any) => <span className={className} style={style} {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => false,
    useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
    useTransform: () => ({ set: vi.fn(), get: vi.fn() }),
    useSpring: () => ({ set: vi.fn(), get: vi.fn() }),
  };
});

// Mock IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ProductsPage', () => {
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
        <ProductsPage />
      </MemoryRouter>
    );
  };

  it('renders initial state correctly', () => {
    renderComponent();
    expect(screen.getByText('Our Products')).toBeInTheDocument();
    expect(screen.getByText('Discover the future of farming.')).toBeInTheDocument();
    expect(screen.getByText('ROI Calculator')).toBeInTheDocument();

    // Check initial farm size
    const slider = screen.getByLabelText('Farm size in acres') as HTMLInputElement;
    expect(slider.value).toBe('10');
    expect(screen.getByText('+25')).toBeInTheDocument(); // 10 * 0.25 * 10 = 25
    expect(screen.getByText('+$12,500')).toBeInTheDocument(); // 10 * 1250 = 12500
  });

  it('updates ROI calculations when slider changes', () => {
    renderComponent();
    const slider = screen.getByLabelText('Farm size in acres') as HTMLInputElement;

    // Change value to 100
    fireEvent.change(slider, { target: { value: '100' } });

    expect(slider.value).toBe('100');
    expect(screen.getByText('+250')).toBeInTheDocument(); // 100 * 0.25 * 10 = 250
    expect(screen.getByText('+$125,000')).toBeInTheDocument(); // 100 * 1250 = 125000
  });

  it('shows error when submitting empty email', () => {
    renderComponent();
    const submitBtn = screen.getByRole('button', { name: /Notify Me/i });

    fireEvent.click(submitBtn);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows error when submitting invalid email', () => {
    renderComponent();
    const input = screen.getByLabelText('Email for product notifications');
    const submitBtn = screen.getByRole('button', { name: /Notify Me/i });

    // Type invalid email
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('submits successfully with valid email', async () => {
    renderComponent();
    const input = screen.getByLabelText('Email for product notifications');
    const submitBtn = screen.getByRole('button', { name: /Notify Me/i });

    // Valid email with ReDoS compliant regex used in app
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    // Ensure no error initially
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();

    fireEvent.click(submitBtn);


    // Wait for the micro-interaction to finish
    await act(async () => {
        vi.advanceTimersByTime(1000);
    });

    // Wait for Framer Motion animation loop if necessary
    await act(async () => {
        vi.runAllTimers();
    });

    expect(screen.getByText('You are on the list!')).toBeInTheDocument();
    expect(screen.getByText('We will notify you when we launch.')).toBeInTheDocument();

    // Form should be gone
    expect(screen.queryByLabelText('Email for product notifications')).not.toBeInTheDocument();
  });
});
