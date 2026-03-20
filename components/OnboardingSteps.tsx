import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sprout, Bug, Droplet, ThermometerSun, Wheat, Apple, Coffee, ArrowRight, Loader2, Maximize, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import { useTranslation } from 'react-i18next';

export interface OnboardingSelections {
  crop: string;
  challenge: string;
  farmSize: string;
  soilType: string;
  name: string;
  email: string;
}

export const TOTAL_STEPS = 6;
const PARTICLE_COUNT = 8;
const PARTICLE_COLORS = ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-orange-400', 'bg-pink-400', 'bg-purple-400', 'bg-red-400', 'bg-teal-400'];
const PARTICLE_DATA = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
  return {
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    x: Math.cos(angle) * 70,
    y: Math.sin(angle) * 70,
  };
});

const soilColors: Record<string, string> = {
  alluvial: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700',
  red: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
  black: 'bg-stone-200 dark:bg-stone-700/50 border-stone-400 dark:border-stone-600',
  sandy: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
  clay: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700',
  unknown: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
};

export const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 }
};

export const StepCrop: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const crops = [
    { id: 'wheat', label: t('onb_crop_cereals'), icon: <Wheat className="w-8 h-8" /> },
    { id: 'apple', label: t('onb_crop_fruits'), icon: <Apple className="w-8 h-8" /> },
    { id: 'coffee', label: t('onb_crop_cash'), icon: <Coffee className="w-8 h-8" /> },
    { id: 'vegetables', label: t('onb_crop_vegetables'), icon: <Sprout className="w-8 h-8" /> }
  ];

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

export const StepChallenge: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const challenges = [
    { id: 'yield', label: t('onb_ch_yield'), icon: <Sprout className="w-6 h-6" /> },
    { id: 'soil', label: t('onb_ch_soil'), icon: <Droplet className="w-6 h-6" /> },
    { id: 'pest', label: t('onb_ch_pest'), icon: <Bug className="w-6 h-6" /> },
    { id: 'climate', label: t('onb_ch_climate'), icon: <ThermometerSun className="w-6 h-6" /> }
  ];

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

export const StepFarmSize: React.FC<{ selections: OnboardingSelections, setSelections: (s: OnboardingSelections) => void, handleNext: () => void }> = ({ selections, setSelections, handleNext }) => {
  const { t } = useTranslation();

  const farmSizes = [
    { id: 'small', label: t('onb_fs_small'), emoji: '🌱' },
    { id: 'medium', label: t('onb_fs_medium'), emoji: '🌿' },
    { id: 'large', label: t('onb_fs_large'), emoji: '🌾' },
    { id: 'commercial', label: t('onb_fs_commercial'), emoji: '🏭' }
  ];

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
