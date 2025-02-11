import { ReadonlySignal, Signal, useComputed, useSignalEffect } from '@preact/signals-react';

import { preloaderState_loadTo, preloaderState_requests } from '../signals/preloaderSignals';

export function useLoader(): {
  progress: Signal<number>;
  isLoaded: ReadonlySignal<boolean>;
} {
  const isLoaded = useComputed(() => {
    const requests = preloaderState_requests.value;
    const loadTo = preloaderState_loadTo.value;

    //eslint-disable-next-line no-console
    console.log(requests, loadTo);
    return requests > 0 && loadTo > 0 && requests === loadTo;
  });

  const progress = useComputed(() => {
    const requests = preloaderState_requests.value;
    const loadTo = preloaderState_loadTo.value;

    return Math.min(
      Math.round(requests === 0 || loadTo === 0 ? 0 : (loadTo / requests) * 100),
      100
    );
  });

  return { progress, isLoaded };
}

export function useIsLoaded(callback: () => void): void {
  const { isLoaded } = useLoader();

  useSignalEffect(() => {
    if (!isLoaded.value) return;
    const timeout = setTimeout(() => {
      callback();
    }, 100);
    return () => clearTimeout(timeout);
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
