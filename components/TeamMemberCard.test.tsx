import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TeamMemberCard from './TeamMemberCard';

// Mock TiltCard since we only care about testing TeamMemberCard's rendering logic
vi.mock('./TiltCard', () => {
  return {
    default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
      <div data-testid="tilt-card" className={className}>
        {children}
      </div>
    )
  };
});

describe('TeamMemberCard', () => {
  const mockProps = {
    name: 'Jane Doe',
    title: 'Lead Agronomist',
    imageUrl: '/images/team/jane-doe.jpg'
  };

  it('renders the team member name', () => {
    render(<TeamMemberCard {...mockProps} />);
    const nameElement = screen.getByText(mockProps.name);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.tagName).toBe('H3');
  });

  it('renders the team member title', () => {
    render(<TeamMemberCard {...mockProps} />);
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('P');
  });

  it('renders the image with correct src and alt attributes', () => {
    render(<TeamMemberCard {...mockProps} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', mockProps.imageUrl);
    expect(imageElement).toHaveAttribute('alt', mockProps.name);
  });

  it('renders the image with lazy loading', () => {
    render(<TeamMemberCard {...mockProps} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('loading', 'lazy');
  });

  it('wraps the content in a TiltCard', () => {
    render(<TeamMemberCard {...mockProps} />);
    const tiltCard = screen.getByTestId('tilt-card');
    expect(tiltCard).toBeInTheDocument();
    expect(tiltCard).toHaveClass('h-96 w-full');
  });
});
