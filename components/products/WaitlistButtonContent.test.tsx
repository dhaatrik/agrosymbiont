import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import WaitlistButtonContent from './WaitlistButtonContent';

// Mock framer-motion to simplify testing
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual as any,
        AnimatePresence: ({ children }: any) => <>{children}</>,
        motion: {
            div: ({ children, className }: any) => (
                <div className={className}>
                    {children}
                </div>
            ),
        },
    };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    Check: ({ className }: { className?: string }) => <span data-testid="check-icon" className={className} />,
    Loader2: ({ className }: { className?: string }) => <span data-testid="loader-icon" className={className} />,
}));

describe('WaitlistButtonContent Component', () => {
    const mockT = (key: string) => {
        const translations: Record<string, string> = {
            'prod_notify': 'Notify Me',
            'prod_wait': 'Please wait...',
        };
        return translations[key] || key;
    };

    it('renders idle state correctly when no particles', () => {
        render(<WaitlistButtonContent showParticles={false} t={mockT} />);

        expect(screen.getByText('Notify Me')).toBeInTheDocument();
        expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument();
    });

    it('renders success state correctly when showParticles is true', () => {
        render(<WaitlistButtonContent showParticles={true} t={mockT} />);

        expect(screen.getByTestId('check-icon')).toBeInTheDocument();
        expect(screen.queryByText('Notify Me')).not.toBeInTheDocument();
    });
});
