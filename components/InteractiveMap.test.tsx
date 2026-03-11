import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import InteractiveMap from './InteractiveMap';
import React from 'react';

// Mock react-simple-maps to render standard elements
vi.mock('react-simple-maps', () => ({
  ComposableMap: ({ children }: { children: React.ReactNode }) => <div data-testid="composable-map">{children}</div>,
  ZoomableGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="zoomable-group">{children}</div>,
  Geographies: ({ children }: { children: any }) => <div data-testid="geographies">{children({ geographies: [] })}</div>,
  Geography: () => <div data-testid="geography" />,
  Marker: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    // Only render children if they are valid SVG elements, or we just render a div to prevent warnings
    <div data-testid="marker" onClick={onClick}>
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
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('InteractiveMap', () => {
  it('renders correctly', () => {
    render(<InteractiveMap />);
    expect(screen.getByTestId('composable-map')).toBeInTheDocument();

    // Check that we render the right number of markers (there are 5 projects)
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(5);
  });

  it('selects a project on marker click', async () => {
    render(<InteractiveMap />);
    const markers = screen.getAllByTestId('marker');

    // Initial state: no project selected
    expect(screen.queryByText('Assam, India')).not.toBeInTheDocument();

    // Click first marker (Assam, India)
    fireEvent.click(markers[0]);

    // Check if details are shown
    await waitFor(() => {
      expect(screen.getByText('Assam, India')).toBeInTheDocument();
      expect(screen.getByText('Nano-Fertilizers in Tea Plantations')).toBeInTheDocument();
      expect(screen.getByText('+25% Yield, Reduced Input Costs')).toBeInTheDocument();
    });
  });

  it('closes project details on close button click', async () => {
    render(<InteractiveMap />);
    const markers = screen.getAllByTestId('marker');

    // Open project
    fireEvent.click(markers[0]);
    await waitFor(() => {
      expect(screen.getByText('Assam, India')).toBeInTheDocument();
    });

    // Close project - there should be an X button
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Assam, India')).not.toBeInTheDocument();
    });
  });

  it('changes selected project when clicking a different marker', async () => {
    render(<InteractiveMap />);
    const markers = screen.getAllByTestId('marker');

    // Open first project
    fireEvent.click(markers[0]);
    await waitFor(() => {
      expect(screen.getByText('Assam, India')).toBeInTheDocument();
    });

    // Click second marker (Brazil)
    fireEvent.click(markers[1]);

    await waitFor(() => {
      expect(screen.queryByText('Assam, India')).not.toBeInTheDocument();
      expect(screen.getByText('Mato Grosso, Brazil')).toBeInTheDocument();
      expect(screen.getByText('Regenerative Soy Farming')).toBeInTheDocument();
    });
  });
});
