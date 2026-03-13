import React from 'react';
import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useReducedMotion } from 'framer-motion';
import ThreeDBackground from './ThreeDBackground';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  useReducedMotion: vi.fn(),
}));

describe('ThreeDBackground Component', () => {
  let mockGetContext: any;
  let mockRequestAnimationFrame: any;
  let mockCancelAnimationFrame: any;
  let mockAddEventListener: any;
  let mockRemoveEventListener: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockGetContext = vi.fn().mockReturnValue({
      scale: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      fillStyle: '',
      arc: vi.fn(),
      fill: vi.fn(),
      strokeStyle: '',
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      lineWidth: 1,
      globalAlpha: 1,
    });
    HTMLCanvasElement.prototype.getContext = mockGetContext as any;

    mockRequestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    mockCancelAnimationFrame = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    mockAddEventListener = vi.spyOn(window, 'addEventListener');
    mockRemoveEventListener = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders canvas element', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);

    const { container } = render(<ThreeDBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('fixed inset-0 z-0 pointer-events-none');
  });

  it('does not initialize animation if useReducedMotion is true', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(<ThreeDBackground />);

    expect(mockGetContext).not.toHaveBeenCalled();
    expect(mockAddEventListener).not.toHaveBeenCalled();
    expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
  });

  it('initializes animation and event listeners if useReducedMotion is false', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);

    render(<ThreeDBackground />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');

    // Check if event listeners are attached
    expect(mockAddEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });

    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up event listeners and animation frame on unmount', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);

    const { unmount } = render(<ThreeDBackground />);

    unmount();

    // Check if event listeners are removed
    expect(mockRemoveEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(1);
  });
});
