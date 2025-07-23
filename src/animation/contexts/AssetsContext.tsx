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
  r3fRequests: Signal<number>;
  r3fLoadTo: Signal<number>;
  setR3fRequests: (value: number) => void;
  setR3fLoadTo: (value: number) => void;
  isR3fLoaded: Signal<boolean>;
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
  const r3fRequests = useSignal(0);
  const r3fLoadTo = useSignal(0);
  const isAssetsLoaded = useSignal(false);

  const setR3fRequests = (value: number): void => {
    r3fRequests.value = value;
  };

  const setR3fLoadTo = (value: number): void => {
    r3fLoadTo.value = value;
  };

  const isR3fLoaded = useComputed(() => {
    return r3fRequests.value === r3fLoadTo.value;
  });

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
    if (assetsProgress.value >= 100 && !isAssetsLoaded.peek()) {
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
      r3fRequests,
      r3fLoadTo,
      setR3fRequests,
      setR3fLoadTo,
      isR3fLoaded,
    }),
    [
      registerAssets,
      unRegisterAssets,
      isAssetsLoaded,
      assetsProgress,
      resetAssets,
      r3fRequests,
      r3fLoadTo,
      setR3fRequests,
      setR3fLoadTo,
      isR3fLoaded,
    ]
  );

  return <AssetsContext value={contextValue}>{children}</AssetsContext>;
}
