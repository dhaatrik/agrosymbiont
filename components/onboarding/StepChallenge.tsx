import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Bug, Droplet, ThermometerSun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OnboardingSelections, slideVariants } from './types';

export const StepChallenge: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const challenges = useMemo(() => [
    { id: 'yield', label: t('onb_ch_yield'), icon: <Sprout className="w-6 h-6" /> },
    { id: 'soil', label: t('onb_ch_soil'), icon: <Droplet className="w-6 h-6" /> },
    { id: 'pest', label: t('onb_ch_pest'), icon: <Bug className="w-6 h-6" /> },
    { id: 'climate', label: t('onb_ch_climate'), icon: <ThermometerSun className="w-6 h-6" /> }
  ], [t]);

  return (
    <motion.div
      key="step2"
      variants={slideVariants}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('onb_challenge_title')}</h2>
      <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 text-center">{t('onb_challenge_subtitle')}</p>

      <div className="flex flex-col gap-3">
          {challenges.map((challenge) => (
          <button
              key={challenge.id}
              onClick={() => {
                setSelections({ ...selections, challenge: challenge.id });
                setTimeout(handleNext, 300);
              }}
              aria-pressed={selections.challenge === challenge.id}
              className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burnt-orange dark:focus-visible:ring-offset-stone-900
              ${selections.challenge === challenge.id
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-burnt-orange text-burnt-orange dark:text-orange-400'
                  : 'bg-white dark:bg-stone-800 border-stone-100 dark:border-stone-700 hover:border-burnt-orange/50 hover:bg-stone-50 dark:hover:bg-stone-700/50 text-gray-700 dark:text-gray-300'
              }
              `}
          >
              <span className="font-bold text-lg">{challenge.label}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selections.challenge === challenge.id ? 'bg-orange-100 dark:bg-orange-900/50' : 'bg-stone-100 dark:bg-stone-700'}`}>
                {challenge.icon}
              </div>
          </button>
          ))}
      </div>
    </motion.div>
  );
};
