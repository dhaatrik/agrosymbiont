
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

const routeNameMap: { [key: string]: string } = {
  'about': 'About Us',
  'products': 'Products',
  'technology': 'Technology',
  'stories': 'Success Stories',
  'resources': 'Resources',
  'blog': 'Insights',
  'contact': 'Contact',
  'careers': 'Careers',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full z-30 relative mt-24 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
          <li>
            <Link to="/" className="text-stone-gray/60 dark:text-stone-400 hover:text-cerulean-blue dark:hover:text-blue-400 transition-colors flex items-center">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const name = routeNameMap[value] || value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            return (
              <li key={to} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-stone-gray/30 dark:text-stone-600 mx-2" />
                {isLast ? (
                  <span className="font-semibold text-cerulean-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full" aria-current="page">{name}</span>
                ) : (
                  <Link to={to} className="text-stone-gray/60 dark:text-stone-400 hover:text-cerulean-blue dark:hover:text-blue-400 transition-colors">
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
