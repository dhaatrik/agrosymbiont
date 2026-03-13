import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{t('contact_title')}</h1>
                    <p className="text-xl text-stone-gray dark:text-stone-300 max-w-3xl mx-auto font-light">
                        {t('contact_subtitle')}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <AnimatedSection>
                        <ContactForm />
                    </AnimatedSection>
                     <AnimatedSection className="space-y-10 pt-4">
                         <div className="bg-cerulean-blue dark:bg-blue-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden isolate">
                             {/* Abstract shapes */}
                             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-mustard-yellow/20 dark:bg-yellow-900/20 rounded-full blur-2xl"></div>
                             
                             <h3 className="text-3xl font-bold mb-8">{t('contact_headquarters')}</h3>
                             <div className="space-y-8 relative z-10">
                                 <div className="flex items-start">
                                     <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                        <MapPin className="w-6 h-6" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                        <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">{t('contact_address_label')}</p>
                                        <p className="text-xl font-medium">{t('contact_address')}</p>
                                     </div>
                                 </div>
                                 <div className="flex items-start">
                                     <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                        <Phone className="w-6 h-6" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                        <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">{t('contact_phone_label')}</p>
                                        <p className="text-xl font-medium">{t('contact_phone_val')}</p>
                                     </div>
                                 </div>
                                 <div className="flex items-start">
                                     <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                        <Mail className="w-6 h-6" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                        <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">{t('contact_email_label')}</p>
                                        <p className="text-xl font-medium">{t('contact_email_val')}</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="h-80 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 dark:border-stone-700/50 transform transition-transform hover:scale-[1.02] relative group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.276632431604!2d88.363895!3d22.562627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770000000000%3A0x0!2sKolkata!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={false}
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="AgroSymbiont Headquarters Location"
                                className="filter grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                            <a 
                                href="https://goo.gl/maps/H1Z6Q9yY8yZ2" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-stone-800 text-cerulean-blue dark:text-blue-400 font-bold py-3 px-6 rounded-full shadow-xl hover:bg-cerulean-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                            >
                                <MapPin className="w-5 h-5" strokeWidth={2} />
                                {t('contact_directions')}
                            </a>
                         </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
