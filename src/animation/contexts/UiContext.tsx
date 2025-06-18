'use client';
import { useGSAP } from '@gsap/react';
import type { Signal } from '@preact/signals-react';
import { useComputed, useSignal } from '@preact/signals-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ReactElement, ReactNode } from 'react';
import { createContext, use, useMemo } from 'react';

import { debounce, getWindowHeight, getWindowWidth } from '@/utils/uiHelper';

interface UiContextValue {
  isMobile: Signal<boolean>;
  isTablet: Signal<boolean>;
  isDesktop: Signal<boolean>;
  height: Signal<number>;
  width: Signal<number>;
  scrollHeight: Signal<number>;
}

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1200;

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }): ReactElement {
  const width = useSignal(getWindowWidth());
  const height = useSignal(getWindowHeight());
  const scrollHeight = useSignal(typeof document !== 'undefined' ? document.body.scrollHeight : 0);
  const isMobile = useComputed(() => width.value < MOBILE_BREAKPOINT);
  const isTablet = useComputed(
    () => width.value >= MOBILE_BREAKPOINT && width.value < DESKTOP_BREAKPOINT
  );
  const isDesktop = useComputed(() => width.value >= DESKTOP_BREAKPOINT);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const listener = debounce((): void => {
      // eslint-disable-next-line react-compiler/react-compiler
      width.value = getWindowWidth();
      height.value = getWindowHeight();
      scrollHeight.value = document.body.scrollHeight;
    }, 150);

    listener();
    const resizeObserver = new ResizeObserver(listener);
    resizeObserver.observe(document.body);

    return (): void => {
      resizeObserver.unobserve(document.body);
      resizeObserver.disconnect();
      width.value = 0;
      height.value = 0;
      scrollHeight.value = 0;
    };
  });

  const contextValue = useMemo(
    () => ({ isMobile, isTablet, isDesktop, height, width, scrollHeight }),
    [isMobile, isTablet, isDesktop, height, width, scrollHeight]
  );

  return <UiContext value={contextValue}>{children}</UiContext>;
}

export const useUiContext = (): UiContextValue => {
  const context = use(UiContext);
  if (!context) {
    throw new Error('useUiContext must be used within UiProvider');
  }
  return context;
};
