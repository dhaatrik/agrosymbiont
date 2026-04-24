/**
 * Utility to identify essential pages that should be prioritized for caching.
 * This helps in maintaining a robust offline experience for critical paths.
 */
export const isEssentialPage = (pathname: string): boolean => {
  const essentialPaths = ['/faq', '/resources', '/products', '/blog'];
  return essentialPaths.some(path => pathname === path || pathname.startsWith(`${path}/`));
};
