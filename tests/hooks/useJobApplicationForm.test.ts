import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useJobApplicationForm } from '@/hooks/useJobApplicationForm';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as api from '@/services/api';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('useJobApplicationForm', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('should initialize with empty form data and no errors', () => {
        const { result } = renderHook(() => useJobApplicationForm());

        expect(result.current.formData).toEqual({
            name: '',
            email: '',
            linkedin: '',
            resume: null
        });
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(false);
    });

    it('should handle input changes and validate', () => {
        const { result } = renderHook(() => useJobApplicationForm());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'Jane Doe' } as EventTarget & HTMLInputElement
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.name).toBe('Jane Doe');
        expect(result.current.errors.name).toBeUndefined();

        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'invalid-email' } as EventTarget & HTMLInputElement
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.email).toBe('invalid-email');
        expect(result.current.errors.email).toBe('car_form_email_invalid');

        act(() => {
            result.current.handleChange({
                target: { name: 'linkedin', value: 'https://linkedin.com/in/janedoe' } as EventTarget & HTMLInputElement
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.linkedin).toBe('https://linkedin.com/in/janedoe');
        expect(result.current.errors.linkedin).toBeUndefined();
    });

    it('should handle file selection for resume', () => {
        const { result } = renderHook(() => useJobApplicationForm());
        const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });

        act(() => {
            result.current.handleChange({
                target: {
                    name: 'resume',
                    files: [file] as unknown as FileList
                } as EventTarget & HTMLInputElement
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.resume).toBe(file);
        expect(result.current.errors.resume).toBeUndefined();
    });

    it('should validate all fields on submit and prevent submission if invalid', async () => {
        const { result } = renderHook(() => useJobApplicationForm());

        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;

        await act(async () => {
            await result.current.handleSubmit(e);
        });

        expect(e.preventDefault).toHaveBeenCalled();
        expect(result.current.errors).toEqual({
            name: 'car_form_name_required'
        });
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(false);
    });

    it('should submit form when all fields are valid', async () => {
        const onSuccess = vi.fn();
        const { result } = renderHook(() => useJobApplicationForm(onSuccess));
        const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });

        // Fill form
        act(() => {
            result.current.handleChange({ target: { name: 'name', value: 'Jane' } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'email', value: 'jane@example.com' } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'linkedin', value: 'https://linkedin.com/in/jane' } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'resume', files: [file] as unknown as FileList } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
        });

        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;

        let submitPromise: Promise<void>;
        act(() => {
            submitPromise = result.current.handleSubmit(e);
        });

        expect(e.preventDefault).toHaveBeenCalled();
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.isSubmitted).toBe(false);

        await act(async () => {
            await submitPromise;
        });

        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(true);
        expect(onSuccess).toHaveBeenCalled();
    });

    it('should handle API errors on submit', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const submitSpy = vi.spyOn(api, 'submitJobApplication').mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useJobApplicationForm());
        const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });

        // Fill form
        act(() => {
            result.current.handleChange({ target: { name: 'name', value: 'Jane' } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'email', value: 'jane@example.com' } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'linkedin', value: 'https://linkedin.com/in/jane' } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleChange({ target: { name: 'resume', files: [file] as unknown as FileList } as EventTarget & HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
        });

        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;

        let submitPromise: Promise<void>;
        act(() => {
            submitPromise = result.current.handleSubmit(e);
        });

        expect(e.preventDefault).toHaveBeenCalled();
        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.isSubmitted).toBe(false);

        await act(async () => {
            await submitPromise;
        });

        expect(consoleSpy).toHaveBeenCalledWith('Failed to submit application', expect.any(Error));
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.isSubmitted).toBe(false);

        consoleSpy.mockRestore();
        submitSpy.mockRestore();
    });
});
