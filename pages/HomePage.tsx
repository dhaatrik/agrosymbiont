
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import ThreeDBackground from '../components/ThreeDBackground';
import TiltCard from '../components/TiltCard';
import { ArrowRight, TrendingUp, Sparkles, Coins, CheckCircle, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// ⚡ Bolt Optimization: Memoize presentation component to prevent unnecessary re-renders
const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = React.memo(({ title, description, icon }) => (
    <TiltCard className="h-full">
        <div 
          className="group relative bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl flex flex-col items-center text-center h-full border border-white/50 dark:border-stone-700/50 overflow-hidden" 
          tabIndex={0} 
          aria-label={`${title}. ${description}`}
          role="region"
        >
            {/* Depth layer */}
            <div className="absolute inset-0 translate-z-10 pointer-events-none bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent"></div>
            
            <div className="text-burnt-orange dark:text-orange-400 mb-6 p-5 bg-white dark:bg-stone-800 rounded-2xl shadow-inner transform transition-transform duration-500 group-hover:translate-z-10 group-hover:scale-110 ring-1 ring-stone-100 dark:ring-stone-700">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transform transition-all group-hover:translate-z-4">{title}</h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm transform transition-all group-hover:translate-z-2">{description}</p>
        </div>
    </TiltCard>
));



// ⚡ Bolt Optimization: Memoize presentation component to prevent unnecessary re-renders
const ImpactStat: React.FC<{ value: string; label: string }> = React.memo(({ value, label }) => (
    <Link to="/stories" className="block hover:-translate-y-1 transition-transform group cursor-pointer">
        <div className="text-4xl font-bold text-mustard-yellow dark:text-yellow-400 mb-1 drop-shadow-md group-hover:text-yellow-300 transition-colors">{value}</div>
        <div className="text-xs uppercase tracking-wider text-blue-200 dark:text-blue-300 group-hover:text-white transition-colors">{label}</div>
    </Link>
));

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  // ⚡ Bolt Optimization: Memoize the features array to avoid breaking React.memo shallow equality
  // on FeatureCard due to inline ReactNode icons.
  const features = useMemo(() => [
    {
      title: t('home_feat_1_title'),
      description: t('home_feat_1_desc'),
      icon: <TrendingUp className="w-8 h-8" strokeWidth={1.5} />
    },
    {
      title: t('home_feat_2_title'),
      description: t('home_feat_2_desc'),
      icon: <Sparkles className="w-8 h-8" strokeWidth={1.5} />
    },
    {
      title: t('home_feat_3_title'),
      description: t('home_feat_3_desc'),
      icon: <Coins className="w-8 h-8" strokeWidth={1.5} />
    },
    {
      title: t('home_feat_4_title'),
      description: t('home_feat_4_desc'),
      icon: <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
    }
  ], [t]);
  return (
    <div className="text-gray-800 dark:text-gray-200 -mt-24 relative">
      {/* 3D Background Layer */}
      <ThreeDBackground />
      
      {/* Gradient Overlay for text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-ivory/30 via-ivory/10 to-ivory/80 dark:from-stone-900/80 dark:via-stone-900/50 dark:to-stone-900/90 pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full mt-48 md:mt-24">
          <AnimatedSection className="max-w-3xl">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9] mb-6 md:mb-8 drop-shadow-2xl perspective-text"
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">{t('hero_title_1')}</motion.span>{" "}
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">{t('hero_title_2')}</motion.span> <br/>
              <motion.span 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cerulean-blue via-blue-600 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-indigo-400 relative inline-block hover:scale-105 transition-transform duration-500 origin-left pb-4"
              >
                {t('hero_title_3')}
              </motion.span>
            </motion.h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              {t('hero_subtitle_1')}<span className="text-cerulean-blue dark:text-blue-400 font-bold">{t('hero_subtitle_highlight')}</span>{t('hero_subtitle_2')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16 md:mb-0">
              <Link
                to="/onboarding"
                className="bg-burnt-orange text-white font-bold py-4 px-8 rounded-full hover:bg-mustard-yellow dark:hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-1 shadow-solid-md shadow-[#994000] hover:shadow-solid-lg hover:shadow-[#ccb046] active:shadow-solid-none active:shadow-[#994000] flex items-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('start_growing')}
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
              <Link
                to="/about"
                className="bg-white/40 dark:bg-stone-800/40 backdrop-blur-md border border-white/60 dark:border-stone-600/60 text-cerulean-blue dark:text-blue-400 font-bold py-4 px-8 rounded-full hover:bg-white dark:hover:bg-stone-800 transition-all duration-300 shadow-solid-md shadow-cerulean-blue/20 dark:shadow-solid-md dark:shadow-blue-400/20 hover:shadow-solid-lg hover:shadow-cerulean-blue/30 dark:hover:shadow-solid-lg dark:hover:shadow-blue-400/30 active:translate-y-1 active:shadow-solid-none active:shadow-cerulean-blue/20 transform hover:-translate-y-1"
              >
                {t('learn_more')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro & Impact Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-24">
             <h2 className="text-sm font-bold text-burnt-orange dark:text-orange-400 uppercase tracking-[0.2em] mb-4">{t('home_who_we_are')}</h2>
            <p className="text-3xl md:text-5xl font-medium text-gray-800 dark:text-gray-200 max-w-5xl mx-auto leading-tight">
                {t('home_who_desc_1')}<span className="font-bold text-cerulean-blue dark:text-blue-400 relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-3 after:bg-mustard-yellow/40 dark:after:bg-mustard-yellow/20 after:-z-10">{t('home_who_highlight_1')}</span>{t('home_who_mid')}<span className="font-bold text-cerulean-blue dark:text-blue-400 relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-3 after:bg-mustard-yellow/40 dark:after:bg-mustard-yellow/20 after:-z-10">{t('home_who_highlight_2')}</span>{t('home_who_and')}<span className="font-bold text-cerulean-blue dark:text-blue-400 relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-3 after:bg-mustard-yellow/40 dark:after:bg-mustard-yellow/20 after:-z-10">{t('home_who_highlight_3')}</span>{t('home_who_end')}
            </p>
          </AnimatedSection>

           <AnimatedSection>
            <TiltCard>
                <div className="bg-gradient-to-br from-cerulean-blue to-blue-900 dark:from-blue-900 dark:to-stone-900 rounded-[3rem] p-10 md:p-20 shadow-2xl text-white relative overflow-hidden isolate transform-style-preserve-3d">
                    {/* Decorative glowing orbs */}
                    <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-blue-400/30 dark:bg-blue-500/20 blur-[100px] -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-mustard-yellow/20 dark:bg-mustard-yellow/10 blur-[100px] -z-10"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="translate-z-4">
                            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight drop-shadow-lg">{t('home_impact_title')}<br/>{t('home_impact_title_2')}</h3>
                             <p className="text-blue-100 dark:text-blue-200 text-lg leading-relaxed mb-10 font-light">
                                {t('home_impact_desc')}
                            </p>
                             <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                                <ImpactStat value="10K+" label={t('home_stat_farmers')} />
                                <ImpactStat value="25%" label={t('home_stat_yield')} />
                                <ImpactStat value="100%" label={t('home_stat_eco')} />
                            </div>
                        </div>
                        <div className="h-full min-h-[400px] bg-white/10 dark:bg-stone-800/30 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-stone-700/50 p-8 flex items-center justify-center relative group shadow-solid-2xl shadow-black/30 transform transition-transform hover:scale-105">
                             {/* 3D Floating Element */}
                             <div className="relative w-64 h-64 preserve-3d animate-float" role="img" aria-label="3D Floating Energy Bolt Graphic">
                                <div className="absolute inset-0 bg-yellow-500/20 dark:bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
                                <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 rounded-full backdrop-blur-xl flex items-center justify-center border border-white/40 dark:border-white/20 shadow-inner">
                                    <Zap className="h-24 w-24 text-white drop-shadow-2xl transform translate-z-10" strokeWidth={1} />
                                </div>
                                {/* Orbital rings */}
                                <div className="absolute inset-[-20px] border border-white/10 dark:border-white/5 rounded-full rotate-45"></div>
                                <div className="absolute inset-[-40px] border border-white/5 dark:border-white/5 rounded-full -rotate-12"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </TiltCard>
           </AnimatedSection>
        </div>
      </section>

       {/* Key Highlights Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('home_highlights_title')}</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-mustard-yellow to-burnt-orange mx-auto rounded-full shadow-lg"></div>
           </AnimatedSection>
             <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                    />
                ))}</AnimatedSection>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-24 relative overflow-hidden z-10">
           <div className="absolute inset-0 bg-cerulean-blue/5 dark:bg-blue-900/10 z-0"></div>
           <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-mustard-yellow/10 dark:bg-mustard-yellow/5 rounded-full blur-3xl"></div>
           <div className="absolute -right-20 -top-20 w-96 h-96 bg-burnt-orange/10 dark:bg-burnt-orange/5 rounded-full blur-3xl"></div>
           
          <AnimatedSection className="text-center max-w-4xl mx-auto px-4 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-10 leading-tight drop-shadow-sm">{t('home_cta_title_1')}<br/><span className="text-cerulean-blue dark:text-blue-400">{t('home_cta_title_2')}</span></h2>
              <div>
                  <Link to="/technology" className="inline-block bg-gradient-to-r from-cerulean-blue to-blue-600 text-white text-lg font-bold py-5 px-12 rounded-full shadow-solid-lg shadow-blue-900 hover:shadow-solid-xl shadow-blue-900 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-2 active:shadow-solid-none active:shadow-blue-900">
                      {t('home_cta_btn')}
                  </Link>
              </div>
          </AnimatedSection>
      </section>
    </div>
  );
};

export default HomePage;
