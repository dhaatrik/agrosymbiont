import React from 'react';
import { motion } from 'framer-motion';
import { Wheat, Apple, Coffee, Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TiltCard from '../TiltCard';
import { OnboardingSelections, slideVariants } from './types';

export const StepCrop: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const crops = React.useMemo(() => [
    { id: 'wheat', label: t('onb_crop_cereals'), icon: <Wheat className="w-8 h-8" /> },
    { id: 'apple', label: t('onb_crop_fruits'), icon: <Apple className="w-8 h-8" /> },
    { id: 'coffee', label: t('onb_crop_cash'), icon: <Coffee className="w-8 h-8" /> },
    { id: 'vegetables', label: t('onb_crop_vegetables'), icon: <Sprout className="w-8 h-8" /> }
  ], [t]);

  return (
    <motion.div
      key="step1"
      variants={slideVariants}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('onb_crop_title')}</h2>
      <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 text-center">{t('onb_crop_subtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {crops.map((crop) => (
          <TiltCard key={crop.id}>
              <button
                onClick={() => {
                    setSelections({ ...selections, crop: crop.id });
                    setTimeout(handleNext, 300);
                }}
                aria-pressed={selections.crop === crop.id}
                className={`w-full p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-4 text-center h-48 preserve-3d focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900
                    ${selections.crop === crop.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-cerulean-blue text-cerulean-blue dark:text-blue-400'
                    : 'bg-white dark:bg-stone-800 border-stone-100 dark:border-stone-700 hover:border-cerulean-blue/50 hover:bg-stone-50 dark:hover:bg-stone-700/50 text-gray-700 dark:text-gray-300'
                    }
                `}
              >
                <div className="translate-z-4 transform transition-transform group-hover:scale-110">
                    {crop.icon}
                </div>
                <span className="font-bold text-lg translate-z-2">{crop.label}</span>
              </button>
          </TiltCard>
          ))}
      </div>
    </motion.div>
  );
};
