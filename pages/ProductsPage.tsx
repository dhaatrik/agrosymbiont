
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Sprout, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TiltCard from '../components/TiltCard';
import CropProblemSolver from '../components/CropProblemSolver';
import ROICalculator from '../components/products/ROICalculator';
import WaitlistForm from '../components/products/WaitlistForm';

// Performance optimization: Pre-allocate static array outside the render loop
// to avoid unnecessary object creation/GC pressure on every render.
const PARTICLES = Array.from({ length: 12 });

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-ivory/30 to-white dark:from-stone-900 dark:to-stone-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl -z-10"></div>

      <AnimatedSection className="max-w-4xl mx-auto w-full">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800">
            <span className="text-sm font-bold text-burnt-orange dark:text-orange-400 uppercase tracking-wider">{t('prod_coming_soon')}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">{t('prod_title')}</h1>
        <p className="text-xl text-stone-gray dark:text-stone-400 mb-12 leading-relaxed max-w-2xl mx-auto">
          {t('prod_subtitle')}
        </p>

        <div className="mb-16 w-full">
            <CropProblemSolver />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 perspective-1000">
            <ROICalculator />
            
            <TiltCard>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 h-full flex flex-col items-center justify-center hover:-translate-y-1 transition-transform preserve-3d">
                    <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4 translate-z-4 shadow-sm">
                        <Sprout className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white translate-z-2">{t('prod_nutrients')}</h3>
                </div>
            </TiltCard>
            <TiltCard>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 h-full flex flex-col items-center justify-center hover:-translate-y-1 transition-transform preserve-3d">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4 translate-z-4 shadow-sm">
                        <Sparkles className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white translate-z-2">{t('prod_soil_enhancers')}</h3>
                </div>
            </TiltCard>
        </div>

        <WaitlistForm />
      </AnimatedSection>
    </div>
  );
};

export default ProductsPage;
