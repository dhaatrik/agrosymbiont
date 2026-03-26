import React from 'react';
import TiltCard from './TiltCard';

const ValueCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <TiltCard className="h-full">
        <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/50 dark:border-stone-700/50 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white dark:hover:bg-stone-800 group h-full preserve-3d">
            <div className="text-burnt-orange dark:text-orange-400 w-16 h-16 mx-auto mb-6 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl group-hover:bg-burnt-orange dark:group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm translate-z-10">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors translate-z-4">{title}</h3>
            <p className="text-stone-gray dark:text-stone-400 text-sm leading-relaxed translate-z-2">{description}</p>
        </div>
    </TiltCard>
);

export default ValueCard;