import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { vi, describe, it, expect } from 'vitest';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock framer-motion to avoid complex animation logic in tests
vi.mock('framer-motion', () => {
  const React = require('react');
  const Dummy = ({ children, className }: any) => <div className={className}>{children}</div>;
  const DummySpan = ({ children, className }: any) => <span className={className}>{children}</span>;
  return {
    motion: {
      div: Dummy,
      h1: Dummy,
      span: DummySpan,
      p: Dummy,
    },
    useReducedMotion: () => false,
    useScroll: () => ({
      scrollY: {
        get: () => 0,
        getPrevious: () => 0,
      }
    }),
    useMotionValueEvent: vi.fn(),
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock ThreeDBackground since it relies heavily on canvas and requestAnimationFrame
vi.mock('../components/ThreeDBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-3d-background" />,
}));

// Mock AnimatedSection to just render its children
vi.mock('../components/AnimatedSection', () => ({
  __esModule: true,
  default: ({ children, className }: any) => <div className={className} data-testid="mock-animated-section">{children}</div>,
}));

// Mock TiltCard to just render its children
vi.mock('../components/TiltCard', () => ({
  __esModule: true,
  default: ({ children, className }: any) => <div className={className} data-testid="mock-tilt-card">{children}</div>,
}));

describe('HomePage Component', () => {
  const renderHomePage = () => {
    return render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  };

  it('renders without crashing', () => {
    renderHomePage();
    expect(screen.getByTestId('mock-3d-background')).toBeInTheDocument();
  });

  it('renders the Hero section with translation keys', () => {
    renderHomePage();
    expect(screen.getByText('hero_title_1')).toBeInTheDocument();
    expect(screen.getByText('hero_title_2')).toBeInTheDocument();
    expect(screen.getByText('hero_title_3')).toBeInTheDocument();
    expect(screen.getByText('start_growing')).toBeInTheDocument();
    expect(screen.getByText('learn_more')).toBeInTheDocument();
  });

  it('renders the Intro & Impact section', () => {
    renderHomePage();
    expect(screen.getByText('home_who_we_are')).toBeInTheDocument();
    // Use a custom matcher for home_impact_title since it's broken up by a <br /> with home_impact_title_2
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'home_impact_titlehome_impact_title_2';
    })).toBeInTheDocument();
    expect(screen.getByText('home_stat_farmers')).toBeInTheDocument();
    expect(screen.getByText('home_stat_yield')).toBeInTheDocument();
    expect(screen.getByText('home_stat_eco')).toBeInTheDocument();
  });

  it('renders the Key Highlights section', () => {
    renderHomePage();
    expect(screen.getByText('home_highlights_title')).toBeInTheDocument();
    // Assuming feature cards use these titles
    expect(screen.getByText('home_feat_1_title')).toBeInTheDocument();
    expect(screen.getByText('home_feat_2_title')).toBeInTheDocument();
    expect(screen.getByText('home_feat_3_title')).toBeInTheDocument();
    expect(screen.getByText('home_feat_4_title')).toBeInTheDocument();
  });

  it('renders the CTA section', () => {
    renderHomePage();
    expect(screen.getByText('home_cta_title_1')).toBeInTheDocument();
    expect(screen.getByText('home_cta_title_2')).toBeInTheDocument();
    expect(screen.getByText('home_cta_btn')).toBeInTheDocument();
  });

  it('has correct links in the hero section', () => {
    renderHomePage();
    const startGrowingLink = screen.getByText('start_growing').closest('a');
    expect(startGrowingLink).toHaveAttribute('href', '/onboarding');

    const learnMoreLink = screen.getByText('learn_more').closest('a');
    expect(learnMoreLink).toHaveAttribute('href', '/about');
  });
});
