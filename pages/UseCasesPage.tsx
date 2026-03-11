
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import InteractiveMap from '../components/InteractiveMap';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CaseStudyCard: React.FC<{ title: string, category: string, challenge: string, solution: string, result: string, testimonial?: string }> = ({ title, category, challenge, solution, result, testimonial }) => {
    const { t } = useTranslation();
    return (
    <TiltCard className="h-full">
        <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-100 dark:border-stone-700 flex flex-col h-full group hover:-translate-y-1 relative overflow-hidden preserve-3d">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-cerulean-blue/20 dark:bg-blue-900/40 group-hover:bg-cerulean-blue dark:group-hover:bg-blue-500 transition-colors duration-300 translate-z-0"></div>
            <div className="flex justify-between items-start mb-6 pl-4 translate-z-4">
                 <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-cerulean-blue dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800 shadow-sm">{category}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-4 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors translate-z-10">{title}</h3>
            
            <div className="space-y-5 flex-grow pl-4 translate-z-2">
                <div>
                    <h4 className="font-bold text-stone-400 dark:text-stone-500 text-xs uppercase mb-2 tracking-widest">{t('use_cases_challenge_label')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{challenge}</p>
                </div>
                <div>
                    <h4 className="font-bold text-stone-400 dark:text-stone-500 text-xs uppercase mb-2 tracking-widest">{t('use_cases_solution_label')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{solution}</p>
                </div>
                <div className="bg-green-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-green-100 dark:border-emerald-800 mt-4 translate-z-4 shadow-sm">
                    <h4 className="font-bold text-green-700 dark:text-emerald-400 text-xs uppercase mb-2 tracking-widest flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" strokeWidth={2} />
                        {t('use_cases_results_label')}
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm">{result}</p>
                </div>
            </div>
            
            {testimonial && (
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-stone-700 pl-4 translate-z-2">
                    <p className="text-stone-500 dark:text-stone-400 italic text-sm leading-relaxed">"{testimonial}"</p>
                </div>
            )}
        </div>
    </TiltCard>
);
}

const UseCasesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{t('use_cases_title')}</h1>
                <p className="text-xl text-stone-gray dark:text-stone-400 max-w-3xl mx-auto font-light">
                    {t('use_cases_subtitle')}
                </p>
            </AnimatedSection>

            <AnimatedSection className="mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('use_cases_map_title')}</h2>
                    <p className="text-lg text-stone-gray dark:text-stone-400 max-w-2xl mx-auto">
                        {t('use_cases_map_desc')}
                    </p>
                </div>
                <InteractiveMap />
            </AnimatedSection>

            <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard 
                    title={t('use_cases_1_title')}
                    category={t('use_cases_1_cat')}
                    challenge={t('use_cases_1_challenge')}
                    solution={t('use_cases_1_solution')}
                    result={t('use_cases_1_result')}
                    testimonial={t('use_cases_1_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_2_title')}
                    category={t('use_cases_2_cat')}
                    challenge={t('use_cases_2_challenge')}
                    solution={t('use_cases_2_solution')}
                    result={t('use_cases_2_result')}
                    testimonial={t('use_cases_2_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_3_title')}
                    category={t('use_cases_3_cat')}
                    challenge={t('use_cases_3_challenge')}
                    solution={t('use_cases_3_solution')}
                    result={t('use_cases_3_result')}
                    testimonial={t('use_cases_3_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_4_title')}
                    category={t('use_cases_4_cat')}
                    challenge={t('use_cases_4_challenge')}
                    solution={t('use_cases_4_solution')}
                    result={t('use_cases_4_result')}
                    testimonial={t('use_cases_4_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_5_title')}
                    category={t('use_cases_5_cat')}
                    challenge={t('use_cases_5_challenge')}
                    solution={t('use_cases_5_solution')}
                    result={t('use_cases_5_result')}
                    testimonial={t('use_cases_5_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_6_title')}
                    category={t('use_cases_6_cat')}
                    challenge={t('use_cases_6_challenge')}
                    solution={t('use_cases_6_solution')}
                    result={t('use_cases_6_result')}
                    testimonial={t('use_cases_6_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_7_title')}
                    category={t('use_cases_7_cat')}
                    challenge={t('use_cases_7_challenge')}
                    solution={t('use_cases_7_solution')}
                    result={t('use_cases_7_result')}
                    testimonial={t('use_cases_7_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_8_title')}
                    category={t('use_cases_8_cat')}
                    challenge={t('use_cases_8_challenge')}
                    solution={t('use_cases_8_solution')}
                    result={t('use_cases_8_result')}
                    testimonial={t('use_cases_8_test')}
                />
                <CaseStudyCard 
                    title={t('use_cases_9_title')}
                    category={t('use_cases_9_cat')}
                    challenge={t('use_cases_9_challenge')}
                    solution={t('use_cases_9_solution')}
                    result={t('use_cases_9_result')}
                    testimonial={t('use_cases_9_test')}
                />
            </AnimatedSection>
            
            <AnimatedSection className="mt-32 text-center">
                <div className="bg-gradient-to-br from-cerulean-blue to-blue-900 dark:from-blue-900 dark:to-stone-900 rounded-[3rem] p-12 md:p-20 shadow-2xl text-white max-w-5xl mx-auto relative overflow-hidden border border-blue-800/50 dark:border-stone-700/50">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('use_cases_cta_title')}</h2>
                        <p className="text-blue-100 dark:text-blue-200 mb-10 text-lg font-light">
                            {t('use_cases_cta_desc')}
                        </p>
                        <Link to="/contact" className="inline-block bg-mustard-yellow dark:bg-yellow-500 text-cerulean-blue dark:text-blue-900 font-bold py-4 px-10 rounded-full hover:bg-white dark:hover:bg-stone-100 transition duration-300 shadow-[0_6px_0_#b3993d] dark:shadow-[0_6px_0_#a18836] hover:shadow-[0_8px_0_#b3993d] dark:hover:shadow-[0_8px_0_#a18836] active:shadow-[0_0px_0_#b3993d] dark:active:shadow-[0_0px_0_#a18836] transform hover:-translate-y-1 active:translate-y-1">
                            {t('use_cases_cta_btn')}
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </div>
  );
};

export default UseCasesPage;
