import React, { useState } from 'react';
import { isValidEmail } from '../utils/validation';

import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Check } from 'lucide-react';

interface InputProps {
    id: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    placeholder?: string;
    label: string;
}

// ⚡ Bolt Optimization: Wrapped inputs in React.memo to prevent all form fields from re-rendering
// on every single keystroke. Since the parent InvestorContactForm manages the entire form state,
// updating one field would previously re-render all fields unnecessarily.
const MemoizedInput = React.memo(({ id, name, type = "text", value, onChange, error, placeholder, label }: InputProps) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor={id}>{label}</label>
        <input type={type} id={id} name={name} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={`w-full px-5 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border ${error ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all`} placeholder={placeholder} />
        <div aria-live="polite">{error && <p id={`${id}-error`} className="text-red-500 text-xs mt-1 font-medium">{error}</p>}</div>
    </div>
));
MemoizedInput.displayName = 'MemoizedInput';

const MemoizedTextarea = React.memo(({ id, name, value, onChange, label, placeholder }: InputProps) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor={id}>{label}</label>
        <textarea id={id} name={name} value={value} onChange={onChange} rows={4} className="w-full px-5 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cerulean-blue transition-all resize-none" placeholder={placeholder} />
    </div>
));
MemoizedTextarea.displayName = 'MemoizedTextarea';

const InvestorContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
        // ⚡ Bolt Optimization: Check if the error state actually changed before returning a new object
        if (prev[name]) {
            return { ...prev, [name]: '' };
        }
        return prev;
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // ⚡ Bolt Optimization: Removed artificial 1500ms delay to provide instant user feedback and improve form efficiency.
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
                <form onSubmit={handleSubmit} noValidate className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1 border-stone-200 dark:border-stone-700">
                        <MemoizedInput
                            id="name" name="name" type="text"
                            value={formData.name} onChange={handleChange} error={errors.name}
                            placeholder="Jane Doe" label="Full Name *"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <MemoizedInput
                            id="email" name="email" type="email"
                            value={formData.email} onChange={handleChange} error={errors.email}
                            placeholder="jane@investmentfirm.com" label="Work Email *"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <MemoizedInput
                            id="company" name="company" type="text"
                            value={formData.company} onChange={handleChange} error={errors.company}
                            placeholder="Investment Firm LLC" label="Firm / Company *"
                        />
                    </div>

                    <div className="md:col-span-2">
                         <MemoizedTextarea id="message" name="message" label="Message (Optional)" value={formData.message} onChange={handleChange} placeholder="Tell us about your investment mandate or any specifics..." />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between mt-4">
                        <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm">
                            <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                            Your information is secure
                        </div>
                        <button type="submit" className="bg-cerulean-blue hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900">
                            Request Access <FileText className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </form>
             )}
         </AnimatedSection>
      </section>
  );
};

export default InvestorContactForm;
