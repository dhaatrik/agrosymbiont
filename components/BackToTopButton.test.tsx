import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BackToTopButton from './BackToTopButton';

describe('BackToTopButton', () => {
  beforeEach(() => {
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    vi.clearAllMocks();
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
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true });
      window.dispatchEvent(new Event('scroll'));
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
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Verify it is visible
    expect(button).toHaveClass('opacity-100');

    // Scroll back up
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Verify it is hidden again
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('scale-95');
    expect(button).toHaveClass('pointer-events-none');
  });

  it('calls window.scrollTo when clicked', () => {
    render(<BackToTopButton />);
    const button = screen.getByRole('button', { name: /scroll back to top/i });

    // Make it visible so it can be clicked (pointer-events-none might prevent it in real DOM,
    // but testing-library fireEvent.click still triggers it if we don't check pointer-events,
    // but let's be thorough and simulate scroll first)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
