import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { ConnectivityWrapper } from './components/ConnectivityWrapper';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const UseCasesPage = lazy(() => import('./pages/UseCasesPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
// Dynamic multi-step lead capture flow
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const InvestorsPage = lazy(() => import('./pages/InvestorsPage'));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import SeedLoader from './components/SeedLoader';

const LoadingFallback = () => <SeedLoader />;

export const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <ConnectivityWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/technology" element={<ServicesPage />} />
              <Route path="/stories" element={<UseCasesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/investors" element={<InvestorsPage />} />
            </Routes>
          </ConnectivityWrapper>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};
