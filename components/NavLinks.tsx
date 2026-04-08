import React from 'react';
import { NavLink } from 'react-router-dom';
import type { TFunction } from 'i18next';

export const getNavLinks = (t: TFunction) => [
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

const NavLinks = React.memo(({ mobile, t }: { mobile?: boolean, t: TFunction }) => {
  // ⚡ Bolt Optimization: Memoize the navigation links array to prevent re-allocating
  // a new array on every render, which avoids breaking React.memo shallow equality
  // on child components and reduces garbage collection overhead.
  const links = React.useMemo(() => getNavLinks(t), [t]);
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

export default NavLinks;
