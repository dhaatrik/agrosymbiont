import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StepSuccess } from './StepSuccess';
import { PARTICLE_DATA } from './types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: Record<string, string> = {
        'onb_success_title': 'Welcome to AgroSymbiont.',
        'onb_success_desc': `We've received your details and are preparing a strategy based on your focus (${options?.crop}) and primary challenge (${options?.challenge}). Look out for an email shortly!`,
        'onb_return_home': 'Return to Homepage',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
      const {
        initial, animate, exit, variants, transition, whileHover, whileTap,
        layoutId, layout,
        ...domProps
      } = props;
      return <div ref={ref} className={className} data-testid="motion-div" {...domProps}>{children}</div>;
    }),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Check: () => <span data-testid="check-icon" />,
  ArrowRight: () => <span data-testid="arrow-right-icon" />,
}));

describe('StepSuccess Component', () => {
  const mockSelections = {
    crop: 'wheat',
    challenge: 'yield',
    farmSize: 'small',
    soilType: 'alluvial',
    name: 'John Doe',
    email: 'john@example.com',
  };

  it('renders success title and description', () => {
    render(
      <MemoryRouter>
        <StepSuccess selections={mockSelections} />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to AgroSymbiont.')).toBeInTheDocument();
    expect(screen.getByText(/We've received your details and are preparing a strategy based on your focus \(wheat\) and primary challenge \(yield\)\./)).toBeInTheDocument();
  });

  it('renders return home link', () => {
    render(
      <MemoryRouter>
        <StepSuccess selections={mockSelections} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Return to Homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the correct number of particles', () => {
    render(
      <MemoryRouter>
        <StepSuccess selections={mockSelections} />
      </MemoryRouter>
    );

    // One motion-div for the container, one for the Check icon wrapper, and PARTICLE_DATA.length for particles.
    const motionDivs = screen.getAllByTestId('motion-div');
    expect(motionDivs).toHaveLength(2 + PARTICLE_DATA.length);
  });

  it('renders icons', () => {
    render(
      <MemoryRouter>
        <StepSuccess selections={mockSelections} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
  });
});
