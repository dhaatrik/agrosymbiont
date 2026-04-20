import React, { useMemo } from 'react';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FormField from './FormField';
import { useContactForm } from '../hooks/useContactForm';

const MemoizedInput = React.memo(({ id, name, type = "text", value, onChange, error, placeholder, label, required, pattern, className }: any) => (
    <FormField label={label} name={name} id={id} required={required} error={error}>
        <input type={type} name={name} id={id} required={required} value={value} onChange={onChange} pattern={pattern} className={className} placeholder={placeholder} />
    </FormField>
));
MemoizedInput.displayName = 'MemoizedInput';

const MemoizedTextarea = React.memo(({ id, name, value, onChange, error, placeholder, label, required, rows, className }: any) => (
    <FormField label={label} name={name} id={id} required={required} error={error}>
        <textarea id={id} name={name} rows={rows} required={required} value={value} onChange={onChange} className={className} placeholder={placeholder}></textarea>
    </FormField>
));
MemoizedTextarea.displayName = 'MemoizedTextarea';

const MemoizedSelect = React.memo(({ id, name, value, onChange, error, label, required, className, options, defaultOption }: any) => (
    <FormField label={label} name={name} id={id} required={required} error={error}>
        <div className="relative">
            <select id={id} name={name} required={required} value={value} onChange={onChange} className={className}>
                <option value="">{defaultOption}</option>
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500 dark:text-stone-400">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    </FormField>
));
MemoizedSelect.displayName = 'MemoizedSelect';

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const {
        formData,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handleSubmit,
    } = useContactForm();

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

    const inquiryOptions = useMemo(() => [
        { value: "General", label: t('contact_inquiry_general') },
        { value: "Sales", label: t('contact_inquiry_sales') },
        { value: "Support", label: t('contact_inquiry_support') },
        { value: "Careers", label: t('contact_inquiry_careers') },
    ], [t]);

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
                <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-start">
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

            <MemoizedInput
                id="name" name="name" type="text"
                value={formData.name} onChange={handleChange} error={errors.name}
                placeholder={t('contact_name_placeholder')} label={t('contact_name_label')}
                required className={`${inputClass} ${errors.name ? errorClass : ''}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MemoizedInput
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleChange} error={errors.email}
                    placeholder={t('contact_email_placeholder')} label={t('contact_email_label')}
                    required className={`${inputClass} ${errors.email ? errorClass : ''}`}
                />

                <MemoizedInput
                    id="phone" name="phone" type="tel" pattern="[0-9]*"
                    value={formData.phone} onChange={handleChange} error={errors.phone}
                    placeholder={t('contact_phone_placeholder')} label={t('contact_phone_label')}
                    required className={`${inputClass} ${errors.phone ? errorClass : ''}`}
                />
            </div>

            <MemoizedSelect
                id="inquiryType" name="inquiryType"
                value={formData.inquiryType} onChange={handleChange} error={errors.inquiryType}
                label={t('contact_inquiry_label')} required
                className={`${inputClass} appearance-none ${errors.inquiryType ? errorClass : ''}`}
                options={inquiryOptions} defaultOption={t('contact_inquiry_placeholder')}
            />

            <MemoizedTextarea
                id="message" name="message" rows={4}
                value={formData.message} onChange={handleChange} error={errors.message}
                placeholder={t('contact_message_placeholder')} label={t('contact_message_label')}
                required className={`${inputClass} ${errors.message ? errorClass : ''}`}
            />

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-solid-md shadow-blue-900 dark:shadow-solid-md dark:shadow-blue-800 hover:shadow-solid-lg hover:shadow-blue-900 dark:hover:shadow-solid-lg dark:hover:shadow-blue-800 active:shadow-solid-none active:shadow-blue-900 dark:active:shadow-solid-none dark:active:shadow-blue-800 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-500 hover:-translate-y-1 active:translate-y-1'}`}
                >
                    {getButtonText()}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
