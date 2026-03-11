import React from 'react';
import { motion } from 'framer-motion';

const SeedLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF0] dark:bg-stone-900">
      <div className="relative w-24 h-32 flex flex-col items-center justify-center">
        {/* Soil line */}
        <div className="absolute bottom-8 w-16 h-1 bg-stone-300 dark:bg-stone-700 rounded-full" />
        
        {/* Seed */}
        <motion.div
          className="w-5 h-7 bg-amber-700 dark:bg-amber-600 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] origin-bottom absolute bottom-6 z-10"
          initial={{ scale: 1, y: 5 }}
          animate={{ scale: [1, 1.1, 1], y: [5, 4, 5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Leaves */}
        <div className="absolute bottom-11 origin-bottom flex translate-y-2 z-0">
          {/* Stem */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-green-600 rounded-t-full origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
          
          {/* Left leaf */}
          <motion.div
            className="w-4 h-8 bg-green-500 rounded-[100%_0_100%_0] origin-bottom-right absolute bottom-0 right-1/2"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: [0, 1, 0.9, 1], rotate: [-20, -50, -40, -50] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {/* Right leaf */}
          <motion.div
            className="w-4 h-8 bg-green-400 rounded-[0_100%_0_100%] origin-bottom-left absolute bottom-0 left-1/2"
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: [0, 1, 0.9, 1], rotate: [20, 50, 40, 50] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
        
        <motion.div 
          className="absolute 0-bottom-2 text-green-700 dark:text-green-500 font-bold text-xs tracking-[0.2em] uppercase mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Growing...
        </motion.div>
      </div>
    </div>
  );
};

export default SeedLoader;
