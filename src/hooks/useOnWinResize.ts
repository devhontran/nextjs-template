'use client';
import { useLayoutEffect } from 'react';

import { TIME_DELAY_RESIZE } from '@/constants/animation';

export default function useOnWinResize(callback: () => void): void {
  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedCallback = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, TIME_DELAY_RESIZE);
    };

    callback();
    window.addEventListener('resize', debouncedCallback);

    return (): void => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCallback);
    };
  }, [callback]);
}
