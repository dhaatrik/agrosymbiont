
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import { Lightbulb, Leaf, ShieldCheck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ImpactMap from '../components/ImpactMap';
import TimelineItem from '../components/TimelineItem';
import ValueCard from '../components/ValueCard';
import TeamCarousel from '../components/TeamCarousel';


const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="pb-20">
            {/* Hero Banner */}
            <div className="bg-cerulean-blue dark:bg-blue-900 py-32 text-center text-white relative overflow-hidden mb-16 isolate">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
                 <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                 
                 <AnimatedSection className="relative z-10 max-w-5xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">{t('about_hero_title_1')}<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-mustard-yellow to-orange-300 dark:from-yellow-400 dark:to-orange-400">{t('about_hero_title_2')}</span></h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                        {t('about_hero_subtitle')}
                    </p>
                </AnimatedSection>
            </div>

            {/* Mission & Vision Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
                <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-stone-50 dark:border-stone-700 hover:shadow-2xl transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-cerulean-blue dark:bg-blue-600"></div>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 relative z-10">{t('about_mission_title')}</h2>
                        <p className="text-stone-gray dark:text-stone-300 text-base md:text-lg leading-relaxed relative z-10">{t('about_mission_desc')}</p>
                    </div>
                     <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-stone-50 dark:border-stone-700 hover:shadow-2xl transition-shadow relative overflow-hidden group">
                         <div className="absolute top-0 left-0 w-2 h-full bg-mustard-yellow dark:bg-yellow-600"></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-mustard-yellow/5 dark:bg-yellow-900/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 relative z-10">{t('about_vision_title')}</h2>
                        <p className="text-stone-gray dark:text-stone-300 text-base md:text-lg leading-relaxed relative z-10">{t('about_vision_desc')}</p>
                    </div>
                </AnimatedSection>
            </div>

            {/* Impact Map Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
                <AnimatedSection>
                    <ImpactMap />
                </AnimatedSection>
            </div>

            {/* Founder's Vision Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <AnimatedSection className="bg-gradient-to-br from-stone-900 to-black rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cerulean-blue/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-mustard-yellow/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
                    
                    <div className="md:w-1/3 relative z-10 flex justify-center">
                        <div className="relative group perspective-1000">
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-stone-800 shadow-2xl relative z-10 transform transition-transform duration-700 group-hover:rotate-y-12">
                                <img src="https://picsum.photos/400/400?random=10" alt="Founder" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-cerulean-blue to-mustard-yellow rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-110 -z-10"></div>
                        </div>
                    </div>
                    <div className="md:w-2/3 relative z-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('about_founder_title')}</h2>
                        <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-stone-300 italic mb-8 relative">
                            {t('about_founder_quote')}
                        </blockquote>
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                            <div>
                                <h4 className="font-bold text-xl text-white">{t('about_founder_name')}</h4>
                                <p className="text-mustard-yellow font-medium uppercase tracking-wider text-sm">{t('about_founder_role')}</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            
            {/* Values Section */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                 <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('about_values_title')}</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cerulean-blue to-blue-400 mx-auto mt-6 rounded-full"></div>
                </AnimatedSection>
                <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ValueCard title={t('about_value_1_title')} description={t('about_value_1_desc')} icon={<Lightbulb className="w-full h-full" strokeWidth={1.5} />} />
                    <ValueCard title={t('about_value_2_title')} description={t('about_value_2_desc')} icon={<Leaf className="w-full h-full" strokeWidth={1.5} />} />
                    <ValueCard title={t('about_value_3_title')} description={t('about_value_3_desc')} icon={<ShieldCheck className="w-full h-full" strokeWidth={1.5} />} />
                    <ValueCard title={t('about_value_4_title')} description={t('about_value_4_desc')} icon={<Users className="w-full h-full" strokeWidth={1.5} />} />
                </AnimatedSection>
             </div>

            {/* Innovation Lab Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                 <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('about_lab_title')}</h2>
                    <p className="text-lg text-stone-gray dark:text-stone-400 max-w-3xl mx-auto">
                        {t('about_lab_desc')}
                    </p>
                </AnimatedSection>

                <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TiltCard className="h-full">
                        <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-xl border border-stone-100 dark:border-stone-700 h-full flex flex-col group preserve-3d">
                            <div className="h-64 relative overflow-hidden bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700">
                                <img src="https://picsum.photos/600/400?random=11" alt="Prototype Testing" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 translate-z-2 opacity-90" />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 translate-z-4 shadow-sm border border-green-100 dark:border-green-900/50">
                                    {t('about_lab_1_tag')}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow text-center md:text-left translate-z-4 bg-white dark:bg-stone-800 relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('about_lab_1_title')}</h3>
                                <p className="text-stone-gray dark:text-stone-400 flex-grow leading-relaxed">
                                    {t('about_lab_1_desc')}
                                </p>
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard className="h-full">
                        <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-xl border border-stone-100 dark:border-stone-700 h-full flex flex-col group preserve-3d">
                            <div className="h-64 relative overflow-hidden bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700">
                                <img src="https://picsum.photos/600/400?random=12" alt="Sensor Integration" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 translate-z-2 opacity-90" />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cerulean-blue dark:text-blue-400 translate-z-4 shadow-sm border border-blue-100 dark:border-blue-900/50">
                                    {t('about_lab_2_tag')}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow text-center md:text-left translate-z-4 bg-white dark:bg-stone-800 relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('about_lab_2_title')}</h3>
                                <p className="text-stone-gray dark:text-stone-400 flex-grow leading-relaxed">
                                    {t('about_lab_2_desc')}
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </AnimatedSection>
            </div>

            {/* Timeline Section */}
            <div className="py-20 mb-24 overflow-hidden relative">
                 {/* Background subtle wash */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50 dark:via-stone-900/50 to-transparent pointer-events-none -z-10"></div>
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('about_journey_title')}</h2>
                </AnimatedSection>
                <div className="max-w-5xl mx-auto px-4 relative">
                    {/* Mobile Timeline (Swipeable Carousel) *                     <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide -mx-4 px-4">
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">{t('about_journey_1_year')}</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">{t('about_journey_1_title')}</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">{t('about_journey_1_desc')}</p>
                         </AnimatedSection>
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">{t('about_journey_2_year')}</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">{t('about_journey_2_title')}</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">{t('about_journey_2_desc')}</p>
                         </AnimatedSection>
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">{t('about_journey_3_year')}</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">{t('about_journey_3_title')}</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">{t('about_journey_3_desc')}</p>
                         </AnimatedSection>
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">{t('about_journey_4_year')}</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">{t('about_journey_4_title')}</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">{t('about_journey_4_desc')}</p>
                         </AnimatedSection>
                    </div>

                    {/* Desktop Timeline */}
                    <div className="hidden md:block">
                        <AnimatedSection>
                            <TimelineItem 
                                year={t('about_journey_1_year')}
                                title={t('about_journey_1_title')}
                                description={t('about_journey_1_desc')}
                                align="left"
                            />
                        </AnimatedSection>
                         <AnimatedSection>
                            <TimelineItem 
                                year={t('about_journey_2_year')}
                                title={t('about_journey_2_title')}
                                description={t('about_journey_2_desc')}
                                align="right"
                            />
                        </AnimatedSection>
                         <AnimatedSection>
                            <TimelineItem 
                                year={t('about_journey_3_year')}
                                title={t('about_journey_3_title')}
                                description={t('about_journey_3_desc')}
                                align="left"
                            />
                        </AnimatedSection>
                         <AnimatedSection>
                            <TimelineItem 
                                year={t('about_journey_4_year')}
                                title={t('about_journey_4_title')}
                                description={t('about_journey_4_desc')}
                                align="right"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                 <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('about_leaders_title')}</h2>
                    <p className="mt-4 text-lg text-stone-gray dark:text-stone-400 max-w-3xl mx-auto">
                        {t('about_leaders_desc')}
                    </p>
                </AnimatedSection>
                <AnimatedSection>
                    <TeamCarousel />
                </AnimatedSection>
            </div>
        </div>
    );
}



export default AboutPage;
