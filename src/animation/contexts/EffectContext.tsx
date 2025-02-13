'use client';
import { Signal, untracked, useComputed, useSignal } from '@preact/signals-react';
import { createContext, ReactElement, ReactNode, useContext, useLayoutEffect } from 'react';

export enum PageState {
  Enter = 'enter',
  Leave = 'leave',
  Idle = 'idle',
  Play = 'play',
}

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
}
const EffectContext = createContext<EffectContextValue | null>(null);

export function EffectProvider({ children }: { children: ReactNode }): ReactElement {
  const pageStatus = useSignal(PageState.Idle);
  const routerState = useSignal<RouterState>({
    pathName: '/',
    pageName: 'Home',
    typeEffect: 'fade',
  });

  const pageLeave = (): void => {
    pageStatus.value = PageState.Leave;
  };

  const pageEnter = (): void => {
    pageStatus.value = PageState.Enter;
  };

  const pagePlay = (): void => {
    pageStatus.value = PageState.Play;
  };

  const pageIdle = (): void => {
    pageStatus.value = PageState.Idle;
  };

  const isPageEnter = useComputed(() => pageStatus.value === PageState.Enter);

  const isPageLeave = useComputed(() => pageStatus.value === PageState.Leave);

  const isPagePlay = useComputed(() => pageStatus.value === PageState.Play);

  const isPageIdle = useComputed(() => pageStatus.value === PageState.Idle);

  useLayoutEffect(() => {
    routerState.value = untracked(() => {
      return {
        pathName: window.location.pathname,
        pageName: window.location.pathname.split('/')[1],
        typeEffect: 'fade',
      };
    });
  }, []);

  return (
    <EffectContext.Provider
      value={{
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
      }}
    >
      {children}
    </EffectContext.Provider>
  );
}

export const useEffectContext = (): EffectContextValue => {
  const context = useContext(EffectContext);
  if (!context) {
    throw new Error('useEffectContext must be used within EffectProvider');
  }
  return context;
};
