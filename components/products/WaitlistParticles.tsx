import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

const PARTICLES = new Array(12);
for (let i = 0; i < 12; i++) {
    PARTICLES[i] = i;
}

const WaitlistParticles: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {PARTICLES.map((_, i) => {
                const angle = (Math.PI * 2 * i) / 12;
                const v = 80 + Math.random() * 40;
                return (
                  <motion.div
                      key={i}
                      className="absolute w-2 h-2"
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                          x: Math.cos(angle) * v,
                          y: Math.sin(angle) * v - (Math.random() * 50),
                          scale: 0,
                          opacity: 0,
                          rotate: Math.random() * 360
                      }}
                      transition={{ duration: 0.6 + Math.random() * 0.2, ease: "easeOut" }}
                  >
                      <Sprout className="w-5 h-5 text-green-200 drop-shadow-sm" />
                  </motion.div>
                );
            })}
        </div>
    );
};

export default WaitlistParticles;
