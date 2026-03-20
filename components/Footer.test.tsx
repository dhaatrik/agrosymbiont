import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  MapPin: () => <span data-testid="icon-mappin" />,
  Phone: () => <span data-testid="icon-phone" />,
  Mail: () => <span data-testid="icon-mail" />,
  Facebook: () => <span data-testid="icon-facebook" />,
  Instagram: () => <span data-testid="icon-instagram" />
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        footer_company: 'Company',
        footer_privacy: 'Privacy Policy',
        footer_resources: 'Resources',
        footer_rights: 'All rights reserved.',
        footer_terms: 'Terms of Service',
        hero_subtitle_1: 'Leading the ',
        hero_subtitle_highlight: 'agricultural revolution',
        hero_subtitle_2: ' with technology.',
        nav_about: 'About Us',
        nav_careers: 'Careers',
        nav_contact: 'Contact',
        nav_faq: 'FAQ',
        nav_insights: 'Insights',
        nav_investors: 'Investors',
        nav_stories: 'Stories',
        nav_technology: 'Technology'
      };
      return translations[key] || key;
    }
  })
}));

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };

  it('renders without crashing and displays the brand name', () => {
    renderFooter();
    expect(screen.getByText('AgroSymbiont')).toBeInTheDocument();
  });

  it('displays the correct localized text for company and resources sections', () => {
    renderFooter();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText(/Leading the/)).toBeInTheDocument();
    expect(screen.getByText(/agricultural revolution/)).toBeInTheDocument();
    expect(screen.getByText(/with technology./)).toBeInTheDocument();
  });

  it('renders all navigation links with correct routes', () => {
    renderFooter();

    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink).toHaveAttribute('href', '/about');

    const careersLink = screen.getByRole('link', { name: 'Careers' });
    expect(careersLink).toHaveAttribute('href', '/careers');

    const investorsLink = screen.getByRole('link', { name: 'Investors' });
    expect(investorsLink).toHaveAttribute('href', '/investors');

    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toHaveAttribute('href', '/contact');

    const blogLink = screen.getByRole('link', { name: 'Insights' });
    expect(blogLink).toHaveAttribute('href', '/blog');

    const storiesLink = screen.getByRole('link', { name: 'Stories' });
    expect(storiesLink).toHaveAttribute('href', '/stories');

    const technologyLink = screen.getByRole('link', { name: 'Technology' });
    expect(technologyLink).toHaveAttribute('href', '/technology');

    const faqLink = screen.getByRole('link', { name: 'FAQ' });
    expect(faqLink).toHaveAttribute('href', '/faq');

    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');

    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    expect(termsLink).toHaveAttribute('href', '/terms-of-service');
  });

  it('renders contact information and icons correctly', () => {
    renderFooter();

    expect(screen.getByTestId('icon-mappin')).toBeInTheDocument();
    expect(screen.getByText(/123 AgriTech Ave, Kolkata, India/i)).toBeInTheDocument();

    expect(screen.getByTestId('icon-phone')).toBeInTheDocument();
    expect(screen.getByText(/\+91 11122 33344/i)).toBeInTheDocument();

    expect(screen.getByTestId('icon-mail')).toBeInTheDocument();
    expect(screen.getByText(/contact@agrosymbiont.com/i)).toBeInTheDocument();
  });

  it('renders social media links correctly', () => {
    renderFooter();

    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');

    const xLink = screen.getByRole('link', { name: 'X' });
    expect(xLink).toHaveAttribute('href', 'https://www.x.com');
    expect(xLink).toHaveAttribute('target', '_blank');
    expect(xLink).toHaveAttribute('rel', 'noopener noreferrer');

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders footer copyright text', () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} AgroSymbiont Agricultural Solutions. All rights reserved.`))).toBeInTheDocument();
  });
});
