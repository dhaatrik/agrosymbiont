import React, { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wheat, Apple, Coffee, Sprout, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type CropType = 'wheat' | 'apple' | 'coffee' | 'vegetables' | null;
type SymptomType = 'yellow_leaves' | 'stunted_growth' | 'low_yield' | 'pests' | null;

interface CropOption {
  id: CropType;
  label: string;
  icon: React.ReactNode;
}

interface SymptomOption {
  id: string;
  label: string;
}

interface Solution {
  name: string;
  desc: string;
}

const CropSelector: React.FC<{
  cropOptions: CropOption[];
  selectedCrop: CropType;
  onSelect: (cropId: CropType) => void;
}> = ({ cropOptions, selectedCrop, onSelect }) => (
  <div className="grid grid-cols-2 gap-3">
      {cropOptions.map((crop) => (
          <button
              key={crop.id}
              onClick={() => onSelect(crop.id)}
              aria-pressed={selectedCrop === crop.id}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900 ${selectedCrop === crop.id ? 'bg-blue-50 dark:bg-blue-900/20 border-cerulean-blue text-cerulean-blue dark:text-blue-400 shadow-md' : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-stone-800'}`}
          >
              {crop.icon} <span className="font-semibold text-sm">{crop.label}</span>
          </button>
      ))}
  </div>
);

const SymptomButton = memo(({ symptom, isSelected, onSelect }: { symptom: SymptomOption, isSelected: boolean, onSelect: (id: SymptomType) => void }) => (
  <button
      onClick={() => onSelect(symptom.id as SymptomType)}
      aria-pressed={isSelected}
      className={`text-left p-3 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900 ${isSelected ? 'bg-orange-50 dark:bg-orange-900/20 border-burnt-orange text-burnt-orange dark:text-orange-400 shadow-md' : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-white dark:hover:bg-stone-800'}`}
  >
      <span className="font-semibold text-sm">{symptom.label}</span>
  </button>
));

const SymptomSelector: React.FC<{
  currentSymptoms: SymptomOption[];
  selectedSymptom: SymptomType;
  onSelect: (symptomId: SymptomType) => void;
}> = ({ currentSymptoms, selectedSymptom, onSelect }) => (
  <div className="flex flex-col gap-2">
      {currentSymptoms.map((symptom) => (
          <SymptomButton
              key={symptom.id}
              symptom={symptom}
              isSelected={selectedSymptom === symptom.id}
              onSelect={onSelect}
          />
      ))}
  </div>
);

const DiagnosisResult: React.FC<{
  isAnalyzing: boolean;
  showResult: boolean;
  recommendedSolution: Solution | null;
  t: (key: string) => string;
}> = ({ isAnalyzing, showResult, recommendedSolution, t }) => (
  <div aria-live="polite" className="bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 flex flex-col items-center justify-center min-h-[300px] text-center relative overflow-hidden h-full">
      {isAnalyzing ? (
          <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-cerulean-blue/30 border-t-cerulean-blue rounded-full animate-spin"></div>
              <p className="text-stone-500 font-medium animate-pulse">{t('solver_analyzing')}</p>
          </div>
      ) : showResult && recommendedSolution ? (
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
          >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">{t('solver_recommended')}</h3>
              <h4 className="text-2xl font-black text-cerulean-blue dark:text-blue-400 mb-4">{recommendedSolution.name}</h4>
              <p className="text-stone-600 dark:text-stone-300 mb-6 max-w-sm">{recommendedSolution.desc}</p>
              <button className="bg-mustard-yellow text-stone-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors shadow-md flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard-yellow focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900">
                  {t('solver_view_product')} <ArrowRight className="w-4 h-4" />
              </button>
          </motion.div>
      ) : (
          <div className="text-stone-400 dark:text-stone-500 flex flex-col items-center gap-3">
              <Search className="w-12 h-12 opacity-50" />
              <p>{t('solver_placeholder')}</p>
          </div>
      )}
  </div>
);

const CropProblemSolver: React.FC = () => {
  const { t } = useTranslation();

  const cropOptions = [
    { id: 'wheat' as CropType, label: t('solver_crop_cereals'), icon: <Wheat className="w-6 h-6" /> },
    { id: 'apple' as CropType, label: t('solver_crop_fruits'), icon: <Apple className="w-6 h-6" /> },
    { id: 'coffee' as CropType, label: t('solver_crop_cash'), icon: <Coffee className="w-6 h-6" /> },
    { id: 'vegetables' as CropType, label: t('solver_crop_vegetables'), icon: <Sprout className="w-6 h-6" /> },
  ];

  const symptomOptions: Record<string, { id: string; label: string }[]> = {
    wheat: [
      { id: 'yellow_leaves', label: t('solver_sym_yellow_wheat') },
      { id: 'low_yield', label: t('solver_sym_low_wheat') },
      { id: 'pests', label: t('solver_sym_pest_wheat') }
    ],
    apple: [
      { id: 'stunted_growth', label: t('solver_sym_stunted_apple') },
      { id: 'low_yield', label: t('solver_sym_low_apple') },
      { id: 'pests', label: t('solver_sym_pest_apple') }
    ],
    coffee: [
      { id: 'yellow_leaves', label: t('solver_sym_yellow_coffee') },
      { id: 'low_yield', label: t('solver_sym_low_coffee') },
      { id: 'pests', label: t('solver_sym_pest_coffee') }
    ],
    vegetables: [
      { id: 'stunted_growth', label: t('solver_sym_stunted_veg') },
      { id: 'yellow_leaves', label: t('solver_sym_yellow_veg') },
      { id: 'pests', label: t('solver_sym_pest_veg') }
    ]
  };

  const solutions: Record<string, { name: string; desc: string }> = {
    yellow_leaves: { name: t('solver_sol_yellow_name'), desc: t('solver_sol_yellow_desc') },
    stunted_growth: { name: t('solver_sol_stunted_name'), desc: t('solver_sol_stunted_desc') },
    low_yield: { name: t('solver_sol_low_name'), desc: t('solver_sol_low_desc') },
    pests: { name: t('solver_sol_pest_name'), desc: t('solver_sol_pest_desc') }
  };

  const [selectedCrop, setSelectedCrop] = useState<CropType>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomType>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleDiagnose = useCallback(() => {
    if (!selectedCrop || !selectedSymptom) return;
    setIsAnalyzing(true);
    setShowResult(false);
    setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
    }, 1200);
  }, [selectedCrop, selectedSymptom]);

  const handleSelectCrop = useCallback((cropId: CropType) => {
      setSelectedCrop(cropId);
      setSelectedSymptom(null);
      setShowResult(false);
  }, []);

  const handleSelectSymptom = useCallback((symptomId: SymptomType) => {
      setSelectedSymptom(symptomId);
      setShowResult(false);
  }, []);

  const currentSymptoms = selectedCrop ? symptomOptions[selectedCrop] : [];
  const recommendedSolution = selectedSymptom ? solutions[selectedSymptom] : null;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 p-6 sm:p-8 w-full max-w-4xl mx-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cerulean-blue/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('solver_title')}</h2>
        <p className="text-stone-500 dark:text-stone-400">{t('solver_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">{t('solver_step1')}</label>
                <CropSelector
                    cropOptions={cropOptions}
                    selectedCrop={selectedCrop}
                    onSelect={handleSelectCrop}
                />
            </div>

            <AnimatePresence>
                {selectedCrop && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 mt-4">{t('solver_step2')}</label>
                        <SymptomSelector
                            currentSymptoms={currentSymptoms}
                            selectedSymptom={selectedSymptom}
                            onSelect={handleSelectSymptom}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {selectedSymptom && !showResult && !isAnalyzing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                        <button 
                            onClick={handleDiagnose}
                            className="w-full bg-cerulean-blue text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
                        >
                            <Search className="w-5 h-5" /> {t('solver_analyze')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <DiagnosisResult
            isAnalyzing={isAnalyzing}
            showResult={showResult}
            recommendedSolution={recommendedSolution}
            t={t}
        />
      </div>
    </div>
  );
};

export default CropProblemSolver;
