import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ROICalculator from './ROICalculator';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    TrendingUp: () => <span>TrendingUp Icon</span>,
    Zap: () => <span>Zap Icon</span>,
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => {
        const translations: Record<string, string> = {
            'prod_roi_title': 'ROI Calculator',
            'prod_roi_desc': 'Calculate your return on investment.',
            'prod_farm_size': 'Farm Size',
            'prod_acres': 'Acres',
            'prod_yield_increase': 'Yield Increase',
            'prod_tons': 'Tons',
            'prod_revenue_boost': 'Revenue Boost',
        };
        return {
            t: (key: string) => translations[key] || key,
        };
    },
}));

describe('ROICalculator', () => {
    it('renders with initial default state (10 acres)', () => {
        render(<ROICalculator />);

        // Check if title and description are rendered
        expect(screen.getByText('ROI Calculator')).toBeInTheDocument();
        expect(screen.getByText('Calculate your return on investment.')).toBeInTheDocument();
        expect(screen.getByText('Farm Size')).toBeInTheDocument();

        // Initial farm size is 10
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('Acres')).toBeInTheDocument();

        // Yield increase formula: Math.round(10 * 0.25 * 10).toLocaleString() = 25
        expect(screen.getByText('+25')).toBeInTheDocument();
        expect(screen.getByText('Tons')).toBeInTheDocument();

        // Revenue boost formula: (10 * 1250).toLocaleString() = 12,500
        expect(screen.getByText('+$12,500')).toBeInTheDocument();
    });

    it('updates displayed values when slider is interacted with', () => {
        render(<ROICalculator />);

        // Find the range input by its aria-label
        const slider = screen.getByLabelText('Farm size in acres');

        // Change the value to 100
        fireEvent.change(slider, { target: { value: '100' } });

        // Verify updated farm size is 100
        expect(screen.getByText('100')).toBeInTheDocument();

        // Updated yield increase: Math.round(100 * 0.25 * 10).toLocaleString() = 250
        expect(screen.getByText('+250')).toBeInTheDocument();

        // Updated revenue boost: (100 * 1250).toLocaleString() = 125,000
        expect(screen.getByText('+$125,000')).toBeInTheDocument();
    });
});
