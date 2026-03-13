import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import AnimatedSection from './AnimatedSection';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  let reduceMotion = false;
  return {
    ...actual,
    useReducedMotion: () => reduceMotion,
    // Add a helper to set the mock value
    __setReduceMotion: (value: boolean) => {
      reduceMotion = value;
    },
    motion: {
      div: ({ children, className, 'data-testid': dataTestId, ...props }: any) => (
        <div data-testid={dataTestId || 'motion-div'} className={className} data-props={JSON.stringify(props)}>
          {children}
        </div>
      ),
    },
  };
});

describe('AnimatedSection Component', () => {
  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div data-testid="child">Test Child</div>
      </AnimatedSection>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    render(
      <AnimatedSection className="test-class">
        <div>Test Child</div>
      </AnimatedSection>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('test-class');
  });

  it('passes delay correctly to transition', () => {
    render(
      <AnimatedSection delay={0.5}>
        <div>Test Child</div>
      </AnimatedSection>
    );
    const motionDiv = screen.getByTestId('motion-div');
    const props = JSON.parse(motionDiv.getAttribute('data-props') || '{}');
    expect(props.transition.delay).toBe(0.5);
  });

  describe('with reduced motion', () => {
    it('renders a plain div instead of motion.div when reduced motion is preferred', async () => {
      const { __setReduceMotion } = await import('framer-motion') as any;
      __setReduceMotion(true);

      const { container } = render(
        <AnimatedSection className="reduced-class">
          <div data-testid="child">Test Child</div>
        </AnimatedSection>
      );

      // It should NOT render the mocked motion.div
      expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();

      // The child is rendered directly inside a standard div with the class
      expect(screen.getByTestId('child')).toBeInTheDocument();

      const wrapperDiv = container.firstChild as HTMLElement;
      expect(wrapperDiv.tagName.toLowerCase()).toBe('div');
      expect(wrapperDiv).toHaveClass('reduced-class');

      __setReduceMotion(false); // reset for other tests
    });
  });
});
