
import React from 'react';
import { useTranslation } from 'react-i18next';
import TiltCard from './TiltCard';

interface JobCardProps {
    title: string;
    location: string;
    type: string;
    onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, location, type, onApply }) => {
    const { t } = useTranslation();

    return (
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
                    className="bg-cerulean-blue dark:bg-blue-600 text-white font-bold py-3 px-8 rounded-full group-hover:bg-white dark:group-hover:bg-stone-900 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 group-hover:ring-2 group-hover:ring-cerulean-blue dark:group-hover:ring-blue-500 transition-all duration-300 shadow-[0_4px_0_#1e3a8a] dark:shadow-[0_4px_0_#1e40af] hover:shadow-[0_6px_0_#1e3a8a] dark:hover:shadow-[0_6px_0_#1e40af] active:shadow-[0_0px_0_#1e3a8a] dark:active:shadow-[0_0px_0_#1e40af] active:translate-y-1 translate-z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900"
                    aria-label={`${t('car_apply_now')} ${title}`}
                >
                    {t('car_apply_now')}
                </button>
            </div>
        </TiltCard>
    );
};

export default JobCard;
