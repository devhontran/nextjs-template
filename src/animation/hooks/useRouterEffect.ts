import { useSignal } from '@preact/signals-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';

interface ILinkEffect {
  pathName: string;
  pageName?: string;
  typeEffect?: string;
  isPrefetch?: boolean;
}

export default function useRouterEffect(): {
  routerPrefetch: ({ pathName, pageName, typeEffect, isPrefetch }: ILinkEffect) => void;
  routerPush: () => void;
  isEffectHistory: () => boolean;
} {
  const router = useRouter();
  const beforeTypeEffect = useSignal('fade');
  const { pageLeave, pagePrefetch, routerState, setRouterState } = useEffectContext();
  const routerPrefetch = useCallback(
    ({
      pathName,
      pageName = 'Home',
      typeEffect = 'fade',
      isPrefetch = true,
    }: ILinkEffect): void => {
      if (pathName === routerState.peek().pathName) {
        window.location.reload();
        return;
      }
      //eslint-disable-next-line react-compiler/react-compiler
      beforeTypeEffect.value = typeEffect;
      pagePrefetch();
      if (isPrefetch) router.prefetch(pathName);
      pageLeave();
      setRouterState({
        pathName,
        pageName,
        typeEffect,
      });
    },
    [router]
  );

  const routerPush = useCallback(() => {
    router.push(routerState.peek().pathName);
  }, [router]);

  const isEffectHistory = (): boolean => {
    return beforeTypeEffect.value === 'history';
  };

  return { routerPrefetch, routerPush, isEffectHistory };
}
