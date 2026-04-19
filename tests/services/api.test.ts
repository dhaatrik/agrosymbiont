import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitJobApplication, submitContactForm, JobApplicationData, ContactFormData } from '../../services/api';
import { API_SIMULATION_DELAY } from '../../utils/constants';

describe('API Services', () => {
    let consoleSpy: any;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('submitJobApplication', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should successfully submit a job application and log the output', async () => {
            const data: JobApplicationData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                linkedin: 'https://linkedin.com/in/johndoe',
                resume: null,
            };

            const promise = submitJobApplication(data);

            vi.advanceTimersByTime(API_SIMULATION_DELAY);

            const result = await promise;

            expect(consoleSpy).toHaveBeenCalledWith('Submitting job application:', data.name);

            expect(result).toEqual({ success: true });
        });
    });

    describe('submitContactForm', () => {
        it('should successfully submit a contact form and log the output immediately', async () => {
            const data: ContactFormData = {
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                phone: '123-456-7890',
                inquiryType: 'general',
                message: 'Hello, world!',
            };

            const result = await submitContactForm(data);

            expect(consoleSpy).toHaveBeenCalledWith('Submitting contact form:', data.email);

            expect(result).toEqual({ success: true });
        });
    });
});
