import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Header from './Header';
import { ThemeProvider } from '../context/ThemeContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

// Mock Framer Motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  let scrollYVal = 0;
  return {
    ...actual,
    useScroll: () => ({
      scrollY: {
        get: () => scrollYVal,
        getPrevious: () => Math.max(0, scrollYVal - 10),
      }
    }),
    useMotionValueEvent: (_, eventName, callback) => {
      React.useEffect(() => {
        const handleScroll = () => {
           scrollYVal = window.scrollY;
           callback(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    }
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    vi.clearAllMocks();
  });

  const renderHeader = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('renders initial state correctly with py-6 padding', () => {
    renderHeader();
    const headerElement = screen.getByRole('banner');

    // Check initial padding
    expect(headerElement).toHaveClass('py-6');
    expect(headerElement).not.toHaveClass('py-2');
  });

  it('updates padding and background on scroll', () => {
    renderHeader();
    const headerElement = screen.getByRole('banner');

    // Mock scroll event where scrollY > 20
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Check updated padding
    expect(headerElement).toHaveClass('py-2');
    expect(headerElement).not.toHaveClass('py-6');

    // Scrolled back to top
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Check padding is restored
    expect(headerElement).toHaveClass('py-6');
    expect(headerElement).not.toHaveClass('py-2');
  });

  it('closes mobile menu on navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Header />
          <LocationDisplay />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Initial state: menu is closed
    expect(screen.queryByText('Email Us')).not.toBeInTheDocument();

    // Open mobile menu
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);

    // Menu should be open
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toBeInTheDocument();

    // Click on a mobile link to navigate
    const aboutLinks = screen.getAllByText('About');
    const mobileAboutLink = aboutLinks.find(link => link.classList.contains('text-2xl')); // Find the mobile link

    act(() => {
        if(mobileAboutLink) fireEvent.click(mobileAboutLink);
    });

    // Menu should be closed after navigation (because of the useEffect depending on location)
    // Wait for animation to finish might be needed, but since we are just checking if state is updated
    // The AnimatePresence might delay unmounting, but state is updated.
    // Wait for the button label to switch back to 'Open menu'
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });
});
