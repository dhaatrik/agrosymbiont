import React from 'react';
import { motion } from 'framer-motion';
import { Maximize } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OnboardingSelections, slideVariants } from './types';

export const StepFarmSize: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const farmSizes = React.useMemo(() => [
    { id: 'small', label: t('onb_fs_small'), emoji: '🌱' },
    { id: 'medium', label: t('onb_fs_medium'), emoji: '🌿' },
    { id: 'large', label: t('onb_fs_large'), emoji: '🌾' },
    { id: 'commercial', label: t('onb_fs_commercial'), emoji: '🏭' }
  ], [t]);

  return (
    <motion.div
      key="step3"
      variants={slideVariants}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
              <Maximize className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('onb_farmsize_title')}</h2>
      <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 text-center">{t('onb_farmsize_subtitle')}</p>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {farmSizes.map((size) => (
              <motion.button
                  key={size.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                      setSelections({ ...selections, farmSize: size.id });
                      setTimeout(handleNext, 300);
                  }}
                  aria-pressed={selections.farmSize === size.id}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 dark:focus-visible:ring-offset-stone-900
                      ${selections.farmSize === size.id
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 shadow-lg shadow-green-500/10'
                      : 'bg-white dark:bg-stone-800 border-stone-100 dark:border-stone-700 hover:border-green-400/50 hover:bg-stone-50 dark:hover:bg-stone-700/50 text-gray-700 dark:text-gray-300'
                      }
                  `}
              >
                  <span className="text-3xl">{size.emoji}</span>
                  <span className="font-bold text-base">{size.label}</span>
              </motion.button>
          ))}
      </div>
    </motion.div>
  );
};
