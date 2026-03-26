import React from 'react';
import TiltCard from './TiltCard';

const TimelineItem: React.FC<{ year: string, title: string, description: string, align: 'left' | 'right' }> = ({ year, title, description, align }) => (
    <div className={`mb-16 flex w-full ${align === 'right' ? 'flex-row-reverse' : ''} items-center justify-between group perspective-1000`}>
        <div className="w-[45%]">
            <TiltCard>
                <div className={`bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl preserve-3d ${align === 'right' ? 'text-right' : 'text-left'}`}>
                    <h3 className="mb-2 font-bold text-cerulean-blue dark:text-blue-400 text-2xl translate-z-4">{title}</h3>
                    <p className="text-stone-gray dark:text-stone-400 leading-relaxed translate-z-2">{description}</p>
                </div>
            </TiltCard>
        </div>

        <div className="w-[10%] flex justify-center relative">
            <div className="w-0.5 h-full bg-stone-200 dark:bg-stone-700 absolute top-0 bottom-0 -z-10"></div>
            <div className="w-14 h-14 bg-white dark:bg-stone-800 border-4 border-mustard-yellow dark:border-yellow-600 rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                <span className="font-bold text-stone-800 dark:text-stone-200 text-sm">{year}</span>
            </div>
        </div>

        <div className="w-[45%]"></div>
    </div>
);

export default TimelineItem;