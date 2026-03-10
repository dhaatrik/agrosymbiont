
import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ivory dark:bg-stone-900 text-stone-gray dark:text-stone-300 font-sans flex flex-col selection:bg-mustard-yellow dark:selection:bg-yellow-500 selection:text-cerulean-blue dark:selection:text-blue-900 overflow-x-hidden transition-colors duration-300">
      {/* Static noise overlay for texture with parallax */}
      <div 
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.05] z-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      ></div>
      
      <Header />
      <main className="flex-grow flex flex-col relative z-0">
        <Breadcrumbs />
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
