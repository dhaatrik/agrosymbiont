import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Zap } from 'lucide-react';

const ROICalculator: React.FC = () => {
    const { t } = useTranslation();
    const [farmSize, setFarmSize] = useState(10);

    return (
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-stone-50 dark:from-stone-800 dark:to-stone-900 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden text-left hover:shadow-xl transition-shadow">
            <div className="relative z-10">
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-cerulean-blue dark:text-blue-400" /> {t('prod_roi_title')}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 mb-6">{t('prod_roi_desc')}</p>
                <div className="flex flex-col gap-6">
                    <div className="w-full">
                        <div className="flex justify-between items-end mb-2">
                            <label className="block text-sm text-stone-600 dark:text-stone-300 font-medium" htmlFor="farm-size">{t('prod_farm_size')}</label>
                            <div className="text-lg font-bold text-cerulean-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                                {farmSize} <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{t('prod_acres')}</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            id="farm-size"
                            min="1"
                            max="1000"
                            value={farmSize}
                            className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cerulean-blue accent-cerulean-blue"
                            onChange={(e) => setFarmSize(parseInt(e.target.value))}
                            aria-label="Farm size in acres"
                        />
                        <div className="flex justify-between text-xs text-stone-400 mt-2 font-medium">
                            <span>1 Acre</span>
                            <span>1,000 Acres</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50/70 dark:bg-green-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/40 relative overflow-hidden backdrop-blur-sm shadow-sm">
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-green-400/20 rounded-full blur-xl pointer-events-none"></div>
                            <div className="text-sm text-green-700 dark:text-green-400 font-bold mb-1 tracking-wide">{t('prod_yield_increase')}</div>
                            <div className="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-300 drop-shadow-sm transition-all">+{Math.round(farmSize * 0.25 * 10).toLocaleString('en-US')} <span className="text-sm font-medium opacity-80 text-green-700 dark:text-green-400">{t('prod_tons')}</span></div>
                        </div>
                        <div className="bg-blue-50/70 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/40 relative overflow-hidden backdrop-blur-sm shadow-sm">
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl pointer-events-none"></div>
                            <div className="text-sm text-blue-700 dark:text-blue-400 font-bold mb-1 tracking-wide">{t('prod_revenue_boost')}</div>
                            <div className="text-2xl sm:text-3xl font-black text-cerulean-blue dark:text-blue-300 drop-shadow-sm transition-all">+${(farmSize * 1250).toLocaleString('en-US')}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-5 pointer-events-none">
                <Zap className="w-48 h-48 text-cerulean-blue translate-x-1/4 translate-y-1/4" />
            </div>
        </div>
    );
};

export default ROICalculator;
