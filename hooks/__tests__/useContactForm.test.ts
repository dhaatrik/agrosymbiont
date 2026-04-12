import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useContactForm } from '../useContactForm';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('useContactForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes with default values', () => {
        const { result } = renderHook(() => useContactForm());

        expect(result.current.formData).toEqual({
            name: '',
            email: '',
            phone: '',
            inquiryType: '',
            message: '',
        });
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(false);
    });

    it('updates form data on change', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'John Doe' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.name).toBe('John Doe');
    });

    it('strips non-digits from phone number', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'phone', value: '123-abc-456' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.phone).toBe('123456');
    });

    it('sets error when required field is cleared', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: ' ' }, // Empty/whitespace
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.errors.name).toBe('contact_name_required');
    });

    it('validates empty email', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: '  ' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.errors.email).toBe('contact_email_required');
    });

    it('validates incorrect email format', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'invalid-email' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.errors.email).toBe('contact_email_invalid');
    });

    it('clears email error with valid format', () => {
        const { result } = renderHook(() => useContactForm());

        // First set an invalid email
        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'invalid-email' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.errors.email).toBe('contact_email_invalid');

        // Then set a valid email
        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'valid@example.com' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.errors.email).toBeUndefined();
    });

    it('prevents submission when fields are invalid', async () => {
        const { result } = renderHook(() => useContactForm());

        const mockPreventDefault = vi.fn();
        const mockEvent = {
            preventDefault: mockPreventDefault,
        } as unknown as React.FormEvent<HTMLFormElement>;

        await act(async () => {
            await result.current.handleSubmit(mockEvent);
        });

        expect(mockPreventDefault).toHaveBeenCalled();
        expect(result.current.errors.name).toBe('contact_name_required');
        expect(result.current.errors.email).toBe('contact_email_required');
        expect(result.current.errors.phone).toBe('contact_phone_required');
        expect(result.current.errors.inquiryType).toBe('contact_inquiry_required');
        expect(result.current.errors.message).toBe('contact_message_required');
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(false);
    });

    it('submits successfully when form is valid', async () => {
        // Mock timers to skip the 1500ms timeout quickly
        vi.useFakeTimers();

        const { result } = renderHook(() => useContactForm());

        // Fill out form
        act(() => {
            result.current.handleChange({ target: { name: 'name', value: 'John Doe' } } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'email', value: 'john@example.com' } } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'phone', value: '1234567890' } } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'inquiryType', value: 'Support' } } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'message', value: 'Hello world' } } as React.ChangeEvent<HTMLInputElement>);
        });

        const mockPreventDefault = vi.fn();
        const mockEvent = {
            preventDefault: mockPreventDefault,
        } as unknown as React.FormEvent<HTMLFormElement>;

        let submitPromise: Promise<void>;
        act(() => {
            submitPromise = result.current.handleSubmit(mockEvent);
        });

        // After submit is called but before timer resolves
        expect(mockPreventDefault).toHaveBeenCalled();
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.isSubmitted).toBe(false);

        // Fast forward time
        await act(async () => {
            await submitPromise;
        });

        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(true);

        vi.useRealTimers();
    });
});
