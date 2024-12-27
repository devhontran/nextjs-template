import { ReadonlySignal, Signal, useComputed, useSignalEffect } from '@preact/signals-react';

import { preloaderState } from '../signals/preloaderSignals';

export function useLoader(): {
  progress: Signal<number>;
  isLoaded: ReadonlySignal<boolean>;
} {
  const isLoaded = useComputed(() => {
    const { requests, loadTo } = preloaderState.value;
    return requests > 0 && requests === loadTo;
  });

  const progress = useComputed(() => {
    const { requests, loadTo } = preloaderState.value;
    return Math.round(requests === 0 ? 0 : (loadTo / requests) * 100);
  });

  return { progress, isLoaded };
}

export function useIsLoaded(callback: () => void): void {
  const { isLoaded } = useLoader();

  useSignalEffect(() => {
    if (!isLoaded.value) return;

    callback();
  });
}

export function useIsFontLoaded(callback: () => void): void {
  const isFontLoaded = useComputed(() => {
    return document.fonts.ready;
  });

  useSignalEffect(() => {
    if (!isFontLoaded.value) return;

    callback();
  });
}
