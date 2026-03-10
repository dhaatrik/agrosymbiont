
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1 pr-8">
            <NavLink to="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
                    <span className="text-slate-950 font-extrabold text-2xl">A</span>
                </div>
                <span className="text-white text-2xl font-bold tracking-wider">
                AgroSymbiont
                </span>
            </NavLink>
            <p className="text-sm leading-7 text-gray-400 font-light">
                Transforming Agriculture, Sustainably. Blending nanotechnology with nature for a greener future.
            </p>
          </div>
          
          <div className="md:pl-8">
            <h3 className="text-white font-bold mb-8 uppercase tracking-[0.15em] text-xs">Company</h3>
            <ul className="space-y-4 text-sm">
                <li><NavLink to="/about" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">About Us</NavLink></li>
                <li><NavLink to="/careers" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">Careers</NavLink></li>
                <li><NavLink to="/contact" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">Contact</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-[0.15em] text-xs">Resources</h3>
            <ul className="space-y-4 text-sm">
                <li><NavLink to="/blog" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">Blog & Insights</NavLink></li>
                <li><NavLink to="/stories" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">Success Stories</NavLink></li>
                <li><NavLink to="/technology" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">Our Technology</NavLink></li>
                <li><NavLink to="/faq" className="text-gray-400 hover:text-mustard-yellow transition-colors duration-300">FAQ</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-[0.15em] text-xs">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
                <li className="flex items-start"><MapPin className="mr-3 w-5 h-5 opacity-50 flex-shrink-0" /> 123 AgriTech Ave, Kolkata, India</li>
                <li className="flex items-center"><Phone className="mr-3 w-5 h-5 opacity-50 flex-shrink-0" /> +91 11122 33344</li>
                <li className="flex items-center"><Mail className="mr-3 w-5 h-5 opacity-50 flex-shrink-0" /> contact@agrosymbiont.com</li>
            </ul>
             <div className="flex space-x-4 mt-8">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-mustard-yellow dark:hover:bg-yellow-500 hover:text-cerulean-blue dark:hover:text-blue-900 transition-all duration-300 shadow-[0_4px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_0_rgba(255,255,255,0.1)] active:shadow-[0_0px_0_rgba(255,255,255,0.1)] transform hover:-translate-y-1 active:translate-y-1" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-mustard-yellow dark:hover:bg-yellow-500 hover:text-cerulean-blue dark:hover:text-blue-900 transition-all duration-300 shadow-[0_4px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_0_rgba(255,255,255,0.1)] active:shadow-[0_0px_0_rgba(255,255,255,0.1)] transform hover:-translate-y-1 active:translate-y-1" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-mustard-yellow dark:hover:bg-yellow-500 hover:text-cerulean-blue dark:hover:text-blue-900 transition-all duration-300 shadow-[0_4px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_0_rgba(255,255,255,0.1)] active:shadow-[0_0px_0_rgba(255,255,255,0.1)] transform hover:-translate-y-1 active:translate-y-1" aria-label="Instagram">
                 <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-100 font-medium">
            <p className="text-gray-100">© {new Date().getFullYear()} AgroSymbiont Agricultural Solutions. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
                <NavLink to="/privacy-policy" className="text-gray-100 hover:text-mustard-yellow transition-colors">Privacy Policy</NavLink>
                <NavLink to="/terms-of-service" className="text-gray-100 hover:text-mustard-yellow transition-colors">Terms of Service</NavLink>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
