import React, { useState } from 'react';

import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { isValidEmail } from '../utils/validation';


const InvestorContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    let tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.company.trim()) tempErrors.company = "Company is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    }
  };

  return (
      <section id="pitch-deck-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <AnimatedSection className="bg-white dark:bg-stone-800 rounded-[3rem] p-8 md:p-16 shadow-2xl border border-stone-100 dark:border-stone-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-cerulean-blue/5 dark:bg-blue-900/20 rounded-full blur-3xl -mr-32 -mt-32"></div>

             <div className="text-center mb-12 relative z-10">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Request Investor Materials</h2>
                 <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                    Are you an accredited investor or venture partner interested in joining our journey? Fill out the form below to receive our latest pitch deck and financial projections.
                 </p>
             </div>

             {isSubmitted ? (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 relative z-10"
                  >
                      <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-green-100 dark:ring-green-900/50">
                          <Check className="w-12 h-12" strokeWidth={2} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Request Received</h3>
                      <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-8 text-lg">
                          Thank you for your interest in AgroSymbiont. Our investor relations team will review your details and send the requested materials shortly.
                      </p>
                      <button onClick={() => setIsSubmitted(false)} className="text-cerulean-blue dark:text-blue-400 font-bold hover:underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900">
                          Submit another inquiry
                      </button>
                  </motion.div>
             ) : (
                <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1 border-stone-200 dark:border-stone-700">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Full Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-5 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border ${errors.name ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all`} placeholder="Jane Doe" />
                        <div aria-live="polite">{errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}</div>
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Work Email *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-5 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border ${errors.email ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all`} placeholder="jane@investmentfirm.com" />
                        <div aria-live="polite">{errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}</div>
                    </div>

                    <div className="md:col-span-2">
                         <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="company">Firm / Company *</label>
                         <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={`w-full px-5 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border ${errors.company ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all`} placeholder="Investment Firm LLC" />
                         <div aria-live="polite">{errors.company && <p className="text-red-500 text-xs mt-1 font-medium">{errors.company}</p>}</div>
                    </div>

                    <div className="md:col-span-2">
                         <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">Message (Optional)</label>
                         <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-5 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all resize-none" placeholder="Tell us about your investment mandate or any specifics..." />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between mt-4">
                        <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm">
                            <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                            Your information is secure
                        </div>
                        <button type="submit" disabled={isSubmitting} className={`bg-cerulean-blue hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                             {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Request Access <FileText className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
             )}
         </AnimatedSection>
      </section>
  );
};

export default InvestorContactForm;
