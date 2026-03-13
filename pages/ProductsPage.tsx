
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Zap, Sprout, Sparkles, Check, Loader2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TiltCard from '../components/TiltCard';
import CropProblemSolver from '../components/CropProblemSolver';

// Performance optimization: Pre-allocate static array outside the render loop
// to avoid unnecessary object creation/GC pressure on every render.
const PARTICLES = Array.from({ length: 12 });

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [farmSize, setFarmSize] = useState(10);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      const trimmedValue = value.trim();
      if (!trimmedValue) {
          setEmailError(t('prod_email_required'));
      } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(trimmedValue)) {
          setEmailError(t('prod_email_invalid'));
      } else {
          setEmailError('');
      }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
        setEmailError(t('prod_email_required'));
        return;
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(trimmedEmail)) {
        setEmailError(t('prod_email_invalid'));
        return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowParticles(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowParticles(false);
    setIsSubmitted(true);
  };

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
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-stone-50 dark:from-stone-800 dark:to-stone-900 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden text-left hover:shadow-xl transition-shadow">
                <div className="relative z-10">
                    <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-cerulean-blue dark:text-blue-400" /> {t('prod_roi_title')}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-6">{t('prod_roi_desc')}</p>
                    <div className="flex flex-col gap-6">
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-2">
                                <label className="block text-sm text-stone-600 dark:text-stone-300 font-medium" htmlFor="farm-size">{t('prod_farm_size')}</label>
                                <div className="text-lg font-bold text-cerulean-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                                    {farmSize} <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{t('prod_acres')}</span>
                                </div>
                            </div>
                            <input 
                                type="range" 
                                id="farm-size" 
                                min="1" 
                                max="1000" 
                                value={farmSize} 
                                className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cerulean-blue" 
                                style={{
                                    accentColor: 'var(--color-cerulean-blue, #2a52be)',
                                }}
                                onChange={(e) => setFarmSize(parseInt(e.target.value))} 
                                aria-label="Farm size in acres"
                            />
                            <div className="flex justify-between text-xs text-stone-400 mt-2 font-medium">
                                <span>1 Acre</span>
                                <span>1,000 Acres</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50/70 dark:bg-green-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/40 relative overflow-hidden backdrop-blur-sm shadow-sm">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-green-400/20 rounded-full blur-xl pointer-events-none"></div>
                                <div className="text-sm text-green-700 dark:text-green-400 font-bold mb-1 tracking-wide">{t('prod_yield_increase')}</div>
                                <div className="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-300 drop-shadow-sm transition-all">+{Math.round(farmSize * 0.25 * 10).toLocaleString()} <span className="text-sm font-medium opacity-80 text-green-700 dark:text-green-400">{t('prod_tons')}</span></div>
                            </div>
                            <div className="bg-blue-50/70 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/40 relative overflow-hidden backdrop-blur-sm shadow-sm">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl pointer-events-none"></div>
                                <div className="text-sm text-blue-700 dark:text-blue-400 font-bold mb-1 tracking-wide">{t('prod_revenue_boost')}</div>
                                <div className="text-2xl sm:text-3xl font-black text-cerulean-blue dark:text-blue-300 drop-shadow-sm transition-all">+${(farmSize * 1250).toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-5 pointer-events-none">
                    <Zap className="w-48 h-48 text-cerulean-blue translate-x-1/4 translate-y-1/4" />
                </div>
            </div>
            
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

        <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full -mr-10 -mt-10"></div>
            
            {isSubmitted ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8"
                >
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Check className="w-10 h-10" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('prod_success_title')}</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">{t('prod_success_desc')}</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        <a href="https://x.com/intent/tweet?text=I%20just%20joined%20the%20waitlist%20for%20AgroSymbiont!%20Excited%20to%20see%20how%20nanotechnology%20can%20transform%20farming.%20%23AgroSymbiont%20%23SustainableFarming" target="_blank" rel="noopener noreferrer" className="bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-6 rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center gap-2">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.84H5.078z"></path></svg>
                           {t('prod_share_x')}
                        </a>
                        <Link to="/resources" className="text-cerulean-blue dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 ml-4 shadow-sm px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            {t('prod_read_nano')} <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </motion.div>
            ) : (
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('prod_early_access')}</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">{t('prod_early_desc')}</p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
                        <div className="flex-grow relative w-full text-left">
                            <input
                                type="email"
                                placeholder={t('prod_email_placeholder')}
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full px-6 py-4 bg-stone-50 dark:bg-stone-900 border ${emailError ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder-stone-400 dark:placeholder-stone-500`}
                                aria-label="Email for product notifications"
                            />
                            {emailError && <p className="absolute -bottom-6 left-1 text-xs text-red-500 font-medium">{emailError}</p>}
                        </div>
                        <div className="flex-shrink-0 relative flex justify-center w-full sm:w-auto">
                            <button
                                type="submit"
                                disabled={isSubmitting || showParticles}
                                className={`relative text-white font-bold rounded-xl transition-all duration-300 shadow-lg whitespace-nowrap flex items-center justify-center overflow-hidden h-14 w-full sm:w-auto ${
                                    showParticles 
                                        ? 'bg-green-500 sm:w-14 rounded-full mx-auto px-0' 
                                        : 'bg-cerulean-blue dark:bg-blue-600 sm:w-40 hover:bg-blue-700 dark:hover:bg-blue-500 hover:-translate-y-1 px-8'
                                } ${isSubmitting ? 'opacity-75 cursor-not-allowed sm:w-44 px-8' : ''}`}
                            >
                                <AnimatePresence mode="wait">
                                    {showParticles ? (
                                        <motion.div
                                            key="success"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <Check className="h-6 w-6 text-white" />
                                        </motion.div>
                                    ) : isSubmitting ? (
                                        <motion.div
                                            key="submitting"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center"
                                        >
                                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                            {t('prod_wait')}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {t('prod_notify')}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {/* Micro-interaction Particles */}
                                {showParticles && (
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                        {PARTICLES.map((_, i) => {
                                            const angle = (Math.PI * 2 * i) / 12;
                                            const v = 80 + Math.random() * 40;
                                            return (
                                              <motion.div
                                                  key={i}
                                                  className="absolute w-2 h-2"
                                                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                                  animate={{ 
                                                      x: Math.cos(angle) * v, 
                                                      y: Math.sin(angle) * v - (Math.random() * 50),
                                                      scale: 0,
                                                      opacity: 0,
                                                      rotate: Math.random() * 360
                                                  }}
                                                  transition={{ duration: 0.6 + Math.random() * 0.2, ease: "easeOut" }}
                                              >
                                                  <Sprout className="w-5 h-5 text-green-200 drop-shadow-sm" />
                                              </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ProductsPage;
