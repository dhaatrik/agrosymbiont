
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-8 right-8 bg-burnt-orange text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-mustard-yellow dark:hover:bg-yellow-500 hover:text-cerulean-blue dark:hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mustard-yellow dark:focus:ring-yellow-500 transition-all duration-300 ease-in-out transform z-50 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2} />
    </button>
  );
};

export default BackToTopButton;
