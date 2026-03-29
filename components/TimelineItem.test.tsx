import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimelineItem from './TimelineItem';

// Mock TiltCard to avoid needing to test its framer-motion internals here
vi.mock('./TiltCard', () => {
    return {
        default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-tilt-card">{children}</div>
    };
});

describe('TimelineItem Component', () => {
    const defaultProps = {
        year: '2025',
        title: 'Future Milestone',
        description: 'A description of the future milestone.',
        align: 'left' as const
    };

    it('renders the year, title, and description correctly', () => {
        render(<TimelineItem {...defaultProps} />);

        // Verify content
        expect(screen.getByText('2025')).toBeInTheDocument();
        expect(screen.getByText('Future Milestone')).toBeInTheDocument();
        expect(screen.getByText('A description of the future milestone.')).toBeInTheDocument();

        // Verify mock TiltCard is used
        expect(screen.getByTestId('mock-tilt-card')).toBeInTheDocument();
    });

    it('renders with left alignment correctly', () => {
        const { container } = render(<TimelineItem {...defaultProps} />);

        // Find the main wrapper div
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass('flex');

        // Left align should NOT have flex-row-reverse
        expect(wrapper).not.toHaveClass('flex-row-reverse');

        // The inner text container should have 'text-left'
        const textContainer = screen.getByText('Future Milestone').parentElement;
        expect(textContainer).toHaveClass('text-left');
        expect(textContainer).not.toHaveClass('text-right');
    });

    it('renders with right alignment correctly', () => {
        const { container } = render(<TimelineItem {...defaultProps} align="right" />);

        // Find the main wrapper div
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass('flex');

        // Right align SHOULD have flex-row-reverse
        expect(wrapper).toHaveClass('flex-row-reverse');

        // The inner text container should have 'text-right'
        const textContainer = screen.getByText('Future Milestone').parentElement;
        expect(textContainer).toHaveClass('text-right');
        expect(textContainer).not.toHaveClass('text-left');
    });
});
