
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import { Check, Sparkles, TrendingUp, Shield, FlaskConical, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ⚡ Bolt Optimization: Memoized presentation component to prevent unnecessary re-renders.
const ServiceIconCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = React.memo(({ title, description, icon }) => (
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
));

// ⚡ Bolt Optimization: Memoized presentation component to prevent unnecessary re-renders.
const WhyChooseItem: React.FC<{children: React.ReactNode}> = React.memo(({children}) => (
    <li className="flex items-center p-4 rounded-2xl bg-white/50 dark:bg-stone-800/50 hover:bg-white dark:hover:bg-stone-800 transition-colors shadow-sm hover:shadow-md">
        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1.5 mr-4 flex-shrink-0">
            <Check className="h-4 w-4 text-green-700 dark:text-green-400" strokeWidth={3} />
        </div>
        <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{children}</span>
    </li>
));

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();

    // ⚡ Bolt Optimization: Removed artificial 1500ms delay and skeleton loaders to improve perceived performance since data is static
    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <span className="text-cerulean-blue dark:text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 block bg-blue-50 dark:bg-blue-900/30 inline-block px-4 py-1 rounded-full">{t('tech_expertise')}</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                        {t('tech_title_1')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">{t('tech_title_2')}</span>
                    </h1>
                    <p className="mt-6 text-xl text-stone-gray dark:text-stone-400 max-w-3xl mx-auto leading-relaxed font-light">
                        {t('tech_subtitle')}
                    </p>
                </AnimatedSection>

                <AnimatedSection className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ServiceIconCard 
                                title={t('tech_service_1_title')}
                                description={t('tech_service_1_desc')}
                                icon={<Sparkles className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <ServiceIconCard 
                                title={t('tech_service_2_title')}
                                description={t('tech_service_2_desc')}
                                icon={<TrendingUp className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <ServiceIconCard 
                                title={t('tech_service_3_title')}
                                description={t('tech_service_3_desc')}
                                icon={<Shield className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <ServiceIconCard 
                                title={t('tech_service_4_title')}
                                description={t('tech_service_4_desc')}
                                icon={<FlaskConical className="w-8 h-8" strokeWidth={1.5} />}
                            />
                             <div className="md:col-span-2 flex justify-center">
                                <div className="max-w-xl w-full">
                                    <ServiceIconCard 
                                        title={t('tech_service_5_title')}
                                        description={t('tech_service_5_desc')}
                                        icon={<FileText className="w-8 h-8" strokeWidth={1.5} />}
                                    />
                                </div>
                            </div>
                        </div>
                </AnimatedSection>

                {/* Why Choose Us Section */}
                <AnimatedSection className="mt-32">
                    <div className="bg-white/60 dark:bg-stone-800/60 backdrop-blur-xl p-12 rounded-[3rem] shadow-xl border border-white/50 dark:border-stone-700/50 max-w-5xl mx-auto relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl"></div>
                         <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cerulean-blue/10 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
                         
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">{t('tech_why_title')}</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <WhyChooseItem>{t('tech_why_1')}</WhyChooseItem>
                                <WhyChooseItem>{t('tech_why_2')}</WhyChooseItem>
                                <WhyChooseItem>{t('tech_why_3')}</WhyChooseItem>
                                <WhyChooseItem>{t('tech_why_4')}</WhyChooseItem>
                                <WhyChooseItem>{t('tech_why_5')}</WhyChooseItem>
                                <WhyChooseItem>{t('tech_why_6')}</WhyChooseItem>
                            </ul>
                        </div>
                    </div>
                </AnimatedSection>
                
                 {/* CTA Section */}
                <AnimatedSection className="mt-32 text-center">
                    <p className="text-2xl font-light text-gray-800 dark:text-gray-200 max-w-3xl mx-auto mb-10">
                        {t('tech_cta_text')}
                    </p>
                    <div>
                        <Link to="/contact" className="inline-block bg-burnt-orange text-white font-bold py-5 px-12 rounded-full hover:bg-orange-700 transition duration-300 transform hover:-translate-y-1 active:translate-y-1 shadow-solid-lg shadow-[#994000] hover:shadow-solid-xl hover:shadow-[#994000] active:shadow-solid-none active:shadow-[#994000] text-lg">
                            {t('tech_cta_btn')}
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}

export default ServicesPage;
