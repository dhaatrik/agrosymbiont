import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import NavLinks, { getNavLinks } from './NavLinks';
import type { TFunction } from 'i18next';

// Mock translation function
const mockT: TFunction = ((key: string) => key) as any;

const renderNavLinks = (mobile?: boolean, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <NavLinks mobile={mobile} t={mockT} />
    </MemoryRouter>
  );
};

describe('NavLinks Component', () => {
  it('renders all desktop navigation links correctly', () => {
    renderNavLinks(false);

    const links = getNavLinks(mockT);
    links.forEach(link => {
      const linkElement = screen.getByText(link.label).closest('a');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.path);
      // Verify desktop styling
      expect(linkElement).toHaveClass('py-2', 'px-4', 'text-sm');
    });
  });

  it('renders all mobile navigation links correctly', () => {
    renderNavLinks(true);

    const links = getNavLinks(mockT);
    links.forEach(link => {
      const linkElement = screen.getByText(link.label).closest('a');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.path);
      // Verify mobile styling
      expect(linkElement).toHaveClass('block', 'py-4', 'px-4', 'text-2xl');
    });
  });

  it('applies active styles based on current route (desktop)', () => {
    renderNavLinks(false, '/about');

    const aboutLink = screen.getByText('nav_about').closest('a');
    expect(aboutLink).toHaveClass('text-cerulean-blue'); // Has active color

    const homeLink = screen.getByText('nav_home').closest('a');
    expect(homeLink).not.toHaveClass('text-cerulean-blue');
  });
});
