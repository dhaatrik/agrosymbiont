import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineFallback: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
        <WifiOff size={64} className="text-green-500 relative z-10 animate-pulse" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">You're currently offline</h2>
      <p className="text-gray-400 max-w-md mb-8">
        It looks like you've lost your connection. Don't worry, AgroSymbiont has cached essential information for you, but this page requires an active connection.
      </p>
      
      <button
        onClick={handleRetry}
        className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
      >
        <RefreshCw size={20} />
        Try Again
      </button>
    </div>
  );
};
