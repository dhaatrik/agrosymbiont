import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface WaitlistButtonContentProps {
    showParticles: boolean;
    t: (key: string) => string;
}

// ⚡ Bolt Optimization: Wrapped WaitlistButtonContent in React.memo
// This prevents the component from re-rendering on every keystroke when the user
// types in the WaitlistForm email input, reducing unnecessary React diffing.
const WaitlistButtonContent: React.FC<WaitlistButtonContentProps> = React.memo(({ showParticles, t }) => {
    return (
        <AnimatePresence mode="wait">
            {showParticles && (
                <motion.div
                    key="success"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <Check className="h-6 w-6 text-white" />
                </motion.div>
            )}
            {!showParticles && (
                <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {t('prod_notify')}
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default WaitlistButtonContent;
