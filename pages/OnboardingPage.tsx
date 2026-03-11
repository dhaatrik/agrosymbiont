import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Sprout, Bug, Droplet, ThermometerSun, Wheat, Apple, Coffee, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import AnimatedSection from '../components/AnimatedSection';

const crops = [
  { id: 'wheat', label: 'Cereals & Grains', icon: <Wheat className="w-8 h-8" /> },
  { id: 'apple', label: 'Fruits & Orchards', icon: <Apple className="w-8 h-8" /> },
  { id: 'coffee', label: 'Cash Crops (Tea, Coffee)', icon: <Coffee className="w-8 h-8" /> },
  { id: 'vegetables', label: 'Vegetables', icon: <Sprout className="w-8 h-8" /> }
];

const challenges = [
  { id: 'yield', label: 'Low Yield / Stunted Growth', icon: <Sprout className="w-6 h-6" /> },
  { id: 'soil', label: 'Poor Soil Health', icon: <Droplet className="w-6 h-6" /> },
  { id: 'pest', label: 'Pest & Disease Resistance', icon: <Bug className="w-6 h-6" /> },
  { id: 'climate', label: 'Climate Stress (Drought, Heat)', icon: <ThermometerSun className="w-6 h-6" /> }
];

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    crop: '',
    challenge: '',
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(4);
  };

  const currentProgress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] flex flex-col pt-24 pb-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-3xl mx-auto px-4 z-10 flex flex-col flex-grow">
        
        {/* Progress Bar */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <button
                onClick={handlePrev}
                disabled={step === 1 || step === 4}
                className={`flex items-center text-sm font-medium transition-colors ${step === 1 || step === 4 ? 'text-transparent cursor-default' : 'text-stone-500 hover:text-gray-900 dark:hover:text-white'}`}
                aria-label="Go Back"
                >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <span className="text-sm font-bold text-stone-400 dark:text-stone-500">Step {step} of 4</span>
            </div>
            <div className="h-2 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-cerulean-blue to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>

        {/* Content Container */}
        <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
            
            {/* STEP 1: Crop Selection */}
            {step === 1 && (
                <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
                >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">What is your primary focus?</h2>
                <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 text-center">Help us tailor a sustainable solution for your fields.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {crops.map((crop) => (
                    <TiltCard key={crop.id}>
                        <button
                        onClick={() => {
                            setSelections({ ...selections, crop: crop.id });
                            setTimeout(handleNext, 300);
                        }}
                        className={`w-full p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-4 text-center h-48 preserve-3d
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
            )}

            {/* STEP 2: Main Challenge */}
            {step === 2 && (
                <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
                >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">What is your biggest challenge?</h2>
                <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 text-center">Identify your priority to discover how Nano-fertility can help.</p>
                
                <div className="flex flex-col gap-3">
                    {challenges.map((challenge) => (
                    <button
                        key={challenge.id}
                        onClick={() => {
                        setSelections({ ...selections, challenge: challenge.id });
                        setTimeout(handleNext, 300);
                        }}
                        className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left
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
            )}

            {/* STEP 3: Contact Info */}
            {step === 3 && (
                <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md mx-auto"
                >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Let's build a plan.</h2>
                <p className="text-lg text-stone-500 dark:text-stone-400 mb-8 text-center">Where should we send your custom agronomy strategy?</p>
                
                <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 p-8 rounded-[2rem] shadow-xl border border-stone-100 dark:border-stone-700">
                    <div className="mb-5">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Full Name</label>
                        <input 
                            required 
                            type="text" 
                            id="name" 
                            className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all"
                            placeholder="Jane Doe"
                            value={selections.name}
                            onChange={e => setSelections({...selections, name: e.target.value})}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email Address</label>
                        <input 
                            required 
                            type="email" 
                            id="email" 
                            className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all"
                            placeholder="jane@farm.com"
                            value={selections.email}
                            onChange={e => setSelections({...selections, email: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full bg-cerulean-blue text-white font-bold text-lg py-4 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 transform hover:-translate-y-1'}`}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="animate-spin w-5 h-5" /> Processing...</>
                        ) : (
                            <>Get My Strategy <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </form>
                </motion.div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
                <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center py-12"
                >
                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-200 dark:shadow-green-900">
                    <Check className="w-12 h-12" strokeWidth={3} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Welcome to AgroSymbiont.</h2>
                <p className="text-xl text-stone-500 dark:text-stone-400 mb-10 max-w-xl mx-auto">
                    We've received your details and are preparing a strategy based on your focus ({selections.crop}) and primary challenge ({selections.challenge}). Look out for an email shortly!
                </p>
                <Link to="/" className="inline-flex items-center gap-2 text-cerulean-blue dark:text-blue-400 font-bold hover:underline text-lg">
                    Return to Homepage <ArrowRight className="w-5 h-5" />
                </Link>
                </motion.div>
            )}

            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
