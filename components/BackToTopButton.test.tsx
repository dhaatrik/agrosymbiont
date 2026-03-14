import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BackToTopButton from './BackToTopButton';

// Mock framer-motion useScroll and useMotionValueEvent
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  let scrollYValue = 0;
  let listeners: ((v: number) => void)[] = [];

  return {
    ...actual,
    useScroll: () => ({
      scrollY: {
        get: () => scrollYValue,
        onChange: (listener: (v: number) => void) => {
          listeners.push(listener);
          return () => {
            listeners = listeners.filter(l => l !== listener);
          };
        }
      }
    }),
    useMotionValueEvent: (value: any, eventName: string, callback: (v: number) => void) => {
      if (eventName === 'change') {
         // In a real environment, useMotionValueEvent would subscribe to the motion value.
         // For testing, we can expose a global function to trigger the callback manually.
         (globalThis as any).__triggerFramerScroll = (y: number) => {
             scrollYValue = y;
             callback(y);
         };
      }
    }
  };
});

describe('BackToTopButton', () => {
  beforeEach(() => {
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    vi.clearAllMocks();
    (globalThis as any).__triggerFramerScroll?.(0);
  });

  it('is initially hidden', () => {
    render(<BackToTopButton />);
    const button = screen.getByRole('button', { name: /scroll back to top/i });
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('scale-95');
    expect(button).toHaveClass('pointer-events-none');
    expect(button).not.toHaveClass('opacity-100');
  });

  it('becomes visible when scrolling past 300px', () => {
    render(<BackToTopButton />);
    const button = screen.getByRole('button', { name: /scroll back to top/i });

    act(() => {
      (globalThis as any).__triggerFramerScroll(301);
    });

    expect(button).toHaveClass('opacity-100');
    expect(button).toHaveClass('scale-100');
    expect(button).not.toHaveClass('opacity-0');
    expect(button).not.toHaveClass('pointer-events-none');
  });

  it('hides again when scrolling back up', () => {
    render(<BackToTopButton />);
    const button = screen.getByRole('button', { name: /scroll back to top/i });

    // Scroll down first
    act(() => {
      (globalThis as any).__triggerFramerScroll(301);
    });

    // Verify it is visible
    expect(button).toHaveClass('opacity-100');

    // Scroll back up
    act(() => {
      (globalThis as any).__triggerFramerScroll(200);
    });

    // Verify it is hidden again
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('scale-95');
    expect(button).toHaveClass('pointer-events-none');
  });

  it('calls window.scrollTo when clicked', () => {
    render(<BackToTopButton />);
    const button = screen.getByRole('button', { name: /scroll back to top/i });

    // Make it visible
    act(() => {
      (globalThis as any).__triggerFramerScroll(301);
    });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
