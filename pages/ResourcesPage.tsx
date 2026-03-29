
import React, { useState } from 'react';
import { isValidEmail } from '../utils/validation';

import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      const trimmedValue = value.trim();
      if (!trimmedValue) {
          setEmailError('Email Address is required.');
      } else if (!isValidEmail(trimmedValue)) {
          setEmailError('Please enter a valid email address.');
      } else {
          setEmailError('');
      }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
        setEmailError('Email Address is required.');
        return;
    } else if (!isValidEmail(trimmedEmail)) {
        setEmailError('Please enter a valid email address.');
        return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-ivory/30 to-white dark:from-stone-900/30 dark:to-stone-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl -z-10"></div>

      <AnimatedSection className="max-w-3xl mx-auto w-full">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
            <span className="text-sm font-bold text-burnt-orange dark:text-orange-400 uppercase tracking-wider">Coming Soon</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">Knowledge Hub</h1>
        <p className="text-xl text-stone-gray dark:text-stone-300 mb-12 leading-relaxed">
          Our library of brochures, whitepapers, and technical guides is currently being compiled. Soon, you'll have access to in-depth information about our technology and best practices in sustainable agriculture.
        </p>

        <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-blue/5 dark:bg-blue-900/5 rounded-full -mr-10 -mt-10"></div>
            
            {isSubmitted ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8"
                >
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Check className="w-10 h-10" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h3>
                    <p className="text-stone-500 dark:text-stone-400">We'll notify you the moment our resources are available.</p>
                </motion.div>
            ) : (
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Be the first to know</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">Drop your email below and we'll send you an update when the hub launches.</p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
                        <div className="flex-grow relative w-full text-left">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full px-6 py-4 bg-stone-50 dark:bg-stone-900 border ${emailError ? 'border-red-500 dark:border-red-500' : 'border-stone-200 dark:border-stone-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder-stone-400 dark:placeholder-stone-500`}
                                aria-label="Email for resource notifications"
                            />
                            <div aria-live="polite">
                                {emailError && <p className="absolute -bottom-6 left-1 text-xs text-red-500 dark:text-red-400 font-medium">{emailError}</p>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-[0_4px_0_#1e3a8a] dark:shadow-[0_4px_0_#1e40af] hover:shadow-[0_6px_0_#1e3a8a] dark:hover:shadow-[0_6px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] whitespace-nowrap flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-700 transform hover:-translate-y-1 active:translate-y-1'}`}
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

export default ResourcesPage;
