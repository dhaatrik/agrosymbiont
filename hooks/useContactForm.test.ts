import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './useContactForm';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('useContactForm', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('should initialize with empty form data and no errors', () => {
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

    it('should handle input changes and validate', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'John Doe' }
            } as any);
        });

        expect(result.current.formData.name).toBe('John Doe');
        expect(result.current.errors.name).toBeUndefined();

        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'invalid-email' }
            } as any);
        });

        expect(result.current.formData.email).toBe('invalid-email');
        expect(result.current.errors.email).toBe('contact_email_invalid');
    });

    it('should strip non-digit characters from phone number', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'phone', value: '123-456-7890 abc' }
            } as any);
        });

        expect(result.current.formData.phone).toBe('1234567890');
    });

    it('should validate all fields on submit and prevent submission if invalid', async () => {
        const { result } = renderHook(() => useContactForm());

        const e = { preventDefault: vi.fn() } as any;

        await act(async () => {
            await result.current.handleSubmit(e);
        });

        expect(e.preventDefault).toHaveBeenCalled();
        expect(result.current.errors).toEqual({
            name: 'contact_name_required',
            email: 'contact_email_required',
            phone: 'contact_phone_required',
            inquiryType: 'contact_inquiry_required',
            message: 'contact_message_required',
        });
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(false);
    });

    it('should submit form when all fields are valid', async () => {
        const { result } = renderHook(() => useContactForm());

        // Fill form
        act(() => {
            result.current.handleChange({ target: { name: 'name', value: 'John' } } as any);
            result.current.handleChange({ target: { name: 'email', value: 'john@example.com' } } as any);
            result.current.handleChange({ target: { name: 'phone', value: '1234567890' } } as any);
            result.current.handleChange({ target: { name: 'inquiryType', value: 'General' } } as any);
            result.current.handleChange({ target: { name: 'message', value: 'Hello' } } as any);
        });

        const e = { preventDefault: vi.fn() } as any;

        let submitPromise: Promise<void>;
        act(() => {
            submitPromise = result.current.handleSubmit(e);
        });

        expect(e.preventDefault).toHaveBeenCalled();
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.isSubmitted).toBe(false);

        await act(async () => {
            vi.advanceTimersByTime(1500);
            await submitPromise;
        });

        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(true);
    });
});
