'use client';
import type { Signal } from '@preact/signals-react';
import { useComputed, useSignal, useSignalEffect } from '@preact/signals-react';
import type { ReactElement, ReactNode } from 'react';
import { createContext, use } from 'react';

interface AssetsContextValue {
  assetsProgress: Signal<number>;
  isAssetsLoaded: Signal<boolean>;
  registerAssets: () => void;
  unRegisterAssets: () => void;
  resetAssets: () => void;
}

const AssetsContext = createContext<AssetsContextValue | null>(null);

export function useAssetsContext(): AssetsContextValue {
  const context = use(AssetsContext);
  if (!context) {
    throw new Error('useAssetsContext must be used within AssetsProvider');
  }
  return context;
}

export function AssetsProvider({ children }: { children: ReactNode }): ReactElement {
  const assetsRequests = useSignal(0);
  const assetsLoadTo = useSignal(0);
  const isAssetsLoaded = useSignal(false);

  const registerAssets = (): void => {
    assetsRequests.value += 1;
  };

  const unRegisterAssets = (): void => {
    assetsLoadTo.value += 1;
  };

  const assetsProgress = useComputed(() => {
    const requests = assetsRequests.value;
    const loadTo = assetsLoadTo.value;

    return Math.min(
      Math.round(requests === 0 || loadTo === 0 ? 0 : (loadTo / requests) * 100),
      100
    );
  });

  useSignalEffect(() => {
    if (assetsProgress.value >= 100 && !isAssetsLoaded.value) {
      isAssetsLoaded.value = true;
    }
  });

  const resetAssets = (): void => {
    assetsRequests.value = 0;
    assetsLoadTo.value = 0;
    isAssetsLoaded.value = false;
  };

  const contextValue = {
    registerAssets,
    unRegisterAssets,
    isAssetsLoaded,
    assetsProgress,
    resetAssets,
  };

  return <AssetsContext value={contextValue}>{children}</AssetsContext>;
}
