
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, UploadCloud, Loader2 } from 'lucide-react';

interface JobApplicationFormProps {
    jobId?: string;
    jobTitle?: string;
    onSuccess?: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle, onSuccess }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{ name: string, email: string, linkedin: string, resume: File | null }>({ name: '', email: '', linkedin: '', resume: null });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateField = (name: string, value: string | File | null): string => {
        if (name === 'name' && (typeof value !== 'string' || !value.trim())) return t('car_form_name_required');
        if (name === 'email') {
            if (typeof value !== 'string') return t('car_form_email_required');
            const trimmedValue = value.trim();
            if (!trimmedValue) return t('car_form_email_required');
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            if (!emailRegex.test(trimmedValue)) return t('car_form_email_invalid');
        }
        if (name === 'linkedin' && (typeof value !== 'string' || !value.trim())) return t('car_form_linkedin_required');
        if (name === 'resume' && !value) return t('car_form_resume_required');
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    const validateForm = (): { [key: string]: string } => {
        const newErrors: { [key: string]: string } = {};
        const nameError = validateField('name', formData.name);
        if (nameError) newErrors.name = nameError;
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
        const linkedinError = validateField('linkedin', formData.linkedin);
        if (linkedinError) newErrors.linkedin = linkedinError;
        const resumeError = validateField('resume', formData.resume);
        if (resumeError) newErrors.resume = resumeError;
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        if (onSuccess) onSuccess();
    };

    const inputClass = "mt-1 block w-full px-5 py-4 bg-white dark:bg-stone-900 border-0 ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 focus:bg-blue-50/30 dark:focus:bg-blue-900/20 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 text-gray-800 dark:text-gray-200";

    if (isSubmitted) {
        return (
            <div className="text-center py-12 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">{t('car_form_success_title')}</h3>
                <p className="mt-2 text-green-600 dark:text-green-500">{t('car_form_success_desc')}</p>
            </div>
        );
    }

    const idPrefix = jobId || 'general';

    return (
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" strokeWidth={2} />
                    <div>
                        <h4 className="text-red-800 dark:text-red-300 font-bold text-sm mb-1">{t('car_form_error_header')}</h4>
                        <ul className="list-disc list-inside text-red-600 dark:text-red-400 text-sm">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div>
                <label htmlFor={`${idPrefix}-name`} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">{t('car_form_name')}</label>
                <input type="text" name="name" id={`${idPrefix}-name`} required onChange={handleChange} className={`${inputClass} ${errors.name ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder={t('car_form_name_placeholder')} />
                {errors.name && (
                    <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                        {errors.name}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor={`${idPrefix}-email`} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">{t('car_form_email')}</label>
                <input type="email" name="email" id={`${idPrefix}-email`} required onChange={handleChange} className={`${inputClass} ${errors.email ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder={t('car_form_email_placeholder')} />
                {errors.email && (
                    <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                        {errors.email}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor={`${idPrefix}-linkedin`} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">{t('car_form_linkedin')}</label>
                <input type="url" name="linkedin" id={`${idPrefix}-linkedin`} required onChange={handleChange} className={`${inputClass} ${errors.linkedin ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder={t('car_form_linkedin_placeholder')} />
                {errors.linkedin && (
                    <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                        {errors.linkedin}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor={`${idPrefix}-resume`} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">{t('car_form_resume')}</label>
                <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-stone-200 dark:border-stone-700 border-dashed rounded-2xl hover:bg-white/40 dark:hover:bg-stone-800/40 hover:border-cerulean-blue/50 dark:hover:border-blue-500/50 transition-all cursor-pointer bg-white/40 dark:bg-stone-900/40 group">
                    <div className="space-y-2 text-center">
                        <div className="mx-auto h-14 w-14 text-stone-400 dark:text-stone-500 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors flex justify-center items-center">
                            <UploadCloud className="w-12 h-12" strokeWidth={1.5} />
                        </div>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                            <label htmlFor={`${idPrefix}-resume`} className="relative cursor-pointer rounded-md font-bold text-cerulean-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus-within:outline-none">
                                <span>{t('car_form_upload')}</span>
                                <input id={`${idPrefix}-resume`} name="resume" type="file" className="sr-only" onChange={handleChange} required />
                            </label>
                            <p className="pl-1">{t('car_form_drag_drop')}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{t('car_form_file_types')}</p>
                        {formData.resume && <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2 bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-full inline-block">{t('car_form_selected')}{formData.resume.name}</p>}
                    </div>
                </div>
                {errors.resume && (
                    <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                        {errors.resume}
                    </p>
                )}
            </div>
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-cerulean-blue to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#1e40af] hover:shadow-[0_8px_0_#1e3a8a] dark:hover:shadow-[0_8px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 hover:-translate-y-1 active:translate-y-1'}`}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            {t('car_form_submitting')}
                        </>
                    ) : (
                        t('car_form_submit')
                    )}
                </button>
            </div>
        </form>
    );
};

export default JobApplicationForm;
