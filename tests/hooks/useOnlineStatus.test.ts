import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

describe('useOnlineStatus Hook', () => {
  it('should return initial online status', () => {
    const { result } = renderHook(() => useOnlineStatus());
    expect(typeof result.current).toBe('boolean');
  });

  it('should update status when going offline and online', () => {
    const { result } = renderHook(() => useOnlineStatus());
    
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
});
