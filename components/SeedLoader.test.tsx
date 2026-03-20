import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import SeedLoader from './SeedLoader';

// Mock framer-motion to avoid actual animations in tests and prevent DOM warnings
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, 'data-testid': dataTestId, initial, animate, transition, ...props }: any) => (
      <div data-testid={dataTestId || 'motion-div'} className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('SeedLoader Component', () => {
  it('renders without crashing and displays the growing text', () => {
    render(<SeedLoader />);

    // Check that the "Growing..." text is present
    expect(screen.getByText('Growing...')).toBeInTheDocument();
  });

  it('renders with the correct container layout classes', () => {
    const { container } = render(<SeedLoader />);

    // The main container should be the first child
    const mainContainer = container.firstChild as HTMLElement;

    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('items-center');
    expect(mainContainer).toHaveClass('justify-center');
    expect(mainContainer).toHaveClass('bg-[#FFFFF0]');
    expect(mainContainer).toHaveClass('dark:bg-stone-900');
  });

  it('renders the expected number of animated elements', () => {
    render(<SeedLoader />);

    // There are 5 motion.divs in the component: Seed, Stem, Left leaf, Right leaf, Growing text
    const motionElements = screen.getAllByTestId('motion-div');
    expect(motionElements).toHaveLength(5);
  });
});
