import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AboutPage from './AboutPage';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en'
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
        // Remove framer-motion specific props to avoid React warnings in JSDOM
        const { whileInView, viewport, initial, animate, transition, whileHover, whileTap, ...rest } = props;
        return <div ref={ref} className={className} data-testid="motion-div" {...rest}>{children}</div>;
    }),
    h1: ({ children, className, ...props }: any) => <h1 className={className} data-testid="motion-h1" {...props}>{children}</h1>,
    h2: ({ children, className, ...props }: any) => <h2 className={className} data-testid="motion-h2" {...props}>{children}</h2>,
    p: ({ children, className, ...props }: any) => <p className={className} data-testid="motion-p" {...props}>{children}</p>,
    span: ({ children, className, ...props }: any) => <span className={className} data-testid="motion-span" {...props}>{children}</span>,
    g: ({ children, className, ...props }: any) => {
       const { whileHover, whileTap, ...rest } = props;
       return <g className={className} data-testid="motion-g" {...rest}>{children}</g>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
  useScroll: () => ({ scrollYProgress: 0, scrollY: { get: () => 0 } }),
  useTransform: () => 0,
  useSpring: () => 0,
  useMotionValue: () => ({ get: () => 0, set: vi.fn() }),
  useMotionTemplate: () => '',
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
    stop: vi.fn(),
  }),
}));

// Mock react-simple-maps to prevent SVG errors in jsdom
vi.mock('react-simple-maps', () => ({
  ComposableMap: ({ children }: any) => <div data-testid="composable-map">{children}</div>,
  ZoomableGroup: ({ children }: any) => <div data-testid="zoomable-group">{children}</div>,
  Geographies: ({ children }: any) => <div data-testid="geographies">{children({ geographies: [] })}</div>,
  Geography: () => <div data-testid="geography" />,
  // We need to pass down onClick to avoid breaking the real component that expects it
  Marker: ({ children, onClick }: any) => (
    <div data-testid="marker" onClick={onClick}>
       {/* Use a simple span instead of children to prevent invalid element error from nested framer-motion SVG elements */}
       <span>Marker Content</span>
    </div>
  ),
}));

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

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

describe('AboutPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AboutPage />);
  });

  it('renders core structural sections based on i18n keys', () => {
    render(<AboutPage />);

    // Check Hero section
    expect(screen.getByText('about_hero_title_1')).toBeInTheDocument();

    // Check Mission & Vision
    expect(screen.getByText('about_mission_title')).toBeInTheDocument();

    // Check Values section
    expect(screen.getByText('about_values_title')).toBeInTheDocument();

    // Check Innovation Lab
    expect(screen.getByText('about_lab_title')).toBeInTheDocument();
    expect(screen.getByText('about_lab_1_tag')).toBeInTheDocument();
    expect(screen.getByText('about_lab_1_title')).toBeInTheDocument();
    expect(screen.getByText('about_lab_2_tag')).toBeInTheDocument();
    expect(screen.getByText('about_lab_2_title')).toBeInTheDocument();

    // Check Timeline
    expect(screen.getByText('about_journey_title')).toBeInTheDocument();
    expect(screen.getByText('about_journey_1_title')).toBeInTheDocument();

    // Check Leaders
    expect(screen.getByText('about_leaders_title')).toBeInTheDocument();
  });

  describe('TeamCarousel Component', () => {
    it('updates index on next and previous button clicks', () => {
      render(<AboutPage />);

      // Find the carousel container by an element inside it or buttons
      const nextButton = screen.getByLabelText('Next slide');
      const prevButton = screen.getByLabelText('Previous slide');

      // The bullets represent the current index, they have aria-labels 'Go to slide 1', etc.
      const slide1Bullet = screen.getByLabelText('Go to slide 1');
      const slide2Bullet = screen.getByLabelText('Go to slide 2');
      const lastSlideBullet = screen.getByLabelText('Go to slide 5'); // There are 5 members

      // Initially on slide 1
      expect(slide1Bullet).toHaveClass('bg-cerulean-blue'); // active class
      expect(slide2Bullet).not.toHaveClass('bg-cerulean-blue');

      // Click Next
      fireEvent.click(nextButton);
      expect(slide2Bullet).toHaveClass('bg-cerulean-blue');
      expect(slide1Bullet).not.toHaveClass('bg-cerulean-blue');

      // Click Previous
      fireEvent.click(prevButton);
      expect(slide1Bullet).toHaveClass('bg-cerulean-blue');

      // Click Previous again (should loop to last slide)
      fireEvent.click(prevButton);
      expect(lastSlideBullet).toHaveClass('bg-cerulean-blue');
    });

    it('handles swipe gestures correctly', () => {
      render(<AboutPage />);

      const carouselContainer = screen.getByLabelText('Go to slide 1').closest('div')?.parentElement;
      expect(carouselContainer).not.toBeNull();

      if (carouselContainer) {
        // Swipe Left (Next slide)
        fireEvent.touchStart(carouselContainer, { targetTouches: [{ clientX: 300 }] });
        fireEvent.touchMove(carouselContainer, { targetTouches: [{ clientX: 200 }] });
        fireEvent.touchEnd(carouselContainer);

        const slide2Bullet = screen.getByLabelText('Go to slide 2');
        expect(slide2Bullet).toHaveClass('bg-cerulean-blue');

        // Swipe Right (Previous slide)
        fireEvent.touchStart(carouselContainer, { targetTouches: [{ clientX: 200 }] });
        fireEvent.touchMove(carouselContainer, { targetTouches: [{ clientX: 300 }] });
        fireEvent.touchEnd(carouselContainer);

        const slide1Bullet = screen.getByLabelText('Go to slide 1');
        expect(slide1Bullet).toHaveClass('bg-cerulean-blue');
      }
    });
  });
});
