
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-ivory/20 dark:bg-stone-900/20 py-20 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-4xl font-extrabold text-cerulean-blue dark:text-blue-400 text-center mb-8">Terms of Service</h1>
          <div className="bg-white/70 dark:bg-stone-800/70 p-8 rounded-lg shadow-lg space-y-6">
            <p className="text-sm text-stone-gray dark:text-stone-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">1. Introduction</h2>
            <p className="text-stone-600 dark:text-stone-300">These Terms of Service ("Terms") govern your use of the AgroSymbiont website (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Site.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">2. Use of Our Website</h2>
            <p className="text-stone-600 dark:text-stone-300">You agree to use the Site only for lawful purposes. You are prohibited from any use of the Site that would constitute an illegal offense, give rise to liability, or otherwise violate any applicable local, state, national, or international law or regulation.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">3. Intellectual Property</h2>
            <p className="text-stone-600 dark:text-stone-300">The Site and its original content, features, and functionality are and will remain the exclusive property of AgroSymbiont and its licensors. The content is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AgroSymbiont.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">4. User Conduct</h2>
            <p className="text-stone-600 dark:text-stone-300">You agree not to use the Site to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-stone-600 dark:text-stone-300">
              <li>Upload, post, or otherwise transmit any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable.</li>
              <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Interfere with or disrupt the Site or servers or networks connected to the Site.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">5. Disclaimers</h2>
            <p className="text-stone-600 dark:text-stone-300">The information on our Site is provided on an "as is," "as available" basis. You agree that your use of our Site is at your sole risk. We disclaim all warranties of any kind, including but not limited to any express warranties, statutory warranties, and any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">6. Limitation of Liability</h2>
            <p className="text-stone-600 dark:text-stone-300">In no event shall AgroSymbiont, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">7. Governing Law</h2>
            <p className="text-stone-600 dark:text-stone-300">These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">8. Changes to These Terms</h2>
            <p className="text-stone-600 dark:text-stone-300">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.</p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">9. Contact Us</h2>
            <p className="text-stone-600 dark:text-stone-300">If you have any questions about these Terms, please contact us at:</p>
            <p className="text-stone-600 dark:text-stone-300">
              AgroSymbiont<br />
              123 AgriTech Ave, Kolkata, India<br />
              Email: contact@agrosymbiont.com<br />
              Phone: +91 11122 33344
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
