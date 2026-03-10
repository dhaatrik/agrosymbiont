
import React, { useState, useCallback } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Check, AlertCircle, ChevronDown, Loader2, MapPin, Phone, Mail } from 'lucide-react';

const validateField = (name: string, value: string): string => {
    if (name === 'name' && !value.trim()) return 'Full Name is required.';
    if (name === 'email') {
        if (!value.trim()) return 'Email Address is required.';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address.';
    }
    if (name === 'phone' && !value.trim()) return 'Phone Number is required.';
    if (name === 'inquiryType' && !value) return 'Please select an inquiry type.';
    if (name === 'message' && !value.trim()) return 'Message is required.';
    return '';
};

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'phone') {
            newValue = value.replace(/\D/g, '');
        }
        
        setFormData(prevState => ({ ...prevState, [name]: newValue }));
        
        const fieldError = validateField(name, newValue);
        setErrors(prev => {
            const newErrors = { ...prev };
            if (fieldError) {
                newErrors[name] = fieldError;
            } else {
                delete newErrors[name];
            }
            return newErrors;
        });
    }, []);

    const validateForm = useCallback((): { [key: string]: string } => {
        const newErrors: { [key: string]: string } = {};
        const nameError = validateField('name', formData.name);
        if (nameError) newErrors.name = nameError;
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
        const phoneError = validateField('phone', formData.phone);
        if (phoneError) newErrors.phone = phoneError;
        const inquiryTypeError = validateField('inquiryType', formData.inquiryType);
        if (inquiryTypeError) newErrors.inquiryType = inquiryTypeError;
        const messageError = validateField('message', formData.message);
        if (messageError) newErrors.message = messageError;
        return newErrors;
    }, [formData]);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        setErrors({});
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form data submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
    }, [formData, validateForm]);

    const inputClass = "mt-1 block w-full px-5 py-4 bg-white dark:bg-stone-800 border-0 ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 focus:bg-blue-50/30 dark:focus:bg-blue-900/20 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 text-gray-800 dark:text-white";
    const errorClass = "ring-red-500 focus:ring-red-500 bg-red-50/30 dark:bg-red-900/20";

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Get in Touch</h1>
                    <p className="text-xl text-stone-gray dark:text-stone-300 max-w-3xl mx-auto font-light">
                        Have a question or a project in mind? We'd love to hear from you. Reach out to us, and let's cultivate the future together.
                    </p>
                </AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <AnimatedSection>
                        {isSubmitted ? (
                            <div className="bg-white dark:bg-stone-800 p-12 rounded-[2.5rem] shadow-xl flex flex-col justify-center items-center h-full text-center border border-stone-100 dark:border-stone-700 min-h-[400px]">
                                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                    <Check className="h-12 w-12" strokeWidth={2} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Thank You!</h2>
                                <p className="text-stone-gray dark:text-stone-400 text-lg max-w-sm">Your message has been sent successfully. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form noValidate onSubmit={handleSubmit} className="bg-white/60 dark:bg-stone-800/60 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-stone-700/50 space-y-8">
                                {Object.keys(errors).length > 0 && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-start">
                                        <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" strokeWidth={2} />
                                        <div>
                                            <h4 className="text-red-800 dark:text-red-300 font-bold text-sm mb-1">Please correct the following errors:</h4>
                                            <ul className="list-disc list-inside text-red-600 dark:text-red-400 text-sm">
                                                {Object.values(errors).map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">Full Name <span className="text-burnt-orange dark:text-orange-400">*</span></label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={`${inputClass} ${errors.name ? errorClass : ''}`} placeholder="e.g. Rahul Sharma" />
                                    {errors.name && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">Email Address <span className="text-burnt-orange dark:text-orange-400">*</span></label>
                                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={`${inputClass} ${errors.email ? errorClass : ''}`} placeholder="e.g. rahul@example.com" />
                                        {errors.email && (
                                            <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                     <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">Phone Number <span className="text-burnt-orange dark:text-orange-400">*</span></label>
                                        <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} pattern="[0-9]*" className={`${inputClass} ${errors.phone ? errorClass : ''}`} placeholder="e.g. +91 98765 43210" />
                                        {errors.phone && (
                                            <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="inquiryType" className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">Inquiry Type <span className="text-burnt-orange dark:text-orange-400">*</span></label>
                                    <div className="relative">
                                        <select id="inquiryType" name="inquiryType" required value={formData.inquiryType} onChange={handleChange} className={`${inputClass} appearance-none ${errors.inquiryType ? errorClass : ''}`}>
                                            <option value="">Please select an option</option>
                                            <option value="General">General Inquiry</option>
                                            <option value="Sales">Sales & Partnership</option>
                                            <option value="Support">Technical Support</option>
                                            <option value="Careers">Careers</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500 dark:text-stone-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                    {errors.inquiryType && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.inquiryType}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">Message <span className="text-burnt-orange dark:text-orange-400">*</span></label>
                                    <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className={`${inputClass} ${errors.message ? errorClass : ''}`} placeholder="How can we help you?"></textarea>
                                    {errors.message && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className={`w-full bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#1e40af] hover:shadow-[0_8px_0_#1e3a8a] dark:hover:shadow-[0_8px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-500 hover:-translate-y-1 active:translate-y-1'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </AnimatedSection>
                     <AnimatedSection className="space-y-10 pt-4">
                         <div className="bg-cerulean-blue dark:bg-blue-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden isolate">
                             {/* Abstract shapes */}
                             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-mustard-yellow/20 dark:bg-yellow-900/20 rounded-full blur-2xl"></div>
                             
                             <h3 className="text-3xl font-bold mb-8">Headquarters</h3>
                             <div className="space-y-8 relative z-10">
                                 <div className="flex items-start">
                                     <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                        <MapPin className="w-6 h-6" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                        <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">Address</p>
                                        <p className="text-xl font-medium">123 AgriTech Ave, Kolkata, India</p>
                                     </div>
                                 </div>
                                 <div className="flex items-start">
                                     <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                        <Phone className="w-6 h-6" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                        <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">Phone</p>
                                        <p className="text-xl font-medium">+91 11122 33344</p>
                                     </div>
                                 </div>
                                 <div className="flex items-start">
                                     <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                        <Mail className="w-6 h-6" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                        <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">Email</p>
                                        <p className="text-xl font-medium">contact@agrosymbiont.com</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="h-80 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 dark:border-stone-700/50 transform transition-transform hover:scale-[1.02] relative group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.276632431604!2d88.363895!3d22.562627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770000000000%3A0x0!2sKolkata!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={false}
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="AgroSymbiont Headquarters Location"
                                className="filter grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                            <a 
                                href="https://goo.gl/maps/H1Z6Q9yY8yZ2" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-stone-800 text-cerulean-blue dark:text-blue-400 font-bold py-3 px-6 rounded-full shadow-xl hover:bg-cerulean-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                            >
                                <MapPin className="w-5 h-5" strokeWidth={2} />
                                Get Directions
                            </a>
                         </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
