import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import WaitlistParticles from './WaitlistParticles';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, initial, animate, transition, exit, layoutId, ...props }: any, ref: any) => (
      <div ref={ref} className={className} data-testid="motion-div">
        {children}
      </div>
    )),
  },
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Sprout: ({ className }: { className?: string }) => <span data-testid="sprout-icon" className={className} />,
}));

describe('WaitlistParticles Component', () => {
  it('renders exactly 12 particles', () => {
    render(<WaitlistParticles />);
    const particles = screen.getAllByTestId('motion-div');
    expect(particles).toHaveLength(12);
  });

  it('renders a Sprout icon inside each particle', () => {
    render(<WaitlistParticles />);
    const icons = screen.getAllByTestId('sprout-icon');
    expect(icons).toHaveLength(12);
  });

  it('applies the correct layout classes to the container', () => {
    const { container } = render(<WaitlistParticles />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('absolute', 'inset-0', 'pointer-events-none', 'flex', 'items-center', 'justify-center');
  });
});
