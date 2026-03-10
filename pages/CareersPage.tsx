
import React, { useState, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import { AlertCircle, UploadCloud, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface JobCardProps {
    title: string;
    location: string;
    type: string;
    onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, location, type, onApply }) => (
    <TiltCard>
        <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row justify-between items-center border border-stone-100 dark:border-stone-700 group hover:-translate-y-1 preserve-3d">
            <div className="mb-6 md:mb-0 translate-z-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                <div className="flex gap-4 mt-3 text-sm text-stone-500 dark:text-stone-400">
                    <span className="flex items-center bg-stone-50 dark:bg-stone-900/50 px-3 py-1 rounded-full border border-stone-100 dark:border-stone-700 group-hover:border-cerulean-blue/30 dark:group-hover:border-blue-500/30 transition-colors"><span className="mr-2 text-lg">📍</span> {location}</span>
                    <span className="flex items-center bg-stone-50 dark:bg-stone-900/50 px-3 py-1 rounded-full border border-stone-100 dark:border-stone-700 group-hover:border-cerulean-blue/30 dark:group-hover:border-blue-500/30 transition-colors"><span className="mr-2 text-lg">💼</span> {type}</span>
                </div>
            </div>
            <button 
                onClick={onApply}
                className="bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-3 px-8 rounded-full group-hover:bg-white dark:group-hover:bg-stone-900 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 group-hover:ring-2 group-hover:ring-cerulean-blue dark:group-hover:ring-blue-500 transition-all duration-300 shadow-[0_4px_0_#1e3a8a] dark:shadow-[0_4px_0_#1e40af] hover:shadow-[0_6px_0_#1e3a8a] dark:hover:shadow-[0_6px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] active:translate-y-1 translate-z-10"
                aria-label={`Apply for ${title}`}
            >
                Apply Now
            </button>
        </div>
    </TiltCard>
);

const CareersPage: React.FC = () => {
    const [formData, setFormData] = useState<{ name: string, email: string, linkedin: string, resume: File | null }>({ name: '', email: '', linkedin: '', resume: null });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedJob, setSelectedJob] = useState<{ title: string, location: string, type: string } | null>(null);
    const applicationFormRef = useRef<HTMLDivElement>(null);

    const handleApplyClick = (job?: { title: string, location: string, type: string }) => {
        if (job) {
            setSelectedJob(job);
        } else {
            applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const closeModal = () => {
        setSelectedJob(null);
        setIsSubmitted(false);
        setErrors({});
        setFormData({ name: '', email: '', linkedin: '', resume: null });
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        let newValue: string | File | null = value;
        
        if (name === "resume" && files) {
            newValue = files[0];
            setFormData(prevState => ({ ...prevState, resume: files[0] }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }

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
    };
    
    const validateField = (name: string, value: string | File | null): string => {
        if (name === 'name' && (typeof value !== 'string' || !value.trim())) return 'Full Name is required.';
        if (name === 'email') {
            if (typeof value !== 'string' || !value.trim()) return 'Email Address is required.';
            if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address.';
        }
        if (name === 'linkedin' && (typeof value !== 'string' || !value.trim())) return 'LinkedIn profile link is required.';
        if (name === 'resume' && !value) return 'Please upload your Resume/CV.';
        return '';
    };

    const validateForm = (): { [key: string]: string } => {
        const newErrors: { [key: string]: string } = {};
        const nameError = validateField('name', formData.name);
        if (nameError) newErrors.name = nameError;
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
        const linkedinError = validateField('linkedin', formData.linkedin);
        if (linkedinError) newErrors.linkedin = linkedinError;
        const resumeError = validateField('resume', formData.resume);
        if (resumeError) newErrors.resume = resumeError;
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        
        console.log('Application submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const inputClass = "mt-1 block w-full px-5 py-4 bg-white dark:bg-stone-900 border-0 ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cerulean-blue dark:focus:ring-blue-500 focus:bg-blue-50/30 dark:focus:bg-blue-900/20 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 text-gray-800 dark:text-gray-200";

    const JobModal = () => {
        return (
            <AnimatePresence>
                {selectedJob && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white dark:bg-stone-800 rounded-[2rem] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedJob.title}</h2>
                                    <div className="flex gap-3 text-sm text-stone-500 dark:text-stone-400">
                                        <span className="flex items-center bg-stone-50 dark:bg-stone-900/50 px-3 py-1 rounded-full border border-stone-100 dark:border-stone-700"><span className="mr-2 text-lg">📍</span> {selectedJob.location}</span>
                                        <span className="flex items-center bg-stone-50 dark:bg-stone-900/50 px-3 py-1 rounded-full border border-stone-100 dark:border-stone-700"><span className="mr-2 text-lg">💼</span> {selectedJob.type}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={closeModal} 
                                    className="text-stone-400 hover:text-gray-900 dark:text-stone-500 dark:hover:text-white transition-colors p-2 bg-stone-100 dark:bg-stone-700/50 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="mb-8 text-stone-600 dark:text-stone-300 bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                                <p>We are looking for a talented individual to join our team as a {selectedJob.title}. If you are passionate about sustainable agriculture and meet the requirements, we'd love to hear from you.</p>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800">
                                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Application Received!</h3>
                                    <p className="mt-2 text-green-600 dark:text-green-500">Thank you for your interest in AgroSymbiont. We'll be in touch.</p>
                                    <button 
                                        onClick={closeModal}
                                        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form noValidate onSubmit={handleSubmit} className="space-y-6">
                                    {Object.keys(errors).length > 0 && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start">
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
                                        <label htmlFor="modal-name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Full Name</label>
                                        <input type="text" name="name" id="modal-name" required onChange={handleChange} className={`${inputClass} ${errors.name ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder="e.g. Priya Sharma" />
                                        {errors.name && (
                                            <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="modal-email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email Address</label>
                                        <input type="email" name="email" id="modal-email" required onChange={handleChange} className={`${inputClass} ${errors.email ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder="e.g. priya@example.com" />
                                        {errors.email && (
                                            <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="modal-linkedin" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">LinkedIn Profile Link</label>
                                        <input type="url" name="linkedin" id="modal-linkedin" required onChange={handleChange} className={`${inputClass} ${errors.linkedin ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder="e.g. https://linkedin.com/in/priyasharma" />
                                        {errors.linkedin && (
                                            <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                                {errors.linkedin}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="modal-resume" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Resume/CV</label>
                                        <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-stone-200 dark:border-stone-700 border-dashed rounded-2xl hover:bg-white/40 dark:hover:bg-stone-800/40 hover:border-cerulean-blue/50 dark:hover:border-blue-500/50 transition-all cursor-pointer bg-white/40 dark:bg-stone-900/40 group">
                                            <div className="space-y-2 text-center">
                                                <div className="mx-auto h-14 w-14 text-stone-400 dark:text-stone-500 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors flex justify-center items-center">
                                                    <UploadCloud className="w-12 h-12" strokeWidth={1.5} />
                                                </div>
                                                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                                    <label htmlFor="modal-resume" className="relative cursor-pointer rounded-md font-bold text-cerulean-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus-within:outline-none">
                                                        <span>Upload a file</span>
                                                        <input id="modal-resume" name="resume" type="file" className="sr-only" onChange={handleChange} required />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC up to 10MB</p>
                                                {formData.resume && <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2 bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-full inline-block">Selected: {formData.resume.name}</p>}
                                            </div>
                                        </div>
                                        {errors.resume && (
                                            <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                                {errors.resume}
                                            </p>
                                        )}
                                    </div>
                                    <div className="pt-4">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className={`w-full bg-gradient-to-r from-cerulean-blue to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#1e40af] hover:shadow-[0_8px_0_#1e3a8a] dark:hover:shadow-[0_8px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 hover:-translate-y-1 active:translate-y-1'}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Application'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    return (
         <div className="py-20">
            <JobModal />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Join Our Mission</h1>
                    <p className="text-xl text-stone-gray dark:text-stone-300 max-w-3xl mx-auto font-light">
                        We are looking for passionate innovators and problem-solvers to help us build a more sustainable future for agriculture.
                    </p>
                </AnimatedSection>
                
                <AnimatedSection className="mt-12 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 px-2">Current Openings</h2>
                    <div className="space-y-6">
                        <JobCard title="Lead Agronomist" location="Remote, USA" type="Full-time" onApply={() => handleApplyClick({ title: "Lead Agronomist", location: "Remote, USA", type: "Full-time" })} />
                        <JobCard title="Biochemical Research Scientist" location="San Francisco, CA" type="Full-time" onApply={() => handleApplyClick({ title: "Biochemical Research Scientist", location: "San Francisco, CA", type: "Full-time" })} />
                        <JobCard title="Product Marketing Manager" location="San Francisco, CA" type="Full-time" onApply={() => handleApplyClick({ title: "Product Marketing Manager", location: "San Francisco, CA", type: "Full-time" })} />
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-stone-400 dark:text-stone-500 italic">More roles coming soon...</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mt-24">
                     <div ref={applicationFormRef} className="bg-white/60 dark:bg-stone-800/60 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-stone-700 max-w-3xl mx-auto scroll-mt-32">
                         <div className="text-center mb-12">
                             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">General Application</h2>
                             <p className="text-stone-gray dark:text-stone-400 mt-3 text-lg font-light">Don't see the right role? Send us your CV.</p>
                         </div>
                         
                         {isSubmitted ? (
                            <div className="text-center py-12 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800">
                                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Application Received!</h3>
                                <p className="mt-2 text-green-600 dark:text-green-500">Thank you for your interest in AgroSymbiont. We'll be in touch.</p>
                            </div>
                         ) : (
                            <form noValidate onSubmit={handleSubmit} className="space-y-8">
                                {Object.keys(errors).length > 0 && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start">
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
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Full Name</label>
                                    <input type="text" name="name" id="name" required onChange={handleChange} className={`${inputClass} ${errors.name ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder="e.g. Priya Sharma" />
                                    {errors.name && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email Address</label>
                                    <input type="email" name="email" id="email" required onChange={handleChange} className={`${inputClass} ${errors.email ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder="e.g. priya@example.com" />
                                    {errors.email && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="linkedin" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">LinkedIn Profile Link</label>
                                    <input type="url" name="linkedin" id="linkedin" required onChange={handleChange} className={`${inputClass} ${errors.linkedin ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 bg-red-50/50 dark:bg-red-900/10' : ''}`} placeholder="e.g. https://linkedin.com/in/priyasharma" />
                                    {errors.linkedin && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.linkedin}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="resume" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Resume/CV</label>
                                    <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-stone-200 dark:border-stone-700 border-dashed rounded-2xl hover:bg-white/40 dark:hover:bg-stone-800/40 hover:border-cerulean-blue/50 dark:hover:border-blue-500/50 transition-all cursor-pointer bg-white/40 dark:bg-stone-900/40 group">
                                        <div className="space-y-2 text-center">
                                            <div className="mx-auto h-14 w-14 text-stone-400 dark:text-stone-500 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors flex justify-center items-center">
                                                <UploadCloud className="w-12 h-12" strokeWidth={1.5} />
                                            </div>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                                <label htmlFor="resume" className="relative cursor-pointer rounded-md font-bold text-cerulean-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="resume" name="resume" type="file" className="sr-only" onChange={handleChange} required />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC up to 10MB</p>
                                            {formData.resume && <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2 bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-full inline-block">Selected: {formData.resume.name}</p>}
                                        </div>
                                    </div>
                                    {errors.resume && (
                                        <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                                            {errors.resume}
                                        </p>
                                    )}
                                </div>
                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className={`w-full bg-gradient-to-r from-cerulean-blue to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white font-bold py-5 px-6 rounded-xl transition duration-300 transform shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#1e40af] hover:shadow-[0_8px_0_#1e3a8a] dark:hover:shadow-[0_8px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 hover:-translate-y-1 active:translate-y-1'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </div>
                            </form>
                         )}
                    </div>
                </AnimatedSection>
            </div>
         </div>
    );
};

export default CareersPage;
