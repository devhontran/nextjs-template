'use client';
import { useGSAP } from '@gsap/react';
import type { Signal } from '@preact/signals-react';
import { useComputed, useSignal, useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ReactElement, ReactNode } from 'react';
import { createContext, use, useMemo, useState } from 'react';

import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET, TIME_DELAY_RESIZE } from '@/constants/animation';
import { debounce } from '@/utils/uiHelper';

interface UiContextValue {
  isMobile: Signal<boolean>;
  isTablet: Signal<boolean>;
  isDesktop: Signal<boolean>;
  height: Signal<number>;
  width: Signal<number>;
  scrollHeight: Signal<number>;
}

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }): ReactElement {
  const width = useSignal(window.innerWidth);
  const height = useSignal(window.innerHeight);
  const scrollHeight = useSignal(typeof document !== 'undefined' ? document.body.scrollHeight : 0);

  const isMobile = useComputed(() => width.value < BREAKPOINT_MOBILE);
  const isTablet = useComputed(
    () => width.value >= BREAKPOINT_MOBILE && width.value < BREAKPOINT_TABLET
  );
  const isDesktop = useComputed(() => width.value >= BREAKPOINT_TABLET);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const calcWin = (): void => {
      //eslint-disable-next-line react-compiler/react-compiler
      width.value = window.innerWidth;
      height.value = window.innerHeight;
      scrollHeight.value = document.body.scrollHeight;
    };

    const listener = debounce((): void => {
      calcWin();

      ScrollTrigger.refresh();
    }, TIME_DELAY_RESIZE);

    calcWin();
    const resizeObserver = new ResizeObserver(listener);
    resizeObserver.observe(document.body);

    return (): void => {
      resizeObserver.unobserve(document.body);
      resizeObserver.disconnect();
    };
  });

  const contextValue = useMemo(
    () => ({ isMobile, isTablet, isDesktop, height, width, scrollHeight }),
    [isMobile, isTablet, isDesktop, height, width, scrollHeight]
  );

  return <UiContext value={contextValue}>{children}</UiContext>;
}

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useUiContext();
  const [is, setIs] = useState(false);

  useSignalEffect(() => {
    setIs(isDesktop.value);
  });

  return is;
};

export const useIsTablet = (): boolean => {
  const { isTablet } = useUiContext();
  const [is, setIs] = useState(false);

  useSignalEffect(() => {
    setIs(isTablet.value);
  });

  return is;
};

export const useIsMobile = (): boolean => {
  const { isMobile } = useUiContext();
  const [is, setIs] = useState(false);

  useSignalEffect(() => {
    setIs(isMobile.value);
  });

  return is;
};

export const useUiContext = (): UiContextValue => {
  const context = use(UiContext);
  if (!context) {
    throw new Error('useUiContext must be used within UiProvider');
  }
  return context;
};
