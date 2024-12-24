'use client';

import { useLayoutEffect } from 'react';

import { registerPreloader, unRegisterPreloader } from './usePreloader';

export default function useImagePreloader(ref: React.RefObject<HTMLImageElement>): () => void {
  useLayoutEffect(() => {
    registerPreloader();
    ref.current?.setAttribute('loading', '');
    return () => {
      unRegisterPreloader();
    };
  }, []);
  return unRegisterPreloader;
}
