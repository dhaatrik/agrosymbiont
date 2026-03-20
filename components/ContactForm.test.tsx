import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from './ContactForm';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'contact_name_label': 'Name',
                'contact_name_required': 'Name is required',
                'contact_email_label': 'Email',
                'contact_email_invalid': 'Invalid email',
                'contact_phone_label': 'Phone',
                'contact_inquiry_label': 'Inquiry Type',
                'contact_message_label': 'Message',
                'contact_send': 'Send',
                'contact_thank_you': 'Thank you!',
                'contact_email_required': 'Email is required',
                'contact_phone_required': 'Phone is required',
                'contact_inquiry_required': 'Inquiry type is required',
                'contact_message_required': 'Message is required',
                'contact_sending': 'Sending...',
                'contact_error_header': 'Please fix the following errors:',
            };
            return translations[key] || key;
        }
    })
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    Check: () => <div data-testid="icon-check" />,
    AlertCircle: () => <div data-testid="icon-alert-circle" />,
    ChevronDown: () => <div data-testid="icon-chevron-down" />,
    Loader2: () => <div data-testid="icon-loader2" />,
}));

describe('ContactForm Component', () => {
    it('renders all form fields correctly', () => {
        render(<ContactForm />);

        expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Inquiry Type/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send/ })).toBeInTheDocument();
    });

    it('displays validation errors when submitting an empty form', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const submitButton = screen.getByRole('button', { name: /Send/ });
        await user.click(submitButton);

        expect((await screen.findAllByText('Name is required')).length).toBeGreaterThan(0);
        expect((await screen.findAllByText('Email is required')).length).toBeGreaterThan(0);
        expect((await screen.findAllByText('Phone is required')).length).toBeGreaterThan(0);
        expect((await screen.findAllByText('Inquiry type is required')).length).toBeGreaterThan(0);
        expect((await screen.findAllByText('Message is required')).length).toBeGreaterThan(0);
    });

    it('displays validation error when entering an invalid email', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const emailInput = screen.getByLabelText(/Email/);
        await user.type(emailInput, 'invalidemail');

        const submitButton = screen.getByRole('button', { name: /Send/ });
        await user.click(submitButton);

        expect((await screen.findAllByText('Invalid email')).length).toBeGreaterThan(0);
    });

    it('submits the form successfully when all fields are valid', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        // Fill out the form
        await user.type(screen.getByLabelText(/Name/), 'John Doe');
        await user.type(screen.getByLabelText(/Email/), 'john@example.com');
        await user.type(screen.getByLabelText(/Phone/), '1234567890');
        await user.selectOptions(screen.getByLabelText(/Inquiry Type/), 'General');
        await user.type(screen.getByLabelText(/Message/), 'Hello, this is a test message.');

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /Send/ });
        await user.click(submitButton);

        // Verify sending state
        expect(await screen.findByText('Sending...')).toBeInTheDocument();

        // Wait for the simulated API call to finish and verify success state
        await waitFor(() => {
            expect(screen.getByText('Thank you!')).toBeInTheDocument();
        }, { timeout: 2500 });
    });
});
