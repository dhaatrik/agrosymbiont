import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import { ThemeProvider } from '../context/ThemeContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock child components
vi.mock('./Header', () => ({
  default: () => <header data-testid="mock-header">Mock Header</header>
}));
vi.mock('./Footer', () => ({
  default: () => <footer data-testid="mock-footer">Mock Footer</footer>
}));
vi.mock('./BackToTopButton', () => ({
  default: () => <button data-testid="mock-back-to-top">Mock BackToTop</button>
}));
vi.mock('./Breadcrumbs', () => ({
  default: () => <nav data-testid="mock-breadcrumbs">Mock Breadcrumbs</nav>
}));

// Mock Framer Motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  let scrollYVal = 0;
  return {
    ...actual,
    motion: {
      div: ({ children, style, className }: any) => (
        <div data-testid="motion-div" className={className} style={style}>
          {children}
        </div>
      ),
    },
    useScroll: () => ({
      scrollY: {
        get: () => scrollYVal,
        getPrevious: () => Math.max(0, scrollYVal - 10),
      }
    }),
    useTransform: () => 0, // Mock useTransform to return a static value
  };
});

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

describe('Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLayout = (children: React.ReactNode) => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('renders children correctly', () => {
    renderLayout(<div data-testid="test-child">Test Content</div>);

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders all required sub-components', () => {
    renderLayout(<div>Test</div>);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-back-to-top')).toBeInTheDocument();
    expect(screen.getByTestId('mock-breadcrumbs')).toBeInTheDocument();
  });

  it('renders a main wrapper with flex-grow class', () => {
    renderLayout(<div>Test</div>);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('flex-grow', 'flex', 'flex-col');
  });

  it('contains the motion.div background element', () => {
    renderLayout(<div>Test</div>);

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
    expect(motionDiv).toHaveClass('fixed', 'inset-0', 'pointer-events-none');
  });
});
