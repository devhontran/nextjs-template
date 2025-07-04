'use client';
import type { Signal } from '@preact/signals-react';
import { useComputed, useSignal, useSignalEffect } from '@preact/signals-react';
import type { ReactElement, ReactNode } from 'react';
import { createContext, use, useMemo } from 'react';

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
      // eslint-disable-next-line react-compiler/react-compiler
      isAssetsLoaded.value = true;
    }
  });

  const resetAssets = (): void => {
    isAssetsLoaded.value = false;
    assetsLoadTo.value = 0;
    assetsRequests.value = 0;
  };

  const contextValue = useMemo(
    () => ({
      registerAssets,
      unRegisterAssets,
      isAssetsLoaded,
      assetsProgress,
      resetAssets,
    }),
    [registerAssets, unRegisterAssets, isAssetsLoaded, assetsProgress, resetAssets]
  );

  return <AssetsContext value={contextValue}>{children}</AssetsContext>;
}
