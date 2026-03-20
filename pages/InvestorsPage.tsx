import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import InvestorContactForm from '../components/InvestorContactForm';
import { TrendingUp, ArrowRight, Globe, Lightbulb } from 'lucide-react';

const InvestorsPage: React.FC = () => {
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-stone-950 text-white py-24 md:py-32 relative overflow-hidden isolate mb-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 touch-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-cerulean-blue/20 to-transparent rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-mustard-yellow/10 to-transparent rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/3"></div>
        
        <AnimatedSection className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-md">
                Invest in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-mustard-yellow to-orange-400">Future of Agriculture</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                Partner with AgroSymbiont to scale revolutionary nanotechnology and organic inputs globally.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button onClick={() => document.getElementById('pitch-deck-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-mustard-yellow hover:bg-yellow-500 text-stone-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-[0_6px_0_#b38b1e] hover:shadow-[0_8px_0_#b38b1e] active:shadow-[0_0px_0_#b38b1e] active:translate-y-1 flex items-center justify-center gap-2">
                    Request Pitch Deck <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </AnimatedSection>
      </section>

      {/* Market Opportunity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-burnt-orange dark:text-orange-400 uppercase tracking-[0.2em] mb-3">The Opportunity</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">A Multi-Billion Dollar Shift</h3>
            <p className="text-stone-600 dark:text-stone-400 max-w-3xl mx-auto text-lg leading-relaxed">
                The global bio-fertilizer and sustainable agriculture market is expanding rapidly as environmental regulations tighten and consumer demand for organic, low-chemical produce surges. AgroSymbiont is perfectly positioned at the intersection of deep-tech and agro-ecology.
            </p>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
             <TiltCard className="h-full">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-[2rem] shadow-lg border border-stone-100 dark:border-stone-700 h-full preserve-3d group relative overflow-hidden">
                    <div className="text-cerulean-blue dark:text-blue-400 mb-6 translate-z-4 bg-blue-50 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 translate-z-2">Rapid Market Growth</h4>
                    <p className="text-stone-gray dark:text-stone-400 translate-z-1">The global organic farming market is projected to reach unprecedented valuations by 2030, driven by policy shifts and climate imperatives.</p>
                </div>
             </TiltCard>
             <TiltCard className="h-full">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-[2rem] shadow-lg border border-stone-100 dark:border-stone-700 h-full preserve-3d group relative overflow-hidden">
                    <div className="text-mustard-yellow dark:text-yellow-400 mb-6 translate-z-4 bg-yellow-50 dark:bg-yellow-900/30 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Lightbulb className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 translate-z-2">Proprietary Technology</h4>
                    <p className="text-stone-gray dark:text-stone-400 translate-z-1">Our lab-tested nanotech delivery systems offer unparalleled nutrient absorption rates, securing a defensive moat against traditional competitors.</p>
                </div>
             </TiltCard>
             <TiltCard className="h-full">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-[2rem] shadow-lg border border-stone-100 dark:border-stone-700 h-full preserve-3d group relative overflow-hidden">
                    <div className="text-green-500 dark:text-green-400 mb-6 translate-z-4 bg-green-50 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Globe className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 translate-z-2">Scalable Impact</h4>
                    <p className="text-stone-gray dark:text-stone-400 translate-z-1">Designed for diverse geographies and crops, our model scales efficiently across B2B and direct-to-farmer channels.</p>
                </div>
             </TiltCard>
        </AnimatedSection>
      </section>

      {/* Form Section */}
      <InvestorContactForm />
    </div>
  );
};

export default InvestorsPage;
