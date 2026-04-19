
import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// ⚡ Bolt Optimization: Wrapped AnimatedSection in React.memo() to prevent unnecessary re-renders.
// As a frequently used wrapper component, memoizing it ensures that unchanged children and props
// do not trigger unnecessary React reconciliations and framer-motion re-evaluations.
const AnimatedSection: React.FC<AnimatedSectionProps> = React.memo(({ children, className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease-out cubic
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
