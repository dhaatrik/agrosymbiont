import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQItem: React.FC<{ id: string, question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ id, question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-stone-200 dark:border-stone-700 rounded-2xl mb-4 overflow-hidden bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cerulean-blue dark:focus-visible:ring-blue-500"
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
            >
                <span className="font-bold text-gray-900 dark:text-white pr-4">{question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-cerulean-blue dark:bg-blue-600 text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400'}`}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
            </button>
            <div 
                id={`faq-answer-${id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 pt-2 text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-700">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
        question: t(`faq_q${i + 1}`),
        answer: t(`faq_a${i + 1}`)
    })), [t]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-20 bg-ivory/20 dark:bg-stone-900/20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{t('faq_title')}</h1>
                    <p className="text-xl text-stone-gray dark:text-stone-300 max-w-2xl mx-auto font-light">
                        {t('faq_subtitle')}
                    </p>
                </AnimatedSection>

                <AnimatedSection className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            id={index.toString()}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </AnimatedSection>
                
                <AnimatedSection className="mt-16 text-center">
                    <p className="text-stone-gray dark:text-stone-400 mb-6">{t('faq_still_questions')}</p>
                    <a href="#/contact" className="inline-block bg-white dark:bg-stone-800 text-cerulean-blue dark:text-blue-400 font-bold py-3 px-8 rounded-full border-2 border-cerulean-blue dark:border-blue-500 hover:bg-cerulean-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors duration-300 shadow-sm">
                        {t('faq_contact_support')}
                    </a>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default FAQPage;
