
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import { Check, Sparkles, TrendingUp, Shield, FlaskConical, FileText } from 'lucide-react';

const ServiceSkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-stone-800 p-10 rounded-[2rem] shadow-lg flex flex-col h-full border border-stone-100 dark:border-stone-700 animate-pulse">
        <div className="flex items-center mb-8">
            <div className="mr-6 flex-shrink-0 w-16 h-16 bg-stone-200 dark:bg-stone-700 rounded-2xl"></div>
            <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-4/5"></div>
    </div>
);

const ServiceIconCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <TiltCard className="h-full">
        <div className="bg-white dark:bg-stone-800 p-10 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-stone-100 dark:border-stone-700 group hover:-translate-y-2 relative overflow-hidden preserve-3d">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-[2.5] duration-700 ease-in-out z-0 translate-z-0"></div>
            
            <div className="relative z-10">
                <div className="flex items-center mb-8">
                    <div className="text-burnt-orange dark:text-orange-400 mr-6 flex-shrink-0 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl group-hover:bg-cerulean-blue dark:group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-sm translate-z-10">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors translate-z-4">{title}</h3>
                </div>
                <p className="text-stone-gray dark:text-stone-400 leading-relaxed text-lg group-hover:text-gray-600 dark:group-hover:text-gray-300 translate-z-2">{description}</p>
            </div>
        </div>
    </TiltCard>
);

const WhyChooseItem: React.FC<{children: React.ReactNode}> = ({children}) => (
    <li className="flex items-center p-4 rounded-2xl bg-white/50 dark:bg-stone-800/50 hover:bg-white dark:hover:bg-stone-800 transition-colors shadow-sm hover:shadow-md">
        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1.5 mr-4 flex-shrink-0">
            <Check className="h-4 w-4 text-green-700 dark:text-green-400" strokeWidth={3} />
        </div>
        <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{children}</span>
    </li>
);

const ServicesPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <span className="text-cerulean-blue dark:text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 block bg-blue-50 dark:bg-blue-900/30 inline-block px-4 py-1 rounded-full">Our Expertise</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                        A Spectrum of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">Nature-Based Solutions</span>
                    </h1>
                    <p className="mt-6 text-xl text-stone-gray dark:text-stone-400 max-w-3xl mx-auto leading-relaxed font-light">
                        AgroSymbiont integrates modern agronomy, nanotechnology, and certified organic products to deliver smarter, greener, and more profitable farming solutions.
                    </p>
                </AnimatedSection>

                <AnimatedSection className="mt-16">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map(i => <ServiceSkeletonCard key={i} />)}
                            <div className="md:col-span-2 flex justify-center">
                                <div className="max-w-xl w-full">
                                    <ServiceSkeletonCard />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ServiceIconCard 
                                title="Soil Health Management"
                                description="Enrich soil fertility and microbial balance with bio-macro and micro-inputs, soil carbon enhancers, and bio-humic solutions."
                                icon={<Sparkles className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <ServiceIconCard 
                                title="Crop Productivity"
                                description="Boost yields with bio-stimulants, growth promoters, and eco-friendly nutrients tailored to your crop needs."
                                icon={<TrendingUp className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <ServiceIconCard 
                                title="Eco-Friendly Protection"
                                description="Defend plants naturally with bio-pesticides and beneficial microorganisms, reducing chemical dependency and safeguarding ecosystems."
                                icon={<Shield className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <ServiceIconCard 
                                title="Life Science Innovations"
                                description="Harness the power of beneficial bacteria and fungi to create healthier soils and resilient crops."
                                icon={<FlaskConical className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <div className="md:col-span-2 flex justify-center">
                                <div className="max-w-xl w-full">
                                    <ServiceIconCard 
                                        title="Expert Agronomy Support"
                                        description="Our specialists work with you at every step, ensuring optimal application, cost efficiency, and measurable results."
                                        icon={<FileText className="w-8 h-8" strokeWidth={1.5} />}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatedSection>

                {/* Why Choose Us Section */}
                <AnimatedSection className="mt-32">
                    <div className="bg-white/60 dark:bg-stone-800/60 backdrop-blur-xl p-12 rounded-[3rem] shadow-xl border border-white/50 dark:border-stone-700/50 max-w-5xl mx-auto relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl"></div>
                         <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cerulean-blue/10 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
                         
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Why Choose AgroSymbiont?</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <WhyChooseItem>Nanotech Yield Growth</WhyChooseItem>
                                <WhyChooseItem>Certified Organic</WhyChooseItem>
                                <WhyChooseItem>Farmer-Centric Support</WhyChooseItem>
                                <WhyChooseItem>Trusted Globally</WhyChooseItem>
                                <WhyChooseItem>Eco-System Restoration</WhyChooseItem>
                                <WhyChooseItem>Cost-Effective Solutions</WhyChooseItem>
                            </ul>
                        </div>
                    </div>
                </AnimatedSection>
                
                 {/* CTA Section */}
                <AnimatedSection className="mt-32 text-center">
                    <p className="text-2xl font-light text-gray-800 dark:text-gray-200 max-w-3xl mx-auto mb-10">
                        Experience the future of farming with AgroSymbiont’s integrated services.
                    </p>
                    <div>
                        <Link to="/contact" className="inline-block bg-burnt-orange text-white font-bold py-5 px-12 rounded-full hover:bg-orange-700 transition duration-300 transform hover:-translate-y-1 active:translate-y-1 shadow-[0_8px_0_#994000] hover:shadow-[0_10px_0_#994000] active:shadow-[0_0px_0_#994000] text-lg">
                            Book a Free Consultation
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}

export default ServicesPage;
