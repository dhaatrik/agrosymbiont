import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from '../utils/validation';
import { submitJobApplication, JobApplicationData } from '../services/api';

export const useJobApplicationForm = (onSuccess?: () => void) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<JobApplicationData>({
        name: '',
        email: '',
        linkedin: '',
        resume: null
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateField = useCallback((name: string, value: string | File | null): string => {
        if (name === 'name' && (typeof value !== 'string' || !value.trim())) return t('car_form_name_required');
        if (name === 'email') {
            if (typeof value !== 'string') return t('car_form_email_required');
            const trimmedValue = value.trim();
            if (!trimmedValue) return t('car_form_email_required');
            if (!isValidEmail(trimmedValue)) return t('car_form_email_invalid');
        }
        if (name === 'linkedin' && (typeof value !== 'string' || !value.trim())) return t('car_form_linkedin_required');
        if (name === 'resume' && !value) return t('car_form_resume_required');
        return '';
    }, [t]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        let newValue: string | File | null = value;

        if (name === "resume" && files) {
            newValue = files[0];
            setFormData(prevState => ({ ...prevState, resume: files[0] }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }

        const fieldError = validateField(name, newValue);
        setErrors(prev => {
            const newErrors = { ...prev };
            if (fieldError) {
                newErrors[name] = fieldError;
            } else {
                delete newErrors[name];
            }
            return newErrors;
        });
    }, [validateField]);

    const validateForm = useCallback((): { [key: string]: string } => {
        const newErrors: { [key: string]: string } = {};

        const nameError = validateField('name', formData.name);
        if (nameError) {
            newErrors.name = nameError;
            return newErrors;
        }

        const emailError = validateField('email', formData.email);
        if (emailError) {
            newErrors.email = emailError;
            return newErrors;
        }

        const linkedinError = validateField('linkedin', formData.linkedin);
        if (linkedinError) {
            newErrors.linkedin = linkedinError;
            return newErrors;
        }

        const resumeError = validateField('resume', formData.resume);
        if (resumeError) {
            newErrors.resume = resumeError;
            return newErrors;
        }

        return newErrors;
    }, [formData, validateField]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            await submitJobApplication(formData);
            setIsSubmitted(true);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Failed to submit application', error);
            // Handle error if necessary
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handleSubmit,
        setErrors
    };
};
