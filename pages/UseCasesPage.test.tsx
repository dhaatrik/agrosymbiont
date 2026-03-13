import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import UseCasesPage from './UseCasesPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock interactive map
vi.mock('../components/InteractiveMap', () => ({
  default: () => <div data-testid="interactive-map"></div>,
}));

// Mock AnimatedSection
vi.mock('../components/AnimatedSection', () => ({
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div data-testid="animated-section" className={className}>{children}</div>
  ),
}));

// Mock TiltCard
vi.mock('../components/TiltCard', () => ({
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div data-testid="tilt-card" className={className}>{children}</div>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  TrendingUp: () => <div data-testid="icon-trending-up"></div>,
}));

describe('UseCasesPage', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <UseCasesPage />
      </MemoryRouter>
    );
  };

  it('renders the page title and subtitle', () => {
    renderComponent();
    expect(screen.getByText('use_cases_title')).toBeInTheDocument();
    expect(screen.getByText('use_cases_subtitle')).toBeInTheDocument();
  });

  it('renders the interactive map section', () => {
    renderComponent();
    expect(screen.getByText('use_cases_map_title')).toBeInTheDocument();
    expect(screen.getByText('use_cases_map_desc')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-map')).toBeInTheDocument();
  });

  it('renders all 9 case study cards', () => {
    renderComponent();

    // Check titles for all 9 cards
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(`use_cases_${i}_title`)).toBeInTheDocument();
      expect(screen.getByText(`use_cases_${i}_cat`)).toBeInTheDocument();
      expect(screen.getByText(`use_cases_${i}_challenge`)).toBeInTheDocument();
      expect(screen.getByText(`use_cases_${i}_solution`)).toBeInTheDocument();
      expect(screen.getByText(`use_cases_${i}_result`)).toBeInTheDocument();
    }

    // Check that labels appear multiple times
    const challengeLabels = screen.getAllByText('use_cases_challenge_label');
    expect(challengeLabels).toHaveLength(9);

    const solutionLabels = screen.getAllByText('use_cases_solution_label');
    expect(solutionLabels).toHaveLength(9);

    const resultsLabels = screen.getAllByText('use_cases_results_label');
    expect(resultsLabels).toHaveLength(9);
  });

  it('renders the CTA section', () => {
    renderComponent();
    expect(screen.getByText('use_cases_cta_title')).toBeInTheDocument();
    expect(screen.getByText('use_cases_cta_desc')).toBeInTheDocument();

    const ctaLink = screen.getByRole('link', { name: 'use_cases_cta_btn' });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', '/contact');
  });
});
