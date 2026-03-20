import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TiltCard from './TiltCard';
import { useReducedMotion } from 'framer-motion';

// Mock values to assert against
const mockXSet = vi.fn();
const mockYSet = vi.fn();
const mockOpacitySet = vi.fn();

// Mock framer-motion
vi.mock('framer-motion', () => {
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: vi.fn(() => false),
    useMotionValue: vi.fn((initialValue) => {
      // Return a mocked motion value that captures the `set` calls
      if (initialValue === 0) {
        // Based on the code, x, y and glareOpacity all initialize to 0.
        // We can differentiate them if needed, but returning a generic mock is fine,
        // we'll track calls sequentially or via separate mocks if we wanted to be perfectly exact.
        // Actually, let's just use simple spies we can clear. We'll differentiate by returning unique spies below based on some context,
        // but since `useMotionValue` is called 3 times (x, y, glareOpacity), we can just mock the return object.
      }
      return {
        get: vi.fn(() => initialValue),
        set: vi.fn((val) => {
           // We will track the sets on the mock itself for simplicity in assertion
        }),
      };
    }),
    useSpring: vi.fn((val) => val),
    useTransform: vi.fn(() => 'mock-transform'),
    motion: {
      div: React.forwardRef(({ children, className, style, whileHover, transition, onMouseMove, onMouseLeave, ...props }: any, ref: any) => (
        <div
          ref={ref}
          className={className}
          data-testid="motion-div"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={style} // Pass down style if needed, but not critical for interaction test
        >
          {children}
        </div>
      )),
    },
  };
});

// Setup mock motion values to track them explicitly
import { useMotionValue as mockUseMotionValue } from 'framer-motion';

describe('TiltCard Component', () => {
  let xMotionMock: any;
  let yMotionMock: any;
  let opacityMotionMock: any;

  beforeEach(() => {
    vi.clearAllMocks();

    xMotionMock = { set: vi.fn(), get: vi.fn(() => 0) };
    yMotionMock = { set: vi.fn(), get: vi.fn(() => 0) };
    opacityMotionMock = { set: vi.fn(), get: vi.fn(() => 0) };

    // Mock useMotionValue to return specific mocks in order: x, y, glareOpacity
    (mockUseMotionValue as any)
      .mockReturnValueOnce(xMotionMock)
      .mockReturnValueOnce(yMotionMock)
      .mockReturnValueOnce(opacityMotionMock);

    // Mock getBoundingClientRect
    HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 200,
      height: 300,
      top: 50,
      left: 100,
      bottom: 350,
      right: 300,
      x: 100,
      y: 50,
      toJSON: () => {}
    }));
  });

  it('renders children correctly in a motion.div when reduced motion is false', () => {
    render(
      <TiltCard className="test-class">
        <div data-testid="child">Hello</div>
      </TiltCard>
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();

    const motionDiv = screen.getAllByTestId('motion-div')[0]; // The outer motion.div
    expect(motionDiv).toBeInTheDocument();
    expect(motionDiv).toHaveClass('test-class');
  });

  it('renders a static div without motion wrapper when reduced motion is true', () => {
    vi.mocked(useReducedMotion).mockReturnValueOnce(true);

    const { container } = render(
      <TiltCard className="static-class">
        <div data-testid="child">Hello</div>
      </TiltCard>
    );

    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();

    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv.tagName.toLowerCase()).toBe('div');
    expect(wrapperDiv).toHaveClass('static-class');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('updates motion values correctly on mouse move', () => {
    render(
      <TiltCard>
        <div>Content</div>
      </TiltCard>
    );

    const card = screen.getAllByTestId('motion-div')[0];

    // Fire mouse move event
    // Simulated event: clientX = 150, clientY = 200
    // Rect: width = 200, height = 300, left = 100, top = 50
    // mouseX = 150 - 100 = 50
    // mouseY = 200 - 50 = 150
    // xPct = (50 / 200) - 0.5 = 0.25 - 0.5 = -0.25
    // yPct = (150 / 300) - 0.5 = 0.5 - 0.5 = 0

    fireEvent.mouseMove(card, { clientX: 150, clientY: 200 });

    expect(xMotionMock.set).toHaveBeenCalledWith(-0.25);
    expect(yMotionMock.set).toHaveBeenCalledWith(0);
    expect(opacityMotionMock.set).toHaveBeenCalledWith(0.15);
  });

  it('resets motion values on mouse leave', () => {
    render(
      <TiltCard>
        <div>Content</div>
      </TiltCard>
    );

    const card = screen.getAllByTestId('motion-div')[0];

    // Fire mouse leave event
    fireEvent.mouseLeave(card);

    expect(xMotionMock.set).toHaveBeenCalledWith(0);
    expect(yMotionMock.set).toHaveBeenCalledWith(0);
    expect(opacityMotionMock.set).toHaveBeenCalledWith(0);
  });
});
