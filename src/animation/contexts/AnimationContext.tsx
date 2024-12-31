'use client';
import { useGSAP } from '@gsap/react';
import { Signal, useComputed, useSignal } from '@preact/signals-react';
import { debounce } from '@Utils/uiHelper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createContext, ReactElement, ReactNode, useContext } from 'react';

import useRouterEffect from '@/hooks/useRouterEffect';

interface AnimationContextValue {
  isMobile: Signal<boolean>;
  isTablet: Signal<boolean>;
  isDesktop: Signal<boolean>;
  height: Signal<number>;
  width: Signal<number>;
  scrollHeight: Signal<number>;
}

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1200;

const AnimationContext = createContext<AnimationContextValue | null>(null);

export function AnimationProvider({ children }: { children: ReactNode }): ReactElement {
  const width = useSignal(typeof window !== 'undefined' ? window.innerWidth : 0);
  const height = useSignal(typeof window !== 'undefined' ? window.innerHeight : 0);
  const scrollHeight = useSignal(typeof document !== 'undefined' ? document.body.scrollHeight : 0);
  const isMobile = useComputed(() => width.value < MOBILE_BREAKPOINT);
  const isTablet = useComputed(
    () => width.value >= MOBILE_BREAKPOINT && width.value < DESKTOP_BREAKPOINT
  );
  const isDesktop = useComputed(() => width.value >= DESKTOP_BREAKPOINT);
  const { routerPrefetch } = useRouterEffect();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const listener = debounce((): void => {
      width.value = window.innerWidth || document.body.clientWidth || 0;
      height.value = window.innerHeight || document.body.clientHeight || 0;
      scrollHeight.value = document.body.scrollHeight;
    }, 150);

    const resizeObserver = new ResizeObserver(listener);
    resizeObserver.observe(document.body);

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.onpopstate = (window.history as any).onpushstate = function (): void {
      routerPrefetch({ pathName: window.location.pathname });
    };

    return () => {
      resizeObserver.unobserve(document.body);
      resizeObserver.disconnect();
    };
  });

  return (
    <AnimationContext.Provider
      value={{ isMobile, isTablet, isDesktop, height, width, scrollHeight }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimationContext = (): AnimationContextValue => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within AnimationProvider');
  }
  return context;
};
