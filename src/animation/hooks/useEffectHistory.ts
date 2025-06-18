'use client';

import { useLayoutEffect } from 'react';

import type { NavigationEvent } from '@/types/global';

import { useUiContext } from '../contexts/UiContext';
import useRouterEffect from './useRouterEffect';

export default function useEffectHistory({
  traverse,
  push,
}: {
  traverse?: () => void;
  push?: () => void;
}): void {
  const { routerPrefetch } = useRouterEffect();
  const { isDesktop } = useUiContext();

  useLayoutEffect(() => {
    const navigationTransition = (e: NavigationEvent): void => {
      if (!e.destination?.url.includes(document.location.origin)) return;

      let rePath: string = e.destination.url.replace(document.location.origin, '');
      if (rePath === '') rePath = '/';

      if (e.navigationType === 'traverse') {
        traverse?.();
        routerPrefetch({
          pathName: rePath,
          typeEffect: 'history',
        });
      } else if (e.navigationType === 'push' && isDesktop.peek()) {
        window.lenis?.scrollTo(0, { immediate: true, force: true });
        push?.();
      }
    };

    if (window.navigation?.addEventListener) {
      window.navigation.addEventListener('navigate', navigationTransition);
    } else {
      window.onpopstate = function (): void {
        routerPrefetch({
          pathName: window.location.pathname,
          typeEffect: 'history',
        });
      };
    }

    return (): void => {
      if (window.navigation?.removeEventListener) {
        window.navigation.removeEventListener('navigate', navigationTransition);
      }
    };
  }, []);
}
