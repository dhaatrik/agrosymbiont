import React, { useState, memo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Droplets, Leaf, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { geoUrl, mapMarkers, MarkerData } from "../data/mapData";


const MemoizedMarker = memo(({ marker, onClick, t }: { marker: MarkerData; onClick: (marker: MarkerData) => void; t: (key: string) => string }) => {
  return (
    <Marker
      coordinates={marker.coordinates}
      onClick={() => onClick(marker)}
      onKeyDown={(e: React.KeyboardEvent<SVGGElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(marker);
        }
      }}
      tabIndex={0}
      role="button"
      className="cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerulean-blue rounded-full"
      aria-label={t(marker.nameKey)}
    >
      <motion.g whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        <circle r={8} className="fill-cerulean-blue drop-shadow-md" />
        <circle
          r={8}
          opacity={0.3}
          className="fill-cerulean-blue animate-ping"
        />
        <MapPin
          className="text-white w-4 h-4 -translate-x-2 -translate-y-2 pointer-events-none"
          strokeWidth={2.5}
        />
      </motion.g>
    </Marker>
  );
});

interface GeographyData {
  rsmKey: string;
  [key: string]: unknown;
}

const MemoizedGeographies = React.memo(({ geographies }: { geographies: GeographyData[] }) => {
  return (
    <>
      {geographies.map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          fill="currentColor"
          className="text-stone-200 dark:text-stone-800 outline-none transition-colors duration-300 hover:text-stone-300 dark:hover:text-stone-700"
          stroke="#ffffff"
          strokeWidth={0.5}
        />
      ))}
    </>
  );
});

const ImpactMap: React.FC = () => {
  const { t } = useTranslation();

  const [activeTooltip, setActiveTooltip] = useState<MarkerData | null>(null);

  const handleMarkerSelect = useCallback((marker: MarkerData) => {
    setActiveTooltip(marker);
  }, []);

  return (
    <div className="w-full relative">
      <div className="bg-white/50 dark:bg-stone-800/50 backdrop-blur-xl border border-stone-200 dark:border-stone-700 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mustard-yellow/5 rounded-full blur-3xl pointer-events-none -mt-32 -mr-32"></div>

        <div className="text-center mb-8 relative z-10">
          <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            {t("map_title")}
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            {t("map_subtitle")}
          </p>
        </div>

        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-2xl bg-blue-50/50 dark:bg-stone-900/50">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 120 }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) => <MemoizedGeographies geographies={geographies} />}
            </Geographies>

            {mapMarkers.map((marker, index) => (
              <MemoizedMarker
                key={index}
                marker={marker}
                onClick={handleMarkerSelect}
                t={t}
              />
            ))}
          </ComposableMap>

          <AnimatePresence>
            {activeTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-white/95 dark:bg-stone-800/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-600 min-w-[280px] z-20"
              >
                <button
                  onClick={() => setActiveTooltip(null)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-800"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-mustard-yellow" />
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                    {t(activeTooltip.nameKey)}
                  </h4>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 font-medium">
                  {t(activeTooltip.cropKey)}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-700/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        {t("map_yield_boost")}
                      </span>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {activeTooltip.stats.yieldBoost}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-700/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-cerulean-blue dark:text-blue-400" />
                      <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        {t("map_farmers_active")}
                      </span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">
                      {activeTooltip.stats.farmers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-700/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        {t("map_soil_health")}
                      </span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">
                      {t(activeTooltip.stats.soilHealthKey)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ImpactMap;
