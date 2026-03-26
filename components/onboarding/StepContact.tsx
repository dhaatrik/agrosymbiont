import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OnboardingSelections, slideVariants } from './types';

export const StepContact: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleSubmit: (e: React.FormEvent) => void, isSubmitting: boolean }> = ({ selections, setSelections, handleSubmit, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      key="step5"
      variants={slideVariants}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('onb_contact_title')}</h2>
      <p className="text-lg text-stone-500 dark:text-stone-400 mb-8 text-center">{t('onb_contact_subtitle')}</p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 p-8 rounded-[2rem] shadow-xl border border-stone-100 dark:border-stone-700">
          <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">{t('onb_name_label')}</label>
              <input
                  required
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all"
                  placeholder={t('onb_name_placeholder')}
                  value={selections.name}
                  onChange={e => setSelections({...selections, name: e.target.value})}
              />
          </div>
          <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">{t('onb_email_label')}</label>
              <input
                  required
                  type="email"
                  id="email"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all"
                  placeholder={t('onb_email_placeholder')}
                  value={selections.email}
                  onChange={e => setSelections({...selections, email: e.target.value})}
              />
          </div>
          <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-cerulean-blue text-white font-bold text-lg py-4 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 transform hover:-translate-y-1'}`}
          >
              {isSubmitting ? (
                  <><Loader2 className="animate-spin w-5 h-5" /> {t('onb_submitting')}</>
              ) : (
                  <>{t('onb_submit')} <ArrowRight className="w-5 h-5" /></>
              )}
          </button>
      </form>
    </motion.div>
  );
};
