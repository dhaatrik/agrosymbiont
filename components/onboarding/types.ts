export interface OnboardingSelections {
  crop: string;
  challenge: string;
  farmSize: string;
  soilType: string;
  name: string;
  email: string;
}

export const TOTAL_STEPS = 6;

export const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 }
};

export const soilColors: Record<string, string> = {
  alluvial: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700',
  red: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
  black: 'bg-stone-200 dark:bg-stone-700/50 border-stone-400 dark:border-stone-600',
  sandy: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
  clay: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700',
  unknown: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
};

const PARTICLE_COUNT = 8;
const PARTICLE_COLORS = ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-orange-400', 'bg-pink-400', 'bg-purple-400', 'bg-red-400', 'bg-teal-400'];
export const PARTICLE_DATA = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
  return {
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    x: Math.cos(angle) * 70,
    y: Math.sin(angle) * 70,
  };
});
