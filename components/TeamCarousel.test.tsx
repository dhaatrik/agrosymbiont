import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TeamCarousel from './TeamCarousel';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    ChevronLeft: () => <span data-testid="chevron-left" />,
    ChevronRight: () => <span data-testid="chevron-right" />
}));

// Mock TeamMemberCard to simplify the DOM and avoid testing child component logic here
vi.mock('./TeamMemberCard', () => {
    return {
        default: ({ name, title }: { name: string, title: string }) => (
            <div data-testid="team-member-card">
                <span data-testid="member-name">{name}</span>
                <span data-testid="member-title">{title}</span>
            </div>
        )
    };
});

describe('TeamCarousel', () => {
    const teamMembers = [
        { name: "Dhaatrik Chowdhury", title: "Founder & CEO" },
        { name: "Aarav Patel", title: "Chief Technology Officer" },
        { name: "Priya Sharma", title: "Head of Global Operations" },
        { name: "Rohan Desai", title: "Lead Agronomist" },
        { name: "Ananya Singh", title: "VP of Sustainability" },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all team members initially', () => {
        render(<TeamCarousel />);

        const memberCards = screen.getAllByTestId('team-member-card');
        expect(memberCards).toHaveLength(teamMembers.length);

        teamMembers.forEach((member, index) => {
            expect(screen.getAllByTestId('member-name')[index]).toHaveTextContent(member.name);
            expect(screen.getAllByTestId('member-title')[index]).toHaveTextContent(member.title);
        });

        // Check initial transform
        const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
        expect(carouselContainer).toHaveStyle('transform: translateX(calc(-0 * (100% / var(--items-per-screen, 1))))');
    });

    it('navigates to the next slide when clicking the Next button', () => {
        render(<TeamCarousel />);

        const nextButton = screen.getByLabelText('Next slide');
        fireEvent.click(nextButton);

        const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
        expect(carouselContainer).toHaveStyle('transform: translateX(calc(-1 * (100% / var(--items-per-screen, 1))))');
    });

    it('loops to the first slide when clicking Next on the last slide', () => {
        render(<TeamCarousel />);

        const nextButton = screen.getByLabelText('Next slide');

        // Click through to the last slide
        for (let i = 0; i < teamMembers.length; i++) {
            fireEvent.click(nextButton);
        }

        const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
        expect(carouselContainer).toHaveStyle('transform: translateX(calc(-0 * (100% / var(--items-per-screen, 1))))');
    });

    it('navigates to the previous slide when clicking the Previous button', () => {
        render(<TeamCarousel />);

        // Starts at 0, clicking previous should wrap to the last item (length - 1 = 4)
        const prevButton = screen.getByLabelText('Previous slide');
        fireEvent.click(prevButton);

        const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
        expect(carouselContainer).toHaveStyle('transform: translateX(calc(-4 * (100% / var(--items-per-screen, 1))))');
    });

    it('navigates to a specific slide when clicking a pagination dot', () => {
        render(<TeamCarousel />);

        // Click the dot for the 3rd slide (index 2)
        const dot = screen.getByLabelText('Go to slide 3');
        fireEvent.click(dot);

        const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
        expect(carouselContainer).toHaveStyle('transform: translateX(calc(-2 * (100% / var(--items-per-screen, 1))))');
    });

    it('navigates to the next slide on swipe left', () => {
        render(<TeamCarousel />);

        const wrapperDiv = screen.getByText(teamMembers[0].name).closest('.relative');
        expect(wrapperDiv).toBeInTheDocument();

        if (wrapperDiv) {
            fireEvent.touchStart(wrapperDiv, { targetTouches: [{ clientX: 200 }] });
            fireEvent.touchMove(wrapperDiv, { targetTouches: [{ clientX: 100 }] }); // Moved left by 100px
            fireEvent.touchEnd(wrapperDiv);

            const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
            expect(carouselContainer).toHaveStyle('transform: translateX(calc(-1 * (100% / var(--items-per-screen, 1))))');
        }
    });

    it('navigates to the previous slide on swipe right', () => {
        render(<TeamCarousel />);

        const wrapperDiv = screen.getByText(teamMembers[0].name).closest('.relative');

        if (wrapperDiv) {
            // Starts at 0, swipe right should wrap to the last item (4)
            fireEvent.touchStart(wrapperDiv, { targetTouches: [{ clientX: 100 }] });
            fireEvent.touchMove(wrapperDiv, { targetTouches: [{ clientX: 200 }] }); // Moved right by 100px
            fireEvent.touchEnd(wrapperDiv);

            const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
            expect(carouselContainer).toHaveStyle('transform: translateX(calc(-4 * (100% / var(--items-per-screen, 1))))');
        }
    });

    it('does not change slide if swipe distance is less than minimum threshold', () => {
        render(<TeamCarousel />);

        const wrapperDiv = screen.getByText(teamMembers[0].name).closest('.relative');

        if (wrapperDiv) {
            // Swipe left by 30px (threshold is 50px)
            fireEvent.touchStart(wrapperDiv, { targetTouches: [{ clientX: 200 }] });
            fireEvent.touchMove(wrapperDiv, { targetTouches: [{ clientX: 170 }] });
            fireEvent.touchEnd(wrapperDiv);

            const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
            // Should remain at 0
            expect(carouselContainer).toHaveStyle('transform: translateX(calc(-0 * (100% / var(--items-per-screen, 1))))');
        }
    });

    it('does not change slide if touch ends without a valid start', () => {
        render(<TeamCarousel />);

        const wrapperDiv = screen.getByText(teamMembers[0].name).closest('.relative');

        if (wrapperDiv) {
            // Just touch end
            fireEvent.touchEnd(wrapperDiv);

            const carouselContainer = screen.getByText(teamMembers[0].name).closest('.flex');
            // Should remain at 0
            expect(carouselContainer).toHaveStyle('transform: translateX(calc(-0 * (100% / var(--items-per-screen, 1))))');
        }
    });
});
