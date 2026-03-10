import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AnimatedSection from '../components/AnimatedSection';

// Import the mocked hook to change its return value
import { useReducedMotion } from 'framer-motion';

// Mock framer-motion so we can control useReducedMotion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as any),
    useReducedMotion: vi.fn(),
    motion: {
      div: ({ children, className, ...props }: any) => (
        <div data-testid="motion-div" className={className} data-props={JSON.stringify(props)}>
          {children}
        </div>
      )
    }
  };
});

describe('AnimatedSection', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders a motion.div when reduced motion is NOT preferred (false)', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);

    render(
      <AnimatedSection className="test-class">
        <span>Test Child</span>
      </AnimatedSection>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
    expect(motionDiv).toHaveClass('test-class');
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders a plain div when reduced motion IS preferred (true)', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <AnimatedSection className="test-class-reduced">
        <span>Test Child Reduced</span>
      </AnimatedSection>
    );

    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();

    const plainDiv = screen.getByText('Test Child Reduced').parentElement;
    expect(plainDiv?.tagName).toBe('DIV');
    expect(plainDiv).toHaveClass('test-class-reduced');
  });

  it('passes the custom delay to the motion component', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);

    render(
      <AnimatedSection delay={0.75}>
        <span>Delay Child</span>
      </AnimatedSection>
    );

    const motionDiv = screen.getByTestId('motion-div');

    // Check if the delay property is present in the data-props attribute
    const propsData = JSON.parse(motionDiv.getAttribute('data-props') || '{}');
    expect(propsData.transition).toBeDefined();
    expect(propsData.transition.delay).toBe(0.75);
  });
});
