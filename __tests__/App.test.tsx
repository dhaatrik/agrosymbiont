import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { vi, describe, it, expect } from 'vitest';

// Mock the components since we only want to test routing
vi.mock('../components/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}));
vi.mock('../pages/HomePage', () => ({ default: () => <div data-testid="home-page">Home</div> }));
vi.mock('../pages/AboutPage', () => ({ default: () => <div data-testid="about-page">About</div> }));
vi.mock('../pages/ProductsPage', () => ({ default: () => <div data-testid="products-page">Products</div> }));
vi.mock('../pages/ServicesPage', () => ({ default: () => <div data-testid="services-page">Services</div> }));
vi.mock('../pages/UseCasesPage', () => ({ default: () => <div data-testid="use-cases-page">Use Cases</div> }));
vi.mock('../pages/ResourcesPage', () => ({ default: () => <div data-testid="resources-page">Resources</div> }));
vi.mock('../pages/BlogPage', () => ({ default: () => <div data-testid="blog-page">Blog</div> }));
vi.mock('../pages/BlogPostPage', () => ({ default: () => <div data-testid="blog-post-page">Blog Post</div> }));
vi.mock('../pages/ContactPage', () => ({ default: () => <div data-testid="contact-page">Contact</div> }));
vi.mock('../pages/CareersPage', () => ({ default: () => <div data-testid="careers-page">Careers</div> }));
vi.mock('../pages/PrivacyPolicyPage', () => ({ default: () => <div data-testid="privacy-policy-page">Privacy Policy</div> }));
vi.mock('../pages/TermsOfServicePage', () => ({ default: () => <div data-testid="terms-of-service-page">Terms of Service</div> }));
vi.mock('../pages/FAQPage', () => ({ default: () => <div data-testid="faq-page">FAQ</div> }));

// We need to bypass HashRouter in App to test routes effectively with MemoryRouter
// This is a common pattern for testing components that include their own Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    HashRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useLocation: () => ({ pathname: '/' }),
  };
});

describe('App Routing', () => {
  it('renders HomePage on default route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  it('renders AboutPage on /about route', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument();
    });
  });

  it('renders ProductsPage on /products route', async () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument();
    });
  });

  it('renders ServicesPage on /technology route', async () => {
    render(
      <MemoryRouter initialEntries={['/technology']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
    });
  });

  it('renders UseCasesPage on /stories route', async () => {
    render(
      <MemoryRouter initialEntries={['/stories']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('use-cases-page')).toBeInTheDocument();
    });
  });

  it('renders ResourcesPage on /resources route', async () => {
    render(
      <MemoryRouter initialEntries={['/resources']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('resources-page')).toBeInTheDocument();
    });
  });

  it('renders BlogPage on /blog route', async () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('blog-page')).toBeInTheDocument();
    });
  });

  it('renders BlogPostPage on /blog/:id route', async () => {
    render(
      <MemoryRouter initialEntries={['/blog/123']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('blog-post-page')).toBeInTheDocument();
    });
  });

  it('renders ContactPage on /contact route', async () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('contact-page')).toBeInTheDocument();
    });
  });

  it('renders CareersPage on /careers route', async () => {
    render(
      <MemoryRouter initialEntries={['/careers']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('careers-page')).toBeInTheDocument();
    });
  });

  it('renders PrivacyPolicyPage on /privacy-policy route', async () => {
    render(
      <MemoryRouter initialEntries={['/privacy-policy']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('privacy-policy-page')).toBeInTheDocument();
    });
  });

  it('renders TermsOfServicePage on /terms-of-service route', async () => {
    render(
      <MemoryRouter initialEntries={['/terms-of-service']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('terms-of-service-page')).toBeInTheDocument();
    });
  });

  it('renders FAQPage on /faq route', async () => {
    render(
      <MemoryRouter initialEntries={['/faq']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('faq-page')).toBeInTheDocument();
    });
  });

  it('renders Layout component globally', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });
  });

  it('renders fallback when invalid route is provided', async () => {
    render(
      <MemoryRouter initialEntries={['/not-a-real-page']}>
        <App />
      </MemoryRouter>
    );
    // There isn't a 404 route defined yet. It will render empty.
    // However, layout should still be there.
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });
  });
});
