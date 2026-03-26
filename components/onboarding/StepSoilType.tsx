import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OnboardingSelections, slideVariants, soilColors } from './types';

export const StepSoilType: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const soilTypes = [
    { id: 'alluvial', label: t('onb_soil_alluvial') },
    { id: 'red', label: t('onb_soil_red') },
    { id: 'black', label: t('onb_soil_black') },
    { id: 'sandy', label: t('onb_soil_sandy') },
    { id: 'clay', label: t('onb_soil_clay') },
    { id: 'unknown', label: t('onb_soil_unknown') }
  ];

  return (
    <motion.div
      key="step4"
      variants={slideVariants}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center">
              <Layers className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('onb_soil_title')}</h2>
      <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 text-center">{t('onb_soil_subtitle')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
          {soilTypes.map((soil) => (
              <motion.button
                  key={soil.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                      setSelections({ ...selections, soilType: soil.id });
                      setTimeout(handleNext, 300);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900
                      ${selections.soilType === soil.id
                      ? `${soilColors[soil.id]} border-cerulean-blue shadow-lg`
                      : `${soilColors[soil.id]} hover:shadow-md`
                      }
                  `}
              >
                  <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{soil.label}</span>
              </motion.button>
          ))}
      </div>
    </motion.div>
  );
};
