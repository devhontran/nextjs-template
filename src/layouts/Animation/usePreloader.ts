'use client';

import { ReadonlySignal } from '@preact/signals-core';
import { signal, useComputed, useSignalEffect } from '@preact/signals-react';
import { useEffect } from 'react';

import { isBodyReadyState, isInitPageState, isPageOnce } from '@/layouts/Animation/usePageStatus';

export const requests = signal<number>(0);
export const loadTo = signal<number>(0);
export const r3fRequests = signal<number>(0);
export const r3fLoadTo = signal<number>(0);

export function registerPreloader(): void {
  requests.value += 1;
}

export function unRegisterPreloader(): void {
  loadTo.value += 1;
}

export function usePreloader(): { progress: ReadonlySignal<number> } {
  return {
    progress: useComputed(() => {
      if (!requests.value || !isBodyReadyState.value || !isInitPageState.value) return 0;
      return (loadTo.value + r3fLoadTo.value) / (requests.value + r3fRequests.value);
    }),
  };
}

export function resetPreloader(): void {
  requests.value = 0;
  loadTo.value = 0;
  r3fLoadTo.value = 0;
  r3fRequests.value = 0;
}

export function useFinalClearPreloader(): void {
  useEffect(() => {
    loadTo.value += 1;
  }, []);
}

export function useIsLoaded(playIn: () => void): void {
  const { progress } = usePreloader();
  const isPlayIn = useComputed(() => {
    return progress.value >= 1;
  });
  useSignalEffect(() => {
    isPlayIn.value && setTimeout(playIn, 300);
  });
}

export function useIsLoadedOnce(playIn: () => void): void {
  const { progress } = usePreloader();
  const isPlayIn = useComputed(() => {
    return progress.value >= 1;
  });
  useSignalEffect(() => {
    isPlayIn.value && isPageOnce() && setTimeout(playIn, 300);
  });
}
