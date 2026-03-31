import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from '../utils/validation';

export const useContactForm = () => {
    const { t } = useTranslation();

    const validateField = useCallback((name: string, value: string): string => {
        if (name === 'name' && !value.trim()) return t('contact_name_required');
        if (name === 'email') {
            const trimmedValue = value.trim();
            if (!trimmedValue) return t('contact_email_required');
            if (!isValidEmail(trimmedValue)) return t('contact_email_invalid');
        }
        if (name === 'phone' && !value.trim()) return t('contact_phone_required');
        if (name === 'inquiryType' && !value) return t('contact_inquiry_required');
        if (name === 'message' && !value.trim()) return t('contact_message_required');
        return '';
    }, [t]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'phone') {
            newValue = value.replace(/\D/g, '');
        }

        setFormData(prevState => ({ ...prevState, [name]: newValue }));

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
        if (nameError) newErrors.name = nameError;
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
        const phoneError = validateField('phone', formData.phone);
        if (phoneError) newErrors.phone = phoneError;
        const inquiryTypeError = validateField('inquiryType', formData.inquiryType);
        if (inquiryTypeError) newErrors.inquiryType = inquiryTypeError;
        const messageError = validateField('message', formData.message);
        if (messageError) newErrors.message = messageError;
        return newErrors;
    }, [formData, validateField]);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    }, [formData, validateForm]);

    return {
        formData,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handleSubmit,
    };
};
