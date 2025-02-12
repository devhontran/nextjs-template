import { useSignalEffect } from '@preact/signals-react';

import { useAssetsContext } from '../contexts/AssetsContext';

export function useIsAssetsLoaded(callback: () => void): void {
  const { isAssetsLoaded } = useAssetsContext();
  useSignalEffect(() => {
    isAssetsLoaded.value && callback();
  });
}
