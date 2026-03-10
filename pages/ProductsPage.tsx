
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Droplet, Zap, Sprout, Sparkles, Check, Loader2 } from 'lucide-react';

import TiltCard from '../components/TiltCard';

const ProductsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (!value.trim()) {
          setEmailError('Email Address is required.');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
          setEmailError('Please enter a valid email address.');
      } else {
          setEmailError('');
      }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
        setEmailError('Email Address is required.');
        return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Please enter a valid email address.');
        return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Email submitted for products:', email);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-ivory/30 to-white dark:from-stone-900 dark:to-stone-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl -z-10"></div>

      <AnimatedSection className="max-w-4xl mx-auto w-full">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800">
            <span className="text-sm font-bold text-burnt-orange dark:text-orange-400 uppercase tracking-wider">Coming Soon</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">Products & Solutions</h1>
        <p className="text-xl text-stone-gray dark:text-stone-400 mb-12 leading-relaxed max-w-2xl mx-auto">
          We are currently curating our innovative range of bio-inputs, stimulants, and soil enhancers. Check back soon to discover how our products can revolutionize your farm.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 perspective-1000">
            <TiltCard>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 hover:-translate-y-1 transition-transform preserve-3d">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-cerulean-blue dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 translate-z-4 shadow-sm">
                        <Droplet className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white translate-z-2">Bio-Inputs</h3>
                </div>
            </TiltCard>
            <TiltCard>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 hover:-translate-y-1 transition-transform preserve-3d">
                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-burnt-orange dark:text-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4 translate-z-4 shadow-sm">
                        <Zap className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white translate-z-2">Stimulants</h3>
                </div>
            </TiltCard>
            <TiltCard>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 hover:-translate-y-1 transition-transform preserve-3d">
                    <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 text-mustard-yellow dark:text-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4 translate-z-4 shadow-sm">
                        <Sprout className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white translate-z-2">Nutrients</h3>
                </div>
            </TiltCard>
            <TiltCard>
                <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 hover:-translate-y-1 transition-transform preserve-3d">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4 translate-z-4 shadow-sm">
                        <Sparkles className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white translate-z-2">Soil Enhancers</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h3>
                    <p className="text-stone-500 dark:text-stone-400">We'll notify you as soon as our products are available.</p>
                </motion.div>
            ) : (
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get early access</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">Sign up to be the first to know when our product line launches and receive exclusive early-bird offers.</p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
                        <div className="flex-grow relative w-full text-left">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full px-6 py-4 bg-stone-50 dark:bg-stone-900 border ${emailError ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder-stone-400 dark:placeholder-stone-500`}
                                aria-label="Email for product notifications"
                            />
                            {emailError && <p className="absolute -bottom-6 left-1 text-xs text-red-500 font-medium">{emailError}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg whitespace-nowrap flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-500 transform hover:-translate-y-1'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Submitting...
                                </>
                            ) : (
                                'Notify Me'
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ProductsPage;
