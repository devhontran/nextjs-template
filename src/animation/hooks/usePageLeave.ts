import { useComputed, useSignalEffect } from '@preact/signals-react';

import { TIME_WAIT_LOADED_TRIGGER } from '@/constants/animation';

import { preloaderState } from '../signals/preloderSignals';

export function useLoaded(onLoaded: () => void): void {
  const isLoaded = useComputed(() => {
    const { requests, loadTo } = preloaderState;
    return requests.value > 0 && requests.value === loadTo.value;
  });

  useSignalEffect(() => {
    if (!isLoaded.value) return;

    const timer = setTimeout(onLoaded, TIME_WAIT_LOADED_TRIGGER);
    return () => clearTimeout(timer);
  });
}
