import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from '../utils/validation';

import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';


const BlogNewsletterForm: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      const trimmedValue = value.trim();
      if (!trimmedValue) {
          setEmailError(t('blog_email_required'));
      } else if (!isValidEmail(trimmedValue)) {
          setEmailError(t('blog_email_invalid'));
      } else {
          setEmailError('');
      }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
        setEmailError(t('blog_email_required'));
        return;
    } else if (!isValidEmail(trimmedEmail)) {
        setEmailError(t('blog_email_invalid'));
        return;
    }

    setIsSubmitting(true);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] shadow-2xl text-center relative overflow-hidden p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cerulean-blue/20 dark:bg-blue-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

      {isSubmitted ? (
        <div className="py-8 relative z-10">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-400" strokeWidth={2} />
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">{t('blog_welcome')}</h3>
          <p className="text-gray-300 text-xl">{t('blog_welcome_desc')}</p>
        </div>
      ) : (
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('blog_stay_ahead')}</h3>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg font-light">
              {t('blog_stay_ahead_desc')}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
            <div className="flex-grow relative w-full">
                <label htmlFor="blog-newsletter-email" className="sr-only">
                    {t('blog_email_placeholder')}
                </label>
                <input
                  id="blog-newsletter-email"
                  type="email"
                  placeholder={t('blog_email_placeholder')}
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-8 py-4 bg-white/10 border ${emailError ? 'border-red-500 bg-red-900/20' : 'border-white/20'} rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-mustard-yellow transition-all text-white placeholder-gray-400 backdrop-blur-sm text-center sm:text-left`}
                  aria-label="Email for blog notifications"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'newsletter-email-error' : undefined}
                />
                <div aria-live="polite">
                    {emailError && (
                        <p id="newsletter-email-error" className="absolute -bottom-6 left-0 sm:left-4 text-xs text-red-400 font-medium w-full text-center sm:text-left flex items-center justify-center sm:justify-start">
                            <AlertCircle className="w-3 h-3 mr-1" strokeWidth={2} />
                            {emailError}
                        </p>
                    )}
                </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-mustard-yellow dark:bg-yellow-500 text-cerulean-blue dark:text-blue-900 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg whitespace-nowrap flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mustard-yellow dark:focus-visible:ring-offset-slate-800 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-stone-200 transform hover:scale-105'}`}
            >
              {isSubmitting ? (
                  <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-cerulean-blue" />
                      {t('blog_submitting')}
                  </>
              ) : (
                  t('blog_notify')
              )}
            </button>
          </form>
          <p className="mt-8 text-xs text-gray-500">
              {t('blog_privacy')}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogNewsletterForm;