import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface WaitlistButtonContentProps {
    showParticles: boolean;
    isSubmitting: boolean;
    t: (key: string) => string;
}

const WaitlistButtonContent: React.FC<WaitlistButtonContentProps> = ({ showParticles, isSubmitting, t }) => {
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
            {!showParticles && isSubmitting && (
                <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                >
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    {t('prod_wait')}
                </motion.div>
            )}
            {!showParticles && !isSubmitting && (
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
};

export default WaitlistButtonContent;
