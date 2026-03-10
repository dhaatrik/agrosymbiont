import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What is agricultural nanotechnology?",
        answer: "Agricultural nanotechnology involves using nanoparticles to deliver nutrients, pesticides, and other essential compounds directly to plants at a cellular level. This increases absorption efficiency, reduces waste, and minimizes environmental impact compared to traditional bulk chemicals."
    },
    {
        question: "Are your products safe for organic farming?",
        answer: "Yes, many of our products are certified organic. We utilize naturally derived nanoparticles and bio-based carriers that comply with organic farming standards, ensuring your crops remain chemical-free while benefiting from advanced nutrient delivery."
    },
    {
        question: "How do nano-fertilizers differ from traditional fertilizers?",
        answer: "Traditional fertilizers often suffer from leaching and volatilization, meaning a large portion of the nutrients never reaches the plant. Nano-fertilizers encapsulate nutrients in microscopic particles that plants can absorb more easily and efficiently, leading to higher yields with significantly less product."
    },
    {
        question: "What crops are your products suitable for?",
        answer: "Our products are highly versatile and have been successfully tested on a wide variety of crops, including cereals, fruits, vegetables, tea, coffee, and spices. We also offer specialized formulations tailored to the specific nutrient requirements of different plant types."
    },
    {
        question: "How do I apply AgroSymbiont's products to my fields?",
        answer: "Most of our nano-solutions can be applied using standard agricultural equipment. They are typically mixed with water and applied as a foliar spray or through drip irrigation systems (fertigation). Detailed application guidelines are provided with every product."
    },
    {
        question: "Do your products help with water conservation?",
        answer: "Absolutely. By improving soil structure and root health, our products enhance the water retention capacity of the soil. Additionally, healthier plants with stronger root systems are more drought-resistant, reducing the overall need for frequent irrigation."
    },
    {
        question: "Are your solutions safe for the environment and local wildlife?",
        answer: "Environmental safety is our core priority. Our nanotechnology is designed to be targeted, meaning it affects only the intended plants or pests without leaving harmful residues in the soil or water. This protects beneficial insects, local wildlife, and the broader ecosystem."
    },
    {
        question: "How long does it take to see results after application?",
        answer: "Because nanoparticles are absorbed much faster than traditional inputs, farmers often notice improvements in plant vitality and leaf color within a few days to a week. Significant differences in crop yield and quality are typically observed by harvest time."
    },
    {
        question: "Where can I purchase AgroSymbiont products?",
        answer: "Our products are available through our network of authorized agricultural distributors and dealers. You can also contact our sales team directly through the Contact page to place bulk orders or find a distributor near you."
    },
    {
        question: "Do you provide technical support or agronomy consulting?",
        answer: "Yes, we believe in supporting our farmers every step of the way. Our team of expert agronomists is available to provide soil analysis, customized crop nutrition plans, and on-the-ground technical support to ensure you get the best results from our products."
    }
];

const FAQItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-stone-200 dark:border-stone-700 rounded-2xl mb-4 overflow-hidden bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="font-bold text-gray-900 dark:text-white pr-4">{question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-cerulean-blue dark:bg-blue-600 text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400'}`}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
            </button>
            <div 
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
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-20 bg-ivory/20 dark:bg-stone-900/20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl text-stone-gray dark:text-stone-300 max-w-2xl mx-auto font-light">
                        Find answers to common questions about our nanotechnology, products, and how we can help your farm thrive.
                    </p>
                </AnimatedSection>

                <AnimatedSection className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </AnimatedSection>
                
                <AnimatedSection className="mt-16 text-center">
                    <p className="text-stone-gray dark:text-stone-400 mb-6">Still have questions? We're here to help.</p>
                    <a href="#/contact" className="inline-block bg-white dark:bg-stone-800 text-cerulean-blue dark:text-blue-400 font-bold py-3 px-8 rounded-full border-2 border-cerulean-blue dark:border-blue-500 hover:bg-cerulean-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors duration-300 shadow-sm">
                        Contact Support
                    </a>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default FAQPage;
