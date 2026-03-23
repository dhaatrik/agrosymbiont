import React, { useState, useCallback } from 'react';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '../hooks/useContactForm';
import FormField from './FormField';

const ContactForm: React.FC = () => {
    const { t } = useTranslation();

    const validateField = useCallback((name: string, value: string): string => {
        if (name === 'name' && !value.trim()) return t('contact_name_required');
        if (name === 'email') {
            const trimmedValue = value.trim();
            if (!trimmedValue) return t('contact_email_required');
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(trimmedValue)) return t('contact_email_invalid');
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

    const getButtonText = () => {
        if (isSubmitting) {
            return (
                <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    {t('contact_sending')}
                </>
            );
        }
        return t('contact_send');
    };

    const inputClass = "mt-1 block w-full px-5 py-4 bg-white dark:bg-stone-800 border-0 ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 focus:bg-blue-50/30 dark:focus:bg-blue-900/20 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 text-gray-800 dark:text-white";
    const errorClass = "ring-red-500 focus:ring-red-500 bg-red-50/30 dark:bg-red-900/20";

    if (isSubmitted) {
        return (
            <div className="bg-white dark:bg-stone-800 p-12 rounded-[2.5rem] shadow-xl flex flex-col justify-center items-center h-full text-center border border-stone-100 dark:border-stone-700 min-h-[400px]">
                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <Check className="h-12 w-12" strokeWidth={2} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('contact_thank_you')}</h2>
                <p className="text-stone-gray dark:text-stone-400 text-lg max-w-sm">{t('contact_success_msg')}</p>
            </div>
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit} className="bg-white/60 dark:bg-stone-800/60 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-stone-700/50 space-y-8">
            {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-start">
                    <div className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0">⚠️</div>
                    <div>
                        <h4 className="text-red-800 dark:text-red-300 font-bold text-sm mb-1">{t('contact_error_header')}</h4>
                        <ul className="list-disc list-inside text-red-600 dark:text-red-400 text-sm">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <FormField label={t('contact_name_label')} name="name" id="name" required error={errors.name}>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={`${inputClass} ${errors.name ? errorClass : ''}`} placeholder={t('contact_name_placeholder')} />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label={t('contact_email_label')} name="email" id="email" required error={errors.email}>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={`${inputClass} ${errors.email ? errorClass : ''}`} placeholder={t('contact_email_placeholder')} />
                </FormField>

                <FormField label={t('contact_phone_label')} name="phone" id="phone" required error={errors.phone}>
                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} pattern="[0-9]*" className={`${inputClass} ${errors.phone ? errorClass : ''}`} placeholder={t('contact_phone_placeholder')} />
                </FormField>
            </div>

            <FormField label={t('contact_inquiry_label')} name="inquiryType" id="inquiryType" required error={errors.inquiryType}>
                <div className="relative">
                    <select id="inquiryType" name="inquiryType" required value={formData.inquiryType} onChange={handleChange} className={`${inputClass} appearance-none ${errors.inquiryType ? errorClass : ''}`}>
                        <option value="">{t('contact_inquiry_placeholder')}</option>
                        <option value="General">{t('contact_inquiry_general')}</option>
                        <option value="Sales">{t('contact_inquiry_sales')}</option>
                        <option value="Support">{t('contact_inquiry_support')}</option>
                        <option value="Careers">{t('contact_inquiry_careers')}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500 dark:text-stone-400">
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>
            </FormField>

            <FormField label={t('contact_message_label')} name="message" id="message" required error={errors.message}>
                <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className={`${inputClass} ${errors.message ? errorClass : ''}`} placeholder={t('contact_message_placeholder')}></textarea>
            </FormField>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#1e40af] hover:shadow-[0_8px_0_#1e3a8a] dark:hover:shadow-[0_8px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-500 hover:-translate-y-1 active:translate-y-1'}`}
                >
                    {getButtonText()}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
