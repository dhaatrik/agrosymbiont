import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { vi, describe, it, expect } from 'vitest';

// We mock react-router-dom to easily control useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('Breadcrumbs Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it('renders nothing on the home page (pathname is /)', () => {
    (useLocation as any).mockReturnValue({ pathname: '/' });
    const { container } = renderWithRouter(<Breadcrumbs />);
    expect(container.firstChild).toBeNull();
  });

  it('renders breadcrumbs for a single level path', () => {
    (useLocation as any).mockReturnValue({ pathname: '/about' });
    renderWithRouter(<Breadcrumbs />);

    // Breadcrumb list should be visible
    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();

    // The Home link should be present
    expect(screen.getByText('Home')).toBeInTheDocument();

    // 'About Us' should be present and marked as current page
    const aboutElement = screen.getByText('About Us');
    expect(aboutElement).toBeInTheDocument();
    expect(aboutElement).toHaveAttribute('aria-current', 'page');
  });

  it('renders breadcrumbs for a multi-level path with mappings', () => {
    (useLocation as any).mockReturnValue({ pathname: '/products/some-product' });
    renderWithRouter(<Breadcrumbs />);

    // Should contain Home
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Should contain 'Products' mapped from 'products', and it should be a link
    const productsLink = screen.getByText('Products');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink.closest('a')).toHaveAttribute('href', '/products');

    // Should contain formatted text for 'some-product' (no mapping available) -> 'Some Product'
    const currentElement = screen.getByText('Some Product');
    expect(currentElement).toBeInTheDocument();
    expect(currentElement).toHaveAttribute('aria-current', 'page');
  });

  it('handles multiple trailing slashes gracefully', () => {
    (useLocation as any).mockReturnValue({ pathname: '/technology//' });
    renderWithRouter(<Breadcrumbs />);

    // The component filters out empty strings from splitting the path
    // So '/technology//' should just yield ['technology']
    const techElement = screen.getByText('Technology');
    expect(techElement).toBeInTheDocument();
    expect(techElement).toHaveAttribute('aria-current', 'page');

    // Make sure we only have Home and Technology items (no empty items)
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2); // Home + Technology
  });
});
