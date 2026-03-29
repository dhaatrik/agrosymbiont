import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from '../utils/validation';
import { AlertCircle, UploadCloud, Loader2 } from 'lucide-react';
import { EMAIL_REGEX } from '../utils/validation';


interface JobApplicationFormProps {
    jobId?: string;
    jobTitle?: string;
    onSuccess?: () => void;
}

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    id: string;
    placeholder: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, id, placeholder, error, onChange }) => {
    const inputClass = "mt-1 block w-full px-5 py-4 bg-white dark:bg-stone-900 border-0 ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 focus:bg-blue-50/30 dark:focus:bg-blue-900/20 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 text-gray-800 dark:text-gray-200";

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                required
                onChange={onChange}
                className={`${inputClass} ${error ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`}
                placeholder={placeholder}
            />
            <div aria-live="polite">
                {error && (
                    <div className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

interface ResumeUploadFieldProps {
    id: string;
    label: string;
    uploadText: string;
    dragDropText: string;
    fileTypesText: string;
    selectedText: string;
    resume: File | null;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ResumeUploadField: React.FC<ResumeUploadFieldProps> = ({
    id,
    label,
    uploadText,
    dragDropText,
    fileTypesText,
    selectedText,
    resume,
    error,
    onChange
}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">{label}</label>
        <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-stone-200 dark:border-stone-700 border-dashed rounded-2xl hover:bg-white/40 dark:hover:bg-stone-800/40 hover:border-cerulean-blue/50 dark:hover:border-blue-500/50 transition-all cursor-pointer bg-white/40 dark:bg-stone-900/40 group">
            <div className="space-y-2 text-center">
                <div className="mx-auto h-14 w-14 text-stone-400 dark:text-stone-500 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors flex justify-center items-center">
                    <UploadCloud className="w-12 h-12" strokeWidth={1.5} />
                </div>
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <label htmlFor={id} className="relative cursor-pointer rounded-md font-bold text-cerulean-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus-within:outline-none">
                        <span>{uploadText}</span>
                        <input id={id} name="resume" type="file" className="sr-only" onChange={onChange} required />
                    </label>
                    <p className="pl-1">{dragDropText}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">{fileTypesText}</p>
                {resume && <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2 bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-full inline-block">{selectedText}{resume.name}</p>}
            </div>
        </div>
        <div aria-live="polite">
            {error && (
                <div className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                    {error}
                </div>
            )}
        </div>
    </div>
);

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle, onSuccess }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{ name: string, email: string, linkedin: string, resume: File | null }>({ name: '', email: '', linkedin: '', resume: null });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateField = useCallback((name: string, value: string | File | null): string => {
        if (name === 'name' && (typeof value !== 'string' || !value.trim())) return t('car_form_name_required');
        if (name === 'email') {
            if (typeof value !== 'string') return t('car_form_email_required');
            const trimmedValue = value.trim();
            if (!trimmedValue) return t('car_form_email_required');
            if (!EMAIL_REGEX.test(trimmedValue)) return t('car_form_email_invalid');
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

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
    };

    const idPrefix = useMemo(() => jobId || 'general', [jobId]);

    if (isSubmitted) {
        return (
            <div className="text-center py-12 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">{t('car_form_success_title')}</h3>
                <p className="mt-2 text-green-600 dark:text-green-500">{t('car_form_success_desc')}</p>
            </div>
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(errors).length > 0 && (
                <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start">
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

            <FormField
                label={t('car_form_name')}
                name="name"
                type="text"
                id={`${idPrefix}-name`}
                placeholder={t('car_form_name_placeholder')}
                error={errors.name}
                onChange={handleChange}
            />

            <FormField
                label={t('car_form_email')}
                name="email"
                type="email"
                id={`${idPrefix}-email`}
                placeholder={t('car_form_email_placeholder')}
                error={errors.email}
                onChange={handleChange}
            />

            <FormField
                label={t('car_form_linkedin')}
                name="linkedin"
                type="url"
                id={`${idPrefix}-linkedin`}
                placeholder={t('car_form_linkedin_placeholder')}
                error={errors.linkedin}
                onChange={handleChange}
            />

            <ResumeUploadField
                id={`${idPrefix}-resume`}
                label={t('car_form_resume')}
                uploadText={t('car_form_upload')}
                dragDropText={t('car_form_drag_drop')}
                fileTypesText={t('car_form_file_types')}
                selectedText={t('car_form_selected')}
                resume={formData.resume}
                error={errors.resume}
                onChange={handleChange}
            />

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-cerulean-blue to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#1e40af] hover:shadow-[0_8px_0_#1e3a8a] dark:hover:shadow-[0_8px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 hover:-translate-y-1 active:translate-y-1'}`}
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
