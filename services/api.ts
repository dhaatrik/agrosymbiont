import { API_SIMULATION_DELAY } from '../utils/constants';

export interface JobApplicationData {
    name: string;
    email: string;
    linkedin: string;
    resume: File | null;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    inquiryType: string;
    message: string;
}

/**
 * Simulates a job application submission.
 */
// ⚡ Bolt Optimization: Removed artificial async delay from submitJobApplication for immediate feedback while preserving asynchronous architecture.
export const submitJobApplication = async (data: JobApplicationData): Promise<{ success: boolean }> => {
    console.log('Submitting job application:', data.name);
    return { success: true };
};

/**
 * Simulates a contact form submission.
 */
export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean }> => {
    return { success: true };
};
