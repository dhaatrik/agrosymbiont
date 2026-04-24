import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConnectivityWrapper from '../../components/ConnectivityWrapper';
import { MemoryRouter } from 'react-router-dom';
import * as onlineHook from '../../hooks/useOnlineStatus';
import * as pwaPatterns from '../../utils/pwaPatterns';

vi.mock('../../hooks/useOnlineStatus');
vi.mock('../../utils/pwaPatterns');

describe('ConnectivityWrapper Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when online', () => {
    vi.mocked(onlineHook.useOnlineStatus).mockReturnValue(true);
    
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ConnectivityWrapper>
          <div data-testid="child">Content</div>
        </ConnectivityWrapper>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render children when offline but on an essential page', () => {
    vi.mocked(onlineHook.useOnlineStatus).mockReturnValue(false);
    vi.mocked(pwaPatterns.isEssentialPage).mockReturnValue(true);
    
    render(
      <MemoryRouter initialEntries={['/faq']}>
        <ConnectivityWrapper>
          <div data-testid="child">Content</div>
        </ConnectivityWrapper>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render OfflineFallback when offline and on a non-essential page', () => {
    vi.mocked(onlineHook.useOnlineStatus).mockReturnValue(false);
    vi.mocked(pwaPatterns.isEssentialPage).mockReturnValue(false);
    
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <ConnectivityWrapper>
          <div data-testid="child">Content</div>
        </ConnectivityWrapper>
      </MemoryRouter>
    );
    
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(screen.getByText(/You're currently offline/i)).toBeInTheDocument();
  });
});
