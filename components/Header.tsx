
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Mail, Phone, Sun, Moon, Globe, Zap, ZapOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const getNavLinks = (t: (key: string) => string) => [
  { path: '/', label: t('nav_home') },
  { path: '/about', label: t('nav_about') },
  { path: '/products', label: t('nav_products') },
  { path: '/technology', label: t('nav_technology') },
  { path: '/stories', label: t('nav_stories') },
  { path: '/blog', label: t('nav_insights') },
  { path: '/careers', label: t('nav_careers') },
  { path: '/faq', label: t('nav_faq') },
  { path: '/contact', label: t('nav_contact') },
];

const NavLinks = React.memo(({ mobile, t }: { mobile?: boolean, t: (key: string) => string }) => {
  const links = getNavLinks(t);
  return (
  <>
    {links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) => `
          relative group transition-all duration-300 font-medium
          ${mobile
            ? 'block py-4 px-4 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-2xl text-2xl font-bold text-center'
            : 'py-2 px-4 text-sm tracking-wide text-stone-700 dark:text-stone-300 hover:text-cerulean-blue dark:hover:text-blue-400'}
          ${isActive && !mobile ? 'text-cerulean-blue dark:text-blue-400' : ''}
        `}
      >
        {({ isActive }) => (
          <>
            {link.label}
            {!mobile && (
              <span
                className={`absolute left-1/2 -bottom-1 w-1 h-1 bg-mustard-yellow dark:bg-yellow-500 rounded-full transform transition-all duration-300 -translate-x-1/2 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`}
              />
            )}
          </>
        )}
      </NavLink>
    ))}
  </>
  );
});
NavLinks.displayName = 'NavLinks';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, dataSaver, toggleDataSaver } = useTheme();
  const { scrollY } = useScroll();
  const { t, i18n } = useTranslation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'py-2' 
          : 'py-6'
      } ${hidden && !isOpen ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`rounded-full transition-all duration-500 flex items-center justify-between px-6 ${
            scrolled || isOpen
              ? 'bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl shadow-lg border border-white/40 dark:border-stone-700/40 h-16' 
              : 'bg-transparent h-20'
          }`}
        >
          <div className="flex-shrink-0 flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3 group perspective-1000">
                <img src="/favicon.png" alt="AgroSymbiont Logo" className="w-14 h-14 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                <span className={`text-2xl font-bold tracking-tight transition-colors drop-shadow-sm ${scrolled || isOpen ? 'text-gray-800 dark:text-gray-100' : 'text-gray-900 dark:text-white'}`}>
                AgroSymbiont
                </span>
            </NavLink>
          </div>
          <div className="hidden lg:flex items-center space-x-1">
            <NavLinks t={t} />
            <div className="flex items-center border-l border-stone-300 dark:border-stone-700 ml-4 pl-4 space-x-4">
              <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-cerulean-blue dark:hover:text-blue-400">
                <Globe className="w-4 h-4" />
                <select 
                  className="bg-transparent text-sm font-bold uppercase cursor-pointer appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 rounded"
                  value={i18n.language?.split('-')[0] || 'en'}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  aria-label="Select Language"
                >
                  <option value="en" className="text-gray-900 bg-white">EN</option>
                  <option value="hi" className="text-gray-900 bg-white">HI</option>
                </select>
              </div>
              <button
                onClick={toggleDataSaver}
                className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900"
                aria-label="Toggle Data Saver"
                title={dataSaver ? "Disable Low-Bandwidth Mode" : "Enable Low-Bandwidth Mode"}
              >
                {dataSaver ? <ZapOff className="w-5 h-5 text-mustard-yellow" /> : <Zap className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDataSaver}
              className={`p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${scrolled || isOpen ? 'text-gray-800 dark:text-gray-200' : 'text-gray-900 dark:text-white'}`}
              aria-label="Toggle Data Saver"
              title={dataSaver ? "Disable Low-Bandwidth Mode" : "Enable Low-Bandwidth Mode"}
            >
              {dataSaver ? <ZapOff className="w-5 h-5 text-mustard-yellow" /> : <Zap className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${scrolled || isOpen ? 'text-gray-800 dark:text-gray-200' : 'text-gray-900 dark:text-white'}`}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${scrolled || isOpen ? 'text-gray-800 dark:text-gray-200' : 'text-gray-900 dark:text-white'}`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <X className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex-grow flex flex-col space-y-2 overflow-y-auto">
              <NavLinks mobile t={t} />
            </div>
            <div className="mt-auto pt-8 border-t border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-center space-x-8">
                <a href="mailto:contact@agrosymbiont.com" className="text-stone-500 dark:text-stone-400 hover:text-cerulean-blue dark:hover:text-blue-400 transition-colors" aria-label="Email Us">
                  <Mail className="w-8 h-8" strokeWidth={1.5} />
                </a>
                <a href="tel:+911112233344" className="text-stone-500 dark:text-stone-400 hover:text-cerulean-blue dark:hover:text-blue-400 transition-colors" aria-label="Call Us">
                  <Phone className="w-8 h-8" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
