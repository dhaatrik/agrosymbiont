import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  StepCrop, StepChallenge, StepFarmSize, StepSoilType, StepContact, StepSuccess,
  TOTAL_STEPS, OnboardingSelections
} from '../components/OnboardingSteps';

const OnboardingPage: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<OnboardingSelections>({
    crop: '',
    challenge: '',
    farmSize: '',
    soilType: '',
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⚡ Bolt Optimization: Wrapped the translation stepLabels in useMemo.
  // This prevents the array from being recreated on every render cycle, reducing
  // garbage collection overhead while still correctly reacting to language changes.
  const stepLabels = useMemo(() => [t('onb_step_crop'), t('onb_step_challenge'), t('onb_step_farmsize'), t('onb_step_soil'), t('onb_step_contact'), t('onb_step_done')], [t]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
    setStep(TOTAL_STEPS);
  };

  const currentProgress = (step / TOTAL_STEPS) * 100;
  const minutesLeft = Math.max(1, Math.ceil((TOTAL_STEPS - step) * 0.4));

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] flex flex-col pt-24 pb-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-3xl mx-auto px-4 z-10 flex flex-col flex-grow">
        
        {/* Gamified Progress Header */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
                <button
                  onClick={handlePrev}
                  disabled={step === 1 || step === TOTAL_STEPS}
                  className={`flex items-center text-sm font-medium transition-colors ${step === 1 || step === TOTAL_STEPS ? 'text-transparent cursor-default' : 'text-stone-500 hover:text-gray-900 dark:hover:text-white'}`}
                  aria-label={t('onb_back')}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> {t('onb_back')}
                </button>
                {step < TOTAL_STEPS && (
                  <div className="flex items-center gap-1.5 text-sm text-stone-400 dark:text-stone-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-medium">~{minutesLeft} {t('onb_min_left')}</span>
                  </div>
                )}
            </div>

            {/* Step dots with labels */}
            <div className="flex items-center justify-between mb-3 px-1">
                {stepLabels.map((label, i) => {
                    const stepNum = i + 1;
                    const isCompleted = step > stepNum;
                    const isCurrent = step === stepNum;
                    return (
                        <div key={label} className="flex flex-col items-center gap-1 flex-1">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                                    isCompleted ? 'bg-green-500 text-white shadow-md shadow-green-500/30' :
                                    isCurrent ? 'bg-cerulean-blue text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100 dark:ring-blue-900/50' :
                                    'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500'
                                }`}
                                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                            </motion.div>
                            <span className={`text-[10px] font-semibold uppercase tracking-wider hidden sm:block ${isCurrent ? 'text-cerulean-blue dark:text-blue-400' : 'text-stone-400 dark:text-stone-500'}`}>
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-cerulean-blue via-blue-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>

        {/* Content Container */}
        <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
            
            {step === 1 && <StepCrop selections={selections} setSelections={setSelections} handleNext={handleNext} />}
            {step === 2 && <StepChallenge selections={selections} setSelections={setSelections} handleNext={handleNext} />}
            {step === 3 && <StepFarmSize selections={selections} setSelections={setSelections} handleNext={handleNext} />}
            {step === 4 && <StepSoilType selections={selections} setSelections={setSelections} handleNext={handleNext} />}
            {step === 5 && <StepContact selections={selections} setSelections={setSelections} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
            {step === TOTAL_STEPS && <StepSuccess selections={selections} />}

            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
