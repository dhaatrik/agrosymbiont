import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormField from './FormField';

// Mock lucide-react to avoid complex SVG rendering issues in JSDOM
vi.mock('lucide-react', () => ({
    AlertCircle: () => <span data-testid="alert-icon">AlertCircle</span>
}));

describe('FormField', () => {
    const defaultProps = {
        label: 'Test Label',
        name: 'testName',
        id: 'test-id',
    };

    it('renders the label and children correctly', () => {
        render(
            <FormField {...defaultProps}>
                <input data-testid="test-input" id="test-id" />
            </FormField>
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByTestId('test-input')).toBeInTheDocument();

        // Verify htmlFor matches the id for accessibility
        const labelElement = screen.getByText(/Test Label/);
        expect(labelElement).toHaveAttribute('for', 'test-id');
    });

    it('renders the required asterisk when required is true', () => {
        render(
            <FormField {...defaultProps} required>
                <input id="test-id" />
            </FormField>
        );

        const asterisk = screen.getByText('*');
        expect(asterisk).toBeInTheDocument();
        expect(asterisk).toHaveClass('text-burnt-orange', 'dark:text-orange-400');
    });

    it('does not render the required asterisk when required is false or undefined', () => {
        const { rerender } = render(
            <FormField {...defaultProps}>
                <input id="test-id" />
            </FormField>
        );

        expect(screen.queryByText('*')).not.toBeInTheDocument();

        rerender(
            <FormField {...defaultProps} required={false}>
                <input id="test-id" />
            </FormField>
        );

        expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('renders the error message and correctly associates it with the input via ARIA attributes', () => {
        const errorMessage = 'This field is required';
        render(
            <FormField {...defaultProps} error={errorMessage}>
                <input data-testid="test-input" id="test-id" />
            </FormField>
        );

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByTestId('alert-icon')).toBeInTheDocument();

        // Verify ARIA attributes on the input
        const input = screen.getByTestId('test-input');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', 'test-id-error');

        // Verify the error message has the matching ID
        const errorMessageContainer = screen.getByText(errorMessage).closest('div');
        expect(errorMessageContainer).toHaveAttribute('id', 'test-id-error');

        // Verify it's within the aria-live polite region
        const politeRegion = screen.getByText(errorMessage).closest('[aria-live="polite"]');
        expect(politeRegion).toBeInTheDocument();
    });

    it('does not render the error message when error prop is not provided', () => {
        render(
            <FormField {...defaultProps}>
                <input id="test-id" />
            </FormField>
        );

        expect(screen.queryByTestId('alert-icon')).not.toBeInTheDocument();
    });
});
