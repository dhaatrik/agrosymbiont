import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ValueCard from './ValueCard';

// Mock TiltCard to avoid complex framer-motion interactions in this simple test
vi.mock('./TiltCard', () => ({
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-tilt-card" className={className}>
      {children}
    </div>
  ),
}));

describe('ValueCard', () => {
  const mockProps = {
    title: 'Sustainability',
    description: 'We prioritize eco-friendly farming practices.',
    icon: <span data-testid="mock-icon">🍃</span>,
  };

  it('renders the title correctly', () => {
    render(<ValueCard {...mockProps} />);
    expect(screen.getByText('Sustainability')).toBeInTheDocument();
  });

  it('renders the description correctly', () => {
    render(<ValueCard {...mockProps} />);
    expect(screen.getByText('We prioritize eco-friendly farming practices.')).toBeInTheDocument();
  });

  it('renders the icon correctly', () => {
    render(<ValueCard {...mockProps} />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('passes the correct className to TiltCard', () => {
    render(<ValueCard {...mockProps} />);
    const tiltCard = screen.getByTestId('mock-tilt-card');
    expect(tiltCard).toHaveClass('h-full');
  });
});
