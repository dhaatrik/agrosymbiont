import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThreeDBackground from './ThreeDBackground';
import { useReducedMotion } from 'framer-motion';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  useReducedMotion: vi.fn(),
  useScroll: vi.fn(() => ({
    scrollY: {
      get: vi.fn(() => 0),
    },
  })),
}));

// Mock the canvas context
const mockGetContext = vi.fn(() => ({
  scale: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
}));

describe('ThreeDBackground Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup canvas mock
    HTMLCanvasElement.prototype.getContext = mockGetContext as any;

    // Mock window properties
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    Object.defineProperty(window, 'devicePixelRatio', { value: 1, writable: true });

    // Mock requestAnimationFrame and cancelAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16) as any);
    global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id as any));
  });

  it('renders a canvas element', () => {
    const { container } = render(<ThreeDBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('fixed inset-0 z-0 pointer-events-none');
  });

  it('respects prefers-reduced-motion and does not render animation', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<ThreeDBackground />);
    expect(mockGetContext).not.toHaveBeenCalled();
  });

  it('initializes canvas context and starts animation loop when motion is allowed', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
    render(<ThreeDBackground />);
    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up event listeners and animation frame on unmount', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ThreeDBackground />);

    // Verify some listeners were added
    expect(addEventListenerSpy).toHaveBeenCalled();

    unmount();

    // Verify cleanup
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });
});
