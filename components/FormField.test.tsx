import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormField from './FormField';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    AlertCircle: () => <div data-testid="icon-alert-circle" />,
}));

describe('FormField Component', () => {
    it('renders the label and children correctly', () => {
        render(
            <FormField label="Test Label" name="testName" id="testId">
                <input data-testid="test-input" />
            </FormField>
        );

        // Check for the label text
        const label = screen.getByText('Test Label');
        expect(label).toBeInTheDocument();

        // Check for the htmlFor mapping
        expect(label).toHaveAttribute('for', 'testId');

        // Check for children
        expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });

    it('renders the required asterisk when required is true', () => {
        render(
            <FormField label="Test Label" name="testName" id="testId" required>
                <input data-testid="test-input" />
            </FormField>
        );

        // The asterisk should be rendered
        const asterisk = screen.getByText('*');
        expect(asterisk).toBeInTheDocument();
        expect(asterisk).toHaveClass('text-burnt-orange dark:text-orange-400');
    });

    it('does not render the required asterisk when required is false or omitted', () => {
        render(
            <FormField label="Test Label" name="testName" id="testId">
                <input data-testid="test-input" />
            </FormField>
        );

        // The asterisk should not be rendered
        const asterisk = screen.queryByText('*');
        expect(asterisk).not.toBeInTheDocument();
    });

    it('renders the error message and icon when error is provided', () => {
        const errorMessage = 'This field is required';
        render(
            <FormField label="Test Label" name="testName" id="testId" error={errorMessage}>
                <input data-testid="test-input" />
            </FormField>
        );

        // The error message should be rendered
        expect(screen.getByText(errorMessage)).toBeInTheDocument();

        // The icon should be rendered
        expect(screen.getByTestId('icon-alert-circle')).toBeInTheDocument();
    });

    it('does not render the error block when error is omitted', () => {
        render(
            <FormField label="Test Label" name="testName" id="testId">
                <input data-testid="test-input" />
            </FormField>
        );

        // The error message should not be rendered
        const errorDiv = screen.queryByText('This field is required');
        expect(errorDiv).not.toBeInTheDocument();

        // The icon should not be rendered
        expect(screen.queryByTestId('icon-alert-circle')).not.toBeInTheDocument();
    });
});
