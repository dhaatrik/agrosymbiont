import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import Footer from './Footer';

// Mock lucide-react icons to prevent complex SVG rendering issues
vi.mock('lucide-react', () => ({
  MapPin: () => <span>MapPin</span>,
  Phone: () => <span>Phone</span>,
  Mail: () => <span>Mail</span>,
  Facebook: () => <span>Facebook</span>,
  Instagram: () => <span>Instagram</span>,
}));

// Mock react-i18next with actual English translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        footer_company: 'Company',
        footer_resources: 'Resources',
        footer_rights: 'All rights reserved.',
        footer_privacy: 'Privacy',
        footer_terms: 'Terms',
        hero_subtitle_1: 'Harnessing ',
        hero_subtitle_highlight: 'nanotechnology',
        hero_subtitle_2: ' and organic innovation to create profitable, eco-friendly farming systems.',
        nav_about: 'About',
        nav_careers: 'Careers',
        nav_investors: 'Investors/Partners',
        nav_contact: 'Contact',
        nav_insights: 'Insights',
        nav_stories: 'Stories',
        nav_technology: 'Technology',
        nav_faq: 'FAQ',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };

  it('renders the footer component', () => {
    renderFooter();
    // Verify logo presence
    expect(screen.getByAltText('AgroSymbiont Logo')).toBeInTheDocument();

    // Verify Company header and brand name
    expect(screen.getByText('AgroSymbiont')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();

    // Verify translated subtitle
    expect(screen.getByText('Harnessing nanotechnology and organic innovation to create profitable, eco-friendly farming systems.')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    renderFooter();

    // Verify "Company" section links
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Careers/i })).toHaveAttribute('href', '/careers');
    expect(screen.getByRole('link', { name: /Investors\/Partners/i })).toHaveAttribute('href', '/investors');

    // Verify contact link (which exists under Company as well)
    const contactLinks = screen.getAllByRole('link', { name: /Contact/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0]).toHaveAttribute('href', '/contact');

    // Verify "Resources" section links
    expect(screen.getByRole('link', { name: /Insights/i })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: /Stories/i })).toHaveAttribute('href', '/stories');
    expect(screen.getByRole('link', { name: /Technology/i })).toHaveAttribute('href', '/technology');
    expect(screen.getByRole('link', { name: /FAQ/i })).toHaveAttribute('href', '/faq');
  });

  it('renders contact information', () => {
    renderFooter();

    expect(screen.getByText('123 AgriTech Ave, Kolkata, India')).toBeInTheDocument();
    expect(screen.getByText('+91 11122 33344')).toBeInTheDocument();
    expect(screen.getByText('contact@agrosymbiont.com')).toBeInTheDocument();

    // Verify icons are mocked and present
    expect(screen.getByText('MapPin')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Mail')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    renderFooter();

    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com');
    expect(facebookLink).toHaveAttribute('target', '_blank');

    const xLink = screen.getByRole('link', { name: 'X' });
    expect(xLink).toHaveAttribute('href', 'https://www.x.com');
    expect(xLink).toHaveAttribute('target', '_blank');

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com');
    expect(instagramLink).toHaveAttribute('target', '_blank');
  });

  it('renders copyright and legal links', () => {
    renderFooter();

    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} AgroSymbiont Agricultural Solutions. All rights reserved.`;
    expect(screen.getByText(copyrightText)).toBeInTheDocument();

    const privacyLink = screen.getByRole('link', { name: 'Privacy' });
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');

    const termsLink = screen.getByRole('link', { name: 'Terms' });
    expect(termsLink).toHaveAttribute('href', '/terms-of-service');
  });
});
