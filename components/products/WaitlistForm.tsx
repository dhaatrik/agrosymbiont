import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from '../../utils/validation';

import { motion } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaitlistButtonContent from './WaitlistButtonContent';
import WaitlistParticles from './WaitlistParticles';


const WaitlistForm: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showParticles, setShowParticles] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            setEmailError(t('prod_email_required'));
        } else if (!isValidEmail(trimmedValue)) {
            setEmailError(t('prod_email_invalid'));
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
          setEmailError(t('prod_email_required'));
          return;
      } else if (!isValidEmail(trimmedEmail)) {
          setEmailError(t('prod_email_invalid'));
          return;
      }

      // ⚡ Bolt Optimization: Removed simulated API delay and redundant isSubmitting state to improve form submission performance and make the handler synchronous.
      setShowParticles(true);
      setIsSubmitted(true);
    };

    return (
        <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full -mr-10 -mt-10"></div>

            {isSubmitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8"
                >
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Check className="w-10 h-10" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('prod_success_title')}</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">{t('prod_success_desc')}</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        <a href="https://x.com/intent/tweet?text=I%20just%20joined%20the%20waitlist%20for%20AgroSymbiont!%20Excited%20to%20see%20how%20nanotechnology%20can%20transform%20farming.%20%23AgroSymbiont%20%23SustainableFarming" target="_blank" rel="noopener noreferrer" className="bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-6 rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.84H5.078z"></path></svg>
                           {t('prod_share_x')}
                        </a>
                        <Link to="/resources" className="text-cerulean-blue dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 ml-4 shadow-sm px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900">
                            {t('prod_read_nano')} <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </motion.div>
            ) : (
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('prod_early_access')}</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">{t('prod_early_desc')}</p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
                        <div className="flex-grow relative w-full text-left">
                            <input
                                type="email"
                                placeholder={t('prod_email_placeholder')}
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full px-6 py-4 bg-stone-50 dark:bg-stone-900 border ${emailError ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder-stone-400 dark:placeholder-stone-500`}
                                aria-label="Email for product notifications"
                                aria-invalid={!!emailError}
                                aria-describedby={emailError ? 'waitlist-email-error' : undefined}
                            />
                            <div aria-live="polite">
                                {emailError && <p id="waitlist-email-error" className="absolute -bottom-6 left-1 text-xs text-red-500 font-medium">{emailError}</p>}
                            </div>
                        </div>
                        <div className="flex-shrink-0 relative flex justify-center w-full sm:w-auto">
                            <button
                                type="submit"
                                disabled={showParticles}
                                className={`relative text-white font-bold rounded-xl transition-all duration-300 shadow-lg whitespace-nowrap flex items-center justify-center overflow-hidden h-14 w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${
                                    showParticles
                                        ? 'bg-green-500 sm:w-14 rounded-full mx-auto px-0'
                                        : 'bg-cerulean-blue dark:bg-blue-600 sm:w-40 hover:bg-blue-700 dark:hover:bg-blue-500 hover:-translate-y-1 px-8'
                                }`}
                            >
                                <WaitlistButtonContent showParticles={showParticles} t={t} />

                                {/* Micro-interaction Particles */}
                                {showParticles && <WaitlistParticles />}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default WaitlistForm;