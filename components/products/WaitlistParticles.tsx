import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

const secureRandom = () => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
};

const PARTICLES = Array.from({ length: 12 });

const WaitlistParticles: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {PARTICLES.map((_, i) => {
                const angle = (Math.PI * 2 * i) / 12;
                const v = 80 + secureRandom() * 40;
                return (
                  <motion.div
                      key={i}
                      className="absolute w-2 h-2"
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                          x: Math.cos(angle) * v,
                          y: Math.sin(angle) * v - (secureRandom() * 50),
                          scale: 0,
                          opacity: 0,
                          rotate: secureRandom() * 360
                      }}
                      transition={{ duration: 0.6 + secureRandom() * 0.2, ease: "easeOut" }}
                  >
                      <Sprout className="w-5 h-5 text-green-200 drop-shadow-sm" />
                  </motion.div>
                );
            })}
        </div>
    );
};

export default WaitlistParticles;
