import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ImpactMap from './ImpactMap';
import React from 'react';

// Mock react-simple-maps to render standard elements
vi.mock('react-simple-maps', () => ({
  ComposableMap: ({ children }: { children: React.ReactNode }) => <div data-testid="composable-map">{children}</div>,
  ZoomableGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="zoomable-group">{children}</div>,
  Geographies: ({ children }: { children: any }) => <div data-testid="geographies">{children({ geographies: [] })}</div>,
  Geography: () => <div data-testid="geography" />,
  Marker: ({ children, onClick, 'aria-label': ariaLabel }: { children: React.ReactNode, onClick: () => void, 'aria-label': string }) => (
    // Only render children if they are valid SVG elements, or we just render a div to prevent warnings
    <div data-testid="marker" onClick={onClick} aria-label={ariaLabel}>
       {/* Use a simple span instead of the original children to avoid the unknown tag warnings in JSDOM,
           since we only care about the click handler for this test */}
       <span>Marker</span>
    </div>
  ),
}));

// Mock framer-motion to simplify testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} data-testid="motion-div" {...props}>{children}</div>,
    g: ({ children, className, ...props }: any) => <g className={className} data-testid="motion-g" {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Just return the key itself as the translation
  }),
}));

describe('ImpactMap', () => {
  it('renders correctly', () => {
    render(<ImpactMap />);
    expect(screen.getByTestId('composable-map')).toBeInTheDocument();

    // Check that we render the right number of markers (there are 4 projects)
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(4);
  });

  it('selects a project on marker click', async () => {
    render(<ImpactMap />);
    const markers = screen.getAllByTestId('marker');

    // Initial state: no project selected
    expect(screen.queryByText('map_maharashtra')).not.toBeInTheDocument();

    // Click first marker (Maharashtra)
    fireEvent.click(markers[0]);

    // Check if details are shown
    await waitFor(() => {
      expect(screen.getByText('map_maharashtra')).toBeInTheDocument();
      expect(screen.getByText('map_maharashtra_crop')).toBeInTheDocument();
      expect(screen.getByText('+28%')).toBeInTheDocument();
      expect(screen.getByText('4,500+')).toBeInTheDocument();
      expect(screen.getByText('map_excellent')).toBeInTheDocument();
    });
  });

  it('closes project details on close button click', async () => {
    render(<ImpactMap />);
    const markers = screen.getAllByTestId('marker');

    // Open project
    fireEvent.click(markers[0]);
    await waitFor(() => {
      expect(screen.getByText('map_maharashtra')).toBeInTheDocument();
    });

    // Close project - there should be an X button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('map_maharashtra')).not.toBeInTheDocument();
    });
  });

  it('changes selected project when clicking a different marker', async () => {
    render(<ImpactMap />);
    const markers = screen.getAllByTestId('marker');

    // Open first project
    fireEvent.click(markers[0]);
    await waitFor(() => {
      expect(screen.getByText('map_maharashtra')).toBeInTheDocument();
    });

    // Click second marker (Punjab)
    fireEvent.click(markers[1]);

    await waitFor(() => {
      expect(screen.queryByText('map_maharashtra')).not.toBeInTheDocument();
      expect(screen.getByText('map_punjab')).toBeInTheDocument();
      expect(screen.getByText('map_punjab_crop')).toBeInTheDocument();
      expect(screen.getByText('+22%')).toBeInTheDocument();
    });
  });
});
