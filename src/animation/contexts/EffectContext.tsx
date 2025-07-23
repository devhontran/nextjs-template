'use client';
import type { Signal } from '@preact/signals-react';
import { untracked, useComputed, useSignal } from '@preact/signals-react';
import type { ReactElement, ReactNode } from 'react';
import { createContext, use, useLayoutEffect, useMemo } from 'react';

import { PageState } from '@/enum/common';

interface RouterState {
  pathName: string;
  pageName: string;
  typeEffect: string;
}

interface EffectContextValue {
  pageStatus: Signal<PageState>;
  pageLeave: () => void;
  pageEnter: () => void;
  pagePlay: () => void;
  pageIdle: () => void;
  isPageEnter: Signal<boolean>;
  isPageLeave: Signal<boolean>;
  isPagePlay: Signal<boolean>;
  isPageIdle: Signal<boolean>;
  routerState: Signal<RouterState>;
  setRouterState: (value: RouterState) => void;
  pagePrefetch: () => void;
}
const EffectContext = createContext<EffectContextValue | null>(null);

export function EffectProvider({ children }: { children: ReactNode }): ReactElement {
  const pageStatus = useSignal(PageState.IDLE);
  const routerState = useSignal<RouterState>({
    pathName: '/',
    pageName: 'Home',
    typeEffect: 'fade',
  });

  const pageLeave = (): void => {
    document.body.classList.remove('is-ready');
    pageStatus.value = PageState.LEAVE;
  };

  const pageEnter = (): void => {
    pageStatus.value = PageState.ENTER;
  };

  const pagePlay = (): void => {
    document.body.classList.add('is-ready');
    pageStatus.value = PageState.PLAY;
  };

  const pageIdle = (): void => {
    pageStatus.value = PageState.IDLE;
  };

  const pagePrefetch = (): void => {
    pageStatus.value = PageState.PREFETCH;
  };

  const isPageEnter = useComputed(() => pageStatus.value > PageState.PLAY);
  const isPagePlay = useComputed(() => pageStatus.value > PageState.IDLE);
  const isPageLeave = useComputed(() => pageStatus.value > PageState.REPLACE);
  const isPageIdle = useComputed(() => pageStatus.value > PageState.LEAVE);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    routerState.value = untracked(() => {
      return {
        pathName: window.location.pathname,
        pageName: window.location.pathname.split('/')[1],
        typeEffect: 'fade',
      };
    });
  }, []);

  const setRouterState = (value: RouterState): void => {
    routerState.value = value;
  };

  const contextValue = useMemo(
    () => ({
      pageStatus,
      pageLeave,
      pageEnter,
      pagePlay,
      pageIdle,
      isPageEnter,
      isPageLeave,
      isPagePlay,
      isPageIdle,
      routerState,
      setRouterState,
      pagePrefetch,
    }),
    [
      pageStatus,
      pageLeave,
      pageEnter,
      pagePlay,
      pageIdle,
      isPageEnter,
      isPageLeave,
      isPagePlay,
      isPageIdle,
      routerState,
      setRouterState,
      pagePrefetch,
    ]
  );

  return <EffectContext value={contextValue}>{children}</EffectContext>;
}

export const useEffectContext = (): EffectContextValue => {
  const context = use(EffectContext);
  if (!context) {
    throw new Error('useEffectContext must be used within EffectProvider');
  }
  return context;
};
