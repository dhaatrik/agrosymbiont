import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OfflineFallback from '../../components/OfflineFallback';
import { BrowserRouter } from 'react-router-dom';

describe('OfflineFallback Component', () => {
  it('should render offline message and retry button', () => {
    render(
      <BrowserRouter>
        <OfflineFallback />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/You're currently offline/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
  });
});
