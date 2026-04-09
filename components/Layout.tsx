import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Optimization: Using Framer Motion's useScroll and useTransform hooks
  // instead of a React useState + scroll event listener.
  // This binds the scroll value directly to the motion.div's transform,
  // bypassing the React render cycle entirely. This prevents the entire
  // Layout component (and all its children) from re-rendering on every scroll event.
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, value => value * 0.15);

  return (
    <div className="min-h-screen bg-ivory dark:bg-stone-900 text-stone-gray dark:text-stone-300 font-sans flex flex-col selection:bg-mustard-yellow dark:selection:bg-yellow-500 selection:text-cerulean-blue dark:selection:text-blue-900 overflow-x-hidden transition-colors duration-300">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-cerulean-blue text-white px-4 py-2 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mustard-yellow">Skip to content</a>
      {/* Static noise overlay for texture with parallax */}
      <motion.div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.05] z-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
        style={{ y: backgroundY }}
      ></motion.div>
      
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow flex flex-col relative z-0 outline-none">
        <Breadcrumbs />
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
