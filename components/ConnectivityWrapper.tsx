import React from 'react';
import { useLocation } from 'react-router-dom';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { isEssentialPage } from '../utils/pwaPatterns';
import OfflineFallback from './OfflineFallback';

interface ConnectivityWrapperProps {
  children: React.ReactNode;
}

const ConnectivityWrapper: React.FC<ConnectivityWrapperProps> = ({ children }) => {
  const isOnline = useOnlineStatus();
  const { pathname } = useLocation();

  // If offline and NOT an essential (cached) page, show fallback
  if (!isOnline && !isEssentialPage(pathname)) {
    return <OfflineFallback />;
  }

  return <>{children}</>;
};

export default ConnectivityWrapper;
