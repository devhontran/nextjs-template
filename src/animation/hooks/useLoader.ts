import { ReadonlySignal, Signal, useComputed, useSignalEffect } from '@preact/signals-react';

import { preloaderState } from '../signals/preloaderSignals';

export function useLoader(): {
  progress: Signal<number>;
  isLoaded: ReadonlySignal<boolean>;
} {
  const isLoaded = useComputed(() => {
    const { requests, loadTo } = preloaderState;
    return requests.value > 0 && requests.value === loadTo.value;
  });

  const progress = useComputed(() => {
    const { requests, loadTo } = preloaderState;
    return Math.round((loadTo.value / requests.value) * 100);
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
