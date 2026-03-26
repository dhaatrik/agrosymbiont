import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OnboardingSelections, PARTICLE_DATA } from './types';

export const StepSuccess: React.FC<{ selections: OnboardingSelections }> = ({ selections }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      key="step6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full text-center py-12"
    >
      {/* Confetti burst */}
      <div className="relative inline-block mb-8">
          <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-green-200 dark:shadow-green-900"
          >
              <Check className="w-12 h-12" strokeWidth={3} />
          </motion.div>
          {PARTICLE_DATA.map((particle, i) => (
              <motion.div
                  key={i}
                  className={`absolute w-2.5 h-2.5 rounded-full ${particle.color} top-1/2 left-1/2`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: particle.x, y: particle.y, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              />
          ))}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('onb_success_title')}</h2>
      <p className="text-xl text-stone-500 dark:text-stone-400 mb-10 max-w-xl mx-auto">
          {t('onb_success_desc', { crop: selections.crop, challenge: selections.challenge })}
      </p>
      <Link to="/" className="inline-flex items-center gap-2 text-cerulean-blue dark:text-blue-400 font-bold hover:underline text-lg">
          {t('onb_return_home')} <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  );
};
